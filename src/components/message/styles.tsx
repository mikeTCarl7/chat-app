import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        maxWidth: 900,
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
    messageText: {
      flexGrow: 0,
      padding: theme.spacing(1),
      maxWidth: 500,
    },
  })
);

export default useStyles;
