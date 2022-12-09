import React from "react";


import {BrowserRouter, Routes, Route} from "react-router-dom";

// pages
import Education from "./pages/Education";
// components
import Menus from "./component/Menus";

import { ContextProvider } from './context/context';
import Themes from "./theme/themes";

export default () => {

    // set theme
    const globalContext = {
        theme: Themes.WHITE
    }

    return (
        <div>
            <ContextProvider value={globalContext}>
                <BrowserRouter>
                    <div className={"w-40 absolute top-0 bottom-0"}>
                        <Menus></Menus>
                    </div>
                    <div className={"ml-40 pt-2"}>
                        <Routes>
                            <Route path="/education" element={<Education />}></Route>

                        </Routes>
                    </div>
                </BrowserRouter>
            </ContextProvider>

        </div>
    )
}