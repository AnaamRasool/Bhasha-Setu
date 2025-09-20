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

const GenerateLessonContentOutputSchema = z.object({
  translations: z.array(z.string()).describe('An array of translated phrases for the lesson topic.'),
  examples: z.array(z.string()).describe('An array of example sentences using the translated phrases.'),
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

Provide 5 translated phrases related to the topic, and 3 example sentences for each phrase.

Output the results as a JSON object with "translations" and "examples" fields. The translations field should be an array of strings, and the examples field should be an array of strings.

Make the translations natural and useful for everyday conversations, avoiding overly formal or textbook-like language.

Here's an example of the desired output format:

{
  "translations": [
    "Hello",
    "Goodbye",
    "Thank you",
    "You're welcome",
    "Please"
  ],
  "examples": [
    "Hello, how are you?",
    "Hello, nice to meet you.",
    "Hello, is anyone there?",
    "Goodbye, see you later.",
    "Goodbye, it was nice meeting you.",
    "Goodbye, take care.",
    "Thank you for your help.",
    "Thank you, I appreciate it.",
    "Thank you, that's very kind.",
    "You're welcome, I'm glad I could help.",
    "You're welcome, it was my pleasure.",
    "You're welcome, anytime.",
    "Please help me.",
    "Please come in.",
    "Please sit down."
  ]
}
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
