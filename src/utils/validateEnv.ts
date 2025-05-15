export function validateEnvironmentVariables() {
  // Only check in development
  if (process.env.NODE_ENV !== 'development') {
    return true;
  }

  const requiredEnvVars = ['NEXT_PUBLIC_OPENAI_API_KEY'];
  
  // Check if the API key exists and has content
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_openai_api_key_here') {
    console.warn('OpenAI API key is not properly configured');
    return false;
  }

  // Log success in development
  console.log('✓ Environment variables loaded successfully');
  return true;
} 