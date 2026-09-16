import type { ChannelListItemUIProps } from "stream-chat-react";
import { Avatar, useChatContext } from "stream-chat-react";

import type { ChannelKind, Setter } from "../types";

type TeamChannelPreviewProps = ChannelListItemUIProps & {
  type: ChannelKind;
  setToggleContainer?: Setter<boolean>;
  setIsCreating: Setter<boolean>;
  setIsEditing: Setter<boolean>;
};

const TeamChannelPreview = ({
  channel,
  type,
  setToggleContainer,
  setIsCreating,
  setIsEditing,
  setActiveChannel,
  onSelect,
}: TeamChannelPreviewProps) => {
  const { channel: activeChannel, client } = useChatContext();
  const members = Object.values(channel.state.members).filter(
    ({ user }) => user?.id !== client.userID,
  );
  const member = members[0]?.user;

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__wrapper__selected"
          : "channel-preview__wrapper"
      }
      onClick={(event) => {
        setIsCreating(false);
        setIsEditing(false);
        if (onSelect) {
          onSelect(event);
        } else {
          setActiveChannel?.(channel);
        }

        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === "team" ? (
        <p className="channel-preview__item">
          # {channel.data?.name || channel.id}
        </p>
      ) : (
        <div className="channel-preview__item single">
          <Avatar
            imageUrl={
              typeof member?.image === "string" ? member.image : undefined
            }
            userName={member?.fullName || member?.id}
            size="sm"
          />
          <p>{member?.fullName || member?.id}</p>
        </div>
      )}
    </div>
  );
};

export default TeamChannelPreview;
