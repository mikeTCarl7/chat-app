import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(6),
      overflow: "scroll",
      scrollBehavior: "smooth",
      overflowX: "hidden", // Hide horizontal scrollbar
      overflowY: "hidden",
    },
    message: {
      flexGrow: 0,
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      maxWidth: 500,
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
