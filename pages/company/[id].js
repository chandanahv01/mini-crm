import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CompanyDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the company ID from the URL
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchCompany = async () => {
        try {
          const response = await fetch(`/api/companies?id=${id}`);
          const data = await response.json();

          if (response.ok) {
            setCompany(data); // Set the company data
          } else {
            setError(data.message); // Handle errors
          }
        } catch (err) {
          setError('Failed to fetch company details'); // Error fetching details
        } finally {
          setLoading(false); // Loading finished
        }
      };
      fetchCompany(); // Fetch the company details
    }
  }, [id]);

  if (loading) return <p>Loading...</p>; // Loading state
  if (error) return <p>Error: {error}</p>; // Error state

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h1 style={{ color: '#1976d2' }}>{company.name}</h1>
      <p><strong>Industry:</strong> {company.industry}</p>
      <p><strong>Description:</strong> {company.description}</p>
      <p><strong>Created At:</strong> {new Date(company.createdAt).toLocaleDateString()}</p> {/* Creation date */}
      <div style={{ marginTop: '20px' }}>
        <Link href={`/edit-company/${company._id}`}>
          <button style={{ padding: '10px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Edit Company
          </button>
        </Link>
        <Link href="/companies">
          <button style={{ marginLeft: '10px', padding: '10px', backgroundColor: '#757575', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Back to Companies List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyDetail;