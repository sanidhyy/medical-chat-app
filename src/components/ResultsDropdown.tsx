import type { Channel, StreamChat, UserResponse } from "stream-chat";
import { Avatar, useChatContext } from "stream-chat-react";

import type { Setter } from "../types";

type ChannelByUserArgs = {
  client: StreamChat;
  setActiveChannel: (channel?: Channel) => void;
  channel: UserResponse;
  setChannel: (channel: Channel) => void;
};

const channelByUser = async ({
  client,
  setActiveChannel,
  channel,
  setChannel,
}: ChannelByUserArgs) => {
  const filters = {
    type: "messaging",
    member_count: 2,
    members: { $eq: [client.user?.id as string, client.userID as string] },
  };

  const [existingChannel] = await client.queryChannels(filters);

  if (existingChannel) {
    setActiveChannel(existingChannel);
    return;
  }

  const newChannel = client.channel("messaging", {
    members: [channel.id, client.userID as string],
  });

  setChannel(newChannel);
  setActiveChannel(newChannel);
};

type SearchResultProps = {
  channel: Channel | UserResponse;
  focusedId?: string;
  type: "channel" | "user";
  setChannel: (channel: Channel) => void;
  setToggleContainer?: Setter<boolean>;
};

const SearchResult = ({
  channel,
  focusedId,
  type,
  setChannel,
  setToggleContainer,
}: SearchResultProps) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === "channel") {
    const teamChannel = channel as Channel;

    return (
      <div
        onClick={() => {
          setChannel(teamChannel);
          if (setToggleContainer) {
            setToggleContainer((prevState) => !prevState);
          }
        }}
        className={
          focusedId === teamChannel.id
            ? "channel-search__result-container__focused"
            : "channel-search__result-container"
        }
      >
        <div className="result-hashtag">#</div>
        <p className="channel-search__result-text">
          {teamChannel.data?.name}
        </p>
      </div>
    );
  }

  const user = channel as UserResponse;

  return (
    <div
      onClick={() => {
        void channelByUser({
          client,
          setActiveChannel,
          channel: user,
          setChannel,
        });
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
      className={
        focusedId === user.id
          ? "channel-search__result-container__focused"
          : "channel-search__result-container"
      }
    >
      <div className="channel-search__result-user">
        <Avatar
          imageUrl={typeof user.image === "string" ? user.image : undefined}
          userName={typeof user.name === "string" ? user.name : user.id}
          size="sm"
        />
        <p className="channel-search__result-text">{user.name}</p>
      </div>
    </div>
  );
};

type ResultsDropdownProps = {
  teamChannels?: Channel[];
  directChannels?: UserResponse[];
  focusedId?: string;
  loading: boolean;
  setChannel: (channel: Channel) => void;
  setQuery: Setter<string>;
  setToggleContainer?: Setter<boolean>;
};

const ResultsDropdown = ({
  teamChannels,
  directChannels,
  focusedId,
  loading,
  setChannel,
  setToggleContainer,
}: ResultsDropdownProps) => {
  return (
    <div className="channel-search__results">
      <p className="channel-search__results-header">Channels</p>
      {loading && !teamChannels?.length && (
        <p className="channel-search__results-header">
          <i>Loading...</i>
        </p>
      )}

      {!loading && !teamChannels?.length ? (
        <p className="channel-search__results-header">
          <i>No channels found</i>
        </p>
      ) : (
        teamChannels?.map((channel) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={channel.id}
            setChannel={setChannel}
            type="channel"
            setToggleContainer={setToggleContainer}
          />
        ))
      )}

      <p className="channel-search__results-header">Users</p>
      {loading && !directChannels?.length && (
        <p className="channel-search__results-header">
          <i>Loading...</i>
        </p>
      )}
      {!loading && !directChannels?.length ? (
        <p className="channel-search__results-header">
          <i>No direct messages found</i>
        </p>
      ) : (
        directChannels?.map((channel) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={channel.id}
            setChannel={setChannel}
            type="user"
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
    </div>
  );
};

export default ResultsDropdown;
