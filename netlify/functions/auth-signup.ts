import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import type { Config } from "@netlify/functions";

import { getStreamServerClient, json } from "../lib/server";

type SignupBody = {
  fullName?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
};

export default async (req: Request) => {
  if (req.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }

  try {
    const {
      fullName = "",
      username = "",
      password = "",
      confirmPassword = "",
      phoneNumber = "",
    } = (await req.json()) as SignupBody;

    if (
      !fullName.length ||
      !username.length ||
      !password.length ||
      !confirmPassword.length ||
      !phoneNumber.length
    ) {
      return json({ message: "Please fill the required fields" }, 400);
    }

    if (password !== confirmPassword) {
      return json(
        { message: "Password and Confirm Password Doesn't Match" },
        400,
      );
    }

    const userId = randomBytes(16).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = getStreamServerClient();
    const token = client.createToken(userId);

    await client.upsertUser({
      id: userId,
      name: username,
      fullName,
      hashedPassword,
      phoneNumber,
    });

    return json({ token, fullName, username, userId, phoneNumber });
  } catch (error) {
    console.log(error);
    return json({ message: "Signup failed" }, 500);
  }
};

export const config: Config = {
  path: "/auth/signup",
  method: "POST",
};
