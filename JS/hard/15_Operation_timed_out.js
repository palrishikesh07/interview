async function executeWithTimeout(promise, timeout) {
  let timerId;

  const timeOutPromise = new Promise((_, reject) => {
    timerId = setTimeout(() => {
        reject(new Error("Operation timed out"))
    },
      timeout
    );
  });

  try {
    return await Promise.race([promise, timeOutPromise]);
  } finally {
    clearTimeout(timerId);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



await executeWithTimeout(
  delay(5000).then(() => "Success"),
  2000
).then(console.log)
.catch(error => console.error(error.message));

// Expected: reject with "Operation timed out"