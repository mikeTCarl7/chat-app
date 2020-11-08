import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { drawerWidth } from '../styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        alignItems: "center",

        // padding: theme.spacing(3)
    },
    footer: {
        position: "fixed",
        width: `calc(100% - ${drawerWidth}px)`,
        bottom: 0,
    },
    messageInput: {
        // flexDirection: "column",
        flexGrow: 3,
        margin: theme.spacing(2),
    },
    messageInputWrapper: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        boxShadow: theme.shadows[3],
    },
    sendButton: {
        // flexDirection: "column",
        padding: theme.spacing(2),
        margin: theme.spacing(3)
    },
    // needed for chat content to be below bar
    toolbarSeparator: theme.mixins.toolbar,
    toolbar: {
        flexDirection: "column"
    },
    users: {
        display: "flex",
        flexDirection: "row"
    }
}));

export default useStyles;