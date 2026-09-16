import React, { useEffect, useState } from "react";
import { Avatar, useChatContext } from "stream-chat-react";

import { InviteIcon } from "../assets";

// List header container
const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

// Every user container
const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false);

  // Handling selected users
  const handleSelect = () => {
    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }
    setSelected((prevSelected) => !prevSelected);
  };

  // render users
  return (
    <div className="user-item__wrapper" onClick={handleSelect}>
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  );
};

// Get user list
const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  // get each users
  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await client.queryUsers(
          {
            id: { $ne: client.userID },
          },
          {
            id: 1,
          },
          {
            limit: 8,
          }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  // Error handling
  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error Loading, please refresh and try again.
        </div>
      </ListContainer>
    );
  }

  // if no users are found
  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No Users found.</div>
      </ListContainer>
    );
  }

  // return each users
  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">Loading users...</div>
      ) : (
        users?.map((user, i) => (
          <UserItem
            index={i}
            key={user.id}
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default UserList;
