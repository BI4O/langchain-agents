import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const getWeather = tool(
  async ({ location }: { location: string }) => {
    // 实际实现中调用天气 API
    // 这里是模拟实现
    await new Promise(resolve => setTimeout(resolve, 100)); // 模拟 API 延迟

    const weatherConditions = [
      "sunny with a temperature of 75°F",
      "partly cloudy with a temperature of 68°F",
      "rainy with a temperature of 60°F",
      "cloudy with a temperature of 72°F"
    ];

    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

    return `The current weather in ${location} is ${randomWeather}.`;
  },
  {
    name: "get_weather",
    description: "Fetches the current weather for a given location",
    schema: z.object({
      location: z.string().describe("The location to get weather for"),
    }),
  }
);