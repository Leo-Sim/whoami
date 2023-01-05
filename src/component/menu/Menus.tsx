/*
 * Left menus component for mobile and desktop
*/

import React, {useEffect, useState} from "react";

import {Link} from "react-router-dom";

import SubMenu from "./MenuItem";

import {styled} from "@mui/material/styles";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase, faComputer, faList, faBars} from "@fortawesome/free-solid-svg-icons";

import {ThemeProvider} from "@mui/material";

import {MenuList, MenuItem, ListItemIcon, ListItemText, Box} from "@mui/material";
import {Collapse} from "@mui/material";
import {curTheme} from "../../context/context";


import {FontAwesomeIconProps} from "@fortawesome/react-fontawesome";

import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import SummarizeIcon from "@mui/icons-material/Summarize";
import EditIcon from "@mui/icons-material/Edit";
import WorkIcon from "@mui/icons-material/Work";

import baseTheme from "../../theme/baseTheme";

import {getThemeByPlatform, getCurBreakPoint, getCssByPlatform, getCommonCss} from "../../utils/platform";


interface MenuProperties {
    children: React.ReactElement | React.ReactElement[]
}

export default (props: MenuProperties) => {

    useEffect(() => {
        console.log('@@@@dd')
    })

    const colorTheme = curTheme();
    const theme = getThemeByPlatform();


    const [isMenuHidden, setMenuHide] = useState<boolean>(true);

    const clickMobileBtn = () => {
        setMenuHide((prev) => !prev);
    }

    const [selected, setSelected] = useState<number>(0);
    const clickMenu = (id: number) => {
        setSelected(id);
        setMenuHide(true)
    }

    const MobileBar = styled(Box)(() => (
        getCssByPlatform(theme, {
            marginLeft: "15px",
            paddingTop: "10px",
            cursor: "pointer"
        }, {
            display: "none"
        }, {
            display: "none"
        })
    ));


    const MenuBox = styled(Box)(() => (
        getCssByPlatform(theme, {
            display: isMenuHidden? "none" : "block"
        }, {
        }, {
        })
    ));

    const selectedColor = "#888888"
    const ItemBox = styled(Box)(() => (
        getCommonCss(theme, {

            "&:hover": {
                color: selectedColor
            }

        })
    ))

    return (
        <Box style={{color: colorTheme.textColor}}>
            <ThemeProvider theme={theme}>

                {/* bar icon for mobile */}
                <MobileBar onClick={clickMobileBtn}>
                    <FontAwesomeIcon icon={faBars} size={"xl"}/>
                </MobileBar>

                {/* menu list */}
                <MenuBox>
                    <MenuList>
                        {
                            React.Children.map(props.children, (child, i) => {
                                if(child) {
                                    return (
                                        <ItemBox style={{color: selected === i? selectedColor : ""}}
                                                 component="span" onClick={() => clickMenu(i)}>
                                            <SubMenu name={child.props.name}
                                                         url={child.props.url}
                                                         icon={child.props.icon}/>
                                        </ItemBox>)
                                }
                                return (<Box></Box>)
                            })
                        }
                    </MenuList>
                </MenuBox>

            </ThemeProvider>
        </Box>
    )
}
