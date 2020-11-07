import React, { useEffect, useState } from 'react';
import axios from "axios";

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import RenderChatRoom from './chatRoom';
import useStyles from './styles';

import {
  Link,
  Switch,
  Route,
} from 'react-router-dom';

const Home = () => <div>
  <li>Browser</li><li>Runs on local machine</li><li>React renders user interface</li><li>React Router adds clickable links</li>
</div>


 const PermanentDrawerLeft = ({match}) => {
  const classes = useStyles({});
  const [rooms, setRooms] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');


  const getRooms = async () => {
    const rooms = await axios.get(`/rooms`); // TODO romove axios : no need for axios as we don't need support of older browsers and we aren't concerned with setting timeout params and things of that nature
    setRooms(rooms.data);
  }
  // Get chatRooms on load
  useEffect(() => {
    setLoggedInUser("Mike");
    getRooms();
  }, []);


  if (!rooms) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dash Chat          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <div>
          <List>
            {rooms.map((room: any) => {
              console.log('match: ', match);
              const { id, name } = room;
              return <ListItem component={Link} to={`${match.url}/${id}`} button key={id}>
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
          {/* <Route exact path="/" component={Home} /> */}
          <Route path={`${match.path}/:id`} render={routerProps => <RenderChatRoom routerProperties={routerProps} currentUser={loggedInUser} />} />
        </Switch>
      </main>
    </div>
  );
}

export default PermanentDrawerLeft
