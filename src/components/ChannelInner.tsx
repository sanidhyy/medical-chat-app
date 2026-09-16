import {
  MessageList,
  MessageComposer,
  Thread,
  Window,
  Avatar,
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";

import { ChannelInfo } from "../assets";
import type { Setter } from "../types";

type ChannelInnerProps = {
  setIsEditing: Setter<boolean>;
};

const ChannelInner = ({ setIsEditing }: ChannelInnerProps) => {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Window>
        <TeamChannelHeader setIsEditing={setIsEditing} />
        <MessageList />
        <MessageComposer />
      </Window>
      <Thread />
    </div>
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
                imageUrl={typeof user?.image === "string" ? user.image : undefined}
                userName={user?.fullName ?? user?.id}
                size="md"
              />
              <p className="team-channel-header__name user">
                {user?.fullName ?? user?.id}
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
