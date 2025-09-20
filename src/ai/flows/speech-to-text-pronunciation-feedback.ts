'use server';

/**
 * @fileOverview A flow for providing pronunciation and grammar feedback on speech-to-text input.
 *
 * - speechToTextPronunciationFeedback - A function that takes speech data and target text, and returns feedback on pronunciation and grammar.
 * - SpeechToTextPronunciationFeedbackInput - The input type for the speechToTextPronunciationFeedback function.
 * - SpeechToTextPronunciationFeedbackOutput - The return type for the speechToTextPronunciationFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SpeechToTextPronunciationFeedbackInputSchema = z.object({
  speechDataUri: z
    .string()
    .describe(
      'The audio data of the user speaking, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  targetText: z.string().describe('The text the user is attempting to speak.'),
});
export type SpeechToTextPronunciationFeedbackInput = z.infer<
  typeof SpeechToTextPronunciationFeedbackInputSchema
>;

const SpeechToTextPronunciationFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Feedback on the user\'s pronunciation and grammar.'),
});
export type SpeechToTextPronunciationFeedbackOutput = z.infer<
  typeof SpeechToTextPronunciationFeedbackOutputSchema
>;

export async function speechToTextPronunciationFeedback(
  input: SpeechToTextPronunciationFeedbackInput
): Promise<SpeechToTextPronunciationFeedbackOutput> {
  return speechToTextPronunciationFeedbackFlow(input);
}

const pronunciationFeedbackPrompt = ai.definePrompt({
  name: 'pronunciationFeedbackPrompt',
  input: {schema: SpeechToTextPronunciationFeedbackInputSchema},
  output: {schema: SpeechToTextPronunciationFeedbackOutputSchema},
  prompt: `You are a language learning assistant. A user is practicing speaking the following text:
  {{targetText}}

  You will be provided with an audio recording of the user speaking.  Give feedback to the user on their pronunciation and grammar, and suggest areas for improvement.

  Audio: {{media url=speechDataUri}}`,
});

const speechToTextPronunciationFeedbackFlow = ai.defineFlow(
  {
    name: 'speechToTextPronunciationFeedbackFlow',
    inputSchema: SpeechToTextPronunciationFeedbackInputSchema,
    outputSchema: SpeechToTextPronunciationFeedbackOutputSchema,
  },
  async input => {
    const {output} = await pronunciationFeedbackPrompt(input);
    return output!;
  }
);
