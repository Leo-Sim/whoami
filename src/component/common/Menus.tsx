/*
 * Left menus component for mobile and desktop
*/

import React, {useState} from "react";

import {Link} from "react-router-dom";

import {styled} from "@mui/material/styles";

import {MenuList, MenuItem, ListItemIcon, ListItemText} from "@mui/material";
import {Collapse} from "@mui/material";
import {curTheme} from "../../context/context";

import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import SummarizeIcon from "@mui/icons-material/Summarize";
import EditIcon from "@mui/icons-material/Edit";

import baseTheme from "../../theme/baseTheme";

import {getThemeByPlatform, getCurBreakPoint} from "../../utils/platform";

export default () => {

    const clickMobileMenuBtn = () => {
        setMenuDisplay(!isMenuHidden)
    }

    const colorTheme: baseTheme = curTheme();
    const sizetheme = getThemeByPlatform()

    // show only on 'mobile'
    const MobileMenuBtn = styled(MenuIcon)(() => ({
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

    const isMobileDisplay = curBreakPoint === "mobile";

    // if menu is shown on mobile, show menu when 'MobileMenuBtn' is clicked
    const [isMenuHidden, setMenuDisplay] = useState<boolean>(isMobileDisplay)

    // const menuWidth = isMobileDisplay? '100%' : '100%';
    const ColoredMenuList = styled(MenuList)(() => ({
        backgroundColor: isMobileDisplay? colorTheme.bgColor : 'transparent',
        color: colorTheme.textColor,
        display: isMenuHidden? "none": "block"

    }));

    return(
        <div style={{
            backgroundColor: isMobileDisplay? 'transparent' : colorTheme.bgColor,
            height: '100%',
            width: '100%'}}
        >
            <div onClick={() => clickMobileMenuBtn()}>
                <MobileMenuBtn ></MobileMenuBtn>
            </div>

            {
                <Collapse timeout={700} in={!isMenuHidden}>
                    <ColoredMenuList>
                        <Link to={"/summary"}>
                            <MenuItem>
                                <ListItemIcon>
                                    <SummarizeIcon sx={{color: colorTheme.textColor}} fontSize="small" />
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
                        <Link to={"/skills"}>
                            <MenuItem>
                                <ListItemIcon>
                                    <EditIcon sx={{color: colorTheme.textColor}} fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Skill</ListItemText>
                            </MenuItem>
                        </Link>
                        <MenuItem>history</MenuItem>
                    </ColoredMenuList>
                </Collapse>
            }
        </div>
    )
}