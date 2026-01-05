'use server';
/**
 * @fileOverview A flow to generate a scene from a product image.
 *
 * - generateScene - A function that generates a scene.
 * - GenerateSceneInput - The input type for the generateScene function.
 * - GenerateSceneOutput - The return type for the generateScene function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSceneInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateSceneInput = z.infer<typeof GenerateSceneInputSchema>;

const GenerateSceneOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateSceneOutput = z.infer<typeof GenerateSceneOutputSchema>;

export async function generateScene(
  input: GenerateSceneInput
): Promise<GenerateSceneOutput> {
  return generateSceneFlow(input);
}

const generateSceneFlow = ai.defineFlow(
  {
    name: 'generateSceneFlow',
    inputSchema: GenerateSceneInputSchema,
    outputSchema: GenerateSceneOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: [
        {media: {url: input.photoDataUri}},
        {text: 'generate an image of a modern kitchen with this material on the walls behind the sink. make sure the material on the wall is prominent.'},
      ],
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed to return a URL.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
