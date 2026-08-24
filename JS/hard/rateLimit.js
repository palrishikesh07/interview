class RateLimiter {

    constructor(limit, windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.request = [];
    }

    allowRequest() {
        const now = Date.now();
        //Remove expired request
        this.request = this.request.filter(time => now - time < this.windowMs);
        // Reject the request if exceed
        if (this.request.length >= this.limit) {
            return false;
        }
        this.request.push(now);
        return true;
    }
}

// const limiter = new RateLimiter(4,5000);

// console.log(limiter.allowRequest()); 
// console.log(limiter.allowRequest()); 
// console.log(limiter.allowRequest()); 
// console.log(limiter.allowRequest()); 
// console.log(limiter.allowRequest()); 
// setTimeout(() => {
//     console.log(limiter.allowRequest()); 
//     console.log(limiter.allowRequest()); 
// }, 5000);

// console.log(limiter.allowRequest()); 




class UserRateLimiter {
    constructor(limit, windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.users = new Map();
    }


    allow(userId) {

        const now = Date.now();

        if (!this.users.has(userId)) {
            this.users.set(userId, []);
        }

        const timestamps = this.users.get(userId);

        while ( timestamps.length && now - timestamps[0] > this.windowMs) {
            timestamps.shift();
        }

        if (timestamps.length >= this.limit) {
            return false;
        }

        timestamps.push(now);
        
        console.log(JSON.stringify(timestamps))
        return true;
    }
}

const userLimiter = new UserRateLimiter(5, 600);

console.log(userLimiter.allow("user1"));
console.log(userLimiter.allow("user1"));
console.log(userLimiter.allow("user1"));
console.log(userLimiter.allow("user1"));
console.log(userLimiter.allow("user1"));
console.log(userLimiter.allow("user1"));