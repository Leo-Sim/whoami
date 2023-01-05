import React from "react";
import {Box, ListItemText, MenuItem} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface MenuItemProperties {
    name: string
    url: string
    icon?: IconDefinition
}

export default (props: MenuItemProperties) => {

    const url = props.url.startsWith("/")? props.url : "/" + props.url;


    return (
        <Link to={url}>
        <MenuItem >

                {
                    props.icon &&
                    <FontAwesomeIcon icon={props.icon}
                                     size={"lg"}
                                     style={{marginRight: "7px"}}
                    />

                }
                <Box style={{display: "inline-block"}}>
                    <ListItemText>{props.name}</ListItemText>
                </Box>

        </MenuItem>
        </Link>
    )
}