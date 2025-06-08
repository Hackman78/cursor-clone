import fetch from 'node-fetch';
import 'dotenv/config';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


console.log(OPENAI_API_KEY)
async function getEmbedding(text) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      input: text,
      model: 'text-embedding-3-large'
    }),
  });

  const data = await response.json();

  if (data.error) {
    console.error('Error:', data.error);
    return null;
  }

  return data.data[0].embedding;
}

// Example usage
getEmbedding("Hello, sire.").then(embedding => {
  console.log('Embedding vector:', embedding);
});

