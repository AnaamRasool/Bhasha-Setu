import type { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  points: number;
  level: 'Beginner' | 'Intermediate' | 'Explorer' | 'Master';
  streak: number;
  lastActivity: Date;
  createdAt: Date;
}

export interface LanguageProgress {
  progressPercentage: number;
  completedChapters: string[];
}
