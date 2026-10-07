document.getElementById('summarizeBtn').addEventListener('click', async () => {
  const emailText = document.getElementById('emailInput').value.trim();

  if (!emailText) return alert("Please paste an email");

  document.getElementById('summarizeBtn').disabled = true;
  document.getElementById('summary').textContent = "Thinking...";
  document.getElementById('resultsSection').classList.remove('hidden');

  const response = await fetch('/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailText })
  });

  const data = await response.json();
  document.getElementById('summary').textContent = data.summary;
  document.getElementById('summarizeBtn').disabled = false;
  document.getElementById('summarizeBtn').textContent = "Summarize Email";
});

document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('emailInput').value = '';
  document.getElementById('resultsSection').classList.add('hidden');
  document.getElementById('summary').textContent = '';
});