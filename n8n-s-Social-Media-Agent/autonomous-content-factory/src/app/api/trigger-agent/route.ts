import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { topic, platforms } = await req.json();

  try {
    // This triggers the 'Webhook' node in your n8n workflow
    const response = await axios.post(process.env.N8N_WEBHOOK_URL!, {
      topic,
      platforms,
      timestamp: new Date()
    });

    return NextResponse.json({ message: "Workflow started", data: response.data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to trigger n8n" }, { status: 500 });
  }
}