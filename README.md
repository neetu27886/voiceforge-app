# 🎙️ VoiceForge - AI Voice Clone Studio

Apnar nijer voice clone kore promotional content banan - Bangla ar English duto language e!

## ✨ Features

- 🎤 **Voice Cloning**: Apnar voice sample theke AI clone toiri kore
- 🗣️ **Bilingual Support**: Bangla + English duto language e speech generate kore
- 🎭 **Expression Control**: Stability, similarity, ar style adjust koren
- 📢 **Promotional Templates**: Ready-made promotional text templates
- ⬇️ **Download**: Generated audio MP3 format e download korun
- 🎨 **Beautiful UI**: Modern, professional interface

## 🚀 Setup Instructions

### 1. ElevenLabs API Key Nin (Free)

1. [elevenlabs.io](https://elevenlabs.io/sign-up) te free account khulun
2. [API Keys page](https://elevenlabs.io/app/settings/api-keys) e jan
3. "Create API Key" button click korun
4. Key ta copy korun (sk_... diye shuru hobe)

### 2. API Key Add Korun

`.env` file e giye API key add korun:

```bash
ELEVENLABS_API_KEY=sk_your_actual_key_here
```

### 3. Server Start Korun

```bash
cd voice-clone-app
npm start
```

Server `http://localhost:3000` te start hobe.

## 📖 How to Use

### Step 1: Voice Upload & Clone

1. Apnar voice er audio file upload korun (MP3, WAV, OGG, M4A, FLAC)
2. Voice er naam din
3. "Voice Clone Korun" button click korun
4. AI apnar voice analyze kore clone korbe (30-60 second lagbe)

**Tips for Best Results:**
- Clear recording use korun (background noise chara)
- Minimum 20 second er recording-i jotheshto (beshi hole better hobe)
- Natural speaking style e record korun
- Different expressions use korun recording e

### Step 2: Voice Select

1. Apnar cloned voice list dekhben
2. Jeta use korte chan seta select korun
3. Preview play kore shunte paren

### Step 3: Generate Speech

1. Language select korun (Bangla/English)
2. Apnar promotional text likhun ba template use korun
3. Voice settings adjust korun:
   - **Stability**: Kom hole more expressive, beshi hole stable
   - **Similarity**: Original voice er sathe koto match
   - **Style**: Expression er intensity
4. Preset use korte paren (Promotional, Natural, Energetic, Calm)
5. "Generate Speech" button click korun
6. Audio shune dekhun ar download korun!

## 🎛️ Voice Settings Guide

### Promotional Content er jonno:
- **Stability**: 0.40-0.50 (more expressive)
- **Similarity**: 0.80-0.85 (close to original)
- **Style**: 0.60-0.70 (good expression)

### Natural Conversation:
- **Stability**: 0.60-0.70
- **Similarity**: 0.75
- **Style**: 0.40

### Energetic Ads:
- **Stability**: 0.35
- **Similarity**: 0.85
- **Style**: 0.85

## 🛠️ Technical Details

- **Backend**: Node.js + Express
- **Voice API**: ElevenLabs (Instant Voice Cloning v2)
- **Models**: 
  - Bangla: `eleven_multilingual_v2`
  - English: `eleven_turbo_v2_5`
- **Audio Formats**: MP3, WAV, OGG, M4A, FLAC, WebM
- **Max File Size**: 50MB

## 💡 Tips & Tricks

1. **Better Quality**: Voice recording e different emotions ar expressions rakhte paren
2. **Multiple Voices**: Different voice samples theke multiple clone banate paren
3. **Text Length**: 5000 characters porjonto text dite paren ekbar e
4. **Preview**: Generate korar age choto text diye test kore dekhun
5. **Save Voices**: Cloned voices permanently save thake, reuse korte paren

## 🔒 Privacy

- Voice samples ElevenLabs er server e process hoy
- Cloned voice shudhu apnar account e thake
- Generated audio locally save hoy

## 🐛 Troubleshooting

### "API Key Missing" error:
- `.env` file e API key check korun
- Server restart korun

### Voice clone fail:
- Audio file format check korun (MP3/WAV recommended)
- File size 50MB er niche rakhte hobe
- Clear voice recording use korun

### Audio quality kharap:
- Voice settings adjust korun
- Better quality original recording use korun
- Text e special characters kom rakhte paren

## 📞 Support

Kono problem hole ElevenLabs documentation dekhun:
- [Voice Cloning Guide](https://elevenlabs.io/docs/guides/voice-cloning)
- [API Documentation](https://elevenlabs.io/docs/api-reference)

## 📄 License

Free to use for personal and commercial projects.

---

**Made with ❤️ for Bengali Content Creators**
