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
        background: theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.background.default)

        // padding: theme.spacing(3)
    },
    footer: {
        position: "fixed",
        width: `calc(100% - ${drawerWidth}px)`,
        bottom: 0,
        zIndex: 2
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
    messageList: {
        marginTop: theme.spacing(6)
    },
    sendButton: {
        // flexDirection: "column",
        padding: theme.spacing(2),
        margin: theme.spacing(3)
    },
    // needed for chat content to be below bar
    toolbarSeparator: theme.mixins.toolbar,
    toolbar: {
        flexDirection: "column",
        padding: theme.spacing(1)
    },
    users: {
        display: "flex",
        flexDirection: "row",
    },
    headerItem: {
        margin: theme.spacing(1),
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