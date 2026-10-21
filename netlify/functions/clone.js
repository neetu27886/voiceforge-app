// Voice Clone Function - Fixed Version
const axios = require('axios');
const Busboy = require('busboy');
const FormData = require('form-data');

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
          details: 'ElevenLabs API key set koren ni.'
        })
      };
    }

    // Parse multipart form data using Busboy
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
    
    return new Promise((resolve, reject) => {
      const busboy = Busboy({ headers: { 'content-type': contentType } });
      
      let audioFile = null;
      let audioBuffer = null;
      let voiceName = `My Voice ${Date.now()}`;
      let voiceDescription = 'Custom cloned voice for promotional content';

      busboy.on('file', (fieldname, file, info) => {
        const { filename, mimeType } = info;
        
        if (fieldname === 'audio') {
          const chunks = [];
          file.on('data', (data) => chunks.push(data));
          file.on('end', () => {
            audioFile = { filename, mimeType };
            audioBuffer = Buffer.concat(chunks);
            console.log(`📁 File received: ${filename} (${audioBuffer.length} bytes)`);
          });
        }
      });

      busboy.on('field', (fieldname, value) => {
        if (fieldname === 'voiceName' && value) {
          voiceName = value;
        } else if (fieldname === 'voiceDescription' && value) {
          voiceDescription = value;
        }
      });

      busboy.on('finish', async () => {
        if (!audioBuffer) {
          resolve({
            statusCode: 400,
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Kono audio file upload koren ni.' })
          });
          return;
        }

        console.log(`🎙️ Cloning voice: "${voiceName}" from ${audioFile.filename}`);

        try {
          // Build FormData for ElevenLabs API
          const form = new FormData();
          form.append('name', voiceName);
          form.append('description', voiceDescription);
          form.append('files', audioBuffer, {
            filename: audioFile.filename,
            contentType: audioFile.mimeType || 'audio/mpeg'
          });

          console.log('📤 Sending to ElevenLabs API...');

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

          resolve({
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
          });

        } catch (apiError) {
          console.error('❌ ElevenLabs API error:', apiError.response?.data || apiError.message);

          let errorDetails = apiError.message;
          if (apiError.response?.data?.detail) {
            errorDetails = typeof apiError.response.data.detail === 'string' 
              ? apiError.response.data.detail 
              : JSON.stringify(apiError.response.data.detail);
          } else if (apiError.response?.status === 401) {
            errorDetails = 'API key invalid.';
          } else if (apiError.response?.status === 429) {
            errorDetails = 'Too many requests. Kichukhon pore try korun.';
          } else if (apiError.response?.status === 400) {
            errorDetails = `Bad request: ${errorDetails}`;
          }

          resolve({
            statusCode: apiError.response?.status || 500,
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              error: 'Voice clone e problem hoyeche',
              details: errorDetails
            })
          });
        }
      });

      busboy.on('error', (error) => {
        console.error('❌ Busboy error:', error);
        resolve({
          statusCode: 400,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: 'File upload parse error',
            details: error.message
          })
        });
      });

      // Parse the body
      const bodyBuffer = event.isBase64Encoded 
        ? Buffer.from(event.body, 'base64') 
        : Buffer.from(event.body);
      
      busboy.end(bodyBuffer);
    });

  } catch (error) {
    console.error('❌ Unexpected error:', error);

    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Unexpected error',
        details: error.message
      })
    };
  }
};
