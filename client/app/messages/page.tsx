'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Mock data - replace with actual data from your API
const mockPets = [
  { id: '1', name: 'Buddy', breed: 'Golden Retriever', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb' },
  { id: '2', name: 'Luna', breed: 'Siamese', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba' },
];

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const [showNewMatch, setShowNewMatch] = useState(false);
  const [matchedPet, setMatchedPet] = useState<{name: string, breed: string, image: string} | null>(null);

  useEffect(() => {
    // Check if we were redirected from a new match
    const newMatchId = searchParams.get('newMatch');
    if (newMatchId) {
      // In a real app, fetch the pet details from your API
      const pet = mockPets.find(p => p.id === newMatchId);
      if (pet) {
        setMatchedPet({
          name: pet.name,
          breed: pet.breed,
          image: pet.image
        });
        setShowNewMatch(true);
        
        // Remove the query param without refreshing the page
        const url = new URL(window.location.href);
        url.searchParams.delete('newMatch');
        window.history.replaceState({}, '', url);
      }
    }
  }, [searchParams]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      
      {showNewMatch && matchedPet && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden mr-3">
              <img 
                className="h-full w-full object-cover" 
                src={matchedPet.image} 
                alt={matchedPet.name} 
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-green-800">It's a match with {matchedPet.name}!</h3>
              <p className="text-sm text-green-600">Start a conversation with {matchedPet.name} the {matchedPet.breed}.</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setShowNewMatch(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Start Chatting
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {mockPets.map(pet => (
          <div key={pet.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                <img 
                  className="h-full w-full object-cover" 
                  src={pet.image} 
                  alt={pet.name} 
                />
              </div>
              <div>
                <h3 className="font-medium">{pet.name}</h3>
                <p className="text-sm text-gray-500">{pet.breed}</p>
              </div>
            </div>
          </div>
        ))}
        
        {mockPets.length === 0 && (
          <p className="text-gray-500 text-center py-8">No messages yet. Match with pets to start chatting!</p>
        )}
      </div>
    </div>
  );
}
