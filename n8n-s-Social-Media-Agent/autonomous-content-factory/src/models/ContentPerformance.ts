import mongoose, { Schema, Document } from 'mongoose';

export interface IContentPerformance extends Document {
  topic: string;
  platform: 'Twitter' | 'LinkedIn' | 'Instagram' | 'Facebook';
  contentBody: string;
  mediaUrl?: string;
  status: 'draft' | 'scheduled' | 'published';
  postId: string; // The ID returned by the social media API (e.g., Buffer ID)
  metrics: {
    impressions: number;
    likes: number;
    shares: number;
    comments: number;
    engagementRate: number;
  };
  scheduledAt: Date;
  publishedAt?: Date;
  lastUpdated: Date;
}

const PerformanceSchema: Schema = new Schema({
  topic: { type: String, required: true },
  platform: { type: String, required: true, enum: ['Twitter', 'LinkedIn', 'Instagram', 'Facebook'] },
  contentBody: { type: String, required: true },
  mediaUrl: { type: String },
  status: { type: String, default: 'draft' },
  postId: { type: String, unique: true },
  metrics: {
    impressions: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    engagementRate: { type: Number, default: 0 },
  },
  scheduledAt: { type: Date },
  publishedAt: { type: Date },
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.models.ContentPerformance || 
       mongoose.model<IContentPerformance>('ContentPerformance', PerformanceSchema);