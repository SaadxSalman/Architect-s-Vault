import { createClient } from '@supabase/supabase-js';
import { app } from 'electron';
import path from 'path';
import fs from 'fs/promises';

// Initialize Supabase for the Backend (Service Role for bypass RLS if needed)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const HardwareBridge = {
  // 1. Hardware Interaction (Printers/Scanners)
  async printReceipt(content: string) {
    console.log(`Sending to System Printer: ${content}`);
    // In production, you'd use 'node-printer' or 'usb' library here
    return { success: true, timestamp: new Date().toISOString() };
  },

  // 2. Offline Mode: Local File System Logging
  async saveToLocalCache(data: any) {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, 'offline_cache.json');
    
    try {
      let existingData = [];
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        existingData = JSON.parse(fileContent);
      } catch (e) { /* File doesn't exist yet */ }

      existingData.push({ ...data, id: Date.now() });
      await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
      return { status: 'cached_locally' };
    } catch (error) {
      console.error('Local Write Error:', error);
      throw new Error('Failed to save locally');
    }
  },

  // 3. Supabase Sync Logic
  async syncLocalToCloud() {
    const userDataPath = app.getPath('userData');
    const filePath = path.join(userDataPath, 'offline_cache.json');

    try {
      const data = await fs.readFile(filePath, 'utf-8');
      const records = JSON.parse(data);

      if (records.length > 0) {
        const { error } = await supabase.from('transaction_logs').insert(records);
        if (!error) {
          await fs.writeFile(filePath, '[]'); // Clear cache after successful sync
          return { synced: records.length };
        }
      }
      return { synced: 0 };
    } catch (error) {
      return { error: 'Sync failed or no data' };
    }
  }
};