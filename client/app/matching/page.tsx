'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

// Mock data - replace with actual data from your database
const pets = [
  {
    id: 1,
    name: 'Buddy',
    age: 2,
    breed: 'Golden Retriever',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    name: 'Luna',
    age: 3,
    breed: 'Siamese',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80',
  },
  // Add more pets as needed
];

export default function MatchingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentPet = pets[currentIndex];

  const handleSwipe = (dir: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(dir);
    
    // Simulate API call for like/dislike
    setTimeout(() => {
      if (currentIndex < pets.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Reset or handle end of list
        setCurrentIndex(0);
      }
      setIsAnimating(false);
    }, 300);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(-1),
    onSwipedRight: () => handleSwipe(1),
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  if (!currentPet) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No more pets to show</h2>
          <p className="text-gray-600">Check back later for more pets!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Find Your Paw Pal</h1>
      
      <div className="relative w-full max-w-md h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPet.id}
            className="absolute w-full h-full"
            initial={{ x: direction * 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 500, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            {...handlers}
          >
            <div className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${currentPet.image})` }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h2 className="text-3xl font-bold">{currentPet.name}</h2>
                  <p className="text-lg">{currentPet.breed}</p>
                  <p className="text-lg">{currentPet.age} years old</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-8 mt-8">
        <button
          onClick={() => handleSwipe(-1)}
          className="p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
          disabled={isAnimating}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button
          onClick={() => handleSwipe(1)}
          className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
          disabled={isAnimating}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
