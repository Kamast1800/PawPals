import Link from 'next/link';
import PageContainer from '../components/PageContainer';

export default function Home() {
  return (
    <PageContainer>
      <div className="py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to PawPals</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow pet lovers and find the perfect playmate for your furry friend
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Link
            href="/matching"
            className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Find Matches</h3>
              <p className="text-gray-600">Swipe to discover pets looking for new friends and find the perfect match for your pet.</p>
            </div>
          </Link>

          <Link
            href="/messages"
            className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Messages</h3>
              <p className="text-gray-600">Chat with other pet parents, share photos, and plan the perfect playdate for your pets.</p>
            </div>
          </Link>

          <Link
            href="/playdates"
            className="group block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Playdates</h3>
              <p className="text-gray-600">Schedule and manage playdates, track upcoming meetups, and connect with local pet owners.</p>
            </div>
          </Link>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl mb-6 mx-auto">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Create a Profile</h3>
              <p className="text-gray-600">Set up your pet's profile with photos and personality traits.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl mb-6 mx-auto">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Find Matches</h3>
              <p className="text-gray-600">Swipe to find other pets that match your pet's energy and play style.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-2xl mb-6 mx-auto">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connect & Play</h3>
              <p className="text-gray-600">Chat with other pet parents and schedule playdates.</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Pet's Perfect Match?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of pet parents who've already found their perfect playdates</p>
          <Link
            href="/matching"
            className="inline-block bg-white text-indigo-600 font-bold py-4 px-8 rounded-full hover:bg-gray-50 transition-colors text-lg"
          >
            Start Matching
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
