import dotenv from 'dotenv';

dotenv.config();

export const config = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  langSmithApiKey: process.env.LANGSMITH_API_KEY,
  langSmithTracing: process.env.LANGSMITH_TRACING === 'true',
} as const;

// 验证必需的环境变量
export function validateConfig(): void {
  if (!config.openaiApiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
}