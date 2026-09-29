import { AIProvider } from "./types";
import { GeminiProvider } from "./gemini";

let cachedProvider: AIProvider | null = null;

export function getAIProvider(): AIProvider {
  if (cachedProvider) return cachedProvider;

  const providerName = (process.env.DEFAULT_AI_PROVIDER || "gemini").toLowerCase();

  switch (providerName) {
    case "gemini":
    default:
      cachedProvider = new GeminiProvider(process.env.GEMINI_API_KEY);
      break;
  }

  return cachedProvider;
}
