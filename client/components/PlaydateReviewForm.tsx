'use client';

import { useState } from 'react';
import StarRating from './StarRating';

type PlaydateReview = {
  rating: number;
  comment: string;
  playdateId: string;
};

type PlaydateReviewFormProps = {
  playdateId: string;
  onSubmit: (review: Omit<PlaydateReview, 'playdateId'>) => Promise<void>;
};

export default function PlaydateReviewForm({ playdateId, onSubmit }: PlaydateReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return; // Require a rating
    
    setIsSubmitting(true);
    try {
      await onSubmit({ rating, comment });
      // Reset form after successful submission
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium">Rate this playdate</h3>
      
      <div>
        <StarRating 
          rating={rating} 
          setRating={setRating}
          readOnly={false}
          size={32}
        />
      </div>
      
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Leave a comment (optional)
        </label>
        <textarea
          id="comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="How was the playdate?"
        />
      </div>
      
      <button
        type="submit"
        disabled={rating === 0 || isSubmitting}
        className={`px-4 py-2 rounded-md text-white font-medium ${
          rating === 0 || isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
