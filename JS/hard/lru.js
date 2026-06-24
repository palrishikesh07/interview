// class LRUCache {
//     constructor(capacity) {
//         this.capacity = capacity;
//         this.head = null;
//         this.tail = null;// LRU (Least Recently Used) 
//         // HashMap
//         this.map = new Map(); // <key>:<Node address>

//     }

//     get(key) {

//     }

//     put(key, value) {

//     }
// }




class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }

        const value = this.cache.get(key);

        // Move key to the end (most recently used)
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        this.cache.set(key, value);

        // Remove least recently used item
        if (this.cache.size > this.capacity) {
            // console.log("key"+ this.cache.keys());
            // console.log("value:" + this.cache.keys().next().value);
            const lruKey = this.cache.keys().next().value;
            this.cache.delete(lruKey);
        }
    }
}

// Example
const lru = new LRUCache(2);

lru.put(1, 10);
lru.put(2, 20);

console.log(lru.get(1)); // 10

lru.put(3, 30); // Removes key 2

console.log(lru.get(2)); // -1
console.log(lru.get(3)); // 30