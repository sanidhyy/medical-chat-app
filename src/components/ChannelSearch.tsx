import { useEffect, useState, type ChangeEvent } from "react";
import type { Channel, UserFilters, UserResponse } from "stream-chat";
import { useChatContext } from "stream-chat-react";

import ResultsDropdown from "./ResultsDropdown";
import { SearchIcon } from "../assets";
import type { Setter } from "../types";
import { isSignedUpUser } from "../users";

const SEARCH_DEBOUNCE_MS = 300;

type ChannelSearchProps = {
  setToggleContainer?: Setter<boolean>;
};

const ChannelSearch = ({ setToggleContainer }: ChannelSearchProps) => {
  const { client, setActiveChannel } = useChatContext();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState<Channel[]>([]);
  const [directChannels, setDirectChannels] = useState<UserResponse[]>([]);

  useEffect(() => {
    const text = query.trim();

    if (!text) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTeamChannels([]);
      setDirectChannels([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    let cancelled = false;

    const timeoutId = window.setTimeout(() => {
      void (async () => {
        try {
          const [channels, { users }] = await Promise.all([
            client.queryChannels({
              type: "team",
              name: { $autocomplete: text },
              members: { $in: [client.userID as string] },
            }),
            client.queryUsers({
              id: { $ne: client.userID as string },
              name: { $autocomplete: text },
            } as unknown as UserFilters),
          ]);

          if (cancelled) return;

          setTeamChannels(channels);
          setDirectChannels(users.filter(isSignedUpUser));
        } catch (error) {
          console.log(error);
          if (cancelled) return;
          setTeamChannels([]);
          setDirectChannels([]);
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [client, query]);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
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
