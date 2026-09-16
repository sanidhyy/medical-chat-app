import React from "react";
import { Channel } from "stream-chat-react";

import { ChannelInner, CreateChannel, EditChannel } from "./";

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

// Channel Container
const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) => {
  if (isCreating) {
    return (
      <div className="channel__container">
        {/* Create Channel */}
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        {/* Edit Channel */}
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  // Show all messages
  return (
    <div className="channel__container">
      <Channel EmptyStateIndicator={EmptyState}>
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
