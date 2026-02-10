import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // During development, load Next.js local server
  mainWindow.loadURL('http://localhost:3000');
}

// IPC Listener for "Hardware" actions
ipcMain.handle('print-document', async (event, content) => {
  console.log(`Sending to Printer: ${content}`);
  // Here you would use a library like 'node-printer' or 'escpos'
  return { success: true, message: 'Print job sent' };
});

app.whenReady().then(createWindow);