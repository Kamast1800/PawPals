'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

// Types for pet data
type PetTemperament = 'Friendly' | 'Energetic' | 'Calm' | 'Shy' | 'Playful' | 'Independent' | 'Affectionate' | 'Intelligent';
type PetBehavior = 'Good with kids' | 'Good with other dogs' | 'Good with cats' | 'House trained' | 'Leash trained';

interface Pet {
  id: number;
  name: string;
  age: number;
  breed: string;
  image: string;
  weight: string;
  gender: string;
  location: string;
  description: string;
  temperament: PetTemperament[];
  behaviors: PetBehavior[];
  medical: {
    isVaccinated: boolean;
    isNeutered: boolean;
    medicalNotes: string[];
  };
}

// Mock data - replace with actual data from your database
const pets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    age: 2,
    breed: 'Golden Retriever',
    weight: '65 lbs',
    gender: 'Male',
    location: 'Seattle, WA',
    description: 'Buddy is a friendly and energetic companion who loves long walks and cuddles.',
    temperament: ['Friendly', 'Energetic', 'Affectionate'],
    behaviors: ['Good with kids', 'Good with other dogs', 'House trained', 'Leash trained'],
    medical: {
      isVaccinated: true,
      isNeutered: true,
      medicalNotes: ['Up to date on all shots', 'Microchipped']
    },
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    name: 'Luna',
    age: 3,
    breed: 'Siamese',
    weight: '8 lbs',
    gender: 'Female',
    location: 'Portland, OR',
    description: 'Luna is a gentle and independent cat who enjoys sunny spots and quiet evenings.',
    temperament: ['Calm', 'Independent', 'Affectionate'],
    behaviors: ['Good with kids', 'Good with other dogs', 'House trained'],
    medical: {
      isVaccinated: true,
      isNeutered: true,
      medicalNotes: ['Spayed', 'Microchipped']
    },
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1443&q=80',
  },
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
      if (dir === 1) { // Right swipe (like)
        // In a real app, you would make an API call here to check for a match
        // For now, we'll simulate a match with a 30% chance
        const isMatch = Math.random() < 0.3;
        
        if (isMatch) {
          // Redirect to messages with the matched pet's ID
          window.location.href = `/messages?newMatch=${currentPet.id}`;
          return;
        }
      }
      
      if (currentIndex < pets.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Reset to the first pet if we've reached the end
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
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold">{currentPet.name} <span className="text-xl font-normal">{currentPet.gender} • {currentPet.age} years</span></h2>
                      <p className="text-lg">{currentPet.breed} • {currentPet.weight}</p>
                      <p className="text-sm opacity-90 mt-1">📍 {currentPet.location}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          currentPet.medical.isVaccinated ? 'bg-green-500' : 'bg-yellow-500'}`}>
                          {currentPet.medical.isVaccinated ? 'Vaccinated' : 'Vaccination Needed'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          currentPet.medical.isNeutered ? 'bg-blue-500' : 'bg-purple-500'}`}>
                          {currentPet.medical.isNeutered ? 'Neutered/Spayed' : 'Not Neutered'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm mb-2">{currentPet.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                      {currentPet.temperament.map((trait) => (
                        <span key={trait} className="px-2 py-1 bg-white/20 rounded-full text-xs">
                          {trait}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {currentPet.behaviors.map((behavior) => (
                        <span key={behavior} className="px-2 py-1 bg-green-500/30 rounded-full text-xs flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {behavior}
                        </span>
                      ))}
                    </div>
                    
                    {currentPet.medical.medicalNotes.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-white/20">
                        <h4 className="text-xs font-semibold mb-1">MEDICAL NOTES</h4>
                        <ul className="text-xs space-y-1">
                          {currentPet.medical.medicalNotes.map((note, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-1">•</span> {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
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
