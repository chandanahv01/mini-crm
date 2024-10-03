import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/User'; // Import your User model
import connectDB from '../../../utils/connectDB';
import { compare } from 'bcryptjs'; // For password comparison

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB(); // Ensure MongoDB connection

        const { username, password } = credentials;

        // Check if the user exists
        const user = await User.findOne({ username });

        console.log('Checking login for username:', username); // Log username
        console.log('Found user:', user); // Log user object

        // If no user found or password doesn't match, return null
        if (!user) {
          throw new Error('Invalid username or password');
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await compare(password, user.password);
        console.log('Password valid:', isPasswordValid); // Log if password is valid

        if (!isPasswordValid) {
          throw new Error('Invalid username or password');
        }

        // If everything is fine, return the user object
        return { id: user._id, username: user.username };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    register: '/auth/register', // Custom registration page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Pass the user ID to the session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure you have a secret set in your environment variables
});