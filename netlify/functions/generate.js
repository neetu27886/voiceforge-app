// Text-to-Speech Generate Function
const axios = require('axios');

const API_BASE = 'https://api.elevenlabs.io/v1';

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
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

    const { voiceId, text, stability, similarity, style, language } = JSON.parse(event.body);

    if (!voiceId || !text) {
      return {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Voice ID ar text dutoi lagbe.' })
      };
    }

    // Use multilingual model for Bangla, turbo for English
    const modelId = language === 'bangla' 
      ? 'eleven_multilingual_v2' 
      : 'eleven_turbo_v2_5';

    console.log(`🔊 Generating speech: voice=${voiceId}, model=${modelId}`);

    const response = await axios.post(
      `${API_BASE}/text-to-speech/${voiceId}`,
      {
        text,
        model_id: modelId,
        voice_settings: {
          stability: stability || 0.5,
          similarity_boost: similarity || 0.8,
          style: style || 0.6,
          use_speaker_boost: true
        }
      },
      {
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        responseType: 'arraybuffer',
        timeout: 120000
      }
    );

    console.log(`✅ Audio generated: ${(response.data.length / 1024).toFixed(1)} KB`);

    // Return audio as base64
    const audioBase64 = Buffer.from(response.data).toString('base64');
    const audioDataUri = `data:audio/mpeg;base64,${audioBase64}`;

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        audioDataUri,
        size: response.data.length
      })
    };

  } catch (error) {
    console.error('Generate error:', error.message);

    let detail = error.message;
    if (error.response?.data) {
      try {
        if (Buffer.isBuffer(error.response.data)) {
          detail = JSON.parse(error.response.data.toString()).detail || error.message;
        }
      } catch (e) {}
    }

    return {
      statusCode: error.response?.status || 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Speech generate korte problem hoyeche',
        details: detail
      })
    };
  }
};
