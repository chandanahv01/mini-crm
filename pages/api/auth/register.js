import connectDB from '../../../utils/connectDB';
import User from '../../../models/User';
import { hash } from 'bcryptjs'; // For hashing passwords

export default async function handler(req, res) {
  await connectDB(); // Connect to MongoDB

  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before saving
      const hashedPassword = await hash(password, 10);

      // Create a new user and save to the database
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}