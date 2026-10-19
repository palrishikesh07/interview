import os
import requests
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()


token = os.getenv("WHATSAPP_TOKEN")
phone_number_id = os.getenv("PHONE_NUMBER_ID")
api_version = os.getenv("WHATSAPP_VERSION", "v26.0")
recipient = os.getenv("RECIPIENT_NUMBER")

waba_id = os.getenv("WABA_ID")


# Validate required configuration
if not all([token, phone_number_id, recipient]):
    raise ValueError("Missing required enviroment variables")

# url = f"https://graph.facebook.com/{api_version}/{phone_number_id}/messages"
url = f"https://graph.facebook.com/{api_version}/{waba_id}/message_templates"


headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",
}

payload = {
    "messaging_product": "whatsapp",
    "name": "hello_personalized",
    "language": "en_US",
    "category": "UTILITY",
    "components": [
        {
            "type": "BODY",
            "text": (
                "Hi {{1}}, your account setup is complete. "
                "Please verify {{2}} to finish your profile."
            ),
            "example": {
                "body_text": [
                    ["John", "your email address"]
                ]
            },
        }
    ],
}

response = requests.post(
    url,
    headers=headers,
    json=payload,
    timeout=30,
)

print("Status:", response.status_code)
print(response.json())