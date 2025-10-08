import { GoogleGenAI, Modality } from '@google/genai';
import { TransformImageParams } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function constructPrompt(params: Omit<TransformImageParams, 'imageData' | 'mimeType'>): string {
    const { lighting, cameraAngle, aspectRatio, backgroundPrompt, isTransparent } = params;

    const backgroundInstruction = isTransparent
        ? `- Background: Remove the existing background and replace it with a fully transparent one.
- Format: The final output MUST be a high-resolution PNG image with a transparent background.`
        : `- Background: Place the fruit on a new background described as: '${backgroundPrompt}'.
- Format: The final output should be a high-resolution, professional-looking image.`;
    
    return `
You are an expert photo editor AI. Your task is to edit and enhance an image of fruit to create a professional, high-resolution, and photorealistic result.
The fruit in the image could be any variety from around the world, including America and Europe.
Apply the following specific transformations creatively and avoid making a simple copy of the original. Innovate on the composition.

- Lighting: Re-light the scene with a '${lighting}' style.
- Camera Angle: Adjust the perspective to a '${cameraAngle}' shot.
- Composition: Creatively frame the shot with a '${aspectRatio}' aspect ratio in mind.
${backgroundInstruction}

Ensure the final image looks highly natural, with realistic textures and details. Optimize the image for professional use. Do not add any text or watermarks.
`;
}

export async function transformImage(params: TransformImageParams): Promise<string> {
    const { imageData, mimeType, ...promptParams } = params;

    const textPrompt = constructPrompt(promptParams);

    const imagePart = {
        inlineData: {
            data: imageData,
            mimeType: mimeType,
        },
    };

    const textPart = { text: textPrompt };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [imagePart, textPart],
            },
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

        // Passthrough for our specific application-level error
        if (error?.message?.includes('لم يتم إنشاء صورة')) {
             throw error;
        }

        const errorMessage = (error?.message || '').toLowerCase();

        if (errorMessage.includes('api key not valid') || errorMessage.includes('permission denied')) {
            throw new Error('مفتاح API غير صالح أو لا يملك الإذن اللازم. يرجى مراجعة إعداداتك.');
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
        
        // Default error if no specific cases match
        throw new Error('فشل الاتصال بخدمة الذكاء الاصطناعي. الرجاء المحاولة مرة أخرى.');
    }
}