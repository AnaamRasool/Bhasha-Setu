import { LessonClient } from "@/components/lesson/LessonClient";
import { languages } from "@/lib/languages";
import { chapters } from "@/lib/lessons";
import { notFound } from "next/navigation";

export default function LessonPage({ params }: { params: { lang: string; chapterId: string } }) {
  const { lang, chapterId } = params;
  
  const language = languages.find(l => l.code === lang);
  const chapter = chapters.find(c => c.id === chapterId);

  if (!language || !chapter) {
    notFound();
  }

  return <LessonClient language={language} chapter={chapter} />;
}
