import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EditCompany = () => {
  const router = useRouter();
  const { id } = router.query; // Get the company ID from the URL
  const [company, setCompany] = useState({ name: '', industry: '', description: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchCompany = async () => {
        try {
          const response = await fetch(`/api/companies?id=${id}`);
          const data = await response.json();

          if (response.ok) {
            setCompany(data); // Set company data for editing
          } else {
            setMessage(data.message); // Handle errors
          }
        } catch (err) {
          setMessage('Failed to fetch company details');
        } finally {
          setLoading(false); // Loading finished
        }
      };
      fetchCompany();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value })); // Update company state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/companies?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(company), // Send updated company data
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Company updated successfully!');
      // Optionally redirect back to companies list
      setTimeout(() => {
        router.push('/companies'); // Redirect after a short delay
      }, 2000);
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  if (loading) return <p>Loading...</p>; // Loading state

  return (
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
        width: '400px',
      }}>
        <h1 style={{ textAlign: 'center', color: '#1976d2' }}>Edit Company</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={company.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' }}
          />
          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={company.industry}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px' }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={company.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px', height: '100px' }}
          />
          <button
            type="submit"
            style={{ width: '100%', padding: '10px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Update Company
          </button>
        </form>
        {message && <p style={{ textAlign: 'center', marginTop: '10px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default EditCompany;