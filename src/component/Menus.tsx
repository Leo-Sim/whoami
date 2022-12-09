import React from "react";

import {MenuList, MenuItem} from "@mui/material";
import {ContextProvider, curTheme} from "../context/context";

export default () => {

    console.log('cur theme : ' + curTheme())

    return(
        <div style={{width:"100px"}}>

            <MenuList >
                <MenuItem>Profile</MenuItem>
                <MenuItem>history</MenuItem>
            </MenuList>
        </div>
    )
}