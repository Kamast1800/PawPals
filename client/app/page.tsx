import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome to PawPals</h1>
        <p className="text-gray-700">Find your perfect pet match today!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        <Link
          href="/matching"
          className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-center shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="font-semibold mb-1">Match</div>
          <div className="text-xs text-gray-600">Swipe to find new play pals</div>
        </Link>

        <Link
          href="/messages"
          className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-center shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="font-semibold mb-1">Messages</div>
          <div className="text-xs text-gray-600">Chat with other pet parents</div>
        </Link>

        <Link
          href="/playdates"
          className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-center shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="font-semibold mb-1">Playdates</div>
          <div className="text-xs text-gray-600">Review and schedule meetups</div>
        </Link>
      </div>
    </div>
  );
}
