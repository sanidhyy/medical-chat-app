import { useState, type ChangeEvent, type MouseEvent } from "react";
import type { ChannelMemberResponse } from "stream-chat";
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
        size={32}
      />
      <p>Add Members</p>
    </div>
  );
};

const memberIdsFromChannel = (members: Record<string, ChannelMemberResponse>) =>
  Object.values(members)
    .map((member) => member.user_id || member.user?.id)
    .filter((id): id is string => Boolean(id));

type EditChannelProps = {
  setIsEditing: Setter<boolean>;
};

const EditChannel = ({ setIsEditing }: EditChannelProps) => {
  const { channel } = useChatContext();
  const existingMemberIds = memberIdsFromChannel(channel?.state.members ?? {});
  const [channelName, setChannelName] = useState(channel?.data?.name ?? "");
  const [selectedUsers, setSelectedUsers] = useState<string[]>(existingMemberIds);

  const updateChannel = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!channel) return;

    const nameChanged = channelName !== (channel.data?.name || channel.data?.id);
    const membersToAdd = selectedUsers.filter(
      (id) => !existingMemberIds.includes(id),
    );

    try {
      if (nameChanged) {
        await channel.update(
          { name: channelName },
          { text: `Channel name changed to ${channelName}` },
        );
      }

      if (membersToAdd.length) {
        await channel.addMembers(membersToAdd);
      }

      if (nameChanged || membersToAdd.length) {
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-channel__container str-chat">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        lockedUserIds={existingMemberIds}
      />
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  );
};

export default EditChannel;
