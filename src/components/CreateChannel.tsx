import { useState, type ChangeEvent, type MouseEvent } from "react";
import { useChatContext } from "stream-chat-react";

import { UserList } from "./";
import { CloseCreateChannel } from "../assets";
import type { ChannelKind, Setter } from "../types";

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

type CreateChannelProps = {
  createType: ChannelKind | "";
  setIsCreating: Setter<boolean>;
};

const CreateChannel = ({ createType, setIsCreating }: CreateChannelProps) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([
    client.userID || "",
  ]);
  const [channelName, setChannelName] = useState("");

  const createChannel = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType || "messaging", channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID ?? ""]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-channel__container str-chat">
      <div className="create-channel__header">
        <p>
          {createType === "team"
            ? "Create a new Channel"
            : "Send a Direct Message"}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === "team" ? (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      ) : (
        <p className="create-channel__members-label">Add Members</p>
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="create-channel__button-wrapper" onClick={createChannel}>
        <p>
          {createType === "team" ? "Create Channel" : "Create Message Group"}
        </p>
      </div>
    </div>
  );
};

export default CreateChannel;
