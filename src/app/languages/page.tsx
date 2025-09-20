import { languages } from '@/lib/languages';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LanguagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="font-headline text-2xl font-bold text-primary">
            BhashaSetu
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Choose a Language
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Select an Indian language you want to start learning today.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {languages.map((lang) => (
            <Card key={lang.code} className="group flex transform flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <CardHeader className="flex-row items-center gap-4 pb-4">
                <lang.icon className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="text-xl font-bold">{lang.name}</CardTitle>
                  <CardDescription className="text-base">{lang.nativeName}</CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="mt-auto pt-4">
                 <Button asChild className="w-full">
                  <Link href={`/${lang.code}/dashboard`}>
                    Learn {lang.name} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
