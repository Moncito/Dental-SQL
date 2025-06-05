import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export async function sendSms(to: string, body: string) {
  try {
    // Convert to E.164 if local PH number starts with 09
    if (to.startsWith('09')) {
      to = '+63' + to.substring(1);
    }

    const message = await client.messages.create({
      body,
      from: twilioPhone,
      to,
    });

    return message;
  } catch (err) {
    console.error('❌ Failed to send SMS:', err);
    throw err;
  }
}
