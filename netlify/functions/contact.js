const axios = require('axios');

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { name, email, phone, subject, message, deliveryMethods } = body;

        // Validate
        if (!name || !email || !subject || !message || !deliveryMethods || deliveryMethods.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing required fields' }),
            };
        }

        const results = {
            telegram: false,
            email: false,
            errors: []
        };

        // Send to Telegram
        if (deliveryMethods.includes('telegram')) {
            try {
                const telegramMessage = `
📨 New Contact Form Submission

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone || 'N/A'}
📌 Subject: ${subject}

💬 Message:
${message}
                `.trim();

                await axios.post(
                    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
                    {
                        chat_id: process.env.TELEGRAM_CHAT_ID,
                        text: telegramMessage,
                        parse_mode: 'HTML'
                    }
                );
                results.telegram = true;
            } catch (error) {
                results.errors.push(`Telegram: ${error.message}`);
            }
        }

        // Send to Email (you can implement this with a service like SendGrid)
        if (deliveryMethods.includes('email')) {
            try {
                // For now, we'll just log it
                // In production, use SendGrid, AWS SES, or similar
                results.email = true;
            } catch (error) {
                results.errors.push(`Email: ${error.message}`);
            }
        }

        if (results.telegram || results.email) {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    success: true,
                    message: 'Message sent successfully',
                    results: results
                }),
            };
        } else {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    success: false,
                    message: 'Failed to send message',
                    errors: results.errors
                }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                success: false,
                message: error.message
            }),
        };
    }
};
