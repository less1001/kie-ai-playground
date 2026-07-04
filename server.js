const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const KIE_API_KEY = process.env.KIE_API_KEY;

if (!KIE_API_KEY) {
  console.error('CRITICAL: KIE_API_KEY is not defined in the .env file!');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Kie.ai Base URL
const KIE_BASE_URL = 'https://api.kie.ai';

// Common Headers for Kie.ai API
const getKieHeaders = () => ({
  'Authorization': `Bearer ${KIE_API_KEY}`,
  'Content-Type': 'application/json'
});

// Endpoint 1: Get credit balance
app.get('/api/credit', async (req, res) => {
  try {
    const response = await axios.get(`${KIE_BASE_URL}/api/v1/chat/credit`, {
      headers: getKieHeaders()
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching credit balance:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch credit balance',
      details: error.response?.data || error.message
    });
  }
});

// Endpoint 2: Create generation task (Image / Video)
app.post('/api/create-task', async (req, res) => {
  const { model, input } = req.body;

  if (!model || !input) {
    return res.status(400).json({ error: 'Missing model or input parameters.' });
  }

  try {
    console.log(`[Kie.ai] Creating task for model: ${model}`);
    const response = await axios.post(`${KIE_BASE_URL}/api/v1/jobs/createTask`, {
      model,
      input
    }, {
      headers: getKieHeaders()
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error creating task:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to create task on Kie.ai',
      details: error.response?.data || error.message
    });
  }
});

// Endpoint 3: Query task status & info
app.get('/api/record-info', async (req, res) => {
  const { taskId } = req.query;

  if (!taskId) {
    return res.status(400).json({ error: 'Missing taskId query parameter.' });
  }

  try {
    const response = await axios.get(`${KIE_BASE_URL}/api/v1/jobs/recordInfo`, {
      params: { taskId },
      headers: getKieHeaders()
    });
    res.json(response.data);
  } catch (error) {
    console.error(`Error querying task status for ${taskId}:`, error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to query task status from Kie.ai',
      details: error.response?.data || error.message
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  Kie AI Creative Studio running on port ${PORT}`);
  console.log(`  Local URL: http://localhost:${PORT}`);
  console.log(`==================================================`);
});
