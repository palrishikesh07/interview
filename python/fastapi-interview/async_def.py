# A. async def vs def
# You may be asked this because Python's asynchronous programming model is important in FastAPI.
import asyncio
from fastapi import FastAPI,Depends, Header, HTTPException

app = FastAPI()

@app.get("/async-example")
async def async_example():
    await asyncio.sleep(1)
    return {
        "message":"Completed"
    }
    
@app.get("/normal-example")
def normal_example():
    return {"message":"Completed"}


# async def defines a coroutine function.
# await lets the coroutine suspend while waiting for an asynchronous operation, allowing the event loop to run other tasks.
# Normal def functions used as path operations are run in an external thread pool by FastAPI.

# Scenario: An endpoint waits for an external API response. Should you use async def?
# Use async def if the HTTP client supports asynchronous I/O, such as httpx.AsyncClient. Merely changing def to async def doesn't make blocking code asynchronous. Avoid blocking operations inside the event loop.



#B. Dependency injection
#FastAPI uses Depends() to provide shared logic, such as authentication, database sessions, or configuration.

def get_current_user(x_user_id:int | None = Header(default=None)):
    if x_user_id is None:
        raise HTTPException(status_code=401, detail = "Authentication required")
    return {"id":x_user_id}

@app.get("/profile")
def get_profile(user=Depends(get_current_user)):
    return user