import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4 space-y-6">
      <section>
        <h1 className="text-3xl font-bold mb-2">Welcome to PawPals</h1>
        <p className="text-gray-700 mb-4">
          Match your pup with new friends, schedule playdates, and stay in touch with pet parents nearby.
        </p>
        <Link
          href="/matching"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition-colors"
        >
          Start Matching
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-4">
        <Link
          href="/matching"
          className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold mb-1">Find Matches</h2>
          <p className="text-sm text-gray-600">
            Swipe through nearby pets, see their temperament and play style, and connect when it is a match.
          </p>
        </Link>

        <Link
          href="/playdates"
          className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold mb-1">Playdates & Reviews</h2>
          <p className="text-sm text-gray-600">
            Review past playdates, leave ratings, and keep track of your dog&apos;s favorite friends.
          </p>
        </Link>

        <Link
          href="/messages"
          className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold mb-1">Messages</h2>
          <p className="text-sm text-gray-600">
            Continue the conversation with pet parents and plan your next meetup.
          </p>
        </Link>
      </section>
    </div>
  );
}
