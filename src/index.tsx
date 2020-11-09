import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import './index.css';
import App from './components/app';
import { MuiThemeProvider} from "@material-ui/core";

import { StylesProvider } from "@material-ui/styles";

import Login from "./components/login";
import theme from "./theme";


ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route path="/rooms" component={App}>
            </Route>
            <Route exact path="/" component={Login} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

