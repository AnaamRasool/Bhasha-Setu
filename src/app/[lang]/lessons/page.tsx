import { chapters } from '@/lib/lessons';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Lock, PlayCircle } from 'lucide-react';
import { languages } from '@/lib/languages';

export default function LessonsPage({ params }: { params: { lang: string } }) {
  const lang = params.lang;
  const currentLanguage = languages.find(l => l.code === lang);
  
  // In a real app, you would fetch user progress to determine which lessons are locked/unlocked
  const completedChapters = new Set(); // Example: new Set(['greetings'])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Lessons</h1>
        <p className="text-muted-foreground">Master {currentLanguage?.name} one chapter at a time.</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {chapters.map((chapter, index) => {
          const isCompleted = completedChapters.has(chapter.id);
          const isLocked = index > 0 && !completedChapters.has(chapters[index-1].id);

          return (
            <Card key={chapter.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isLocked ? 'bg-muted' : 'bg-primary/10'}`}>
                  {isLocked ? (
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  ) : (
                    <span className="text-xl font-bold text-primary">{index + 1}</span>
                  )}
                </div>
                <div>
                  <h3 className={`font-semibold ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{chapter.description}</p>
                </div>
              </div>
              <Button asChild disabled={isLocked} variant={isCompleted ? 'outline' : 'default'}>
                <Link href={`/${lang}/lessons/${chapter.id}`}>
                  {isCompleted ? 'Review' : 'Start'} <PlayCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
