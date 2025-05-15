if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  console.warn('OpenAI API key is not set in environment variables');
}

export const config = {
  openai: {
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  }
} 