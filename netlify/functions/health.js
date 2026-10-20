// Health Check Function
exports.handler = async function(event, context) {
  const hasApiKey = !!process.env.ELEVENLABS_API_KEY && 
                    process.env.ELEVENLABS_API_KEY !== 'your_api_key_here';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify({ 
      status: 'ok', 
      hasApiKey 
    })
  };
};
