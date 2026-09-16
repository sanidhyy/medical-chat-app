# Online Medical Chat App

![Online Medical Chat App using React JS](https://user-images.githubusercontent.com/71302066/171992846-06f76204-d380-4bc6-8438-2261713d8dda.png)

[![Ask Me Anything!](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/sanidhyy)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/sanidhyy/medical-chat-app/commits/main)
[![GitHub license](https://img.shields.io/github/license/sanidhyy/medical-chat-app)](https://github.com/sanidhyy/medical-chat-app/blob/main/LICENSE.md)
[![GitHub branches](https://badgen.net/github/branches/sanidhyy/medical-chat-app/)](https://github.com/sanidhyy/medical-chat-app/branches)
[![GitHub commits](https://badgen.net/github/commits/sanidhyy/medical-chat-app/main)](https://github.com/sanidhyy/medical-chat-app/commits/)
[![GitHub issues](https://img.shields.io/github/issues/sanidhyy/medical-chat-app)](https://github.com/sanidhyy/medical-chat-app/issues)

## 📌 Before you start

1. Make sure **Git** and **Node.js** are installed.
2. Create an account on [Stream](https://getstream.io/).
3. Create a new app. You can name it whatever you want.
4. On the app dashboard, copy your keys and paste them as shown below. Never share them with anyone else.

![Copy these keys](https://user-images.githubusercontent.com/71302066/171994842-0a821356-0294-4a33-bac3-29b694eec10e.png)

5. To enable SMS, create an account on [Twilio](https://www.twilio.com/try-twilio).
6. On the Twilio dashboard, copy the keys shown below.

![Copy these keys as well](https://user-images.githubusercontent.com/71302066/171995174-e6f39d41-fa6c-441c-ab1a-e50515d07f36.png)

7. To get the Messaging Service SID, go to **Messaging → Services** in the dashboard sidebar.
8. Create a messaging service if one doesn't exist.

![Create messaging service](https://user-images.githubusercontent.com/71302066/171995515-75ed7fb2-c995-4222-81e7-2d2d4e4428fb.png)

9. Click the messaging service you created to view its properties, as shown below. Copy the **Messaging Service SID**.

![Copy messaging service SID](https://user-images.githubusercontent.com/71302066/171995661-6897f4f6-d101-4057-a670-a3abfd169806.png)

10. Create a `.env` file in the repo root (you can copy `.env.example`) and fill in:

```
VITE_STREAM_API_KEY=xxxxxxxxxx
STREAM_API_SECRET=xxxxxxxxxxxxxxxxxxxxx
STREAM_APP_ID=xxxxx

TWILIO_ACCOUNT_SID=xxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxx
TWILIO_MESSAGING_SERVICE_SID=xxxxxxxxxxxxxxxxx
```

Do not share these values publicly.

## 📌 How to use this app

1. Clone this repository to your computer.
2. Open a terminal in the repo root and run `npm install` or `pnpm install`.
3. Copy the environment variables into a root `.env` file.
4. Run `npm run dev` or `pnpm dev`. Vite serves the app and Netlify Functions locally.
5. In the Stream dashboard, set the webhook URL to `https://<your-site>/api/webhooks/stream`.

![Authentication Page](https://user-images.githubusercontent.com/71302066/171993613-4ea393c9-654a-4170-aede-8833206c22d5.png)

### :raising_hand: Need help?

If you run into issues during installation or setup:

- **GitHub Discussions** — [Open a Q&A discussion](https://github.com/sanidhyy/medical-chat-app/discussions/new?category=q-a) for setup and troubleshooting help.
- **Email** — [sanidhyyy@gmail.com](mailto:sanidhyyy@gmail.com)
- **Discord** — `@sanidhyy`

## 📌 Built with

[<img src="https://media3.giphy.com/media/ln7z2eWriiQAllfVcn/200w.webp" width="100">](https://www.javascript.com/)
[<img src="https://i.giphy.com/media/eNAsjO55tPbgaor7ma/200w.webp" width="100">](https://react.dev/)
[<img src="https://media3.giphy.com/media/kdFc8fubgS31b8DsVu/giphy.webp" width="100">](https://nodejs.org/)

## 📌 Stats

![chat-medical netlify app](https://user-images.githubusercontent.com/71302066/171997300-3f793b63-71f7-4c0b-a0d7-3f5460d30e26.svg)

## :raised_hands: Contribute

You might encounter some bugs while using this app. Contributions are welcome — open a pull request and I will review it before merging. Please follow the community guidelines.

## Buy Me a Coffee 🍺

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

## 📌 Follow Me

[![GitHub followers](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fx.com%2F_sanidhyy)](https://x.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Fmedical-chat-app)

## :star: Give a star

Star this repository so others can find it.
