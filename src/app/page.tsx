import { Button } from '@/components/ui/button';
import { Mascot } from '@/components/icons/Mascot';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <Mascot className="h-48 w-48 text-primary" />
        </div>
        <h1 className="font-headline text-5xl font-bold tracking-tight text-primary md:text-6xl">
          BhashaSetu
        </h1>
        <p className="mt-4 max-w-xl text-lg text-foreground/80 md:text-xl">
          Learn Indian Languages Easily.
          <br />
          Fun, fast, and effective lessons powered by AI.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="group shadow-lg shadow-primary/20 hover:shadow-primary/30">
            <Link href="/languages">
              Start Learning
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="absolute bottom-4 text-sm text-muted-foreground">
            Made with ❤️ for India
        </div>
      </div>
    </main>
  );
}
