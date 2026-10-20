# 🚀 Netlify Deployment Guide - VoiceForge

## ✅ Ei Zip e Ki Ki Ache:

- `public/index.html` - Frontend UI
- `netlify/functions/` - Backend serverless functions
  - `health.js` - Health check
  - `clone.js` - Voice cloning
  - `generate.js` - Text-to-speech
  - `voices.js` - List voices
  - `delete-voice.js` - Delete voice
- `netlify.toml` - Netlify configuration
- `package.json` - Dependencies

---

## 📋 Deployment Steps (5 Minutes):

### Step 1: Netlify Account
[app.netlify.com](https://app.netlify.com) te signup/login korun (GitHub/Google diye)

### Step 2: GitHub e Upload
1. [github.com](https://github.com) e login korun
2. New repository create korun (e.g., `voiceforge-app`)
3. Zip extract kore shob file push korun:
   ```bash
   unzip VoiceForge-Netlify.zip
   cd voice-clone-app
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

### Step 3: Netlify te Deploy
1. [app.netlify.com](https://app.netlify.com) e jan
2. **"Add new site"** → **"Import an existing project"** click korun
3. **GitHub** select korun
4. Apnar `voiceforge-app` repo select korun
5. Settings automatic detect hobe:
   - **Build command**: `npm install`
   - **Publish directory**: `public`
6. **"Deploy site"** button click korun

### Step 4: Environment Variable Add Korun ⚠️ IMPORTANT!
1. Site deploy hole, **Site configuration** tab e jan
2. **Environment variables** section e jan
3. **"Add a variable"** click korun:
   - **Key**: `ELEVENLABS_API_KEY`
   - **Value**: `sk_51c4a144df9d8c6f652ce1e85c53da60919e2e9055d59695`
4. Save korun
5. **Deploys** tab e giye **"Trigger deploy"** → **"Deploy site"** korun (variable apply hobe)

### Step 5: Done! ✅
Apnar site live! URL paben (e.g., `voiceforge-app.netlify.app`)

---

## 🔧 Alternative: Manual Deploy (Drag & Drop)

GitHub chara deploy korte chaile:

1. Zip extract korun
2. Terminal e:
   ```bash
   cd voice-clone-app
   npm install
   ```
3. [app.netlify.com/drop](https://app.netlify.com/drop) e jan
4. **BUT** drag & drop won't work for functions! Use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

---

## 🐛 Troubleshooting:

### "API Key Missing" Error
→ Site configuration → Environment variables check korun
→ `ELEVENLABS_API_KEY` set kora ache kina dekhun
→ Variable add korar por **redeploy** korun

### Functions Not Working
→ `netlify/functions/` folder structure check korun
→ `netlify.toml` file ache kina dekhun
→ Netlify dashboard e **Functions** tab check korun

### Build Failed
→ `package.json` check korun
→ Netlify dashboard e **Deploy logs** dekhun
→ `npm install` locally run kore dekhun

---

## 📊 Netlify Free Tier Limits:

- ✅ **125K function invocations/month**
- ✅ **100GB bandwidth/month**
- ✅ **Unlimited sites**
- ✅ **Custom domain** (free SSL included)

---

## 🎯 Testing:

Deploy er por:
1. Site URL kholun
2. API connected badge dekhun (green)
3. Voice upload kore clone korun
4. Text generate korun
5. Download korun

---

## 💡 Tips:

- **Custom Domain**: Site settings → Domain management → Add custom domain
- **Auto Deploy**: GitHub e push korle automatically deploy hobe
- **Logs**: Functions tab e giye logs dekhun
- **Limits**: Free tier e 125K requests/month - promotional kajer jonno jotheshto!

---

**Kono problem hole Netlify dashboard er Deploy logs check korun!** 🚀
