async function getAIResponse(prompt) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data.choices[0].text.trim());
    return data.choices[0].text.trim();
  } else {
    console.error("Error:", response.statusText);
    return null;
  }
}

getAIResponse("'Captal of India is ?'")
  .then((response) => console.log("AI Response:", response))
  .catch((error) => console.error("Request failed:", error));
