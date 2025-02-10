import Link from 'next/link';

export default function SiteMap() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Site Map</h1>
      <ul>
        <li>
          <Link href="/add-animal">Add New Animal</Link>
        </li>
        <li>
          <Link href="/animal-profile?id=1">View Animal Profile</Link>
        </li>
        <li>
          <Link href="/animal-list">Animal List</Link>
        </li>
        {/* Add more links here as you add more pages */}
      </ul>
    </div>
  );
}
