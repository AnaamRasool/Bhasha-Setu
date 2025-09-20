import type { LucideIcon } from "lucide-react";
import { MessageSquare, Heart, Building, Plane, Utensils } from 'lucide-react';

export interface Language {
  name: string;
  nativeName: string;
  code: string;
  icon: LucideIcon;
}

export const languages: Language[] = [
  { name: 'Hindi', nativeName: 'हिन्दी', code: 'hi', icon: MessageSquare },
  { name: 'Tamil', nativeName: 'தமிழ்', code: 'ta', icon: Heart },
  { name: 'Bengali', nativeName: 'বাংলা', code: 'bn', icon: Utensils },
  { name: 'Telugu', nativeName: 'తెలుగు', code: 'te', icon: Plane },
  { name: 'Marathi', nativeName: 'मराठी', code: 'mr', icon: Building },
  { name: 'Gujarati', nativeName: 'ગુજરાતી', code: 'gu', icon: MessageSquare },
  { name: 'Kannada', nativeName: 'ಕನ್ನಡ', code: 'kn', icon: Heart },
  { name: 'Malayalam', nativeName: 'മലയാളം', code: 'ml', icon: Utensils },
  { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', code: 'pa', icon: Plane },
];
