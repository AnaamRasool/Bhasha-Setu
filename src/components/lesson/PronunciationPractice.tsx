'use client';

import { useState } from 'react';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import { getPronunciationFeedback } from '@/lib/actions';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface PronunciationPracticeProps {
  sentences: string[];
  romanizedSentences: string[];
}

export function PronunciationPractice({ sentences, romanizedSentences }: PronunciationPracticeProps) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isRecording, startRecording, stopRecording, audioBlob } = useAudioRecorder();

  const currentSentence = sentences[currentSentenceIndex];
  const currentRomanizedSentence = romanizedSentences[currentSentenceIndex];

  const handleGetFeedback = async () => {
    if (!audioBlob) return;
    setIsLoading(true);
    setFeedback(null);
    try {
      // Convert blob to base64 data URI
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const result = await getPronunciationFeedback({
          speechDataUri: base64data,
          targetText: currentSentence,
        });
        setFeedback(result.feedback);
      };
    } catch (error) {
      console.error('Error getting feedback:', error);
      setFeedback('Sorry, something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-center text-lg font-semibold mb-4">Practice saying this sentence:</p>
        <div className="p-4 bg-muted rounded-lg text-center">
          <p className="text-2xl text-primary">
            {currentSentence}
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            ({currentRomanizedSentence})
          </p>
        </div>
        {feedback && (
          <Alert className="mt-4">
            <AlertTitle>Feedback</AlertTitle>
            <AlertDescription>{feedback}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="flex gap-4">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            variant={isRecording ? 'destructive' : 'default'}
            size="lg"
            className="w-32"
          >
            {isRecording ? (
              <>
                <MicOff className="mr-2 h-4 w-4 animate-pulse" /> Stop
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" /> Record
              </>
            )}
          </Button>
          <Button
            onClick={handleGetFeedback}
            disabled={!audioBlob || isLoading || isRecording}
            size="lg"
            className="w-32"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Get Feedback
          </Button>
        </div>
        <Button onClick={handleNext} variant="outline">
          Next Sentence
        </Button>
      </CardFooter>
    </Card>
  );
}
