import React from "react";


import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Grid, Box, useMediaQuery} from "@mui/material";

import PC from './pages/pc/Pc'

import Menus from "./component/Menus";

import { ContextProvider } from './context/context';
import ColorThemes from "./theme/colorThemes";

export default () => {

    // set theme
    const globalContext = {
        theme: ColorThemes.GREEN
    }



    // determine platform

    // const leftBox = styled.

    return (
        <div>
            <ContextProvider value={globalContext}>
                <BrowserRouter>

                    <Menus></Menus>

                    {/*<PC></PC>*/}
                    {/*<div className={"w-40 absolute top-0 bottom-0"}>*/}
                    {/*    <Menus></Menus>*/}
                    {/*</div>*/}
                    {/*<div className={"ml-40 pt-2"}>*/}
                    {/*    <Routes>*/}
                    {/*        <Route path="/education" element={<Education />}></Route>*/}

                    {/*    </Routes>*/}
                    {/*</div>*/}
                </BrowserRouter>
            </ContextProvider>

        </div>
    )
}