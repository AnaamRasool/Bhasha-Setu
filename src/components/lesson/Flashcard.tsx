'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2 } from 'lucide-react';

interface FlashcardProps {
  englishPhrase: string;
  translatedPhrase: string;
  languageCode: string;
}

export function Flashcard({ englishPhrase, translatedPhrase, languageCode }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speak, setSpeak] = useState<(e: React.MouseEvent) => void>(() => () => {});

  useEffect(() => {
    // This function will only be defined on the client, after hydration
    setSpeak(() => (e: React.MouseEvent) => {
      e.stopPropagation();
      if (typeof window === 'undefined' || !window.speechSynthesis) return;

      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(translatedPhrase);
      utterance.lang = languageCode;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false); // Handle potential errors
      window.speechSynthesis.speak(utterance);
    });

    return () => {
      // Cleanup speechSynthesis when the component unmounts
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [translatedPhrase, languageCode, isSpeaking]);
  
  return (
    <div className="w-full h-64" style={{perspective: '1000px'}}>
      <div
        className={`relative w-full h-full text-center transition-transform duration-700`}
        style={{transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <Card className="absolute w-full h-full flex items-center justify-center" style={{backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden'}}>
          <CardContent className="p-6">
            <p className="text-2xl font-semibold">{englishPhrase}</p>
            <p className="text-sm text-muted-foreground mt-4">(Click to see translation)</p>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="absolute w-full h-full flex flex-col items-center justify-center" style={{backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
          <CardContent className="p-6">
            <p className="text-2xl font-semibold text-primary">{translatedPhrase}</p>
            <Button
              variant="outline"
              size="icon"
              className="mt-4"
              onClick={speak}
              disabled={typeof window === 'undefined' || !window.speechSynthesis}
            >
              <Volume2 className={`h-5 w-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
