// Voice Clone Function
const axios = require('axios');
const multipart = require('parse-multipart-data');

const API_BASE = 'https://api.elevenlabs.io/v1';

exports.handler = async function(event, context) {
  // CORS headers
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
        body: JSON.stringify({ 
          error: 'API Key Missing',
          details: 'ElevenLabs API key set koren ni. Netlify Dashboard → Site Settings → Environment Variables e ELEVENLABS_API_KEY add korun.'
        })
      };
    }

    // Parse multipart form data from base64 encoded body
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
    const boundaryMatch = contentType.match(/boundary=(.+)/);
    
    if (!boundaryMatch) {
      return {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid content type. Multipart form data lagbe.' })
      };
    }

    const boundary = boundaryMatch[1];
    const bodyBuffer = Buffer.from(event.body, 'base64');
    const parts = multipart.parse(bodyBuffer, boundary);

    let audioFile = null;
    let voiceName = `My Voice ${Date.now()}`;
    let voiceDescription = 'Custom cloned voice for promotional content';

    for (const part of parts) {
      if (part.name === 'audio' && part.filename) {
        audioFile = part;
      } else if (part.name === 'voiceName') {
        voiceName = Buffer.from(part.data).toString('utf-8');
      } else if (part.name === 'voiceDescription') {
        voiceDescription = Buffer.from(part.data).toString('utf-8');
      }
    }

    if (!audioFile) {
      return {
        statusCode: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Kono audio file upload koren ni.' })
      };
    }

    console.log(`🎙️ Cloning voice: "${voiceName}" from ${audioFile.filename}`);

    // Build FormData for ElevenLabs API
    const FormData = require('form-data');
    const form = new FormData();
    form.append('name', voiceName);
    form.append('description', voiceDescription);
    form.append('files', Buffer.from(audioFile.data), {
      filename: audioFile.filename,
      contentType: audioFile.type || 'audio/mpeg'
    });

    const response = await axios.post(
      `${API_BASE}/voices/add`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          'xi-api-key': apiKey
        },
        timeout: 120000,
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    const clonedVoice = response.data;
    console.log(`✅ Voice cloned: ${clonedVoice.voice_id}`);

    return {
      statusCode: 200,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        voice: {
          id: clonedVoice.voice_id,
          name: clonedVoice.name,
          category: clonedVoice.category
        }
      })
    };

  } catch (error) {
    console.error('Clone error:', error.response?.data || error.message);

    let errorDetails = error.message;
    if (error.response?.data?.detail) {
      errorDetails = error.response.data.detail;
    } else if (error.response?.status === 401) {
      errorDetails = 'API key invalid.';
    } else if (error.response?.status === 429) {
      errorDetails = 'Too many requests. Kichukhon pore try korun.';
    }

    return {
      statusCode: error.response?.status || 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Voice clone e problem hoyeche',
        details: errorDetails
      })
    };
  }
};
