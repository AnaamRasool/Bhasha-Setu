"use server";

import { generateLessonContent, speechToTextPronunciationFeedback } from "@/ai/flows";
import type { GenerateLessonContentInput, GenerateLessonContentOutput } from "@/ai/flows/dynamic-lesson-content-generation";
import type { SpeechToTextPronunciationFeedbackInput, SpeechToTextPronunciationFeedbackOutput } from "@/ai/flows/speech-to-text-pronunciation-feedback";
import { db } from "./firebase";
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";

// AI Actions

export async function getLessonContent(
  input: GenerateLessonContentInput
): Promise<GenerateLessonContentOutput> {
  // Add caching logic here in a real application
  return generateLessonContent(input);
}

export async function getPronunciationFeedback(
  input: SpeechToTextPronunciationFeedbackInput
): Promise<SpeechToTextPronunciationFeedbackOutput> {
  return speechToTextPronunciationFeedback(input);
}


// Firestore Actions

export async function getUserProgress(uid: string, lang: string) {
  const progressRef = doc(db, "users", uid, "progress", lang);
  const progressSnap = await getDoc(progressRef);
  if (progressSnap.exists()) {
    return progressSnap.data();
  }
  return null;
}

export async function completeChapter(uid: string, lang: string, chapterId: string, points: number) {
  const userRef = doc(db, "users", uid);
  const progressRef = doc(db, "users", uid, "progress", lang);

  await setDoc(userRef, { 
    points: increment(points),
    lastActivity: new Date(),
  }, { merge: true });

  await setDoc(progressRef, {
    completedChapters: arrayUnion(chapterId)
  }, { merge: true });
}
