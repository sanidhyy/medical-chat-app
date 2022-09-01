# Online Medical Chat App

![Online Medical Chat App using React JS](https://user-images.githubusercontent.com/71302066/171992846-06f76204-d380-4bc6-8438-2261713d8dda.png)

[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://github.com/Technical-Shubham-tech)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Technical-Shubham-tech/medical-chat-app/commits/main)
[![GitHub license](https://img.shields.io/github/license/Technical-Shubham-tech/medical-chat-app)](https://github.com/Technical-Shubham-tech/medical-chat-app/blob/main/LICENSE.md)
[![GitHub branches](https://badgen.net/github/branches/Technical-Shubham-tech/medical-chat-app/)](https://github.com/Technical-Shubham-tech/medical-chat-app/branches)
[![Github commits](https://badgen.net/github/commits/Technical-Shubham-tech/medical-chat-app/main)](https://github.com/Technical-Shubham-tech/medical-chat-app/commits/)
[![GitHub issues](https://img.shields.io/github/issues/Technical-Shubham-tech/medical-chat-app)](https://github.com/Technical-Shubham-tech/medical-chat-app/issues)

## 📌 Before you start
1. Make sure **Git** and **NodeJS** is installed
2. **Yarn** is faster than Npm. So use [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/).
3. Create .env file in both client and server folder.
4. _server/.env_
```
STREAM_API_KEY=xxxxxxxxxx
STREAM_API_SECRET=xxxxxxxxxxxxxxxxxxxxx
STREAM_APP_ID=xxxxx

TWILIO_ACCOUNT_SID=xxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxx
TWILIO_MESSAGING_SERVICE_SID=xxxxxxxxxxxxxxxxx
```
5. _client/.env_
```
REACT_APP_STREAM_API_KEY_SECRET=xxxxxxxxxx
```

6. Create an account in [Stream](https://getstream.io/)
7. Create a new app. You can name it whatever you want.
8. On app dashboard, you can copy your keys and paste it like shown below. Never share them with anyone else.

![Copy these keys](https://user-images.githubusercontent.com/71302066/171994842-0a821356-0294-4a33-bac3-29b694eec10e.png)

*NOTE:* Both `STREAM_API_KEY` and `REACT_APP_STREAM_API_KEY_SECRET` are same

9. To use messaging functionality, Create an account in [Twilio](https://www.twilio.com/try-twilio)
10. On app dashboard, copy keys which are shown below and paste them in .env file in server folder.
![Copy these keys as well](https://user-images.githubusercontent.com/71302066/171995174-e6f39d41-fa6c-441c-ab1a-e50515d07f36.png)
11. To get Messaging service sid, go to _Messaging/Services_ through dashboard sidebar.
12. Create a messaging service in case it doesn't exists
![Create messaging service](https://user-images.githubusercontent.com/71302066/171995515-75ed7fb2-c995-4222-81e7-2d2d4e4428fb.png)
13. Then, click on messaging service you created and you will be able to see its properties as shown below. Copy **Messaging Service SID**
![Copy messaging service SID](https://user-images.githubusercontent.com/71302066/171995661-6897f4f6-d101-4057-a670-a3abfd169806.png)


Make sure you don't share them publicly.

## 📌 How to use this App?
1. Clone this **repository** to your local computer.
2. Open **terminal** in root directory and `cd server`
3. Type and Run `yarn install`
4. Run `yarn run build` to start back end server
5. Now, in browser go to this URL [http://localhost:5000/](http://localhost:5000/)
![You should see this in browser](https://user-images.githubusercontent.com/71302066/171993385-5cf8e702-dfb9-4986-ac2e-11980a8632c5.png)
6. Now, nodejs server is **configured** and started. Next, we need to setup **Client** side server.
7. Open a new **Terminal** and run `yarn install`
8. Once packages are installed, type and run `yarn start`
9. Now client side server will be started and you can start using this app :+1:

![Authentication Page](https://user-images.githubusercontent.com/71302066/171993613-4ea393c9-654a-4170-aede-8833206c22d5.png)

## 📌 Built with
[<img src="https://media3.giphy.com/media/ln7z2eWriiQAllfVcn/200w.webp" width="100">](https://www.javascript.com/)
[<img src="https://i.giphy.com/media/eNAsjO55tPbgaor7ma/200w.webp" width="100">](https://reactjs.org/)
[<img src="https://media3.giphy.com/media/kdFc8fubgS31b8DsVu/giphy.webp" width="100">](https://nodejs.org/)

## 📌 Stats

![chat-medical netlify app](https://user-images.githubusercontent.com/71302066/171997300-3f793b63-71f7-4c0b-a0d7-3f5460d30e26.svg)

## 📌 Follow Me
[![GitHub followers](https://img.shields.io/github/followers/Technical-Shubham-tech?style=social&label=Follow&maxAge=2592000)](https://github.com/Technical-Shubham-tech)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FTechnicalShubam)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FTechnical-Shubham-tech%2Fmedical-chat-app)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCNAz_hUVBG2ZUN8TVm0bmYw)
