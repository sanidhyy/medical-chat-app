import { Channel, WithComponents, useChatContext } from "stream-chat-react";

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

const GetStarted = () => (
  <div className="channel-start">
    <p className="channel-start__title">Welcome to Medical Pager</p>
    <p className="channel-start__subtitle">
      Select a channel or direct message to get started, or use + to create
      one.
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
  const { channel } = useChatContext();

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

  if (!channel) {
    return (
      <div className="channel__container">
        <GetStarted />
      </div>
    );
  }

  return (
    <div className="channel__container">
      <WithComponents overrides={{ EmptyStateIndicator: EmptyState }}>
        <Channel>
          <ChannelInner setIsEditing={setIsEditing} />
        </Channel>
      </WithComponents>
    </div>
  );
};

export default ChannelContainer;
