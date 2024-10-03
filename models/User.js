import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures unique usernames
  },
  password: {
    type: String,
    required: true, // In production, you would hash the password
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// If the model already exists, use it; otherwise, create it
export default mongoose.models.User || mongoose.model('User', UserSchema);