export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIResponse {
  text: string;
  tokensUsed?: number;
  model: string;
  sourceCitation?: string;
  raw?: unknown;
}

export interface AIProvider {
  name: string;
  generateResponse(
    messages: ChatMessage[],
    systemPrompt: string,
    temperature?: number
  ): Promise<AIResponse>;
  generateEmbeddings(text: string): Promise<number[]>;
}
