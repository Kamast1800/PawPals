'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  setRating?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
};

export default function StarRating({ 
  rating, 
  setRating, 
  readOnly = false, 
  size = 24 
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => !readOnly && setRating?.(currentRating)}
              className="hidden"
              disabled={readOnly}
            />
            <Star
              className={`${!readOnly ? 'cursor-pointer' : ''}`}
              size={size}
              color={currentRating <= (hover || rating) ? "#fbbf24" : "#e5e7eb"}
              fill={currentRating <= (hover || rating) ? "#fbbf24" : "none"}
              onMouseEnter={() => !readOnly && setHover(currentRating)}
              onMouseLeave={() => !readOnly && setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
