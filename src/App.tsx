import { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelContainer, ChannelListContainer, Auth } from "./components";
import type { ChannelKind } from "./types";

import "./App.css";
import "stream-chat-react/dist/css/index.css";

const cookies = new Cookies();

const API_KEY = import.meta.env.VITE_STREAM_API_KEY;
const authToken = cookies.get("token") as string | undefined;

const client = StreamChat.getInstance(API_KEY);

if (authToken) {
  void client.connectUser(
    {
      id: cookies.get("userId") as string,
      name: cookies.get("username") as string,
      fullName: cookies.get("fullName") as string,
      image: cookies.get("avatarURL") as string,
      phoneNumber: cookies.get("phoneNumber") as string,
    },
    authToken,
  );
}

const App = () => {
  const [createType, setCreateType] = useState<ChannelKind | "">("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
