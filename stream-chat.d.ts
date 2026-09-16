export {};

declare module "stream-chat" {
  interface CustomUserData {
    fullName?: string;
    hashedPassword?: string;
    phoneNumber?: string;
  }

  interface CustomChannelData {
    name?: string;
  }
}
