import { DeepSeekLLM } from "./deepseekLLM.js";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { Document } from "langchain/document";
import  loadAndSplitDocs from './splitter.js'
import { OpenAIEmbeddings } from './openai-embeddings.js';


async function runCodeRAG() {
  // Sample code documents
  const docs = [
    new Document({ pageContent: "function add(a, b) { return a + b; }", metadata: { id: "doc1" } }),
    new Document({ pageContent: "function subtract(a, b) { return a - b; }", metadata: { id: "doc2" } }),
  ];
    const chunks = await loadAndSplitDocs();  // Step 1 & 2


  // Initialize embeddings & vector store
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromTexts(chunks, [], embeddings);

  // Initialize chat model
  const chatModel = new DeepSeekLLM();

  // Create retrieval chain
  const chain = new RetrievalQAChain({
    retriever: vectorStore.asRetriever(),
    llm: chatModel,
  });

  // Query
  const query = "How do I add two numbers in JavaScript?";

  const response = await chain.call({ query });
  console.log("Response:", response.text);
}

runCodeRAG();

