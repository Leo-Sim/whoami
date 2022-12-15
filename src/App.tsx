import React from "react";

import {styled} from "@mui/material/styles";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Education from "./pages/pc/Education";

import Menus from "./component/common/Menus";

import { ContextProvider } from './context/context';
import ColorThemes from "./theme/colorThemes";
import Summary from "./pages/pc/Summary";
import Skills from "./pages/pc/Skills";

import {getCssByPlatform, getThemeByPlatform} from "./utils/platform";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";

import {FileReader, Sns} from "./utils/file";

const MENU_WIDTH_TABLET = 160;
const MENU_WIDTH_DESKTOP = 200;
const CONTENT_PADDING_NOT_MOBILE = 20;
const CONTENT_PADDING_MOBILE = 10;

export default () => {

    // set theme
    const globalContext = {
        theme: ColorThemes.BLACK
    }

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

    // social images div
    const SnsTemplate =  styled("div")(() => (
        getCssByPlatform(theme, {
            paddingLeft: CONTENT_PADDING_MOBILE + "px",
            paddingRight: CONTENT_PADDING_MOBILE + "px",
            position: "absolute",
            top: 2,
            right: 0
        },{
            position: "absolute",
            bottom: 10,
            paddingLeft: "10px"
        }, {
            position: "absolute",
            bottom: 10,
            paddingLeft: "10px"
        })
    ));

    const SnsDiv = styled("div")(() => ({
        display: "inline-block",
        cursor: "pointer",
        marginRight: "10px"
    }));

    // Get all sns and show icon if exist.
    const fileReader = new FileReader();
    const sns: Sns = fileReader.getSNS();

    return (

        <div>
            <ContextProvider value={globalContext}>
                <BrowserRouter>

                    <Left>
                        <Menus></Menus>
                        {/*<Font*/}
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

            <SnsTemplate>
                { sns.github &&
                    <SnsDiv>
                        <a href={sns.github} target='_blank'>
                            <FontAwesomeIcon  icon={faGithub} size={"2x"}/>
                        </a>
                    </SnsDiv>
                }
                { sns.linkedin &&
                    <SnsDiv>
                        <a href={sns.linkedin} target='_blank'>
                            <FontAwesomeIcon  icon={faLinkedin} size={"2x"}/>
                        </a>
                    </SnsDiv>
                }
                { sns.facebook &&
                    <SnsDiv>
                        <a href={sns.facebook} target='_blank'>
                            <FontAwesomeIcon  icon={faFacebook} size={"2x"}/>
                        </a>
                    </SnsDiv>
                }
                { sns.instagram &&
                    <SnsDiv>
                        <a href={sns.instagram} target='_blank'>
                            <FontAwesomeIcon  icon={faInstagram} size={"2x"}/>
                        </a>
                    </SnsDiv>
                }
            </SnsTemplate>
        </div>
    )
}

