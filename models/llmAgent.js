export async function runLLMChatLocation(data) {
    const prompt = `A user wants to buy property. Here are their details:
  Name: ${data.name}
  Budget: ${data.budget}
  Preferred Area: ${data.area}
  Urgency: ${data.urgency}
  
  Extract the location (city or locality), and write a polite closing message saying the team will get back soon.`;
  
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // or gpt-3.5
        messages: [{ role: "user", content: prompt }]
      }),
    });
  
    const dataJSON = await response.json();
    const reply = dataJSON.choices[0]?.message?.content || "Thanks! Our team will reach out.";
    return reply;
  }
  