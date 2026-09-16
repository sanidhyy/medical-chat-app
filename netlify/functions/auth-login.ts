import bcrypt from "bcryptjs";
import type { Config } from "@netlify/functions";

import { getStreamServerClient, json } from "../lib/server";

type LoginBody = {
  username?: string;
  password?: string;
};

export default async (req: Request) => {
  if (req.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }

  try {
    const { username = "", password = "" } = (await req.json()) as LoginBody;
    const client = getStreamServerClient();
    const { users } = await client.queryUsers({ name: username });

    if (!users.length) {
      return json({ message: "User not found!" }, 400);
    }

    const hashedPassword = users[0].hashedPassword;
    const passwordHash =
      typeof hashedPassword === "string" ? hashedPassword : "";
    const success = await bcrypt.compare(password, passwordHash);
    const token = client.createToken(users[0].id);

    if (!success) {
      return json({ message: "Incorrect password!" }, 401);
    }

    return json({
      token,
      fullName: users[0].fullName,
      username,
      userId: users[0].id,
    });
  } catch (error) {
    console.log(error);
    return json({ message: "Login failed" }, 500);
  }
};

export const config: Config = {
  path: "/auth/login",
  method: "POST",
};
