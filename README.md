# Contact Form with Telegram & Email Integration

A beautiful contact form that sends submissions to both Telegram and Email without requiring any third-party services.

## Features

✅ Responsive HTML form with modern design
✅ Send notifications to Telegram
✅ Send notifications via Email (SMTP)
✅ Select one or both delivery methods
✅ Built with Node.js/Express backend
✅ Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Telegram Bot Token (optional)
- Email account with SMTP access (optional)

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 3. Set Up Telegram (Optional)

To send messages via Telegram:

1. Create a bot on Telegram:
   - Open [@BotFather](https://t.me/botfather) on Telegram
   - Send `/newbot` and follow the instructions
   - Copy the bot token

2. Get your Chat ID:
   - Send a message to your bot
   - Visit `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Copy the `chat.id` from the response

3. Add to `.env`:
   ```
   TELEGRAM_BOT_TOKEN=your_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

### 4. Set Up Email (Optional)

To send messages via Email:

**For Gmail:**
1. Enable 2-Step Verification
2. Generate an [App Password](https://support.google.com/accounts/answer/185833)
3. Add to `.env`:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password_here
   RECIPIENT_EMAIL=where_to_send@example.com
   ```

**For Other Email Providers:**
- Replace `EMAIL_HOST` with your provider's SMTP server
- Use appropriate `EMAIL_PORT` (usually 587 or 465)
- Add your credentials

### 5. Run the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Fill in the contact form
3. Select delivery method(s) (Telegram, Email, or both)
4. Click "Send Message"

## File Structure

```
├── index.html          # Frontend form
├── server.js           # Backend server
├── package.json        # Dependencies
├── .env.example        # Example environment variables
└── README.md           # This file
```

## API Endpoint

**POST** `/api/contact`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Hello",
  "message": "Your message here",
  "deliveryMethods": ["telegram", "email"]
}
```

Response:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "results": {
    "telegram": true,
    "email": true,
    "errors": []
  }
}
```

## Deployment

### Heroku
1. Create a `Procfile`:
   ```
   web: node server.js
   ```

2. Push to Heroku:
   ```bash
   git push heroku main
   ```

3. Set environment variables:
   ```bash
   heroku config:set TELEGRAM_BOT_TOKEN=your_token
   ```

### Other Platforms
- Vercel (with serverless functions)
- AWS Lambda
- DigitalOcean
- Azure
- Google Cloud

## Troubleshooting

**Telegram messages not sending:**
- Verify bot token is correct
- Make sure chat ID is valid
- Check bot has permission to send messages

**Email not working:**
- Check SMTP credentials
- Verify firewall allows SMTP port
- For Gmail, ensure App Password is used (not regular password)

**CORS errors:**
- Update server configuration if frontend is on different domain
- Add CORS middleware if needed

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
