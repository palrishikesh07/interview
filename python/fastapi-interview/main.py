from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()

@app.get("/")
def home():
    return {"message":"Hello, FastAPI!"}


class UserResponse(BaseModel):
    id:int
    name:str
    
@app.get("/users/{user_id}",response_model = UserResponse)
def get_user(user_id:int):
    return {
        "id":user_id,
        "name":"Raj",
        "password":"122"
    }

class UserCreate(BaseModel):
    name: str = Field(min_length=2,max_length=50)
    age: int = Field(ge=18, le=100)
    email: str


    
@app.post("/users",status_code=201)
def create_user(users: UserCreate):
    return {
        "message":"User created",
        "password":"123456",
        "user":{
            "name":users.name,
            "age":users.age,
            "email":users.email,
            "password":"123456"
        }
    }







# "FastAPI provides high performance, automatic request validation, type-hint support, dependency injection, asynchronous endpoint support, and automatically generated OpenAPI documentation. It helps developers build maintainable APIs with less boilerplate."

#Interview question: Why use response_model?
#It validates and documents the response structure and filters output to the declared schema. This is useful for maintaining consistent API contracts and avoiding accidental disclosure of fields.