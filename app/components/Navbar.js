import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" legacyBehavior>
          <a className="text-white text-lg">Home</a>
        </Link>
        <Link href="/search" legacyBehavior>
          <a className="text-white text-lg">Search</a>
        </Link>
      </div>
    </nav>
  );
}
