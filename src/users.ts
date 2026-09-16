import type { UserResponse } from "stream-chat";

/** `/auth/signup` assigns `randomBytes(16).toString("hex")` ids. */
const SIGNED_UP_USER_ID = /^[a-f0-9]{32}$/;

export const isSignedUpUser = (user: Pick<UserResponse, "id">) =>
  SIGNED_UP_USER_ID.test(user.id);
