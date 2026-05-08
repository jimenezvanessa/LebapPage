import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jimenezvanessac27_db_user:TP3QfTmedlXiH6X5@cluster0.hmsjhad.mongodb.net/?appName=Cluster0';

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  
  const admins = [
    { username: 'pastor_ezzard', password: 'LEBC2024!' },
    { username: 'admin_vanessa', password: 'LEBC2024!' },
  ];

  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    try {
      await Admin.create({ username: admin.username, password: hashedPassword });
      console.log(`Created: ${admin.username}`);
    } catch (error: any) {
      if (error.code === 11000) {
        console.log(`Already exists: ${admin.username}`);
      } else {
        console.error(`Error creating ${admin.username}:`, error.message);
      }
    }
  }

  await mongoose.disconnect();
  console.log('Done!');
}

seed();