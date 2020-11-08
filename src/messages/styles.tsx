import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginTop: theme.spacing(6),
        // maxHeight: 500,
        overflow: "scroll",
        scrollBehavior: "smooth",
    },
    message: {
        flexGrow: 0,
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius
    },
    myMessage: {
        textAlign: "end",
        marginLeft: "auto",
        background: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    otherMessage: {
        marginRight: "auto",
        background: theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.background.paper)
    },
}));

export default useStyles;