/*
 * Left menus component for mobile and desktop
*/

import React, {useState} from "react";

import {Link} from "react-router-dom";

import {styled} from "@mui/material/styles";

import {Box, AppBar, MenuList, MenuItem, ListItemIcon, ListItemText} from "@mui/material";
import {ContextProvider, curTheme} from "../context/context";

import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import Summarize from "@mui/icons-material/Summarize";

import baseTheme from "../theme/baseTheme";

import {getThemeByPlatform, getCurBreakPoint} from "../utils/utils";
import theme from "tailwindcss/defaultTheme";

export default () => {

    const clickMobileMenuBtn = (event: React.MouseEvent) => {
        setMenuDisplay(!isMenuHidden)
    }

    const colorTheme: baseTheme = curTheme();
    const sizetheme = getThemeByPlatform()

    // show only on 'mobile'
    const MobileMenuBtn = styled(MenuIcon)(({ theme }) => ({
        padding: sizetheme.spacing(1),
        [sizetheme.breakpoints.down('tablet')]: {
            display: 'inline-block'
        },
        [sizetheme.breakpoints.up('tablet')]: {
            display: 'none'
        },
        color: "black",
        fontSize: 40,
        cursor: "pointer"

    }));

    const curBreakPoint = getCurBreakPoint();

    const isMobileDisplay = curBreakPoint === "mobile"? true : false;

    // if menu is shown on mobile, show menu when 'MobileMenuBtn' is clicked
    const [isMenuHidden, setMenuDisplay] = useState<boolean>(isMobileDisplay)

    const menuWidth = isMobileDisplay? '100%' : '150px';
    const ColoredMenuList = styled(MenuList)(({theme}) => ({
        backgroundColor: colorTheme.bgColor,
        color: colorTheme.textColor,
        display: isMenuHidden? "none": "block",
        width: menuWidth

    }));



    return(
        <div>
            <div onClick={(event) => clickMobileMenuBtn(event)}>
                <MobileMenuBtn ></MobileMenuBtn>
            </div>
            isMenu Shown : {isMenuHidden}
            {
                !isMenuHidden &&
                <ColoredMenuList >
                    <Link to={"/summary"}>
                        <MenuItem>
                            <ListItemIcon>
                                <SchoolIcon sx={{color: colorTheme.textColor}} fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Summary</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link to={"/education"}>
                        <MenuItem>
                            <ListItemIcon>
                                <SchoolIcon sx={{color: colorTheme.textColor}} fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Education</ListItemText>
                        </MenuItem>
                    </Link>
                    <MenuItem>history</MenuItem>
                </ColoredMenuList>
            }
        </div>
    )
}