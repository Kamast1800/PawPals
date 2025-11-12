import { CalendarIcon, MapPinIcon, ClockIcon, UserCircleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

// Mock data for playdates
const upcomingPlaydates = [
  {
    id: 1,
    title: 'Park Playdate',
    date: '2023-06-15',
    time: '10:00 AM - 12:00 PM',
    location: 'Central Park',
    address: '123 Park Ave, New York, NY',
    with: 'Max & Bella',
    status: 'confirmed',
    avatar: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 2,
    title: 'Beach Day',
    date: '2023-06-20',
    time: '2:00 PM - 4:00 PM',
    location: 'Sunny Beach',
    address: '456 Ocean Drive, Malibu, CA',
    with: 'Charlie & Daisy',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 3,
    title: 'Neighborhood Walk',
    date: '2023-06-25',
    time: '4:00 PM - 5:00 PM',
    location: 'Local Park',
    address: '789 Main St, Anytown, USA',
    with: 'Luna & Cooper',
    status: 'confirmed',
    avatar: 'https://images.unsplash.com/photo-1583511655826-057004d788d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
];

// Mock data for past playdates
const pastPlaydates = [
  {
    id: 4,
    title: 'Morning Playdate',
    date: '2023-06-01',
    time: '9:00 AM - 11:00 AM',
    location: 'Dog Park',
    with: 'Rocky',
    status: 'completed',
    avatar: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
];

export default function SchedulePage() {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Playdate Schedule</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your upcoming and past playdates</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            + New Playdate
          </button>
        </div>

        <div className="space-y-8">
          {/* Upcoming Playdates */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Playdates</h2>
            {upcomingPlaydates.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {upcomingPlaydates.map((playdate) => (
                    <li key={playdate.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={playdate.avatar}
                              alt={playdate.with}
                            />
                            <div className="ml-4">
                              <p className="text-sm font-medium text-indigo-600">{playdate.title}</p>
                              <p className="text-sm text-gray-500">with {playdate.with}</p>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            {playdate.status === 'confirmed' ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Confirmed
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {new Date(playdate.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {playdate.time}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="flex items-center text-sm text-gray-500">
                            <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {playdate.location}
                          </p>
                        </div>
                        <div className="mt-4 flex space-x-3">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span>View Details</span>
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center bg-white py-12 rounded-lg border-2 border-dashed border-gray-300">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming playdates</h3>
                <p className="mt-1 text-sm text-gray-500">Schedule a new playdate to get started.</p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    + New Playdate
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Past Playdates */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Past Playdates</h2>
            {pastPlaydates.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {pastPlaydates.map((playdate) => (
                    <li key={playdate.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={playdate.avatar}
                              alt={playdate.with}
                            />
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">{playdate.title}</p>
                              <p className="text-sm text-gray-500">with {playdate.with}</p>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Completed
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {new Date(playdate.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {playdate.time}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-3">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span>View Details</span>
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span>Leave a Review</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center bg-white py-12 rounded-lg border-2 border-dashed border-gray-300">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No past playdates</h3>
                <p className="mt-1 text-sm text-gray-500">Your completed playdates will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
