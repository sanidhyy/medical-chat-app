import type { Channel, ChannelFilters, StreamChat, UserResponse } from "stream-chat";
import { Avatar, useChatContext } from "stream-chat-react";

import Spinner from "./Spinner";
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
  const currentUserId = client.userID;
  const otherUserId = channel.id;

  if (!currentUserId || !otherUserId) return;

  const filters: ChannelFilters = {
    type: "messaging",
    member_count: 2,
    $and: [
      { members: { $in: [currentUserId] } },
      { members: { $in: [otherUserId] } },
    ],
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
        <div className="channel-search__results-loading">
          <Spinner size={16} label="Loading channels" />
        </div>
      )}

      {!loading && !teamChannels?.length ? (
        <p className="channel-search__results-header">
          <i>Not found</i>
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
        <div className="channel-search__results-loading">
          <Spinner size={16} label="Loading users" />
        </div>
      )}
      {!loading && !directChannels?.length ? (
        <p className="channel-search__results-header">
          <i>Not found</i>
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
