import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {getCssByPlatform, getThemeByPlatform} from "../../utils/platform";

const theme = getThemeByPlatform();

const BigText = styled(Box)(() =>
    getCssByPlatform(theme, {
        fontSize: "29px"
    }, {
        fontSize: "37px"
    }, {
        fontSize: "37px"
    })
);

const MiddleText = styled(Box)(() =>
    getCssByPlatform(theme, {
        fontSize: "22px"
    }, {
        fontSize: "28px"
    }, {
        fontSize: "28px"
    })
);

const SmallText = styled(Box)(() =>
    getCssByPlatform(theme, {
        fontSize: "14px"
    }, {
        fontSize: "20px"
    }, {
        fontSize: "20px"
    })
);


const TinyText = styled(Box)(() =>
    getCssByPlatform(theme, {
        fontSize: "11px"
    }, {
        fontSize: "14px"
    }, {
        fontSize: "14px"
    })
);

const Tiny2xsText = styled(Box)(() =>
    getCssByPlatform(theme, {
        fontSize: "9px"
    }, {
        fontSize: "12px"
    }, {
        fontSize: "12px"
    })
);


export {BigText, MiddleText, SmallText, TinyText, Tiny2xsText}
