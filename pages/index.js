import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Mini CRM</h1>
      <Link href="/create-company">Create a New Company</Link>
      <Link href="/companies">View Companies</Link>
    </div>
  );
};

export default Home;