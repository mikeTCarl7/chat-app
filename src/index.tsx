import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";

import reportWebVitals from './reportWebVitals';
import theme from "./theme";
import RenderChatRoom from "./chatRoom";

const Bah = () =>{
  return <div>sdklfkjsdfl;kj </div>
}

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Switch>
          <Route exact path="/login" component={Bah}>
            <div>aboutasdfasdf</div>
          </Route>
          <Route path="/rooms" component={App}>
          </Route>
          {/* <Route exact path="/" component={Home} /> */}
          {/* <Route path='/rooms/:id' render={routerProps => <RenderChatRoom routerProperties={routerProps} currentUser={"Mike"} />} /> */}
          <Route exact path="/about">
            <div>about</div>
          </Route>
        </Switch>
        </MuiThemeProvider>
      </Router>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
