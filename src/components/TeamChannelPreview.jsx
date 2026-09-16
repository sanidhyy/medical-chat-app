import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

// Team Channel Preview
const TeamChannelPreview = ({
  channel,
  type,
  setToggleContainer,
  setIsCreating,
  setIsEditing,
  setActiveChannel,
}) => {
  const { channel: activeChannel, client } = useChatContext();
  const members = Object.values(channel.state.members).filter(
    ({ user }) => user.id !== client.userID
  );

  // Render channels
  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__wrapper__selected"
          : "channel-preview__wrapper"
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);

        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === "team" ? (
        <p className="channel-preview__item">
          # {channel?.data?.name || channel?.data?.id}
        </p>
      ) : (
        <div className="channel-preview__item single">
          <Avatar
            image={members[0]?.user?.image}
            name={members[0]?.user?.fullName || members[0]?.user?.id}
            size={24}
          />
          <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
        </div>
      )}
    </div>
  );
};

export default TeamChannelPreview;
