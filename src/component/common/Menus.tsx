/*
 * Left menus component for mobile and desktop
*/

import React, {useState} from "react";

import {Link} from "react-router-dom";

import {styled} from "@mui/material/styles";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {MenuList, MenuItem, ListItemIcon, ListItemText} from "@mui/material";
import {Collapse} from "@mui/material";
import {curTheme} from "../../context/context";

import {FontAwesomeIconProps} from "@fortawesome/react-fontawesome";

import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import SummarizeIcon from "@mui/icons-material/Summarize";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";

import baseTheme from "../../theme/baseTheme";

import {getThemeByPlatform, getCurBreakPoint, getCssByPlatform} from "../../utils/platform";

export default () => {

    const clickMobileMenuBtn = () => {
        setMenuDisplay(!isMenuHidden)
    }

    const colorTheme: baseTheme = curTheme();
    const theme = getThemeByPlatform()

    // Button for Showing/Hiding Menu. Display only on 'mobile'
    const MobileMenuBtn = styled(FontAwesomeIcon)(() => (
        getCssByPlatform(theme, {
            display: 'inline-block',
            paddingTop: "15px",
            paddingLeft: "10px",
            marginBottom: "14px"
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
                {/*<MobileMenuBtn fontSize="large"></MobileMenuBtn>*/}
                <MobileMenuBtn icon={faBars} size={"xl"}/>
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
                        <Link to={"/work"} onClick={() => isMobile && clickMobileMenuBtn()}>
                            <MenuItem>
                                <ListItemIcon>
                                    <WorkIcon sx={{color: colorTheme.textColor}} fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Work Experience</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link to={"/skills"} onClick={() => isMobile && clickMobileMenuBtn()}>
                            <MenuItem>
                                <ListItemIcon>
                                    <EditIcon sx={{color: colorTheme.textColor}} fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Skill</ListItemText>
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
                    </ColoredMenuList>
                </Collapse>
            }
        </div>
    )
}