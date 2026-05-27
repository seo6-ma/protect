const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Configuration from environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL;

// Email transporter configuration
const emailTransporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

// Send message to Telegram
async function sendToTelegram(formData) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        throw new Error('Telegram configuration is missing');
    }

    const message = `
📨 New Contact Form Submission

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone || 'N/A'}
📌 Subject: ${formData.subject}

💬 Message:
${formData.message}
    `.trim();

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
        return true;
    } catch (error) {
        throw new Error(`Failed to send Telegram message: ${error.message}`);
    }
}

// Send message via Email
async function sendToEmail(formData) {
    if (!RECIPIENT_EMAIL) {
        throw new Error('Email configuration is missing');
    }

    const mailOptions = {
        from: EMAIL_USER,
        to: RECIPIENT_EMAIL,
        subject: `New Contact Form: ${formData.subject}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'N/A'}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <hr>
            <h3>Message:</h3>
            <p>${formData.message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        await emailTransporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        throw new Error(`Failed to send email: ${error.message}`);
    }
}

// Main API endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message, deliveryMethods } = req.body;

        // Validate required fields
        if (!name || !email || !subject || !message || !deliveryMethods || deliveryMethods.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Send to selected delivery methods
        const results = {
            telegram: false,
            email: false,
            errors: []
        };

        for (const method of deliveryMethods) {
            try {
                if (method === 'telegram') {
                    await sendToTelegram({ name, email, phone, subject, message });
                    results.telegram = true;
                } else if (method === 'email') {
                    await sendToEmail({ name, email, phone, subject, message });
                    results.email = true;
                }
            } catch (error) {
                results.errors.push(`${method}: ${error.message}`);
            }
        }

        // Check if at least one delivery method succeeded
        if (results.telegram || results.email) {
            res.json({
                success: true,
                message: 'Message sent successfully',
                results: results
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to send message via all delivery methods',
                errors: results.errors
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});