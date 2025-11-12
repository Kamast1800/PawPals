import { HeartIcon, XMarkIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

// Mock data for dog profiles
const dogProfiles = [
  {
    id: 1,
    name: 'Max',
    age: 2,
    breed: 'Labrador Retriever',
    distance: '0.8 miles away',
    imageUrl: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    name: 'Bella',
    age: 4,
    breed: 'Australian Shepherd',
    distance: '1.2 miles away',
    imageUrl: 'https://images.unsplash.com/photo-1518020382113-a7d8fb8271f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    name: 'Charlie',
    age: 3,
    breed: 'Beagle',
    distance: '0.5 miles away',
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
];

export default function DiscoverPage() {
  return (
    <div className="max-w-md mx-auto bg-white">
      <div className="relative h-[600px] overflow-hidden rounded-xl shadow">
        {/* Current profile card */}
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src={dogProfiles[0].imageUrl}
            alt={`${dogProfiles[0].name} the ${dogProfiles[0].breed}`}
          />
          
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{dogProfiles[0].name}, {dogProfiles[0].age}</h2>
                  <p className="text-lg">{dogProfiles[0].breed}</p>
                </div>
                <button
                  type="button"
                  className="rounded-full p-2 bg-white/20 hover:bg-white/30"
                  aria-label="View full profile"
                >
                  <ArrowsPointingOutIcon className="h-6 w-6" />
                </button>
              </div>
              <p className="mt-2 text-sm opacity-90">{dogProfiles[0].distance}</p>
              
              {/* Action buttons */}
              <div className="mt-6 flex justify-center space-x-8">
                <button
                  type="button"
                  className="rounded-full p-3 bg-white/20 hover:bg-red-500/30"
                  aria-label="Dislike"
                >
                  <XMarkIcon className="h-8 w-8 text-white" />
                </button>
                <button
                  type="button"
                  className="rounded-full p-3 bg-white/20 hover:bg-green-500/30"
                  aria-label="Like"
                >
                  <HeartIcon className="h-8 w-8 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Next profile preview (peeking from the side) */}
        <div className="absolute right-4 top-4 h-5/6 w-5/6 rounded-xl overflow-hidden shadow-xl transform translate-x-2 -translate-y-2">
          <img
            className="h-full w-full object-cover"
            src={dogProfiles[1].imageUrl}
            alt={`${dogProfiles[1].name} the ${dogProfiles[1].breed}`}
          />
        </div>
      </div>
      
      {/* Filter and settings */}
      <div className="mt-4 flex justify-between px-2">
        <button
          type="button"
          className="p-2 text-gray-500 hover:text-gray-700"
          aria-label="Filter"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
        
        <div className="flex space-x-4">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Settings"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Messages"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
