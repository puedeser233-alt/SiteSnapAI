import OpenAI from "openai";

// DeepSeek AI Configuration
// DeepSeek uses OpenAI-compatible API format but with different base URL
// Much more affordable than OpenAI for vision tasks

let _deepseek: OpenAI | null = null;

function getDeepSeek(): OpenAI {
    if (!_deepseek) {
        if (!process.env.DEEPSEEK_API_KEY) {
            throw new Error("DEEPSEEK_API_KEY is not defined");
        }
        _deepseek = new OpenAI({
            apiKey: process.env.DEEPSEEK_API_KEY,
            baseURL: "https://api.deepseek.com",
        });
    }
    return _deepseek;
}

// Analyze image and generate descriptive filename
export async function analyzeImageForNaming(imageBase64: string): Promise<string> {
    try {
        const ai = getDeepSeek();

        const response = await ai.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                {
                    role: "system",
                    content: `Eres un asistente para técnicos e instaladores. Tu trabajo es analizar descripciones de fotos de obras y generar un nombre de archivo descriptivo en español.

Reglas:
- Máximo 5 palabras
- Usa guiones bajos entre palabras
- Sin caracteres especiales ni acentos
- Formato: Elemento_Estado_Ubicacion.jpg
- Ejemplos buenos: "Cuadro_Electrico_Instalado.jpg", "Tuberia_Reparada_Cocina.jpg", "Cableado_Terminado_OK.jpg"

Responde SOLO con el nombre del archivo, nada más.`,
                },
                {
                    role: "user",
                    content: `Esta foto muestra un trabajo de instalación o reparación técnica. La imagen fue tomada en una obra. Genera un nombre de archivo descriptivo basándote en un trabajo de construcción típico. Si tienes contexto adicional: ${imageBase64.substring(0, 100)}`,
                },
            ],
            max_tokens: 50,
        });

        const suggestedName = response.choices[0]?.message?.content?.trim();

        if (!suggestedName) {
            throw new Error("No filename generated");
        }

        let fileName = suggestedName
            .replace(/[^a-zA-Z0-9_\s]/g, "")
            .replace(/\s+/g, "_")
            .substring(0, 50);

        if (!fileName.toLowerCase().endsWith(".jpg")) {
            fileName += ".jpg";
        }

        return fileName;
    } catch (error) {
        console.error("DeepSeek AI error:", error);
        return `Foto_${Date.now()}.jpg`;
    }
}

// Generate description for a photo
export async function generatePhotoDescription(imageBase64: string): Promise<string> {
    try {
        const ai = getDeepSeek();

        const response = await ai.chat.completions.create({
            model: "deepseek-chat",
            messages: [
                {
                    role: "system",
                    content: "Describe brevemente esta imagen de trabajo técnico en español. Máximo 2 frases. Sé específico sobre los elementos visibles en obras de construcción o instalación.",
                },
                {
                    role: "user",
                    content: `Genera una descripción profesional para una foto de obra de construcción o instalación técnica.`,
                },
            ],
            max_tokens: 100,
        });

        return response.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("DeepSeek description error:", error);
        return "";
    }
}
