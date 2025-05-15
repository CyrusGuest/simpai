import OpenAI from 'openai';
import { config } from '../config/env';

// Debug logging
const apiKeyLength = config.openai.apiKey.length;
console.log('API Key status:', apiKeyLength > 0 ? `Present (${apiKeyLength} chars)` : 'Missing');
console.log('Environment variable:', process.env.NEXT_PUBLIC_OPENAI_API_KEY ? 'Present' : 'Missing');

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Use environment variable directly
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend API instead
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function generateChatTitle(message: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a title generator for a Solana blockchain AI chat platform.
          Generate a concise, professional title (2-5 words) for a chat based on the user's first message.
          The title should reflect the main topic or question being discussed.
          Focus on blockchain-related terminology when relevant.
          Do not use quotes or special characters.
          Respond with ONLY the title, nothing else.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.3,
      max_tokens: 50,
    });

    return completion.choices[0].message.content?.trim() || "New Chat";
  } catch (error) {
    console.error('Error generating chat title:', error);
    return "New Chat";
  }
}

export async function generateAIResponse(messages: ChatMessage[]): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are Shadow AI, an advanced AI assistant specializing in Solana blockchain analysis.
          Your core capabilities include:
          1. Analyzing on-chain activities, token movements, and wallet behaviors
          2. Tracking DeFi protocols, liquidity pools, and yield farming opportunities
          3. Monitoring NFT marketplace trends and collection performance
          4. Evaluating smart contract deployments and program interactions
          5. Identifying significant wallet patterns and transaction flows
          
          When responding:
          - Focus on providing data-driven insights and analytical perspectives
          - Maintain a professional and technical tone
          - Be specific about Solana-related concepts and terminology
          - Acknowledge when real-time data would be needed for more accurate analysis
          - Suggest relevant on-chain metrics or indicators when applicable

          Use markdown formatting in your responses:
          - Use **bold** for emphasis and important terms
          - Use *italics* for technical terms and subtle emphasis
          - Use \`code blocks\` for addresses, numbers, and technical values
          - Use bullet points and numbered lists for organized information
          - Use ### for section headers
          - Use > for important quotes or callouts
          - Use --- for separating major sections
          - Use tables when comparing data
          
          Remember that you are part of the Shadow AI platform, designed to transform raw blockchain data into actionable intelligence.`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content || "I apologize, but I couldn't generate a response at this time.";
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
} 