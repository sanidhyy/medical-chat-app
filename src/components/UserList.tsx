import { useEffect, useState, type ReactNode } from "react";
import type { UserFilters, UserResponse } from "stream-chat";
import { Avatar, useChatContext } from "stream-chat-react";

import { InviteIcon } from "../assets";
import Spinner from "./Spinner";
import type { Setter } from "../types";

const ListContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      <div className="user-list__body">{children}</div>
    </div>
  );
};

type UserItemProps = {
  user: UserResponse;
  selected: boolean;
  locked?: boolean;
  setSelectedUsers: Setter<string[]>;
};

const UserItem = ({
  user,
  selected,
  locked,
  setSelectedUsers,
}: UserItemProps) => {
  const handleSelect = () => {
    if (locked) return;

    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id),
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }
  };

  return (
    <div
      className="user-item__wrapper"
      onClick={handleSelect}
      style={locked ? { cursor: "default" } : undefined}
    >
      <div className="user-item__name-wrapper">
        <Avatar
          imageUrl={typeof user.image === "string" ? user.image : undefined}
          userName={typeof user.fullName === "string" ? user.fullName : user.id}
          size="sm"
        />
        <p className="user-item__name">
          {typeof user.fullName === "string" ? user.fullName : user.id}
        </p>
      </div>
      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  );
};

type UserListProps = {
  selectedUsers: string[];
  setSelectedUsers: Setter<string[]>;
  lockedUserIds?: string[];
};

const UserList = ({
  selectedUsers,
  setSelectedUsers,
  lockedUserIds = [],
}: UserListProps) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const getUsers = async () => {
      setLoading(true);

      try {
        const response = await client.queryUsers(
          {
            id: { $ne: client.userID as string },
          } as unknown as UserFilters,
          {
            id: 1,
          },
          {
            limit: 8,
          },
        );

        if (cancelled) return;

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (client) void getUsers();

    return () => {
      cancelled = true;
    };
  }, [client]);

  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">
          Error Loading, please refresh and try again.
        </div>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No Users found.</div>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message user-list__message--loading">
          <Spinner label="Loading users" />
        </div>
      ) : (
        users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            selected={selectedUsers.includes(user.id)}
            locked={lockedUserIds.includes(user.id)}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default UserList;
