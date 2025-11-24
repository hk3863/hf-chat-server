const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const prompt = req.body.prompt;
  // your huggingface API call here
  res.json({ generated_text: "Simulated reply" }); // test response
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
