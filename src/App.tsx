import React from "react";

import {styled} from "@mui/material/styles";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Education from "./pages/pc/Education";

import Menus from "./component/common/Menus";

import { ContextProvider } from './context/context';
import ColorThemes from "./theme/colorThemes";
import Summary from "./pages/pc/Summary";
import Skills from "./pages/pc/Skills";

import {getCssByPlatform, getCurBreakPoint, getThemeByPlatform} from "./utils/platform";


const MENU_WIDTH_TABLET = 160;
const MENU_WIDTH_DESKTOP = 200;
const CONTENT_PADDING_NOT_MOBILE = 20;
const CONTENT_PADDING_MOBILE = 10;

export default () => {

    // set theme
    const globalContext = {
        theme: ColorThemes.GREEN
    }

    const isMobile = getCurBreakPoint() == "mobile"

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

    return (

        <div>
            <ContextProvider value={globalContext}>
                <BrowserRouter>

                    <Left>
                        <Menus></Menus>
                    </Left>

                    <Contents>
                        <Routes>
                            <Route path="/summary" element={<Summary />}></Route>
                            <Route path="/education" element={<Education />}></Route>
                            <Route path="/skills" element={<Skills />}></Route>
                            {/*<Route path="*" element={ <Navigate to="/" />} />*/}
                        </Routes>
                    </Contents>
                </BrowserRouter>
            </ContextProvider>
        </div>
    )
}