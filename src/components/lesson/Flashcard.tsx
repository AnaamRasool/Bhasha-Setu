'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, RefreshCw } from 'lucide-react';

interface FlashcardProps {
  phrase: string;
}

export function Flashcard({ phrase }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Add some CSS for the 3D effect
    const styles = `
    .perspective-1000 { perspective: 1000px; }
    .transform-style-3d { transform-style: preserve-3d; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(phrase);
    // Find a voice for the target language if possible
    // utterance.lang = language.code; 
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };
  
  // This is a placeholder for translation
  const translatedPhrase = `[${phrase} in target language]`;

  return (
    <div className="w-full h-64 perspective-1000">
      <div
        className={`relative w-full h-full text-center transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <Card className="absolute w-full h-full backface-hidden flex items-center justify-center">
          <CardContent className="p-6">
            <p className="text-2xl font-semibold">{phrase}</p>
            <p className="text-sm text-muted-foreground mt-4">(Click to see translation)</p>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center">
          <CardContent className="p-6">
            <p className="text-2xl font-semibold text-primary">{translatedPhrase}</p>
            <Button
              variant="outline"
              size="icon"
              className="mt-4"
              onClick={(e) => {
                e.stopPropagation();
                handleSpeak();
              }}
              disabled={isSpeaking}
            >
              <Volume2 className={`h-5 w-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
