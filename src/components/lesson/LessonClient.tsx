'use client';
import { useState, useEffect } from 'react';
import { getLessonContent } from '@/lib/actions';
import { Chapter } from '@/lib/lessons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Flashcard } from './Flashcard';
import { PronunciationPractice } from './PronunciationPractice';
import { Skeleton } from '../ui/skeleton';
import { Book, Mic } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface LessonClientProps {
  language: { name: string; code: string };
  chapter: Chapter;
}

export function LessonClient({ language, chapter }: LessonClientProps) {
  const [lessonContent, setLessonContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        const content = await getLessonContent({
          language: language.name,
          lessonTopic: chapter.title,
        });
        setLessonContent(content);
      } catch (error) {
        console.error("Failed to load lesson content:", error);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [language, chapter]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">{chapter.title}</h1>
        <p className="text-muted-foreground">
          Learn {chapter.title.toLowerCase()} in {language.name}
        </p>
      </div>

      <Tabs defaultValue="flashcards">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="flashcards"><Book className="w-4 h-4 mr-2"/> Flashcards</TabsTrigger>
          <TabsTrigger value="practice"><Mic className="w-4 h-4 mr-2"/> Practice</TabsTrigger>
        </TabsList>
        <TabsContent value="flashcards" className="mt-4">
          {loading ? (
            <Skeleton className="w-full h-64" />
          ) : (
            <Carousel className="w-full">
              <CarouselContent>
                {lessonContent?.translations.map((phrase: string, index: number) => (
                  <CarouselItem key={index}>
                    <Flashcard phrase={phrase} languageCode={language.code} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          )}
        </TabsContent>
        <TabsContent value="practice" className="mt-4">
           {loading ? (
            <Skeleton className="w-full h-64" />
          ) : (
            <PronunciationPractice sentences={lessonContent?.examples || []} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
