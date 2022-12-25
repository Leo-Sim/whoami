import React from "react";

import "./css/global.css";
import {styled} from "@mui/material/styles";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Education from "./pages/pc/Education";
import Work from "./pages/pc/Work";
import Sns from "./component/common/Sns";

import Menus from "./component/common/Menus";

import {ContextProvider, curTheme} from './context/context';
import ColorThemes from "./theme/colorThemes";
import Summary from "./pages/pc/Summary";
import Skills from "./pages/pc/Skills";

import {getCssByPlatform, getThemeByPlatform} from "./utils/platform";
import {useTranslation} from "react-i18next";

const MENU_WIDTH_TABLET = 200;
const MENU_WIDTH_DESKTOP = 200;
const CONTENT_PADDING_NOT_MOBILE = 20;
const CONTENT_PADDING_MOBILE = 10;

export default () => {


    // #TODO get color theme from outside
    const colorTheme : ColorThemes = ColorThemes.BLACK

    // set theme
    const globalContext = {
        theme: colorTheme
    }

    const curColorTheme = curTheme(colorTheme);

    const theme = getThemeByPlatform();

    // div for menu
    const Left = styled("div")(() => (
        getCssByPlatform(theme, {
            position: "static",
            top: "auto",
            bottom: "auto",
            width: "100%"
        },{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: MENU_WIDTH_TABLET + "px"
        }, {
            position: "absolute",
            top: 0,
            bottom: 0,
            width: MENU_WIDTH_DESKTOP + "px"
        })
    ));
    // div for content
    let Contents = styled("div")(() => ({
        paddingTop: '5px'
    }));

    Contents = styled(Contents)(() => (
        getCssByPlatform(theme, {
            paddingLeft: CONTENT_PADDING_MOBILE + "px",
            paddingRight: CONTENT_PADDING_MOBILE + "px"
        },{
            paddingLeft: MENU_WIDTH_TABLET + CONTENT_PADDING_NOT_MOBILE + "px",
            paddingRight: CONTENT_PADDING_NOT_MOBILE + "px"
        }, {
            paddingLeft: MENU_WIDTH_DESKTOP + CONTENT_PADDING_NOT_MOBILE + "px",
            paddingRight: CONTENT_PADDING_NOT_MOBILE + "px"
        })
    ));
    const { t, i18n } = useTranslation()

    return (
        <div style={{fontFamily:"namu-buri", minHeight:"100vh", backgroundColor: curColorTheme.bgColor}}>
            <ContextProvider value={globalContext}>
                <BrowserRouter>

                    <Left >
                        <Menus></Menus>
                        {/*<Font*/}
                    </Left>

                    <Contents style={{height: "100%"}}>
                        <Routes>
                            <Route path="/summary" element={<Summary />}></Route>
                            <Route path="/education" element={<Education />}></Route>
                            <Route path="/work" element={<Work />}></Route>
                            <Route path="/skills" element={<Skills />}></Route>
                            {/*<Route path="*" element={ <Navigate to="/" />} />*/}
                        </Routes>
                    </Contents>
                </BrowserRouter>
            </ContextProvider>

            <Sns></Sns>
        </div>
    )
}

