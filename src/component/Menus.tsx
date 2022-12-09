import React from "react";

import {Link, useLocation} from "react-router-dom";

import {MenuList, MenuItem, ListItemIcon, ListItemText} from "@mui/material";
import {ContextProvider, curTheme} from "../context/context";

import SchoolIcon from '@mui/icons-material/School';

export default () => {


    return(
        <div>

            <MenuList >

                <Link to={"/education"}>
                    <MenuItem>
                        <ListItemIcon>
                            <SchoolIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Education</ListItemText>
                    </MenuItem>
                </Link>
                <MenuItem>history</MenuItem>
            </MenuList>
        </div>
    )
}