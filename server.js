import express from 'express';
import OpenAI from 'openai';

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(express.static('.'));

app.post('/summarize', async (req, res) => {
  const { email } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an expert email summarizer. Extract the key points as bullet points. Be concise."
      },
      {
        role: "user",
        content: email
      }
    ]
  });

  res.json({ summary: completion.choices[0].message.content });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));