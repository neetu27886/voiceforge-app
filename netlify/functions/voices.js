// List Voices Function
const axios = require('axios');

const API_BASE = 'https://api.elevenlabs.io/v1';

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      return {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'API key set koren ni.' })
      };
    }

    const response = await axios.get(`${API_BASE}/voices`, {
      headers: { 'xi-api-key': apiKey }
    });

    // Filter to show cloned voices
    const voices = response.data.voices
      .filter(v => v.category === 'cloned' || v.category === 'instant_voice_clone')
      .map(v => ({
        id: v.voice_id,
        name: v.name,
        category: v.category,
        preview_url: v.preview_url,
        labels: v.labels
      }));

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ voices })
    };

  } catch (error) {
    console.error('List voices error:', error.message);

    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Voice list load korte problem hoyeche' })
    };
  }
};
