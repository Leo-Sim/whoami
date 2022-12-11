import React from "react";


import {BrowserRouter, Routes, Route} from "react-router-dom";
import Education from "./pages/pc/Education";

import Menus from "./component/common/Menus";

import { ContextProvider } from './context/context';
import ColorThemes from "./theme/colorThemes";
import Summary from "./pages/pc/Summary";

export default () => {

    // set theme
    const globalContext = {
        theme: ColorThemes.GREEN
    }


    return (
        <div>
            <ContextProvider value={globalContext}>
                <BrowserRouter>


                    <div>
                        <Menus></Menus>
                    </div>
                    <div>
                        <Routes>
                            <Route path="/summary" element={<Summary />}></Route>
                            <Route path="/education" element={<Education />}></Route>

                        </Routes>
                    </div>
                </BrowserRouter>
            </ContextProvider>

        </div>
    )
}