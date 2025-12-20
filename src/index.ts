import { weatherAgent } from "./agents/weather-agent";
import { HumanMessage } from "@langchain/core/messages";

async function main() {
  console.log("🤖 Hello from LangChain Agents!");
  console.log("================================\n");

  try {
    // 发送天气查询
    const query = "What's the weather like in New York City?";
    console.log(`Query: ${query}\n`);
    console.log("Thinking...\n");

    const result = await weatherAgent.invoke({
      messages: [
        new HumanMessage(query)
      ],
    });

    // 获取响应内容
    console.log("Response:");
    console.log("==========");
    if (result.messages && result.messages.length > 0) {
      const lastMessage = result.messages[result.messages.length - 1];
      if (typeof lastMessage.content === 'string') {
        console.log(lastMessage.content);
      } else {
        console.log(JSON.stringify(lastMessage.content, null, 2));
      }
    } else {
      console.log(JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : String(error));
    console.error("Full error:", error);
    process.exit(1);
  }
}

// 运行主函数
main().catch(console.error);