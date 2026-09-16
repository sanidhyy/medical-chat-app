import type { ReactNode } from "react";
import type { ChannelListUIProps } from "stream-chat-react";

import { AddChannel } from "../assets";
import type { ChannelKind, Setter } from "../types";

type TeamChannelListProps = ChannelListUIProps & {
  children?: ReactNode;
  type: ChannelKind;
  createType?: ChannelKind | "";
  isCreating?: boolean;
  setIsCreating: Setter<boolean>;
  setCreateType: Setter<ChannelKind | "">;
  setIsEditing: Setter<boolean>;
  setToggleContainer?: Setter<boolean>;
};

const TeamChannelList = ({
  children,
  error = null,
  loading,
  type,
  createType,
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}: TeamChannelListProps) => {
  if (error) {
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === "team" ? "Channels" : "Messages"} loading...
        </p>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === "team" ? "Channels" : "Direct Messages"}
        </p>
        <AddChannel
          createType={createType}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === "team" ? "team" : "messaging"}
          setToggleContainer={setToggleContainer}
        />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
