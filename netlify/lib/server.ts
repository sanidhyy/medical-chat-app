import { StreamChat } from "stream-chat";

export function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export function getStreamServerClient() {
  const apiKey = process.env.VITE_STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("Missing Stream API credentials");
  }

  return StreamChat.getInstance(apiKey, apiSecret);
}
