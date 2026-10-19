/*

1. Why could this code cause a memory leak?

const cache = new Map();
app.get("/users/:id", async (req, res) => {
  const user = await getUser(req.params.id);

  cache.set(req.params.id, user);

  res.json(user);
});
*/

// The problem is that the Map keeps references to every cached user, and nothing removes them.
// After several hours, thousands or millions of user objects might remain in memory.
// Normally, JavaScript's garbage collector removes objects that are no longer reachable. 
// But cached users are still reachable through cache, so the garbage collector cannot free them.

//Important interview distinction: This is potentially an unbounded cache, which can cause memory exhaustion. 
// A memory leak more generally means memory remains retained when the application no longer needs it.

//2. Solution: Limit cache growth with LRU eviction
// A practical solution is an LRU cache (Least Recently Used) with a maximum number of entries.

class LRUCache {
    constructor(maxSize = 1000) {
        this.maxSize = maxSize;
        this.cache = new Map();
    }

    set(key, value) {
        // Refresh an existing entry.
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        // Evict the least recently used entry.
        if (this.cache.size >= this.maxSize) {
            const oldKey = this.cache.keys().next().value;
            this.cache.delete(oldKey);
        }

        // Add to cache
        this.cache.set(key, value);
    }
}

const cache = new LRUCache(1000);


app.get("/users/:id", async (req, res) => {
    const id = req.params.id;

    let user = cache.get(id);

    if(user === undefined){
        user = await getUser(id);
        cache.set(id,user);
    }

    res.json(user);
});