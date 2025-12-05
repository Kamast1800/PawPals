export type PetProfile = {
  id: string;
  name: string;
  image?: string;
  breed: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  pet: PetProfile;
};

export type Playdate = {
  id: string;
  date: Date;
  location: string;
  participants: UserProfile[];
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
};

export type PlaydateReview = {
  id: string;
  playdateId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateReviewInput = {
  playdateId: string;
  revieweeId: string;
  rating: number;
  comment?: string;
};
