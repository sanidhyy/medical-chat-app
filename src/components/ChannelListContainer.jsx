import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

// Import icons
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";

// Create cookies instance
const cookies = new Cookies();

// Sidebar
const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Hospital" width={30} />
      </div>
    </div>

    {/* Logout icon */}
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width={30} />
      </div>
    </div>
  </div>
);

// Alternatively, Logo
const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text" style={{ cursor: "default" }}>
      Medical Pager
    </p>
  </div>
);

// get all channels
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

// get all messaging
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

// Channel List Content
const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  // Logout
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    // reload page after logout
    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        {/* Channel Search */}
        <ChannelSearch setToggleContainer={setToggleContainer} />

        {/* channels */}
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />

        {/* messaging */}
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

// Channel List Container
const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  // Render all content
  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
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
