import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIProvider, AIResponse, ChatMessage } from "./types";

export class GeminiProvider implements AIProvider {
  name = "gemini";
  private client: GoogleGenerativeAI | null = null;
  private modelName: string;

  constructor(apiKey?: string, modelName = "gemini-2.5-flash") {
    const key = apiKey || process.env.GEMINI_API_KEY;
    if (key && key !== "your-gemini-api-key") {
      this.client = new GoogleGenerativeAI(key);
    }
    this.modelName = modelName;
  }

  async generateResponse(
    messages: ChatMessage[],
    systemPrompt: string,
    temperature = 0.4
  ): Promise<AIResponse> {
    if (!this.client) {
      // Mock / Safe fallback when API key is not yet provided
      return {
        text: "Namaste! Main aapka Smart Assistant hoon. Humari services aur DPDP Act compliance ke baare mein aap mujhse pooch sakte hain.",
        tokensUsed: 40,
        model: this.modelName + "-fallback",
      };
    }

    try {
      const model = this.client.getGenerativeModel({
        model: this.modelName,
        systemInstruction: systemPrompt,
        generationConfig: {
          temperature,
          maxOutputTokens: 1024,
        },
      });

      // Filter and map conversation history
      const contents = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

      // If the last message is from user, generateContent
      const lastMessage = contents.pop();
      if (!lastMessage || lastMessage.role !== "user") {
        throw new Error("Last message must be from user");
      }

      const chat = model.startChat({
        history: contents,
      });

      const result = await chat.sendMessage(lastMessage.parts[0].text);
      const response = await result.response;
      const text = response.text();
      const tokensUsed = response.usageMetadata?.totalTokenCount || 0;

      return {
        text,
        tokensUsed,
        model: this.modelName,
      };
    } catch (error) {
      console.error("[GeminiProvider Error]:", error);
      return {
        text: "Maaf kijiye, temporary connectivity issue ki wajah se response generate nahi ho paya. Kripya thodi der baad dobara poochhein ya neeche diye gaye enquiry option ka use karein.",
        tokensUsed: 0,
        model: this.modelName,
      };
    }
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    if (!this.client) {
      // Return 768-dim pseudo vector for development when offline/mocking
      return new Array(768).fill(0).map((_, i) => Math.sin(text.length + i) * 0.05);
    }

    try {
      const embeddingModel = this.client.getGenerativeModel({
        model: "text-embedding-004",
      });

      const result = await embeddingModel.embedContent(text);
      return result.embedding.values;
    } catch (error) {
      console.error("[Gemini Embeddings Error]:", error);
      // Fallback deterministic vector
      return new Array(768).fill(0).map((_, i) => Math.sin(text.length + i) * 0.05);
    }
  }
}
