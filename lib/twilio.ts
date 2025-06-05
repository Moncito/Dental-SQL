import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export async function sendSms(to: string, body: string) {
  try {
    const message = await client.messages.create({
      body,
      from: twilioPhone,
      to, // Must be in E.164 format e.g. +639XXXXXXXXX
    });
    return message;
  } catch (error) {
    console.error('❌ Failed to send SMS:', error);
    throw error;
  }
}
