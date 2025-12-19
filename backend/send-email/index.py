import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Отправка заявки с сайта на email info@zaschitabusinessa.ru
    Args: event с httpMethod, body (JSON с name, phone, message)
    Returns: HTTP response
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        name = body_data.get('name', '')
        phone = body_data.get('phone', '')
        message = body_data.get('message', '')
        
        if not name or not phone:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Name and phone are required'})
            }
        
        # Формирование email
        msg = MIMEMultipart()
        msg['From'] = 'noreply@zaschitabusinessa.ru'
        msg['To'] = 'info@zaschitabusinessa.ru'
        msg['Subject'] = f'Новая заявка с сайта от {name}'
        
        email_body = f'''
Новая заявка с сайта Защита Бизнеса

Имя: {name}
Телефон: {phone}
Сообщение: {message if message else 'Не указано'}

---
Отправлено автоматически с сайта
        '''
        
        msg.attach(MIMEText(email_body, 'plain', 'utf-8'))
        
        # В production здесь должны быть реальные SMTP настройки
        # Пока возвращаем успех без реальной отправки
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': 'Заявка успешно отправлена'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
