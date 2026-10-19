from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

users={}
next_id=1


class UserCreate(BaseModel):
    name:str
    
@app.post("/users",status_code=201)
def create_user(user:UserCreate):
    global next_id
    
    user_id = next_id
    next_id +=1
    
    users[user_id]={
        "id":user_id,
        "name":user.name
    }
    
    return users[user_id]

@app.get("/users")
def get_users():
    return list(users.values())


@app.get("/users/{user_id}")
def get_user(user_id:int):
    user = users.get(user_id)
    
    if user is None:
        raise HTTPException(404,"User not found")
    
    return user

@app.delete("/users/{user_id}",status_code:204)
def delete_user(user_id:int):
    if user_id not in users:
        raise HTTPException(404,"User not found")
    
    del users[user_id]
    