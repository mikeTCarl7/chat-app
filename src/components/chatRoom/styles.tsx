import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { drawerWidth } from "../app/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      alignItems: "center",
      background: theme.palette.background.paper,
      color: theme.palette.getContrastText(theme.palette.background.default),
    },
    messageList: {
      marginTop: theme.spacing(6),
      maxHeight: 1100,
      overflow: "scroll",
      scrollBehavior: "smooth",
    },
    toolbarSeparator: theme.mixins.toolbar,
    toolbar: {
      flexDirection: "column",
      padding: theme.spacing(1),
    },
    users: {
      display: "flex",
      flexDirection: "row",
    },
    user: {
      margin: theme.spacing(1),
    },
    userHiglighted: {
      color: theme.palette.primary.main,
    },
    message: {
      flexGrow: 0,
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
    },
    myMessage: {
      textAlign: "end",
      marginLeft: "auto",
      background: theme.palette.primary.main,
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    otherMessage: {
      marginRight: "auto",
      background: theme.palette.background.paper,
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
  })
);

export default useStyles;
