import fs from "fs";
import path from "path";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export default async function loadAndSplitDocs(dirPath) {
  const files = fs.readdirSync(dirPath);
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  let allChunks = [];

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.lstatSync(fullPath).isFile()) {
      const content = fs.readFileSync(fullPath, "utf8");
      const chunks = await splitter.splitText(content);
      allChunks = allChunks.concat(chunks);
    }
  }
  return allChunks;
}

// Usage example:
const docsDir = "./";
loadAndSplitDocs(docsDir).then((chunks) => {
  console.log(`Loaded and split ${chunks.length} chunks.`);
});

