import React from "react";
import { Typography } from "@material-ui/core";
import { Me } from "../../shared/types";
import classNames from "classnames";

interface Props {
  users: string[];
  classes: any;
  currentUser: Me;
}

// Renders the current users in the room.  If the user is you your name will be highlighted. 
const Users = ({ users, classes, currentUser }: Props) => {
  return (
    <div className={classes.users}>
      {users.map((user: string) => {
        const isMe = user === currentUser.userName;
        return (
          <Typography
            key={user}
            className={classNames(
              classes.user,
              isMe ? classes.userHiglighted : ""
            )}
            variant="h6"
            noWrap
          >
            {user}
          </Typography>
        );
      })}
    </div>
  );
};

export default Users;
