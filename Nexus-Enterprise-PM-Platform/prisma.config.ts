import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Manually load the .env file from the current directory
dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});