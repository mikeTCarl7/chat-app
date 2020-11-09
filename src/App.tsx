import React, { useEffect, useState } from 'react';
import axios from "axios";

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography";
import RenderChatRoom from './chatRoom';
import useStyles from './styles';
import { useLocation } from 'react-router-dom'


import {
  Link,
  Switch,
  Route,
  RouteProps
} from 'react-router-dom';

const Home = () => <div>
  <li>Browser</li><li>Runs on local machine</li><li>React renders user interface</li><li>React Router adds clickable links</li>
</div>


const PermanentDrawerLeft = ({ match }) => {
  const classes = useStyles({});
  const [rooms, setRooms] = useState([]);
  const userName = sessionStorage.getItem('user')
  const [loggedInUser, setLoggedInUser] = useState(userName);
  const location = useLocation();



  const getRooms = async () => {
    const rooms = await axios.get(`/rooms`); // TODO romove axios : no need for axios as we don't need support of older browsers and we aren't concerned with setting timeout params and things of that nature
    setRooms(rooms.data);
  }
  // Get chatRooms on load
  useEffect(() => {
    // console.log('called useEffect')
    setLoggedInUser(JSON.parse(sessionStorage.getItem('user')));
    console.log(loggedInUser);
    getRooms();
  }, []);



  function computeTimeOnline(start: number, end: number) {
    debugger
    const msDifference = end - start;
    // const dateDifference = new Date(msDifference);
    const secondDifference = (msDifference) / 1000

    const minutes = Math.floor((secondDifference % 3600) / 60)
    return `Online for ${minutes} minutes`
  }


  if (!rooms || !loggedInUser) {
    return <div>Something went wrong</div>;
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
            {loggedInUser ? loggedInUser.userName : null}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            {loggedInUser ? computeTimeOnline(loggedInUser.loginTime, new Date().getTime()) : null}
          </Typography>
        </div>

        <Divider classes={{ root: classes.divider }} />

        <List>
          {rooms.map((room: any) => {
            console.log('room: ', room.name);
            console.log('id: ', room.id);

            console.log('location/path/:id ', location.pathname.split('/')[2])
            const { id, name } = room; // TODO come up with a more elegant way of handling this path comparison
            return <ListItem component={Link} selected={location.pathname.split('/')[2] == id} to={`${match.url}/${id}`} button key={id}>
              <ListItemText primary={name} />
            </ListItem>
          })}
        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path={`${match.path}/:id`} render={(routerProps) => <RenderChatRoom routerProperties={routerProps} currentUser={loggedInUser} />} />
        </Switch>
      </main>
    </div>
  );
}

export default PermanentDrawerLeft
