import { useState, type ChangeEvent } from "react";
import type { Channel, UserResponse } from "stream-chat";
import { useChatContext } from "stream-chat-react";

import ResultsDropdown from "./ResultsDropdown";
import { SearchIcon } from "../assets";
import type { Setter } from "../types";

type ChannelSearchProps = {
  setToggleContainer?: Setter<boolean>;
};

const ChannelSearch = ({ setToggleContainer }: ChannelSearchProps) => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState<Channel[]>([]);
  const [directChannels, setDirectChannels] = useState<UserResponse[]>([]);

  const getChannels = async (text: string) => {
    try {
      const channelResponse = client.queryChannels({
        type: "team",
        name: { $autocomplete: text },
        members: { $in: [client.userID as string] },
      });

      const userResponse = client.queryUsers({
        id: { $ne: client.userID as string },
        name: { $autocomplete: text },
      });

      const [channels, { users }] = await Promise.all([
        channelResponse,
        userResponse,
      ]);

      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);
    } catch (error) {
      console.log(error);
      setQuery("");
    }
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;

    setQuery(value);

    if (!value) {
      setTeamChannels([]);
      setDirectChannels([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    void getChannels(value);
  };

  const setChannel = (channel: Channel) => {
    setQuery("");
    setActiveChannel(channel);
  };

  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          type="text"
          className="channel-search__input__text"
          placeholder="Search"
          value={query}
          onChange={onSearch}
        />
      </div>

      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </div>
  );
};

export default ChannelSearch;
