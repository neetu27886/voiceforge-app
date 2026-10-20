// Delete Voice Function
const axios = require('axios');

const API_BASE = 'https://api.elevenlabs.io/v1';

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS'
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

    // Get voiceId from path
    const pathParts = event.path.split('/');
    const voiceId = pathParts[pathParts.length - 1];

    if (!voiceId || voiceId === 'delete-voice') {
      return {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Voice ID lagbe.' })
      };
    }

    await axios.delete(`${API_BASE}/voices/${voiceId}`, {
      headers: { 'xi-api-key': apiKey }
    });

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Voice delete hoyeche' })
    };

  } catch (error) {
    console.error('Delete voice error:', error.message);

    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Voice delete korte problem hoyeche' })
    };
  }
};
