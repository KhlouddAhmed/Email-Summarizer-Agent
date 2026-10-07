import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";

// ==== tool: extracts bullet points ====
const extractBulletPoints = tool({
  name: "extract_bullet_points",
  description: "Extract the key points from an email as bullet points.",
  parameters: z.object({
    email: z.string().describe("The full email text to summarize"),
  }),
  async execute({ email }) {
    return `Please summarize this email into bullet points:\n\n${email}`;
  },
});

// ==== Email Summarizer Agent ==== //
const emailSummarizerAgent = new Agent({
  name: "Email Summarizer",
  instructions:
    "You are an expert email summarizer. " +
    "When given a long email, extract the key points as clear bullet points. " +
    "Use the extract_bullet_points tool to process the email. " +
    "Format your response as: \n" +
    "SUMMARY:\n" +
    "• [point 1]\n" +
    "• [point 2]\n" +
    "Keep each bullet point short and clear.",
  tools: [extractBulletPoints],
  model: "gpt-4o-mini",
});

//test email
const testEmail = `
Dear Family,

I hope you’re all doing well!

I wanted to follow up on our plans for the upcoming family trip. So far, we’ve agreed on traveling to Alexandria for 4 days starting next month. I’ve checked a few hotels, and there are some great options near the beach, but we need to finalize our booking soon before prices go up.

There are a couple of things we still need to sort out. First, we need to confirm everyone’s availability and exact travel dates. Second, we should decide whether we’re traveling together by car or booking train tickets in advance.

I was thinking we could plan a few activities like visiting the library, spending a full day at the beach, and maybe going on a boat trip if the weather is good.

Let’s have a quick call this weekend to finalize everything and make sure we’re all aligned.

Action items:

* Everyone: Confirm availability by Thursday
* Dad: Check car readiness for the trip
* Sara: Look into train ticket options
* Me: Shortlist and share hotel options

Looking forward to spending some quality time together 

Best regards,
Ali
`;

//run
const result = await run(emailSummarizerAgent, testEmail);

console.log(result.finalOutput);