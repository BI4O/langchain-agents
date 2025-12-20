# LangChain Agents Project

一个基于 LangChain 和 LangGraph 的智能天气助手项目。

## 功能特性

- 🌤️ 天气查询工具
- 🤖 AI 智能对话
- 🔄 流式响应
- 📡 REST API 接口

## 快速开始

### 前置要求

- [Git](https://git-scm.com/)
- [uv](https://github.com/astral-sh/uv) - Python 包管理工具

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd langchain-agents
```

2. **安装依赖**
```bash
uv sync
```

3. **配置环境变量**

创建 `.env` 文件并配置你的 API 密钥：
```env
OPENAI_BASE_URL=https://apis.iflow.cn/v1/
OPENAI_API_KEY=your-api-key-here
```

4. **启动开发服务器**
```bash
uv run langgraph dev --no-browser
```

## 服务访问

启动成功后，你可以访问：

- **API 服务**: http://127.0.0.1:2024
- **Studio UI**: https://smith.langchain.com/studio/?baseUrl=http://127.0.0.1:2024
- **API 文档**: http://127.0.0.1:2024/docs

## API 使用示例

### 创建对话线程
```bash
curl -X POST http://127.0.0.1:2024/threads \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 发送消息
```bash
curl -X POST http://127.0.0.1:2024/threads/{thread_id}/runs/stream \
  -H "Content-Type: application/json" \
  -d '{
    "assistant_id": "agent",
    "input": {
      "messages": [
        {"role": "user", "content": "今天广州天气如何？"}
      ]
    }
  }'
```

## 项目结构

```
langchain-agents/
├── src/
│   └── agents/
│       └── weather_agent.py    # Agent 实现
├── .env                        # 环境变量配置
├── langgraph.json              # LangGraph 配置
├── pyproject.toml              # 项目依赖配置
└── README.md                   # 项目说明
```

## 故障排除

如果遇到 404 错误或其他问题，请尝试：

1. **删除缓存文件夹**
```bash
rm -rf .langgraph_api
```

2. **重新启动服务**
```bash
uv run langgraph dev --no-browser
```

## 开发说明

- Agent 代码位于 `src/agents/weather_agent.py`
- 使用了 LangChain 的 `create_agent` 和工具系统
- 支持流式响应和实时对话

## License

MIT License