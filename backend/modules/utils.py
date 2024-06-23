from docx import Document
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
import tempfile
import base64
from io import BytesIO
from PIL import Image as PILImage

def save_to_docx(content, images, file_path):
    doc = Document()
    doc.add_paragraph(content)

    for img_base64 in images:
        img_data = base64.b64decode(img_base64)
        with BytesIO(img_data) as img_stream:
            doc.add_picture(img_stream)

    doc.save(file_path)

def save_to_pdf(report_text, images, file_path):
    doc = SimpleDocTemplate(file_path, pagesize=letter)
    elements = []
    styles = getSampleStyleSheet()
    
    # Регистрация шрифта DejaVuSans
    pdfmetrics.registerFont(TTFont('DejaVuSans', 'data/fonts/DejaVuSans.ttf'))
    styles['Normal'].fontName = 'DejaVuSans'
    styleN = styles['Normal']

    # Добавляем текст отчета
    for line in report_text.split('\n'):
        paragraph = Paragraph(line, styleN)
        elements.append(paragraph)
        elements.append(Spacer(1, 12))

    # Добавляем изображения
    max_width, max_height = 500, 150  # Максимальные размеры изображения в PDF
    for img_base64 in images:
        img_data = base64.b64decode(img_base64)
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as tmpfile:
            tmpfile.write(img_data)
            tmpfile.flush()
            with PILImage.open(tmpfile.name) as img:
                img_width, img_height = img.size
                ratio = min(max_width / img_width, max_height / img_height)
                img_width = int(img_width * ratio)
                img_height = int(img_height * ratio)
                elements.append(Image(tmpfile.name, width=img_width, height=img_height))
                elements.append(Spacer(1, 12))

    doc.build(elements)
