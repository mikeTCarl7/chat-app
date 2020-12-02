import React, { useEffect, useState } from "react";
import axios from "axios";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import RenderChatRoom from "../chatRoom";
import useStyles from "./styles";
import { useLocation, match } from "react-router-dom";

import { Link, Switch, Route } from "react-router-dom";
import { Me, Room } from "../../shared/types";

interface Props {
  match: match;
}

// This Component contains the left panel and the router links to the various chat rooms
const App = ({ match }: Props) => {
  const classes = useStyles({});
  const [rooms, setRooms] = useState([]);
  const userName = JSON.parse(sessionStorage.getItem("user"));
  const [loggedInUser, setLoggedInUser] = useState<Me>(userName);
  const [timeOnline, setTimeOnline] = useState("");
  const location = useLocation();

  const getRooms = async () => {
    // TODO: Remove axios : no need for axios as we don't need support of older browsers
    //  and we aren't concerned with setting timeout params and things of that nature.
    const rooms = await axios.get(`/rooms`); 
    setRooms(rooms.data);
  };

  // Get chatRooms on load
  useEffect(() => {
    if (!loggedInUser) {
      alert(
        `Something went wrong. Either you are not logged in or an error occurred. \n Click 'Ok' to route back to login page`
      );
      // @ts-ignore
      window.location = "/";
      return;
    }
    // setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
    getRooms();
    setTimeOnline(
      computeTimeOnline(
        JSON.parse(sessionStorage.getItem("user")).loginTime,
        new Date().getTime()
      )
    );
    setInterval(() => {
      setTimeOnline(
        computeTimeOnline(
          JSON.parse(sessionStorage.getItem("user")).loginTime,
          new Date().getTime()
        )
      );
    }, 1000 * 60);
  }, []);

  function computeTimeOnline(start: number, end: number) {
    if (!start || !end) {
      return null;
    }

    const msDifference = end - start;
    const secondDifference = msDifference / 1000;
    const minutesDifference = Math.floor((secondDifference % 3600) / 60);
    return minutesDifference;
  }

  if (!rooms || !loggedInUser) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{
          root: classes.drawer,
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.drawerUserProfile}>
          <Typography variant="h5" noWrap>
            {loggedInUser.userName ? loggedInUser.userName : null}
          </Typography>
          <Typography className={classes.timeOnline} variant="subtitle1" noWrap>
            {timeOnline ? `Online for ${timeOnline} min` : null}
          </Typography>
        </div>
        <Divider classes={{ root: classes.divider }} />
        <List>
          {rooms.map((room: Room) => {

            const { id, name } = room; 
            // TODO come up with a more elegant way of handling this path comparison as this way is bug prone.
            return (
              <ListItem
                component={Link}
                selected={parseInt(location.pathname.split("/")[2]) === id}
                to={`${match.url}/${id}`}
                button
                key={id}
              >
                <ListItemText primary={name} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route
            path={`${match.path}/:id`}
            render={(routerProps) => (
              <RenderChatRoom
                routerProperties={routerProps}
                currentUser={loggedInUser}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
};

export default App;
