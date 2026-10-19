/*

For 1 million email jobs, we need controlled concurrency, retries, failure tracking, and protection against duplicate emails.
1. Implementation
This implementation assumes each job has a unique id, an email payload, and a sendEmailOnce() function that supports durable idempotency.

*/



async function processJobs(jobs, concurrency) {
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    throw new Error("Concurrency must be a positive integer");
  }

  const maxAttempts = 3;
  const results = new Array(jobs.length);
  let nextIndex = 0;

  async function processOne(job) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        // Must use durable deduplication, not just an
        // in-memory Set. See the explanation below.
        await sendEmailOnce(job, {
          idempotencyKey: job.id
        });

        return {
          id: job.id,
          status: "success",
          attempts: attempt
        };
      } catch (error) {
        const isRetryable =
          error.retryable === true;

        if (!isRetryable || attempt === maxAttempts) {
          return {
            id: job.id,
            status: "failed",
            attempts: attempt,
            error: error.message
          };
        }

        // Exponential backoff: 1s, then 2s.
        const delayMs = 1000 * 2 ** (attempt - 1);

        await new Promise(resolve =>
          setTimeout(resolve, delayMs)
        );
      }
    }
  }

  async function worker() {
    while (true) {
      // Reserve a distinct index before awaiting.
      const index = nextIndex++;

      if (index >= jobs.length) return;

      results[index] = await processOne(jobs[index]);
    }
  }

  const workerCount = Math.min(concurrency, jobs.length);

  await Promise.all(
    Array.from({ length: workerCount }, () => worker())
  );

  return {
    results,
    succeeded: results.filter(
      result => result.status === "success"
    ).length,
    failed: results.filter(
      result => result.status === "failed"
    )
  };
}


const jobs = [
  { id: "email-101", to: "a@example.com" },
  { id: "email-102", to: "b@example.com" },
  { id: "email-103", to: "c@example.com" }
];

const report = await processJobs(jobs, 2);

console.log(report.succeeded);
console.log(report.failed);