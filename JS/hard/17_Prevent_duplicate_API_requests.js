const requestCache = new Map();

async function fetchOnce(key, fetcher) {
    // If a request for this key is already running, reuse it
  if(requestCache.has(key)){
    return requestCache.get(key);
  }

  // Start the request and cache its promise
  const promise  = Promise.resolve().then(fetcher);
  
  requestCache.set(key, promise);

    // Remove failed requests so they can be retried

    promise.catch(()=>{
      if(requestCache.get(key) === promise){
        requestCache.delete(key);
      }
    })

    return promise;

}


const a = fetchOnce("user-1", fetchUser);
const b = fetchOnce("user-1", fetchUser);

const [resultA, resultB] = await Promise.all([a, b]);

// fetchUser should run only once for overlapping requests.