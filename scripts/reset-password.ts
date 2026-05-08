import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jimenezvanessac27_db_user:TP3QfTmedlXiH6X5@cluster0.hmsjhad.mongodb.net/?appName=Cluster0';

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function reset() {
  await mongoose.connect(MONGODB_URI);
  
  const password = 'LEBC2024';
  const hashed = await bcrypt.hash(password, 10);
  
  await Admin.updateOne({ username: 'pastor_ezzard' }, { password: hashed });
  await Admin.updateOne({ username: 'admin_vanessa' }, { password: hashed });
  
  console.log('Passwords reset to: LEBC2024');
  
  await mongoose.disconnect();
}

reset();