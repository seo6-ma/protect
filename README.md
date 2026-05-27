# Contact Form with Telegram & Email Integration
## 🚀 Deployed FREE on Netlify + GitHub Pages!

A beautiful contact form that sends submissions to Telegram - **completely free hosting!**

## ✨ Key Features

✅ **Responsive design** - Works on all devices
✅ **Telegram notifications** - Get alerts instantly
✅ **100% FREE** - No credit card required
✅ **Netlify hosting** - Lightning fast CDN
✅ **Serverless backend** - Scales automatically
✅ **Production ready** - Already configured

## 🎯 Your Telegram Bot

- **Chat ID**: 6461049894
- **Bot Token**: Already configured
- Messages sent instantly to your Telegram

## 🚀 Deploy in 3 Steps

### Step 1: Deploy to Netlify (2 minutes)

1. Go to [Netlify.com](https://netlify.com)
2. Sign up with GitHub (free account)
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repository (seo6-ma/protect)
5. Click **Deploy site**

### Step 2: Set Environment Variables

In Netlify dashboard:
1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Add these variables:
   ```
   TELEGRAM_BOT_TOKEN=8635062176:AAHtQkW-yt--teUU4UnDbDcQRbhIK8r1jlc
   TELEGRAM_CHAT_ID=6461049894
   ```
3. Trigger a redeploy

### Step 3: Your Live Links

After deployment, you'll get:
- **Netlify URL**: https://your-site-name.netlify.app
- **GitHub Pages**: https://seo6-ma.github.io/protect

Both are **completely free!**

## 📝 How to Use

1. Open your form URL
2. Fill in the form fields
3. Check "Telegram" checkbox
4. Click "Send Message"
5. **Message appears in your Telegram instantly!**

## 📁 Project Structure

```
protect/
├── index.html                    # Contact form (frontend)
├── netlify/
│   └── functions/
│       └── contact.js           # Serverless function (backend)
├── netlify.toml                 # Netlify config
├── package.json                 # Dependencies
├── .env.example                 # Environment variables
└── README.md                    # This file
```

## 🔧 How It Works

```
User fills form
    ↓
Clicks "Send Message"
    ↓
Data sent to Netlify Function (`.netlify/functions/contact`)
    ↓
Function validates data
    ↓
Sends to Telegram Bot API
    ↓
Message appears in your Telegram chat
    ↓
Success response shown to user
```

## ⚡ Features

### For Users:
- Clean, modern design
- Mobile responsive
- Real-time status messages
- Error handling

### For You:
- Instant Telegram notifications
- No email required
- Completely free
- Scales automatically
- No server to maintain

## 🎯 Add Email Support (Optional)

To add email notifications:

1. Sign up for [SendGrid](https://sendgrid.com) - free tier available
2. Get API key from SendGrid dashboard
3. Add to Netlify environment variables:
   ```
   SENDGRID_API_KEY=your_api_key
   SENDGRID_FROM_EMAIL=noreply@yoursite.com
   ```

## 📊 Monitoring & Logs

### View Netlify Logs:
1. Go to Netlify dashboard
2. Click your site
3. Go to **Deploys** tab
4. Click latest deploy → **Functions** → view logs

### View Telegram Messages:
Open Telegram - messages appear directly in your chat!

## 💡 Troubleshooting

**Messages not sending?**
- Check Netlify function logs
- Verify environment variables are set
- Ensure Telegram Bot token is correct

**Build failing?**
- Push all files to GitHub
- Check netlify.toml exists in root
- Verify package.json has dependencies

**Form not loading?**
- Clear browser cache
- Wait 2-3 minutes for Netlify to build
- Check internet connection

## 🌐 Custom Domain (Optional)

To use your own domain:
1. In Netlify dashboard → **Site settings** → **Domain management**
2. Add your custom domain
3. Update DNS records (Netlify will guide you)

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Netlify | **FREE** | 300 minutes/month |
| GitHub | **FREE** | Unlimited |
| Telegram Bot | **FREE** | Official API |
| **Total** | **$0/month** | ✅ Production ready |

## 📚 Documentation

- [Netlify Docs](https://docs.netlify.com)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [GitHub Pages Guide](https://pages.github.com)

## 🎉 You're All Set!

Your contact form is now:
- ✅ Live on the internet
- ✅ Sending to Telegram
- ✅ 100% free
- ✅ Production ready

**Start receiving messages now!** 🚀

---

### Need Help?
1. Check Netlify function logs for errors
2. Verify environment variables
3. Test with Telegram app on your phone
4. Clear cache and refresh

**Made with ❤️ for free form submissions**
