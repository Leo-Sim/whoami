
import {Theme, useMediaQuery} from "@mui/material";

import {createTheme} from "@mui/material";
import {BreakpointOverrides} from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
        desktop: true;
    }
}

const getThemeByPlatform = (): Theme => {
    const theme = createTheme({
        breakpoints: {
            values: {
                mobile: 0,
                tablet: 640,
                desktop: 800,
            },
        },
    });

    return theme;
}

const getCurBreakPoint = () => {
    const theme = getThemeByPlatform();
    const mobile = useMediaQuery(theme.breakpoints.between('mobile', 'tablet'));
    const tablet = useMediaQuery(theme.breakpoints.between('tablet', 'desktop'));
    const desktop = useMediaQuery(theme.breakpoints.up( 'desktop'));

    if(mobile) {
        return 'mobile';
    } else if(tablet) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}
export {getThemeByPlatform, getCurBreakPoint}

