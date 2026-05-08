import mongoose, { Document, Schema } from 'mongoose';

export interface IPastor extends Document {
  name: string;
  position: string;
  bio: string;
  image: string;
  isLead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PastorSchema = new Schema<IPastor>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    bio: { type: String, default: '' },
    image: { type: String, default: '' },
    isLead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export interface IChurch extends Document {
  name: string;
  location: string;
  pastor: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChurchSchema = new Schema<IChurch>(
  {
    name: { type: String, required: true },
    location: { type: String, default: '' },
    pastor: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export interface IHistory extends Document {
  year: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const HistorySchema = new Schema<IHistory>(
  {
    year: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export interface IGallery extends Document {
  title: string;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    image: { type: String, default: '' },
    category: { type: String, default: 'general' },
  },
  { timestamps: true }
);

export interface IAdmin extends Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const Pastor = mongoose.models.Pastor || mongoose.model<IPastor>('Pastor', PastorSchema);
export const Church = mongoose.models.Church || mongoose.model<IChurch>('Church', ChurchSchema);
export const History = mongoose.models.History || mongoose.model<IHistory>('History', HistorySchema);
export const Gallery = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);