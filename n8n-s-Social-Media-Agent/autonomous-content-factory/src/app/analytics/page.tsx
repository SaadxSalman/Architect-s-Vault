"use client";
import { useEffect, useState } from 'react';

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  if (!data) return <div className="p-10">Loading insights...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Performance Insights</h1>
      
      {/* Stats Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-blue-600 text-sm font-semibold">Total Impressions</p>
          <p className="text-3xl font-bold">{data.summary.totalImpressions.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-green-50 rounded-xl border border-green-100">
          <p className="text-green-600 text-sm font-semibold">Total Likes</p>
          <p className="text-3xl font-bold">{data.summary.totalLikes.toLocaleString()}</p>
        </div>
        <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
          <p className="text-purple-600 text-sm font-semibold">Posts Factory-Generated</p>
          <p className="text-3xl font-bold">{data.summary.postCount}</p>
        </div>
      </div>

      {/* Top Posts Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold">Topic / Content</th>
              <th className="p-4 font-semibold">Platform</th>
              <th className="p-4 font-semibold text-right">Engagement</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((post: any) => (
              <tr key={post._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <p className="font-medium truncate max-w-xs">{post.topic}</p>
                  <p className="text-xs text-gray-500 truncate max-w-xs">{post.contentBody}</p>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold uppercase">
                    {post.platform}
                  </span>
                </td>
                <td className="p-4 text-right font-mono text-green-600 font-bold">
                  {post.metrics.likes + post.metrics.shares} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}