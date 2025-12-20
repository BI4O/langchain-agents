import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { getWeather } from "../tools/weather";
import { config, validateConfig } from "../utils/env";

// 验证配置
validateConfig();

export const weatherAgent = createAgent({
  model: "openai:kimi-k2",
  tools: [getWeather],
  systemPrompt: "You are a helpful weather assistant. When asked about weather, use the get_weather tool to fetch current weather information for the specified location.",
});

export type WeatherAgent = typeof weatherAgent;