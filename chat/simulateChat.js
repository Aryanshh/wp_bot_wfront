import runLLM from '../models/llmAgent.js';

const simulateChat = async (lead, config) => {
  const transcript = [];
  const answers = {};

  for (const question of config.qualifying_questions) {
    const prompt = question.replace("{{name}}", lead.name);
    transcript.push({ role: "assistant", content: prompt });

    const response = await runLLM([
      { role: "system", content: `Act like a friendly sales assistant for ${config.industry}` },
      ...transcript
    ]);

    transcript.push({ role: "user", content: response });

    if (prompt.toLowerCase().includes("budget")) answers.budget = response;
    if (prompt.toLowerCase().includes("soon")) answers.urgency = response;
    if (prompt.toLowerCase().includes("location")) answers.location = response;
  }

  return { transcript, metadata: answers };
};

export default simulateChat;
