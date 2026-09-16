import { Channel } from "stream-chat-react";

import { ChannelInner, CreateChannel, EditChannel } from "./";
import type { ChannelKind, Setter } from "../types";

const EmptyState = () => (
  <div className="channel-empty__container">
    <p className="channel-empty__first">
      This is the beginning of your chat history.
    </p>
    <p className="channel-empty__second">
      Send messages, attachments, links, emojis, and more!
    </p>
  </div>
);

type ChannelContainerProps = {
  isCreating: boolean;
  setIsCreating: Setter<boolean>;
  isEditing: boolean;
  setIsEditing: Setter<boolean>;
  createType: ChannelKind | "";
};

const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}: ChannelContainerProps) => {
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  return (
    <div className="channel__container">
      <Channel EmptyStateIndicator={EmptyState}>
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
