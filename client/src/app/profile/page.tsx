import { PencilIcon } from '@heroicons/react/24/outline';

export default function ProfilePage() {
  // Mock data - in a real app, this would come from your API/state management
  const dogProfile = {
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    size: 'Large',
    energyLevel: 'High',
    bio: 'Friendly and playful golden who loves fetch and making new friends!',
    location: 'San Francisco, CA',
    playStyle: ['Fetch', 'Tug-of-war', 'Running'],
    imageUrl: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {dogProfile.name}'s Profile
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4
          ">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-24 w-24 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={dogProfile.imageUrl}
                  alt={`${dogProfile.name} the ${dogProfile.breed}`}
                />
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {dogProfile.name}, {dogProfile.age} years old
                </h3>
                <p className="text-sm text-gray-500">{dogProfile.breed} • {dogProfile.size}</p>
                <p className="mt-1 text-sm text-gray-500">{dogProfile.location}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Energy Level</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: dogProfile.energyLevel === 'High' ? '80%' : dogProfile.energyLevel === 'Medium' ? '50%' : '30%' }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{dogProfile.energyLevel}</p>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Favorite Activities</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <div className="flex flex-wrap gap-2">
                    {dogProfile.playStyle.map((activity) => (
                      <span key={activity} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {activity}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">About {dogProfile.name}</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {dogProfile.bio}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Playdate Preferences
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Preferred Playmates</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  All sizes, but especially other high-energy dogs
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Favorite Locations</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Golden Gate Park, Crissy Field, Fort Funston
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Availability</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Weekends and weekday afternoons
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
