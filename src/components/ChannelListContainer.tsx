import { useState, type ReactNode } from "react";
import type { Channel } from "stream-chat";
import { ChannelList, useChatContext, WithComponents } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";
import type { ChannelKind, Setter } from "../types";

const cookies = new Cookies();

const HiddenStreamChrome = () => null;

const ChannelListItems = ({
  children,
}: {
  children?: ReactNode;
  loadNextPage: () => void;
  hasNextPage?: boolean;
  isLoading?: boolean;
}) => <>{children}</>;

const SideBar = ({ logout }: { logout: () => void }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Hospital" width={30} />
      </div>
    </div>

    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width={30} />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text" style={{ cursor: "default" }}>
      Medical Pager
    </p>
  </div>
);

const onlyTeamChannels = (channels: Channel[]) =>
  channels.filter((channel) => channel.type === "team");

const onlyMessagingChannels = (channels: Channel[]) =>
  channels.filter((channel) => channel.type === "messaging");

type ChannelListContentProps = {
  createType?: ChannelKind | "";
  isCreating?: boolean;
  setIsCreating: Setter<boolean>;
  setCreateType: Setter<ChannelKind | "">;
  setIsEditing: Setter<boolean>;
  setToggleContainer?: Setter<boolean>;
};

const ChannelListContent = ({
  createType,
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}: ChannelListContentProps) => {
  const { client } = useChatContext();
  const userId = client.userID as string;

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");
    window.location.reload();
  };

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />

        <WithComponents
          overrides={{
            ChannelListHeader: HiddenStreamChrome,
            EmptyStateIndicator: HiddenStreamChrome,
            ChannelListUI: (listProps) => (
              <TeamChannelList
                {...listProps}
                type="team"
                createType={createType}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            ),
            ChannelListItemUI: (previewProps) => (
              <TeamChannelPreview
                {...previewProps}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                type="team"
              />
            ),
          }}
        >
          <ChannelList
            filters={{ type: "team", members: { $in: [userId] } }}
            channelRenderFilterFn={onlyTeamChannels}
            EmptyStateIndicator={HiddenStreamChrome}
            Paginator={ChannelListItems}
          />
        </WithComponents>

        <WithComponents
          overrides={{
            ChannelListHeader: HiddenStreamChrome,
            EmptyStateIndicator: HiddenStreamChrome,
            ChannelListUI: (listProps) => (
              <TeamChannelList
                {...listProps}
                type="messaging"
                createType={createType}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            ),
            ChannelListItemUI: (previewProps) => (
              <TeamChannelPreview
                {...previewProps}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                type="messaging"
              />
            ),
          }}
        >
          <ChannelList
            filters={{ type: "messaging", members: { $in: [userId] } }}
            channelRenderFilterFn={onlyMessagingChannels}
            setActiveChannelOnMount={false}
            EmptyStateIndicator={HiddenStreamChrome}
            Paginator={ChannelListItems}
          />
        </WithComponents>
      </div>
    </>
  );
};

type ChannelListContainerProps = {
  createType?: ChannelKind | "";
  setCreateType: Setter<ChannelKind | "">;
  setIsCreating: Setter<boolean>;
  setIsEditing: Setter<boolean>;
  isCreating?: boolean;
};

const ChannelListContainer = ({
  createType,
  setCreateType,
  setIsCreating,
  setIsEditing,
  isCreating,
}: ChannelListContainerProps) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          createType={createType}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-89%",
          backgroundColor: "#005fff",
        }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
        ></div>
        <ChannelListContent
          createType={createType}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
