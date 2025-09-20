'use server';
/**
 * @fileOverview This file defines a Genkit flow for dynamically generating lesson content using the Gemini API.
 *
 * It includes the following:
 * - generateLessonContent: An async function that takes a language and lesson topic as input and returns generated content.
 * - GenerateLessonContentInput: The input type for the generateLessonContent function.
 * - GenerateLessonContentOutput: The output type for the generateLessonContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLessonContentInputSchema = z.object({
  language: z.string().describe('The target language for the lesson content.'),
  lessonTopic: z.string().describe('The topic of the lesson (e.g., greetings, food, travel).'),
});
export type GenerateLessonContentInput = z.infer<typeof GenerateLessonContentInputSchema>;

const PhrasePairSchema = z.object({
  english: z.string().describe('The phrase in English.'),
  translated: z.string().describe('The phrase translated into the target language.'),
});

const ExampleSentencePairSchema = z.object({
  english: z.string().describe('The example sentence in English.'),
  translated: z.string().describe('The example sentence in the target language.'),
  romanized: z.string().describe('A romanized version of the translated sentence for pronunciation.'),
});

const GenerateLessonContentOutputSchema = z.object({
  phrases: z.array(PhrasePairSchema).describe('An array of English phrases and their translations.'),
  examples: z.array(ExampleSentencePairSchema).describe('An array of example sentences, each with English, translated, and romanized versions.'),
});
export type GenerateLessonContentOutput = z.infer<typeof GenerateLessonContentOutputSchema>;

export async function generateLessonContent(input: GenerateLessonContentInput): Promise<GenerateLessonContentOutput> {
  return generateLessonContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonContentPrompt',
  input: { schema: GenerateLessonContentInputSchema },
  output: { schema: GenerateLessonContentOutputSchema },
  prompt: `You are a language learning assistant. Generate lesson content for the following language and topic.

Language: {{{language}}}
Topic: {{{lessonTopic}}}

Provide 5 phrases related to the topic, each with its English version and the translated version in the target language.
Then, provide 2 example sentences for each phrase. Each example should include the English sentence, the translated sentence in the target language, and a romanized version of the translated sentence for pronunciation (e.g., for Hindi, provide Hinglish).

Output the results as a JSON object with "phrases" and "examples" fields.
The "phrases" field should be an array of objects, each with "english" and "translated" properties.
The "examples" field should be an array of objects, each with "english", "translated", and "romanized" properties.

Make the translations natural and useful for everyday conversations, avoiding overly formal or textbook-like language.
`,
});

const generateLessonContentFlow = ai.defineFlow(
  {
    name: 'generateLessonContentFlow',
    inputSchema: GenerateLessonContentInputSchema,
    outputSchema: GenerateLessonContentOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
