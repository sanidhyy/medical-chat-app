import type { Config } from "@netlify/functions";
import twilio from "twilio";

import { json } from "../lib/server";

type StreamMember = {
  user_id?: string;
  user?: {
    online?: boolean;
    phoneNumber?: string;
  };
};

type StreamWebhookBody = {
  type?: string;
  user?: { id?: string };
  members?: StreamMember[];
  message?: {
    text?: string;
    user?: { fullName?: string };
  };
};

export default async (req: Request) => {
  if (req.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  if (!accountSid || !authToken || !messagingServiceSid) {
    return json({ message: "Missing Twilio credentials" }, 500);
  }

  const { message, user: sender, type, members } =
    (await req.json()) as StreamWebhookBody;

  if (type !== "message.new") {
    return json({ message: "Not a new message request!" });
  }

  const twilioClient = twilio(accountSid, authToken);
  const recipients = (members ?? []).filter(
    (member) => member.user_id !== sender?.id,
  );

  await Promise.all(
    recipients.map(async ({ user }) => {
      if (!user || user.online || !user.phoneNumber) return;

      try {
        await twilioClient.messages.create({
          body: `You have a new message from ${message?.user?.fullName} - ${message?.text}`,
          messagingServiceSid,
          to: user.phoneNumber,
        });
      } catch (error) {
        console.log(error);
      }
    }),
  );

  return json({ message: "Message sent!" });
};

export const config: Config = {
  path: "/api/webhooks/stream",
  method: "POST",
};
