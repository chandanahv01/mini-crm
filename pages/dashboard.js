import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session) {
        window.location.href = '/auth/signin'; // Redirect to sign-in page if not authenticated
      } else {
        fetchCompanies(); // If authenticated, fetch companies
      }
    };
    fetchSession();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('/api/companies');
      const data = await response.json();

      if (response.ok) {
        setCompanies(data); // Set the companies in state
      } else {
        setError(data.message); // Handle any errors
      }
    } catch (err) {
      setError('Failed to fetch companies'); // Error fetching companies
    } finally {
      setLoading(false); // Loading finished
    }
  };

  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>Error: {error}</p>; // Error state

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#e3f2fd', // Light blue background
      minHeight: '100vh', // Full page height
    }}>
      <h1 style={{ color: '#1976d2', marginBottom: '20px' }}>Dashboard</h1>
      <h2>Total Companies: {companies.length}</h2>
      
      <h3>Recent Companies:</h3>
      {companies.length === 0 ? (
        <p>No companies available.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0, width: '100%', maxWidth: '600px' }}>
          {companies.slice(-5).map((company) => ( // Display the last 5 companies
            <li key={company._id} style={{
              backgroundColor: 'white', // White background for each list item
              borderRadius: '12px', // Rounded corners for the card
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Soft shadow for the card
              padding: '20px', // Padding inside the card
              marginBottom: '20px', // Space between items
            }}>
              <h4>{company.name}</h4>
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><strong>Description:</strong> {company.description}</p>
              <p><strong>Created At:</strong> {new Date(company.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;