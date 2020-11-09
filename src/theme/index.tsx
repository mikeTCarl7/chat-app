import { createMuiTheme, Theme } from "@material-ui/core/styles";

function createLightTheme(): Theme {
    return createMuiTheme({
        palette: {
            primary: {
                main: "rgba(235,23,1)",
                dark: "rgba(183, 19, 1)",
                light: "rgba(254,109,93, .5)",
            },

            error: { main: "rgba(255, 68, 68)" },
            warning: { main: "rgba(244, 147, 2)" },
            success: { main: "rgba(1, 255, 144)" },
            text: {
                primary: "rgba(51, 51, 51)",
                secondary: "rgba(51, 51, 51, .7)",
                disabled: "rgba(51, 51, 51, .25)",
            },
            action: {
                hover: "rgba(0, 0, 0, .04)",
                hoverOpacity: 0.04,
                selected: "rgba(0, 0, 0, .2)",
                disabledBackground: "rgba(0, 0, 0, .12)",
                disabled: "rgba(0, 0, 0, .26)",
            },
            type: "light",
        },
        shape: {
            borderRadius: 8,
        },
    });
}

const lightTheme = createLightTheme();

export default lightTheme;
