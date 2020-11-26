import { createStyles, makeStyles, Theme } from "@material-ui/core";
// TODO: Put drawerwidth in some styleSheet config file.

import { drawerWidth } from "../app/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      width: `calc(100% - ${drawerWidth}px)`,
      bottom: 0,
    },
    messageInput: {
      flexGrow: 3,
      margin: theme.spacing(2),
    },
    messageInputWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      boxShadow: theme.shadows[3],
      background: theme.palette.background.paper,
    },
    messageList: {
      marginTop: theme.spacing(6),
      maxHeight: 1100,
      overflow: "scroll",
      scrollBehavior: "smooth",
    },
    sendButton: {
      padding: theme.spacing(2),
      margin: theme.spacing(3),
    },
  })
);

export default useStyles;
