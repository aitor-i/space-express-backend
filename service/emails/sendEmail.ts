import { Resend } from 'resend';

import dotenv from 'dotenv';

dotenv.config();

interface SendEmailSettings {
    reciever: string;
    sender?: string;
}

export async function sendEmail({ reciever, sender }: SendEmailSettings) {
    const resend = new Resend(process.env.RESEND_TOKEN);

    const response = await resend.emails.send({
        from: 'SpaceExpress@resend.dev',
        to: reciever,
        subject: `Welcome ${sender}`,
        html: `      <main>
        <h1>Hello</h1>
        <h2>Welcome to space express</h2>
      </main>`
    });

    console.log(response);

    return response;
}
