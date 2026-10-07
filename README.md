# Email Summarizer Agent

A small web app that turns a pasted email into a concise, AI-generated summary. It uses an Express server and the OpenAI API, with a simple browser-based interface.

## Requirements

- Node.js 18 or later
- An OpenAI API key

## Setup

1. Install the dependencies:

   ```sh
   npm install
   ```

2. Set your OpenAI API key in the environment.

   **PowerShell**

   ```powershell
   $env:OPENAI_API_KEY = "your-api-key"
   ```

   **macOS/Linux**

   ```sh
   export OPENAI_API_KEY="your-api-key"
   ```

3. Start the server:

   ```sh
   node server.js
   ```

4. Open [http://localhost:3000](http://localhost:3000), paste an email, and select **Summarize Email**.

## Project files

- `server.js` serves the static web app and handles `POST /summarize` requests.
- `index.html`, `style.css`, and `script.js` provide the browser interface.
- `agent.ts` contains a separate example using the OpenAI Agents SDK.
- `email examples` contains sample emails for trying out the summarizer.

## API

Send an email to the local server as JSON:

```http
POST /summarize
Content-Type: application/json
```

```json
{
  "email": "Paste the email text here"
}
```

A successful response contains the generated summary:

```json
{
  "summary": "• Key point..."
}
```

## Notes

- The server reads the API key from `OPENAI_API_KEY`; do not put API keys in browser code or commit them to version control.
- The npm `test` script is currently a placeholder; automated tests are not configured yet.
