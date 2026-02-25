import { NextResponse } from 'next/server';

export async function GET() {
  // Logic to fetch from MongoDB/OLAP
  const threats = [
    { id: 1, type: 'DDoS', severity: 'High', timestamp: new Date() }
  ];
  return NextResponse.json(threats);
}