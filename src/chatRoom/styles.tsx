import { createStyles, makeStyles, Theme } from '@material-ui/core';
import {drawerWidth} from '../styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    messageInput: {
        flexDirection: "column",
        flexGrow: 3,
        margin: theme.spacing(2),
    },
    sendButton: {
        flexDirection: "column",
        padding: theme.spacing(2),
        margin: theme.spacing(3)
    },
    messageInputWrapper: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        boxShadow: theme.shadows[3],
    },
    footer: {
        position: "fixed",
        width: `calc(100% - ${drawerWidth}px)`,
        bottom: 0,
    }
}));

export default useStyles;