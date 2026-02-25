"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import dotenv from "dotenv";
import path from "path";

// 1. Point to the ROOT directory .env (one level up from /frontend)
dotenv.config({ path: path.resolve(process.cwd(), "..", ".env") });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * FIXED: The property name is 'datasources' (plural) BUT it must contain 
 * the 'db' key with the 'url' property.
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function createTaskAction(formData: FormData, workspaceId: string) {
  const title = formData.get("title") as string;
  
  // Terminal log to ensure your root .env is being read
  console.log("-----------------------------------------");
  console.log("📡 SERVER ACTION: Attempting Task Creation");
  console.log("🔑 DB URL DETECTED:", process.env.DATABASE_URL ? "YES" : "NO");
  console.log("-----------------------------------------");

  if (!title || !workspaceId) {
    return { success: false, error: "Missing title or workspace context" };
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title: title.trim(),
        status: "TODO",
        priority: "MEDIUM",
        workspaceId: workspaceId,
      },
    });

    revalidatePath("/");
    
    return { 
      success: true, 
      task: JSON.parse(JSON.stringify(newTask)) 
    };
  } catch (e: any) {
    console.error("❌ Prisma Database Error:", e.message);
    return { 
      success: false, 
      error: e.message || "Database error occurred." 
    };
  }
}