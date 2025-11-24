const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // load .env file

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      {
        inputs: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
        }
      }
    );
    const generated = response.data[0]?.generated_text || "No response";
    res.json({ generated_text: generated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
