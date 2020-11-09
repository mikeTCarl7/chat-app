import { makeStyles, createStyles, Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginTop: "60%",
            marginLeft: "30%",
            marginRight: "30%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        },
        textField: {
            margin: theme.spacing(2)
        }
    }),
);

export default useStyles;