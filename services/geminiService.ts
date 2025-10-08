
import { GoogleGenAI, Modality } from '@google/genai';
// FIX: Correctly import types from the dedicated types file.
import { TransformImageParams, UpscaleImageParams, ImageFilter, GenerateImageParams, OutputQuality, GenerateAltTextParams, TranslateTextParams, TextureEffect } from '../types';

// FIX: Initialize the GoogleGenAI client directly using the environment variable, as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// FIX: Removed ApiKeyError class as it's no longer needed.
// FIX: Removed initializeAi function. Initialization is now done at the module level.


function constructTransformPrompt(params: Omit<TransformImageParams, 'imageData' | 'mimeType'>): string {
    const { lighting, cameraAngle, aspectRatio, backgroundPrompt, isTransparent, subjectVariety } = params;

    const backgroundInstruction = isTransparent
        ? `- Background: Remove the existing background and replace it with a fully transparent one.
- Format: The final output MUST be a high-resolution PNG image with a transparent background.`
        : `- Background: Place the subject on a new background described as: '${backgroundPrompt}'.
- Format: The final output should be a high-resolution, professional-looking image.`;
    
    return `
You are an expert photo editor AI. Your task is to edit and enhance an image to create a professional, high-resolution, and photorealistic result.
The main subject is a '${subjectVariety}'. Generate a highly variable, high-resolution, and natural-looking image of this subject.
Apply the following specific transformations creatively and avoid making a simple copy of the original. Innovate on the composition.

- Lighting: Re-light the scene with a '${lighting}' style.
- Camera Angle: Adjust the perspective to a '${cameraAngle}' shot.
- Composition: Creatively frame the shot with a '${aspectRatio}' aspect ratio in mind.
${backgroundInstruction}

Ensure the final image looks highly natural, with realistic textures and details. Optimize the image for professional use. Do not add any text or watermarks.
`;
}

async function callGeminiForImageEdit(model: string, parts: any[]): Promise<string> {
    // FIX: Removed check for `ai` instance, as it's guaranteed to be initialized.
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        
        throw new Error('لم يتم إنشاء صورة. قد يكون الذكاء الاصطناعي أعاد نصًا بدلاً من ذلك.');

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        const errorMessage = (error?.message || '').toLowerCase();

        // FIX: Removed API key specific error handling as we assume the key is valid.
        if (error?.message?.includes('لم يتم إنشاء صورة')) {
             throw error;
        }
        if (errorMessage.includes('resource exhausted') || errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
            throw new Error('لقد تجاوزت حد الطلبات المسموح به. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.');
        }
        if (errorMessage.includes('invalid argument') || (errorMessage.includes('invalid') && (errorMessage.includes('image') || errorMessage.includes('data')))) {
             throw new Error('الصورة المقدمة غير صالحة، أو أن أحد المدخلات غير صحيح. يرجى التحقق من الصورة والمحاولة مرة أخرى.');
        }
        if (errorMessage.includes('internal') || errorMessage.includes('unavailable') || errorMessage.includes('server error')) {
            throw new Error('حدث خطأ في خادم الذكاء الاصطناعي. يرجى المحاولة مرة أخرى لاحقًا.');
        }
        
        throw new Error('فشل الاتصال بخدمة الذكاء الاصطناعي. الرجاء المحاولة مرة أخرى.');
    }
}


export async function transformImage(params: TransformImageParams): Promise<string> {
    const { imageData, mimeType, ...promptParams } = params;

    const textPrompt = constructTransformPrompt(promptParams);

    const imagePart = {
        inlineData: {
            data: imageData,
            mimeType: mimeType,
        },
    };

    const textPart = { text: textPrompt };

    return callGeminiForImageEdit('gemini-2.5-flash-image', [imagePart, textPart]);
}


export async function upscaleImage(params: UpscaleImageParams): Promise<string> {
    const { imageData, mimeType, filter, texture, outputQuality } = params;

    const filterInstruction = (filter && filter !== ImageFilter.None)
        ? `- Apply the following visual filter to the image: '${filter}'.`
        : '';
        
    const textureInstruction = (texture && texture !== TextureEffect.None)
        ? `- Apply a subtle, photorealistic '${texture}' texture effect to the entire image. This should be integrated naturally.`
        : '';

    const qualityInstruction = outputQuality === OutputQuality.HighPrint
        ? `Your task is to take the provided image and upscale it to double its current pixel dimensions. The target is to achieve a resolution suitable for high-quality printing at 600 DPI.
- Enhance details, sharpen edges, and remove any compression artifacts meticulously.
- Ensure the result is an extremely crisp, clean, and detailed high-resolution version of the original.`
        : `Your task is to take the provided image and increase its resolution to the maximum possible quality for web use.
- Enhance details, sharpen edges, and remove any compression artifacts.
- Ensure the result is a crisp, clean, high-resolution version of the original.`;

    const upscalePrompt = `
You are an expert AI image upscaler and editor.
${qualityInstruction}
${filterInstruction}
${textureInstruction}
- Do not add, remove, or change any other content, elements, or colors in the image, other than applying the requested filter and/or texture.
- The output MUST be a high-resolution PNG image.
`;

    const imagePart = {
        inlineData: {
            data: imageData,
            mimeType: mimeType,
        },
    };

    const textPart = { text: upscalePrompt };

    return callGeminiForImageEdit('gemini-2.5-flash-image', [imagePart, textPart]);
}

function constructGenerationPrompt(params: GenerateImageParams): string {
    const { lighting, cameraAngle, aspectRatio, backgroundPrompt, isTransparent, subjectVariety } = params;

    const backgroundInstruction = isTransparent
        ? `The image must have a fully transparent background.`
        : `The subject should be placed on a background described as: '${backgroundPrompt}'.`;

    return `
Generate a single, highly creative, and professional photorealistic image of a '${subjectVariety}'.
The image should be crafted with high artistic skill and innovation.

- **Style:** Photorealistic, high-resolution, with natural-looking textures and details.
- **Lighting:** The scene must be lit with a '${lighting}' style.
- **Camera Angle:** Use a '${cameraAngle}' perspective.
- **Composition:** The composition should be well-framed, keeping a '${aspectRatio}' aspect ratio in mind.
- **Background:** ${backgroundInstruction}
- **Output Format:** The final image must be a high-resolution PNG.

Do not include any text, watermarks, or borders. The focus should be solely on the subject, presented in an artistic and professional manner.
`;
}

export async function generateImageFromScratch(params: GenerateImageParams): Promise<string> {
    // FIX: Removed check for `ai` instance.
    const prompt = constructGenerationPrompt(params);

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png', 
                aspectRatio: params.aspectRatio, 
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        }

        throw new Error('لم يتم إنشاء صورة من قبل الذكاء الاصطناعي.');

    } catch (error: any) {
        console.error("Gemini API Error (Image Generation):", error);
        const errorMessage = (error?.message || '').toLowerCase();
        // FIX: Removed API key specific error handling.
        if (errorMessage.includes('resource exhausted') || errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
            throw new Error('لقد تجاوزت حد الطلبات المسموح به. يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.');
        }
        if (errorMessage.includes('internal') || errorMessage.includes('unavailable') || errorMessage.includes('server error')) {
            throw new Error('حدث خطأ في خادم الذكاء الاصطناعي. يرجى المحاولة مرة أخرى لاحقًا.');
        }
        throw new Error('فشل توليد الصورة. الرجاء المحاولة مرة أخرى.');
    }
}


export async function generateAltText(params: GenerateAltTextParams): Promise<string> {
    // FIX: Removed check for `ai` instance.
    const { imageData, mimeType } = params;

    const prompt = `
Act as an expert in SEO, web accessibility, and food photography analysis.
Your task is to generate a highly descriptive, professional, and evocative alt-text for the provided image, in Arabic. The description should be rich in detail but concise, not exceeding 500 characters.

Analyze the image deeply, focusing on the following aspects:

1.  **Main Subject:** Identify the fruit or vegetable with precision. Describe its state (e.g., perfectly ripe, freshly sliced, glistening with water droplets), quantity (a single specimen, a pair, a small bunch), and any notable features.
2.  **Composition and Framing:** Describe the arrangement of the subject within the frame. Is it centered, off-to-the-side (rule of thirds)? Is it a close-up macro shot, a top-down flat lay, or an angled view?
3.  **Color Palette:** Describe the dominant colors and their interplay. Mention the vibrancy of the subject's colors in contrast to the background tones (e.g., "deep crimson of the cherries pops against a muted, dark slate background").
4.  **Lighting and Shadows:** Characterize the lighting with detail. Is it soft, diffused light creating gentle shadows, or dramatic, hard light casting sharp, defined shadows? Note any highlights that suggest texture (e.g., a gleam on a wet apple).
5.  **Background and Texture:** Describe the setting and surfaces. What is the texture of the background? (e.g., polished white marble, rustic weathered wood, soft fabric). Are there any secondary elements like leaves, utensils, or water droplets?
6.  **Overall Mood and Atmosphere:** Synthesize all the visual cues to convey the overall feeling of the image. Is it minimalist and clean, warm and rustic, vibrant and energetic, or sophisticated and dramatic?

Combine these observations into a fluent, natural-sounding sentence or two that paints a vivid picture for the user.
`;

    const imagePart = {
        inlineData: {
            data: imageData,
            mimeType: mimeType,
        },
    };

    const textPart = { text: prompt };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text;
    } catch (error: any) {
        console.error("Gemini API Error (Alt Text Generation):", error);
        // FIX: Removed API key specific error handling.
        throw new Error('فشل إنشاء الوصف التعريفي. يرجى المحاولة مرة أخرى.');
    }
}

export async function translateText(params: TranslateTextParams): Promise<string> {
    // FIX: Removed check for `ai` instance.
    const { text, targetLanguage } = params;
    const prompt = `
You are an expert translator specializing in technical and descriptive content for the web.
Translate the following Arabic 'alt text' into professional, high-quality ${targetLanguage}.
Maintain a descriptive and professional tone. Do not add any extra explanations, quotation marks, or introductory phrases.
Your response should ONLY be the translated text.

Arabic Text: "${text}"
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error: any) {
        console.error("Gemini API Error (Translation):", error);
        // FIX: Removed API key specific error handling.
        throw new Error('فشلت عملية الترجمة. يرجى المحاولة مرة أخرى.');
    }
}
