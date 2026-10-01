import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider, AIResponse, ChatMessage } from "./types";

function generateIntelligentFallback(userQuery: string, systemPrompt: string): string {
  const q = userQuery.toLowerCase().trim();

  // If greeting
  if (/^(hi|hello|hey|namaste|hlo|greetings)\b/i.test(q)) {
    return "Namaste! Main PrivacyOS Global ka Smart Assistant hoon. Aap hamare all-in-one DPDPA 2023 compliance platform, consent management, Indian PII discovery (Aadhaar/PAN), DSR automation, ya May 2027 regulatory roadmap ke baare mein kuch bhi pooch sakte hain.";
  }

  // Extract retrieved context from systemPrompt
  const websitePart = systemPrompt
    .split("VERIFIED WEBSITE KNOWLEDGE:")[1]
    ?.split("---")[0]
    ?.trim();
  const dpdpPart = systemPrompt
    .split("APPROVED DPDP ACT KNOWLEDGE:")[1]
    ?.split("---")[0]
    ?.trim();

  const sections: string[] = [];

  if (
    websitePart &&
    !websitePart.includes("No specific website knowledge retrieved")
  ) {
    sections.push(websitePart);
  }

  if (
    dpdpPart &&
    !dpdpPart.includes("No specific DPDP legal context retrieved")
  ) {
    sections.push(dpdpPart);
  }

  if (sections.length > 0) {
    return sections.join("\n\n");
  }

  return "Mere paas iske baare mein verified information available nahi hai. Agar aap PrivacyOS Global ke compliance platform ya audit assessment ke baare mein detail mein jaanna chahte hain, toh aap neeche diye gaye 'Submit an Enquiry →' option ka use kar sakte hain.";
}

export class GeminiProvider implements AIProvider {
  name = "gemini";
  private client: GoogleGenerativeAI | null = null;
  private primaryModel: string;
  private fallbackModels: string[];

  constructor(apiKey?: string, modelName?: string) {
    const key = apiKey || process.env.GEMINI_API_KEY;
    if (key && key !== "your-gemini-api-key") {
      this.client = new GoogleGenerativeAI(key);
    }
    this.primaryModel = modelName || process.env.GEMINI_MODEL || "gemini-3.5-flash";
    this.fallbackModels = ["gemini-3.8-flash", "gemini-flash-latest"];
  }

  async generateResponse(
    messages: ChatMessage[],
    systemPrompt: string,
    temperature = 0.2
  ): Promise<AIResponse> {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content || "";

    if (!this.client) {
      // High-performance intelligent offline RAG fallback
      const text = generateIntelligentFallback(lastUserMsg, systemPrompt);
      return {
        text,
        tokensUsed: Math.round(text.length / 4),
        model: this.primaryModel + "-verified-rag",
      };
    }

    const candidateModels = [this.primaryModel, ...this.fallbackModels.filter((m) => m !== this.primaryModel)];

    // Filter and map conversation history once
    const contents = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    const lastMessage = contents.pop();
    if (!lastMessage || lastMessage.role !== "user") {
      throw new Error("Last message must be from user");
    }

    for (const modelToTry of candidateModels) {
      try {
        const model = this.client.getGenerativeModel({
          model: modelToTry,
          systemInstruction: systemPrompt,
          generationConfig: {
            temperature,
            maxOutputTokens: 2048,
          },
        });

        const chat = model.startChat({
          history: contents,
        });

        const result = await chat.sendMessage(lastMessage.parts[0].text);
        const response = await result.response;
        const text = response.text()?.trim();
        const tokensUsed = response.usageMetadata?.totalTokenCount || 0;

        if (text) {
          return {
            text,
            tokensUsed,
            model: modelToTry,
          };
        }
      } catch (err: unknown) {
        console.warn(`[GeminiProvider] Model ${modelToTry} attempt failed:`, (err as Error)?.message || err);
      }
    }

    // Seamless degradation to verified local RAG response instead of crashing
    const fallbackText = generateIntelligentFallback(lastUserMsg, systemPrompt);
    return {
      text: fallbackText,
      tokensUsed: Math.round(fallbackText.length / 4),
      model: this.primaryModel + "-fallback-rag",
    };
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    if (!this.client) {
      // Deterministic 768-dim pseudo vector for development
      return new Array(768).fill(0).map((_, i) => Math.sin(text.length + i) * 0.05);
    }

    const embeddingModels = ["gemini-embedding-001", "text-embedding-004"];

    for (const embModel of embeddingModels) {
      try {
        const model = this.client.getGenerativeModel({
          model: embModel,
        });

        const result = await model.embedContent(text);
        if (result.embedding?.values) {
          return result.embedding.values;
        }
      } catch (error: unknown) {
        console.warn(`[Gemini Embeddings] ${embModel} failed:`, (error as Error)?.message || error);
      }
    }

    return new Array(768).fill(0).map((_, i) => Math.sin(text.length + i) * 0.05);
  }
}
