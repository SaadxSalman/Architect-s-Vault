import { parentPort, workerData } from 'worker_threads';

// Recursive Fibonacci is O(2^n) - intentionally slow for demonstration
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(workerData.n);

// Send the result back to the main thread
parentPort.postMessage(result);