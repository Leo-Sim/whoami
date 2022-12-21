import React, {useState} from "react";

import {styled} from "@mui/material/styles";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Education from "./pages/pc/Education";
import WorkHistory from "./component/common/WorkHistory";

import Menus from "./component/common/Menus";

import { ContextProvider } from './context/context';
import ColorThemes from "./theme/colorThemes";
import Summary from "./pages/pc/Summary";
import Skills from "./pages/pc/Skills";

import {getCssByPlatform, getThemeByPlatform} from "./utils/platform";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";

import {FileReader, Sns} from "./utils/file";

const MENU_WIDTH_TABLET = 200;
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
            right: 0,
            borderSpacing:"5px"
        },{
            position: "absolute",
            bottom: 10,
            paddingLeft: "1px",
            borderSpacing:"12px"
        }, {
            position: "absolute",
            bottom: 10,
            paddingLeft: "1px",
            borderSpacing:"12px"
        })
    ));

    const SnsDiv = styled("div")((theme) => ({
        cursor: "pointer",
        position: "relative",
        display: "table-cell",
        width: "35px",
        height: "35px",
        verticalAlign: "middle",
        textAlign: "center",
        border: "1px solid black",
        borderRadius: "50%",
        backgroundColor: "white",
        // '&:hover': {
        //     transform: "scale(1.2)",
        //     marginRight: "20px",
        //     '& $Left': {
        //         width: "400px"
        //     }
        // }
    }));

    // Get all sns and show icon if exist.
    const fileReader = new FileReader();
    const sns: Sns = fileReader.getSNS();


    // state for sns buttons. This is for making icons big or small
    const [git, setGit] = useState(false);
    const [linkedin, setLinkedin] = useState(false);
    const [facebook, setFacebook] = useState(false);
    const [instagram, setInstagram] = useState(false);

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
                            <Route path="/work" element={<WorkHistory />}></Route>
                            <Route path="/skills" element={<Skills />}></Route>
                            {/*<Route path="*" element={ <Navigate to="/" />} />*/}
                        </Routes>
                    </Contents>
                </BrowserRouter>
            </ContextProvider>

            <SnsTemplate>

                { sns.github &&
                    <SnsDiv
                        onMouseEnter={() => setGit(true) }
                        onMouseLeave={() => setGit(false) }
                        style={git? { transform: "scale(1.3)"} : linkedin || facebook || instagram? { transform: "scale(0.7)"} : {}}>
                        <a href={sns.github} target='_blank'>
                            <FontAwesomeIcon  icon={faGithub} size={"lg"}/>
                        </a>
                    </SnsDiv>
                }

                { sns.linkedin &&
                    <SnsDiv onMouseEnter={() => setLinkedin(true) }
                            onMouseLeave={() => setLinkedin(false) }
                            style={linkedin? { transform: "scale(1.3)"} : git || facebook || instagram? { transform: "scale(0.7)"} : {}}>
                        <a href={sns.linkedin} target='_blank'>
                            <FontAwesomeIcon  icon={faLinkedin} size={"lg"}/>
                        </a>
                    </SnsDiv>
                }
                { sns.facebook &&
                    <SnsDiv onMouseEnter={() => setFacebook(true) }
                            onMouseLeave={() => setFacebook(false) }
                            style={facebook? { transform: "scale(1.3)"} : git || linkedin || instagram? { transform: "scale(0.7)"} : {}}>
                        <a href={sns.facebook} target='_blank'>
                            <FontAwesomeIcon  icon={faFacebook} size={"lg"}/>
                        </a>
                    </SnsDiv>
                }
                { sns.instagram &&
                    <SnsDiv onMouseEnter={() => setInstagram(true) }
                            onMouseLeave={() => setInstagram(false) }
                            style={instagram? { transform: "scale(1.3)"} : git || linkedin || facebook? { transform: "scale(0.7)"} : {}}>
                        <a href={sns.instagram} target='_blank'>
                            <FontAwesomeIcon  icon={faInstagram} size={"lg"}/>
                        </a>
                    </SnsDiv>
                }
            </SnsTemplate>
        </div>
    )
}

