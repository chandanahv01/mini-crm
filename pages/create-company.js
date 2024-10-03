import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react'; // Import getSession
import { useRouter } from 'next/router';

const CreateCompany = () => {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession(); // Check if user is authenticated
      if (!session) {
        // Redirect to sign-in page if not authenticated
        window.location.href = '/auth/signin';
      }
    };
    fetchSession(); // Call the session check function
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, industry, description }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Company created successfully!');
      setTimeout(() => {
        router.push('/companies'); // Redirect after a short delay
      }, 2000);
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8', // Light blue background
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        padding: '40px',
        width: '400px',
      }}>
        <h1 style={{ textAlign: 'center', color: '#1976d2' }}>Create a New Company</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter company name"
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>
          <div>
            <label htmlFor="industry">Industry</label>
            <input
              id="industry"
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              required
              placeholder="Enter industry"
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter description"
              style={{
                width: '100%',
                padding: '10px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '5px',
                height: '100px',
              }}
            />
          </div>
          <button type="submit" style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
            Create Company
          </button>
        </form>
        {message && <p style={{ textAlign: 'center', marginTop: '10px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default CreateCompany;