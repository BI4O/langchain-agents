from langchain.agents import create_agent
from langchain.chat_models import init_chat_model
from langchain.tools import tool
from dotenv import load_dotenv

load_dotenv()

@tool
def get_weather(location: str) -> str:
    """Fetches the current weather for a given location."""
    # Placeholder implementation; in a real scenario, this would call a weather API.
    return f"The current weather in {location} is sunny with a temperature of 75°F."

llm = init_chat_model(model="openai:kimi-k2")

agent = create_agent(model=llm, tools=[get_weather], system_prompt="You are a helpful weather assistant.")

if __name__ == "__main__":
    state = agent.invoke({"messages": "What's the weather like in New York City?"})
    state["messages"][-1].pretty_print()
