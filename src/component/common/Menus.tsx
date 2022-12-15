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

import {getThemeByPlatform, getCurBreakPoint, getCssByPlatform} from "../../utils/platform";

export default () => {

    const clickMobileMenuBtn = () => {
        setMenuDisplay(!isMenuHidden)
    }

    const colorTheme: baseTheme = curTheme();
    const theme = getThemeByPlatform()

    // Button for Showing/Hiding Menu. Display only on 'mobile'
    const MobileMenuBtn = styled(MenuIcon)(() => (
        getCssByPlatform(theme, {
            display: 'inline-block',
            paddingTop: "5px",
            marginBottom: "10px"
        }, {
            display: 'none'
        }, {
            display: 'none'
        })
    ));

    const curBreakPoint = getCurBreakPoint();

    const isMobile = curBreakPoint === "mobile";

    // if menu is shown on mobile, show menu when 'MobileMenuBtn' is clicked
    const [isMenuHidden, setMenuDisplay] = useState<boolean>(isMobile)

    // const menuWidth = isMobileDisplay? '100%' : '100%';
    const ColoredMenuList = styled(MenuList)(() => ({
        backgroundColor: isMobile? colorTheme.bgColor : 'transparent',
        color: colorTheme.textColor,
        display: isMenuHidden? "none": "block"
    }));

    return(
        <div style={{
            backgroundColor: isMobile? 'transparent' : colorTheme.bgColor,
            height: '100%',
            width: '100%'}}
        >
            <div onClick={() => clickMobileMenuBtn()}>
                <MobileMenuBtn ></MobileMenuBtn>
            </div>

            {
                <Collapse timeout={700} in={!isMenuHidden}>
                    <ColoredMenuList>
                        <Link to={"/summary"} onClick={() => isMobile && clickMobileMenuBtn()}>
                            <MenuItem>
                                <ListItemIcon>
                                    <SummarizeIcon sx={{color: colorTheme.textColor}} fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Summary</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link to={"/education"} onClick={() => isMobile && clickMobileMenuBtn()}>
                            <MenuItem>
                                <ListItemIcon>
                                    <SchoolIcon sx={{color: colorTheme.textColor}} fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Education</ListItemText>
                            </MenuItem>
                        </Link>
                        <MenuItem>history</MenuItem>
                        <Link to={"/skills"} onClick={() => isMobile && clickMobileMenuBtn()}>
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