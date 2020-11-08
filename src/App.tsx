import React, { useEffect, useState } from 'react';
import axios from "axios";

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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


 const PermanentDrawerLeft = ({match}) => {
  const classes = useStyles({});
  const [rooms, setRooms] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');
  const location = useLocation();



  const getRooms = async () => {
    const rooms = await axios.get(`/rooms`); // TODO romove axios : no need for axios as we don't need support of older browsers and we aren't concerned with setting timeout params and things of that nature
    setRooms(rooms.data);
  }
  // Get chatRooms on load
  useEffect(() => {
    // console.log('called useEffect')
    setLoggedInUser("Mike");
    getRooms();
  }, []);
//  const handleRouteClick = (e)=>{
//    const location = useLocation();
//    setLocation(location);
//  }

if (!rooms) {
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
        <div className={classes.toolbar} />
        <Divider />
        <div>
          <List>
            {rooms.map((room: any) => {
              console.log('room: ', room.name);
              console.log('id: ', room.id);

              console.log('location/path/:id ', location.pathname.split('/')[2])
              const { id, name } = room; // TODO come up with a more elegant way of handling this path comparison
              return <ListItem component={Link} selected={location.pathname.split('/')[2]==id} to={`${match.url}/${id}`} button key={id}>
                <ListItemText primary={name} />
              </ListItem>
            })}
          </List>
        </div>
        <ul role="nav">
          <li><Link to="/about">about</Link></li>
          <li><Link to="/">home</Link></li>
        </ul>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path={`${match.path}/:id`} render={(routerProps: RouteProps) => <RenderChatRoom routerProperties={routerProps} currentUser={loggedInUser} />} />
        </Switch>
      </main>
    </div>
  );
}

export default PermanentDrawerLeft
