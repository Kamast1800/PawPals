'use client';

import { useState, useEffect } from 'react';
import { Playdate, PlaydateReview } from '@/types/playdate';
import PlaydateReviewForm from '@/components/PlaydateReviewForm';
import StarRating from '@/components/StarRating';

// Mock data - replace with actual API calls
const mockPlaydates: Playdate[] = [
  {
    id: '1',
    date: new Date('2023-12-01'),
    location: 'Central Park',
    participants: [
      {
        id: 'user1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        pet: {
          id: 'pet1',
          name: 'Buddy',
          breed: 'Golden Retriever',
          image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb',
        },
      },
      {
        id: 'user2',
        name: 'Taylor Smith',
        email: 'taylor@example.com',
        pet: {
          id: 'pet2',
          name: 'Max',
          breed: 'Labrador',
        },
      },
    ],
    status: 'completed',
    createdAt: new Date('2023-11-28'),
    updatedAt: new Date('2023-11-28'),
  },
  // Add more mock playdates as needed
];

export default function PlaydatesPage() {
  const [playdates, setPlaydates] = useState<Playdate[]>([]);
  const [selectedPlaydate, setSelectedPlaydate] = useState<Playdate | null>(null);
  const [reviews, setReviews] = useState<Record<string, PlaydateReview[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const currentUserId = 'user1'; // Replace with actual user ID from auth context

  useEffect(() => {
    // In a real app, fetch playdates from your API
    const fetchPlaydates = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setPlaydates(mockPlaydates);
      } catch (error) {
        console.error('Failed to fetch playdates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaydates();
  }, []);

  const handleSubmitReview = async (playdateId: string, reviewData: Omit<PlaydateReview, 'id' | 'playdateId' | 'reviewerId' | 'createdAt' | 'updatedAt'>) => {
    try {
      // In a real app, submit to your API
      const newReview: PlaydateReview = {
        id: `review-${Date.now()}`,
        playdateId,
        reviewerId: currentUserId,
        revieweeId: selectedPlaydate?.participants.find(p => p.id !== currentUserId)?.id || '',
        ...reviewData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setReviews(prev => ({
        ...prev,
        [playdateId]: [...(prev[playdateId] || []), newReview],
      }));

      setSelectedPlaydate(null);
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to submit review:', error);
      return Promise.reject(error);
    }
  };

  const getOtherParticipant = (playdate: Playdate) => {
    return playdate.participants.find(p => p.id !== currentUserId);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading playdates...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Playdates</h1>
      
      <div className="space-y-6">
        {playdates.length === 0 ? (
          <p className="text-gray-500">No playdates found.</p>
        ) : (
          playdates.map(playdate => {
            const otherParticipant = getOtherParticipant(playdate);
            const playdateReviews = reviews[playdate.id] || [];
            
            return (
              <div key={playdate.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Playdate with {otherParticipant?.pet?.name || 'Pet'}
                    </h2>
                    <p className="text-gray-600">
                      {playdate.date.toLocaleDateString()} • {playdate.location}
                    </p>
                    {playdate.status === 'completed' && playdateReviews.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Your rating:</p>
                        <div className="flex items-center">
                          <StarRating rating={playdateReviews[0]?.rating || 0} readOnly size={16} />
                          <span className="ml-2 text-sm text-gray-600">
                            {playdateReviews[0]?.comment}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {playdate.status === 'completed' && playdateReviews.length === 0 && (
                    <button
                      onClick={() => setSelectedPlaydate(playdate)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                    >
                      Rate Playdate
                    </button>
                  )}
                </div>
                
                {selectedPlaydate?.id === playdate.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium mb-2">Rate your experience with {otherParticipant?.pet?.name}</h3>
                    <PlaydateReviewForm
                      playdateId={playdate.id}
                      onSubmit={(review) => handleSubmitReview(playdate.id, review)}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
