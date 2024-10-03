import { useState } from 'react';
import { signIn } from 'next-auth/react'; // Import signIn
import { useRouter } from 'next/router';
import Link from 'next/link';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sign in using NextAuth
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      setError(result.error); // Show error if sign-in fails
    } else {
      // Redirect to Create Company page after successful sign-in
      router.push('/create-company');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f4f8' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', width: '300px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Sign In
          </button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link href="/auth/register" style={{ color: '#1976d2', textDecoration: 'underline' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;