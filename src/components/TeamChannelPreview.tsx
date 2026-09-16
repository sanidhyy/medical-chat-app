import type { Channel } from "stream-chat";
import { Avatar, useChatContext } from "stream-chat-react";

import type { ChannelKind, Setter } from "../types";

type TeamChannelPreviewProps = {
  channel: Channel;
  type: ChannelKind;
  setToggleContainer?: Setter<boolean>;
  setIsCreating: Setter<boolean>;
  setIsEditing: Setter<boolean>;
  setActiveChannel?: (channel?: Channel) => void;
};

const TeamChannelPreview = ({
  channel,
  type,
  setToggleContainer,
  setIsCreating,
  setIsEditing,
  setActiveChannel,
}: TeamChannelPreviewProps) => {
  const { channel: activeChannel, client } = useChatContext();
  const members = Object.values(channel.state.members).filter(
    ({ user }) => user?.id !== client.userID,
  );

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
        setActiveChannel?.(channel);

        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === "team" ? (
        <p className="channel-preview__item">
          # {(channel.data?.name as string | undefined) || channel.id}
        </p>
      ) : (
        <div className="channel-preview__item single">
          <Avatar
            image={
              typeof members[0]?.user?.image === "string"
                ? members[0].user.image
                : undefined
            }
            name={
              (members[0]?.user?.fullName as string | undefined) ||
              members[0]?.user?.id
            }
            size={24}
          />
          <p>
            {(members[0]?.user?.fullName as string | undefined) ||
              members[0]?.user?.id}
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamChannelPreview;
