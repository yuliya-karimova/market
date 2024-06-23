from docx import Document
from weasyprint import HTML
import base64
from io import BytesIO

def save_to_docx(content, images, file_path):
    doc = Document()
    doc.add_paragraph(content)

    for img_base64 in images:
        img_data = base64.b64decode(img_base64)
        with BytesIO(img_data) as img_stream:
            doc.add_picture(img_stream)

    doc.save(file_path)

def save_to_pdf(content, images, file_path):
    html_content = content.replace('\n', '<br>')

    for img_base64 in images:
        html_content += f'<img src="data:image/png;base64,{img_base64}" />'

    HTML(string=html_content).write_pdf(file_path)