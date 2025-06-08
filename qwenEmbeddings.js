
export class QwenEmbeddings {
  async embedQuery(text) {
    const res = await fetch("http://localhost:8080/embed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: [text] }),
    });
    const data = await res.json();
    return data.data[0].embedding;
  }

  async embedDocuments(texts) {
    const res = await fetch("http://localhost:8080/embed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: texts }),
    });
    const data = await res.json();
    return data.data.map((d) => d.embedding);
  }
}

