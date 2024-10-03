import connectDB from '../../../utils/connectDB';
import User from '../../../models/User';

export default async function handler(req, res) {
  await connectDB(); // Connect to MongoDB

  if (req.method === 'PUT') {
    const { username } = req.body;
    
    // Assume user session or ID is available to identify the user (you can pass the user ID in the session)
    const userId = req.session.user.id; // Modify according to how you manage user sessions

    try {
      // Update the user info
      const updatedUser = await User.findByIdAndUpdate(userId, { username }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ user: updatedUser });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}