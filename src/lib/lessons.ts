export interface Chapter {
  id: string;
  title: string;
  description: string;
  points: number;
}

export const chapters: Chapter[] = [
  {
    id: "greetings",
    title: "Greetings & Basics",
    description: "Learn how to say hello, goodbye, and other essential phrases.",
    points: 10
  },
  {
    id: "survival-words",
    title: "Survival Words",
    description: "Key words you'll need in any situation, like 'yes', 'no', 'please', and 'thank you'.",
    points: 10
  },
  {
    id: "numbers-and-time",
    title: "Numbers & Time",
    description: "Learn to count and tell time, crucial for shopping and scheduling.",
    points: 15
  },
  {
    id: "travel-and-directions",
    title: "Travel & Directions",
    description: "Navigate cities and ask for directions to get where you need to go.",
    points: 20
  },
  {
    id: "food-and-dining",
    title: "Food & Dining",
    description: "Order food at restaurants and talk about your favorite meals.",
    points: 20
  },
  {
    id: "shopping",
    title: "Shopping",
    description: "Learn phrases for shopping, from asking prices to bargaining.",
    points: 15
  },
  {
    id: "emergency-situations",
    title: "Emergency Situations",
    description: "Essential phrases for when you need help or are in an emergency.",
    points: 25
  },
  {
    id: "small-talk",
    title: "Small Talk",
    description: "Engage in simple conversations and get to know people.",
    points: 15
  },
  {
    id: "family-and-relationships",
    title: "Family & Relationships",
    description: "Talk about your family and friends.",
    points: 15
  },
  {
    id: "daily-slang",
    title: "Daily Slang",
    description: "Learn modern, natural phrases used in everyday conversation.",
    points: 20
  }
];
