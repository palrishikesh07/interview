import os
import requests
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()


token = os.getenv("WHATSAPP_TOKEN")
phone_number_id = os.getenv("PHONE_NUMBER_ID")
api_version = os.getenv("WHATSAPP_VERSION", "v26.0")
recipient = os.getenv("RECIPIENT_NUMBER")

# Validate required configuration
if not all([token, phone_number_id, recipient]):
    raise ValueError("Missing required enviroment variables")

url = f"https://graph.facebook.com/{api_version}/{phone_number_id}/messages"

headers={
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",
}


customer_name = "Rishikesh"
verification_detail = "Pal@rishi.com"


payload = {
    "messaging_product":"whatsapp",
    "to":recipient,
    "type":"template",
    "template":{
        "name":"pal_email_verify",
        "language":{"code":"en_US"}
    },
    "components":[
        {
            "type":"body",
            "parameters":[
                {
                    "type":"text",
                    "text":customer_name
                },
                {
                    "type":"text",
                    "text":verification_detail
                }
            ]
        }
    ]
}

response = requests.post(
    url,
    headers = headers,
    json=payload,
    timeout=30,
)

print("Status: ",response.status_code)
print(response.json())