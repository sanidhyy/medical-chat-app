import { createContext, useState } from "react";
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  Avatar,
  useChannelStateContext,
  useChatContext,
  type MessageInputProps,
} from "stream-chat-react";

import { ChannelInfo } from "../assets";
import type { Setter } from "../types";

type GiphyContextValue = {
  giphyState: boolean;
  setGiphyState: Setter<boolean>;
};

const GiphyContext = createContext<GiphyContextValue>({
  giphyState: false,
  setGiphyState: () => undefined,
});

type ChannelInnerProps = {
  setIsEditing: Setter<boolean>;
};

const ChannelInner = ({ setIsEditing }: ChannelInnerProps) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler: NonNullable<
    MessageInputProps["overrideSubmitHandler"]
  > = (message) => {
    const updatedMessage = giphyState
      ? { ...message, text: `/giphy ${message.text ?? ""}` }
      : message;

    if (sendMessage) {
      void sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const getWatcherText = (watchers?: number) => {
  if (!watchers) return "No users online";
  if (watchers === 1) return "1 user online";
  return `${watchers} users online`;
};

const TeamChannelHeader = ({ setIsEditing }: ChannelInnerProps) => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();
  const members = Object.values(channel.state.members).filter(
    ({ user }) => user?.id !== client.userID,
  );
  const additionalMembers = members.length - 3;

  return (
    <div className="team-channel-header__container">
      {channel.type === "messaging" ? (
        <div className="team-channel-header__name-wrapper">
          {members.map(({ user }, i) => (
            <div key={user?.id ?? i} className="team-channel-header__name-multi">
              <Avatar
                image={typeof user?.image === "string" ? user.image : undefined}
                name={(user?.fullName as string | undefined) ?? user?.id}
                size={32}
              />
              <p className="team-channel-header__name user">
                {(user?.fullName as string | undefined) ?? user?.id}
              </p>
            </div>
          ))}

          {additionalMembers > 0 && (
            <p className="team-channel-header__name user">
              and {additionalMembers} more
            </p>
          )}
        </div>
      ) : (
        <div className="team-channel-header__channel-wrapper">
          <p className="team-channel-header__name"># {channel.data?.name}</p>
          <span style={{ display: "flex" }} onClick={() => setIsEditing(true)}>
            <ChannelInfo />
          </span>
        </div>
      )}
      <div className="team-channel-header__right">
        <p className="team-channel-header__right-text">
          {getWatcherText(watcher_count)}
        </p>
      </div>
    </div>
  );
};

export default ChannelInner;
