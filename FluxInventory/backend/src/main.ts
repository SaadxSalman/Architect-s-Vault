import { app, BrowserWindow } from 'electron';
import { createIPCHandler } from 'electron-trpc/main';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import path from 'path';

// 1. Initialize tRPC
const t = initTRPC.create();
const appRouter = t.router({
  getHardwareStatus: t.procedure.query(() => {
    return { status: "Online", printer: "Ready", scanner: "Idle" };
  }),
  saveLocalLog: t.procedure.input(z.string()).mutation(({ input }) => {
    console.log("Local FS Write:", input);
    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;

// 2. Electron Lifecycle
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Create tRPC IPC handler
  createIPCHandler({ router: appRouter, windows: [win] });

  win.loadURL('http://localhost:3000'); 
}

app.whenReady().then(createWindow);