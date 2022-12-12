import React from "react";

import {styled} from "@mui/material/styles";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Education from "./pages/pc/Education";

import Menus from "./component/common/Menus";

import { ContextProvider } from './context/context';
import ColorThemes from "./theme/colorThemes";
import Summary from "./pages/pc/Summary";
import Skills from "./pages/pc/Skills";

import {getCurBreakPoint} from "./utils/platform";

export default () => {

    // set theme
    const globalContext = {
        theme: ColorThemes.GREEN
    }

    const isMobile = getCurBreakPoint() == "mobile"
    // const menuWidth = isMobile? "100%" : "160px";

    // div for menu
    const Left = styled("div")(() => ({
        position: isMobile? 'static' : 'absolute',
        top: isMobile? 'auto' : '0',
        bottom: isMobile? 'auto' : '0',
        width: isMobile? "100%" : "160px"
    }));

    // div for content
    const Contents = styled("div")(() => ({
        paddingLeft: isMobile? '10px' : '170px',
        paddingTop: '5px'

    }));

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
                        </Routes>
                    </Contents>
                </BrowserRouter>
            </ContextProvider>
        </div>
    )
}