
async function retry(fn, maxRetries) {
    let lastError;

    for(let attempt = 1; attempt <= maxRetries; attempt++){
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if(attempt == maxRetries){
                throw lastError;
            }
        }
    }
}




let attempts = 0;

async function fetchData() {
     attempts++;

  if (attempts < 3) {
    throw new Error("Network error");
  }

  return "Data loaded";
}

console.log(await retry(fetchData, 3));
// "Data loaded"