import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import App from "./components/app";
import { MuiThemeProvider } from "@material-ui/core";

import { StylesProvider } from "@material-ui/styles";

import Login from "./components/login";
import theme from "./shared/theme";

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route path="/rooms" component={App}></Route>
            {/* TODO also wire up the history so that users can go back */}
            {/* // TODO route user to Login only if they are not already stored in the session storage */}
            <Route exact path="/" component={Login} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
