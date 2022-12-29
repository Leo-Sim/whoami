import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {getCssByPlatform, getThemeByPlatform} from "../../utils/platform";

const theme = getThemeByPlatform();

const BigText = styled(Box)(() =>
    getCssByPlatform(theme, {

    }, {

    }, {
        fontSize: "37px"
    })
);

const MiddleText = styled(Box)(() =>
    getCssByPlatform(theme, {

    }, {

    }, {
        fontSize: "28px"
    })
);

const SmallText = styled(Box)(() =>
    getCssByPlatform(theme, {

    }, {

    }, {
        fontSize: "20px"
    })
);


const TinyText = styled(Box)(() =>
    getCssByPlatform(theme, {

    }, {

    }, {
        fontSize: "14px"
    })
);


export {BigText, MiddleText, SmallText, TinyText}
