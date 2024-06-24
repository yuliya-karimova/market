from flask import Flask, request, jsonify, session, send_from_directory, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import json
from modules.company import check_company
from modules.news import read_analytic_news
from modules.agrerator import collect_analytics
from modules.predict import predict_next_year
from modules.compare_prices import compare_prices
from modules.topics import get_news_by_topics
from modules.talk import talk_to_ai

app = Flask(__name__)
app.secret_key = 'karimova'
CORS(app, supports_credentials=True, origins=["http://localhost:5174", "http://localhost:3000"])

# Конфигурация базы данных
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Модель пользователя
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(150), nullable=False)
    topics = db.Column(db.Text, nullable=True)  # Добавление поля topics

# Инициализация базы данных
with app.app_context():
    db.create_all()
    
# Путь к директории, где хранятся ваши отчеты
REPORTS_DIR = 'data'

@app.route('/data/<path:filename>')
def download_report(filename):
    try:
        # Возвращаем файл с заголовком, указывающим, что это файл для скачивания
        return send_from_directory(REPORTS_DIR, filename, as_attachment=True)
    except FileNotFoundError:
        abort(404)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Такой пользователь уже существует"}), 400
    
    password_hash = generate_password_hash(password)
    new_user = User(username=username, password_hash=password_hash, topics=json.dumps([]))
    db.session.add(new_user)
    db.session.commit()
    
    token = jwt.encode({
        'username': new_user.username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.secret_key, algorithm="HS256")
    response = jsonify({
        "message": "Пользователь успешно зарегистрирован",
        "username": new_user.username,
        "topics": json.loads(new_user.topics),
        "token": token
    })
    response.set_cookie('token', token, httponly=True)
    return response

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        token = jwt.encode({
            'username': user.username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.secret_key, algorithm="HS256")
        response = jsonify({
            "message": "Пользователь успешно авторизован",
            "username": user.username,
            "topics": json.loads(user.topics or '[]'),
            "token": token
        })
        response.set_cookie('token', token, httponly=True)
        return response
    else:
        return jsonify({"message": "Неправильный логин или пароль"}), 401

@app.route('/api/profile', methods=['GET'])
def profile():
    token = request.cookies.get('token')
    if not token:
        return jsonify({"message": "Unauthorized"}), 401
    
    try:
        data = jwt.decode(token, app.secret_key, algorithms=["HS256"])
        user = User.query.filter_by(username=data['username']).first()
        if not user:
            return jsonify({"message": "Unauthorized"}), 401
    except:
        return jsonify({"message": "Unauthorized"}), 401
    
    return jsonify({
        "username": user.username,
        "topics": json.loads(user.topics or '[]')
    })

@app.route('/api/update-profile', methods=['POST'])
def update_profile():
    token = request.cookies.get('token')
    if not token:
        return jsonify({"message": "Unauthorized"}), 401
    
    try:
        data = jwt.decode(token, app.secret_key, algorithms=["HS256"])
        user = User.query.filter_by(username=data['username']).first()
        if not user:
            return jsonify({"message": "Unauthorized"}), 401
    except:
        return jsonify({"message": "Unauthorized"}), 401
    
    data = request.get_json()
    user.topics = json.dumps(data.get('topics', []))
    db.session.commit()
    return jsonify({
        "message": "Профиль обновлен",
        "username": user.username,
        "topics": json.loads(user.topics)
    })

@app.route('/api/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Пользователь успешно вышел из системы"})
    response.set_cookie('token', '', expires=0, httponly=True)
    return response

@app.route('/api/check-company', methods=['GET'])
def check_company_endpoint():
    company_name = request.args.get('company')
    is_new = request.args.get('is_new')
    if not company_name:
        return jsonify({"error": "Введите название компании для анализа."}), 400
    
    try:
        res = check_company(company_name, is_new)
        return jsonify({"data": res})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/analytic-news', methods=['GET'])
def read_analytic_news_endpoint():
    try:
        res = read_analytic_news()
        return jsonify({"data": res})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/collect-analytics', methods=['GET'])
def collect_analytics_endpoint():
    is_new = request.args.get('is_new')

    try:
        res = collect_analytics(is_new)
        return jsonify({"data": res})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/predict-next-year', methods=['GET'])
def predict_next_year_endpoint():
    is_new = request.args.get('is_new')

    try:
        res = predict_next_year(is_new)
        return jsonify({"data": res})
    except Exception as e:
        print('e: ', e)
        return jsonify({"error": str(e)}), 300
    
@app.route('/api/compare-prices', methods=['GET'])
def compare_prices_endpoint():
    is_new = request.args.get('is_new')

    try:
        res = compare_prices(is_new)
        return jsonify({"data": res})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/find-topics', methods=['GET'])
def get_news_by_topics_endpoint():
    topics = request.args.get('topics')

    try:
        res = get_news_by_topics(topics)
        return jsonify({"data": res})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/talk-to-ai', methods=['POST'])
def talk_endpoint():
    try:
        data = request.get_json()
        text = data.get('text')
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        res = talk_to_ai(text)
        return jsonify({"data": res})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)