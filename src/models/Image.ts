import mongoose, { Document, Schema } from 'mongoose';

export interface IImage extends Document {
  url: string;
  category: string;
  tags: string[];
  source: 'upload' | 'generated';
  userId: string;
  createdAt: Date;
}

const ImageSchema = new Schema<IImage>(
  {
    url: { type: String, required: true },
    category: { type: String, default: 'other' },
    tags: [{ type: String }],
    source: { 
      type: String, 
      enum: ['upload', 'generated'], 
      required: true 
    },
    userId: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);