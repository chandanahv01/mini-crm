import { useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react'; // Import signOut
import Link from 'next/link';

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession(); // Check if user is authenticated
      if (!session) {
        window.location.href = '/auth/signin'; // Redirect to sign-in page if not authenticated
      } else {
        fetchCompanies(); // If authenticated, fetch companies
      }
    };
    fetchSession(); // Call the session check function
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

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Sign out the user without redirecting immediately
    window.location.href = '/auth/signin'; // Redirect to sign-in page after logging out
  };

  const handleDelete = async (id) => {
    // Implement delete functionality here
    console.log('Delete company with id:', id); // Placeholder for delete logic
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
      <h1 style={{ color: '#1976d2', marginBottom: '20px' }}>List of Companies</h1>

      {/* Link to Dashboard Page */}
      <Link href="/dashboard" style={{
        marginBottom: '20px',
        padding: '10px 15px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}>
        Dashboard
      </Link>

      {/* Logout Button */}
      <button onClick={handleLogout} style={{
        marginBottom: '20px',
        padding: '10px 15px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}>
        Logout
      </button>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search by name or industry..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
        style={{
          width: '100%', 
          maxWidth: '400px', 
          padding: '10px', 
          marginBottom: '20px', 
          border: '1px solid #ccc', 
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      />

      {filteredCompanies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0, width: '100%', maxWidth: '600px' }}>
          {filteredCompanies.map((company) => (
            <li key={company._id} style={{
              backgroundColor: 'white', // White background for each list item
              borderRadius: '12px', // Rounded corners for the card
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Soft shadow for the card
              padding: '20px', // Padding inside the card
              marginBottom: '20px', // Space between items
              transition: 'transform 0.3s, box-shadow 0.3s', // Smooth hover effects
            }}>
              <h2 style={{ color: '#1976d2', marginBottom: '10px' }}>
                <Link href={`/company/${company._id}`}>
                  {company.name}
                </Link>
              </h2>
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><strong>Description:</strong> {company.description}</p>
              {/* Edit Button */}
              <Link href={`/edit-company/${company._id}`}>
                <button style={{
                  marginRight: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}>
                  Edit
                </button>
              </Link>
              {/* Delete Button */}
              <button 
                onClick={() => handleDelete(company._id)} 
                style={{
                  padding: '5px 10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompaniesList;