# Middleware
# Middleware runs around requests and responses. It is useful for logging, timing, correlation IDs, and other cross-cutting concerns.

import time

from fastapi import FastAPI, Request

app = FastAPI()

@app.Middleware("http")
async def request_time(request: Request, call_next):
    start = time.perf_counter()
    
    respnose = await call_next(request)
    
    elapsed = time.perf_counter() - start
    respnose.headers["X-Process-Time"] = str(elapsed)
    
    return respnose
    
    
# This middleware adds a response header showing how long request processing took.
# Interview question: Middleware vs dependency injection?
# - Middleware applies around requests at the application or middleware-stack level.
# - Dependencies provide logic or resources to particular endpoints or groups of endpoints.
# - Use middleware for cross-cutting request processing and dependencies for endpoint-specific requirements.