# 🚀 Netlify Deployment Guide - VoiceForge

## ⚠️ Important Note

VoiceForge ekta **Node.js backend app**, tai shudhu static hosting e cholbe na. Netlify te deploy korte hole **Netlify Functions** use korte hobe.

---

## Option 1: Netlify Functions (Recommended)

### Step 1: Project Structure Change Korun

```
voice-clone-app/
├── netlify/
│   └── functions/
│       └── api/
│           ├── clone.js
│           ├── generate.js
│           ├── voices.js
│           └── health.js
├── public/
│   └── index.html
├── netlify.toml
└── package.json
```

### Step 2: netlify.toml Create Korun

```toml
[build]
  publish = "public"
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
```

### Step 3: Environment Variables

Netlify Dashboard → Site Settings → Environment Variables:
- `ELEVENLABS_API_KEY` = `sk_51c4a144df9d8c6f652ce1e85c53da60919e2e9055d59695`

---

## Option 2: Alternative Platforms (Easier)

### 🟢 Railway (Recommended - Easiest)
1. [railway.app](https://railway.app) te signup korun
2. GitHub repo connect korun
3. Environment variable add korun
4. Deploy! (Automatic)

### 🟢 Render.com
1. [render.com](https://render.com) te signup korun
2. "New Web Service" → GitHub repo select
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Environment variable add korun
6. Deploy!

### 🟢 Vercel
1. [vercel.com](https://vercel.com) te signup korun
2. Import project
3. Environment variable add korun
4. Deploy!

---

## Option 3: Local Development

Zip extract kore:

```bash
cd VoiceForge-App
npm install
npm start
```

Browser e `http://localhost:3000` kholun.

---

## 🔑 API Key Setup (All Platforms)

Environment variable add korun:
```
ELEVENLABS_API_KEY=sk_51c4a144df9d8c6f652ce1e85c53da60919e2e9055d59695
```

---

## 📞 Need Help?

- **Railway/Render**: Easiest for Node.js apps
- **Netlify Functions**: Need code restructuring
- **Vercel**: Good for serverless functions

**Recommendation**: Railway ba Render use korun - 5 minute e deploy hoye jabe! 🚀
