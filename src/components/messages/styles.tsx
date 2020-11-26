import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(6),
      overflow: "scroll",
      scrollBehavior: "smooth",
      overflowX: "hidden", // Hide scrollbars
      overflowY: "hidden",
    }
  })
);

export default useStyles;
