// pages/api/test-connection.js
import dbConnect from '../../utils/dbConnect';

export default async function handler(req, res) {
  try {
    // Attempt to connect to the database
    await dbConnect();
    res.status(200).json({ message: 'Database connection successful' });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error });
  }
}