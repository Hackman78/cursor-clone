
export class DeepSeekLLM {
  async _call(prompt) {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "deepseek-coder", prompt }),
    });
    const data = await res.json();
    return data.response;
  }

  _identifyingParams() { return {}; }
  _llmType() { return "deepseek-coder"; }
}

