import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ContentPerformance from '@/models/ContentPerformance';

export async function GET() {
  try {
    await connectDB();

    // Fetch posts, sorting by a combination of likes and shares
    const topPosts = await ContentPerformance.find({ status: 'published' })
      .sort({ 'metrics.likes': -1, 'metrics.shares': -1 })
      .limit(10)
      .lean();

    // Optional: Calculate aggregate stats for the dashboard header
    const totalStats = await ContentPerformance.aggregate([
      {
        $group: {
          _id: null,
          totalLikes: { $sum: "$metrics.likes" },
          totalImpressions: { $sum: "$metrics.impressions" },
          postCount: { $sum: 1 }
        }
      }
    ]);

    return NextResponse.json({
      success: true,
      data: topPosts,
      summary: totalStats[0] || { totalLikes: 0, totalImpressions: 0, postCount: 0 }
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}