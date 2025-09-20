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

const GenerateLessonContentOutputSchema = z.object({
  phrases: z.array(PhrasePairSchema).describe('An array of English phrases and their translations.'),
  examples: z.array(z.string()).describe('An array of example sentences using the translated phrases.'),
  romanizedExamples: z.array(z.string()).describe('An array of romanized (e.g., Hinglish) versions of the example sentences for pronunciation guidance.'),
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
Then, provide 3 example sentences in the target language for each translated phrase. For each example sentence, also provide a romanized version for pronunciation (e.g., for Hindi, provide Hinglish).

Output the results as a JSON object with "phrases", "examples", and "romanizedExamples" fields. 
The "phrases" field should be an array of objects, each with "english" and "translated" properties.
The "examples" field should be an array of strings.
The "romanizedExamples" field should be an array of strings.

Make the translations natural and useful for everyday conversations, avoiding overly formal or textbook-like language.

Here's an example of the desired output format for Hindi:

{
  "phrases": [
    { "english": "Hello", "translated": "नमस्ते" },
    { "english": "Goodbye", "translated": "अलविदा" },
    { "english": "Thank you", "translated": "धन्यवाद" },
    { "english": "You're welcome", "translated": "आपका स्वागत है" },
    { "english": "Please", "translated": "कृपया" }
  ],
  "examples": [
    "नमस्ते, आप कैसे हैं?",
    "नमस्ते, आपसे मिलकर अच्छा लगा।",
    "नमस्ते, कोई है?",
    "अलविदा, फिर मिलेंगे।",
    "अलविदा, आपसे मिलकर अच्छा लगा।",
    "अलविदा, अपना ध्यान रखना।",
    "आपकी मदद के लिए धन्यवाद।",
    "धन्यवाद, मैं इसकी सराहना करता हूँ।",
    "धन्यवाद, यह बहुत दयालु है।",
    "आपका स्वागत है, मुझे खुशी है कि मैं मदद कर सका।",
    "आपका स्वागत है, यह मेरा सौभाग्य था।",
    "आपका स्वागत है, कभी भी।",
    "कृपया मेरी मदद करें।",
    "कृपया अंदर आ जाइए।",
    "कृपया बैठ जाइए।"
  ],
  "romanizedExamples": [
    "Namaste, aap kaise hain?",
    "Namaste, aapse milkar achha laga.",
    "Namaste, koi hai?",
    "Alvida, phir milenge.",
    "Alvida, aapse milkar achha laga.",
    "Alvida, apna dhyan rakhna.",
    "Aapki madad ke liye dhanyavaad.",
    "Dhanyavaad, main iski sarahna karta hoon.",
    "Dhanyavaad, yeh bahut dayalu hai.",
    "Aapka swagat hai, mujhe khushi hai ki main madad kar saka.",
    "Aapka swagat hai, yeh mera saubhagya tha.",
    "Aapka swagat hai, kabhi bhi.",
    "Kripya meri madad karein.",
    "Kripya andar aa jaiye.",
    "Kripya baith jaiye."
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
