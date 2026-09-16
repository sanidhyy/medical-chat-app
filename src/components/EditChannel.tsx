import { useState, type ChangeEvent, type MouseEvent } from "react";
import { useChatContext } from "stream-chat-react";

import { UserList } from "./";
import { CloseCreateChannel } from "../assets";
import type { Setter } from "../types";

type ChannelNameInputProps = {
  channelName?: string;
  setChannelName: Setter<string>;
};

const ChannelNameInput = ({
  channelName = "",
  setChannelName,
}: ChannelNameInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="Channel Name (no spaces)"
      />
      <p>Add Members</p>
    </div>
  );
};

type EditChannelProps = {
  setIsEditing: Setter<boolean>;
};

const EditChannel = ({ setIsEditing }: EditChannelProps) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name ?? "");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const updateChannel = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!channel) return;

    const nameChanged = channelName !== (channel.data?.name || channel.data?.id);

    if (nameChanged) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` },
      );

      if (selectedUsers.length) {
        await channel.addMembers(selectedUsers);
      }

      setChannelName("");
      setIsEditing(false);
      setSelectedUsers([]);
    }
  };

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  );
};

export default EditChannel;
