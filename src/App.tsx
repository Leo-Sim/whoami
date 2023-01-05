import React from "react";

import "./css/global.css";
import {styled} from "@mui/material/styles";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Personal from "./pages/Personal";
import Work from "./pages/Work";
import Sns from "./component/common/Sns";

import Menus from "./component/menu/Menus";
import MenuItem from "./component/menu/MenuItem";

import {ContextProvider, curTheme} from './context/context';
import ColorThemes from "./theme/colorThemes";
import Summary from "./pages/Summary";
import Skills from "./pages/Skills";

import {getCssByPlatform, getThemeByPlatform} from "./utils/platform";
import {useTranslation} from "react-i18next";
import {faBriefcase, faList, faScrewdriverWrench, faPerson} from "@fortawesome/free-solid-svg-icons";

const MENU_WIDTH_TABLET = 200;
const MENU_WIDTH_DESKTOP = 200;
const CONTENT_PADDING_NOT_MOBILE = 20;
const CONTENT_PADDING_MOBILE = 30;

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
                        <Menus>
                            <MenuItem name={t("summary")} url="/summary" icon={faList}/>
                            <MenuItem name={t("work")} url="/work" icon={faBriefcase}/>
                            <MenuItem name={t("skills")} url="/skills" icon={faScrewdriverWrench}/>
                        </Menus>
                    </Left>

                    <Contents style={{height: "100%"}}>
                        <Routes>
                            <Route path="/summary" element={<Summary />}></Route>
                            <Route path="/work" element={<Work />}></Route>
                            <Route path="/skills" element={<Skills />}></Route>
                            <Route path="/personal" element={<Personal />}></Route>

                        </Routes>
                    </Contents>
                </BrowserRouter>
            </ContextProvider>

            <Sns></Sns>
        </div>
    )
}

