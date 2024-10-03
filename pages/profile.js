import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession(); // Check if user is authenticated
      if (!session) {
        router.push('/auth/signin'); // Redirect to sign-in page if not authenticated
      } else {
        setUser(session.user); // Set user data
        setUsername(session.user.username); // Set username for the form
      }
    };
    fetchSession();
  }, [router]);

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Sign out the user without redirecting immediately
    router.push('/auth/signin'); // Redirect to sign-in page after logging out
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Send a request to update user info (add API for this)
      const response = await fetch('/api/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      if (response.ok) {
        // Handle successful update
        setUser(data.user); // Update user state with the new data
        setError('User info updated successfully!');
      } else {
        setError(data.message || 'Error updating user info');
      }
    } catch (error) {
      setError('Error updating user info');
    }
  };

  if (!user) return <p>Loading...</p>; // Loading state

  return (
    <div>
      <Head>
        <title>User Profile</title>
      </Head>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          padding: '40px',
          width: '300px',
        }}>
          <h1 style={{ textAlign: 'center', color: '#1976d2' }}>User Profile</h1>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <form onSubmit={handleUpdate}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  margin: '10px 0',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                }}
              />
            </div>
            {/* Add more fields as needed (e.g., email) */}
            <button type="submit" style={{
              marginTop: '20px',
              width: '100%',
              padding: '10px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
              Update Profile
            </button>
          </form>
          <button onClick={handleLogout} style={{
            marginTop: '20px',
            width: '100%',
            padding: '10px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;