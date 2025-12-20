# LangChain Agents - TypeScript Version

这是 LangChain 天气智能体项目的 TypeScript 版本，使用 LangChain.js 和 LangGraph.js 构建。

## 🚀 特性

- ✅ TypeScript 支持，提供完整的类型安全
- ✅ 使用 LangChain.js v1.x 最新 API
- ✅ 模块化架构，易于扩展
- ✅ 集成 Kimi-k2 模型
- ✅ 完整的单元测试
- ✅ 环境变量管理
- ✅ LangGraph.js 服务器支持

## 📦 项目结构

```
langchain-agents/
├── src/
│   ├── agents/
│   │   └── weather-agent.ts    # 天气智能体定义
│   ├── tools/
│   │   └── weather.ts          # 天气工具
│   ├── utils/
│   │   └── env.ts              # 环境配置
│   ├── __tests__/
│   │   └── weather-agent.test.ts  # 测试文件
│   └── index.ts                # 主入口文件
├── package.json
├── tsconfig.json
├── jest.config.js
├── langgraph.json              # LangGraph 配置
└── README.md
```

## 🛠️ 安装和运行

### 前置要求

- Node.js 18+
- pnpm

### 安装依赖

```bash
pnpm install
```

### 环境配置

创建 `.env` 文件并配置以下变量：

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_BASE_URL=https://apis.iflow.cn/v1/
```

### 运行方式

#### 1. 直接运行（独立模式）

```bash
# 构建项目
pnpm run build

# 运行项目
pnpm start

# 开发模式（自动重启）
pnpm run dev
```

#### 2. LangGraph 服务器模式

```bash
# 启动 LangGraph 开发服务器
npx @langchain/langgraph-cli dev
```

服务器启动后可访问：
- **API 服务**: http://localhost:2024
- **Studio UI**: https://smith.langchain.com/studio?baseUrl=http://localhost:2024

### 运行测试

```bash
# 运行所有测试
pnpm test

# 监听模式
pnpm run test:watch
```

## 📖 使用示例

### 创建天气智能体

```typescript
import { createAgent } from "langchain";
import { getWeather } from "./tools/weather";

const weatherAgent = createAgent({
  model: "openai:kimi-k2",
  tools: [getWeather],
  systemPrompt: "You are a helpful weather assistant.",
});

// 使用智能体
const result = await weatherAgent.invoke({
  messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
});
```

### 创建自定义工具

```typescript
import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const myTool = tool(
  async ({ input }: { input: string }) => {
    // 工具逻辑
    return `Result: ${input}`;
  },
  {
    name: "my_tool",
    description: "工具描述",
    schema: z.object({
      input: z.string().describe("输入参数"),
    }),
  }
);
```

## 🌐 LangGraph API 使用

当启动 LangGraph 服务器后，可以通过 HTTP API 与智能体交互：

### 创建对话线程

```bash
curl -X POST http://localhost:2024/threads \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 发送消息

```bash
curl -X POST http://localhost:2024/threads/{thread_id}/runs/stream \
  -H "Content-Type: application/json" \
  -d '{
    "assistant_id": "agent",
    "input": {
      "messages": [
        {"role": "user", "content": "今天北京天气如何？"}
      ]
    }
  }'
```

### JavaScript SDK 调用

```typescript
import { Client } from "@langchain/langgraph-sdk";

const client = new Client({
  apiUrl: "http://localhost:2024",
});

const thread = await client.threads.create();
const run = await client.runs.stream(
  thread.thread_id,
  "agent",
  {
    input: {
      messages: [{ role: "user", content: "今天上海天气怎么样？" }]
    }
  }
);

for await (const event of run) {
  console.log(event);
}
```

## 🧪 测试

项目包含完整的单元测试，覆盖：

- 工具功能测试
- 智能体响应测试
- 错误处理测试

## 🎯 开发指南

### 添加新工具

1. 在 `src/tools/` 目录创建新工具文件
2. 使用 `tool` 函数定义工具
3. 在 `src/agents/weather-agent.ts` 中导入并使用

### 自定义智能体

1. 修改 `src/agents/weather-agent.ts` 中的配置
2. 调整 systemPrompt、工具列表等
3. 更新 `langgraph.json` 中的路径（如需要）

### 环境变量

支持的环境变量：
- `OPENAI_API_KEY`: OpenAI API 密钥
- `OPENAI_BASE_URL`: OpenAI API 基础 URL
- `LANGSMITH_API_KEY`: LangSmith API 密钥（用于追踪）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License