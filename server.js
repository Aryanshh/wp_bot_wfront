import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import simulateChat from './chat/simulateChat.js';
import classifyLead from './chat/classifyLead.js';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/lead', async (req, res) => {
  try {
    const lead = req.body;
    const config = JSON.parse(fs.readFileSync('./config/real_estate.json'));

    const { transcript, metadata } = await simulateChat(lead, config);
    const classification = classifyLead(metadata, config);

    res.json({
      success: true,
      transcript,
      metadata,
      classification
    });
  } catch (err) {
    console.error("❌ API Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
