import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";

import { UserList } from "./";
import { CloseCreateChannel } from "../assets";

// Channel Name Input
const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (e) => {
    // Prevent reloading of page after button click
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

// Edit Channel
const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (e) => {
    e.preventDefault();

    const nameChanged =
      channelName !== (channel?.data?.name || channel?.data?.id);

    // check if name is changed
    if (nameChanged) {
      await channel.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      );

      // check if new members are selected/invited
      if (selectedUsers.length) {
        await channel.addMembers(selectedUsers);
      }

      setChannelName(null);
      setIsEditing(false);
      setSelectedUsers([]);
    }
  };

  // Render edit channel
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
