"use server";

// Path is relative to this file: up 3 levels to root, then into native
const native = require('../../../native/index.js');

export async function runRustBenchmarkAction(data: string, key: string) {
  try {
    // Run 100 iterations on the server to match JS count
    for (let i = 0; i < 100; i++) {
      native.encryptRust(data, key);
    }
    return { success: true };
  } catch (error) {
    console.error("Rust Bridge Error:", error);
    return { success: false };
  }
}