import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {getCssByPlatform, getThemeByPlatform} from "../../utils/platform";
import {FileReader, Sns} from "../../utils/file";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons";


export default () => {

    const theme = getThemeByPlatform();

    // social images div
    const SnsTemplate =  styled("div")(() => (
        getCssByPlatform(theme, {
            position: "absolute",
            top: 2,
            right: 0,
            borderSpacing:"5px"
        },{
            position: "absolute",
            bottom: 10,
            paddingLeft: "1px",
            borderSpacing:"12px"
        }, {
            position: "absolute",
            bottom: 10,
            paddingLeft: "1px",
            borderSpacing:"12px"
        })
    ));

    const SnsDiv = styled("div")((theme) => ({
        cursor: "pointer",
        position: "relative",
        display: "table-cell",
        width: "35px",
        height: "35px",
        verticalAlign: "middle",
        textAlign: "center",
        border: "1px solid black",
        borderRadius: "50%",
        backgroundColor: "white",
        // '&:hover': {
        //     transform: "scale(1.2)",
        //     marginRight: "20px",
        //     '& $Left': {
        //         width: "400px"
        //     }
        // }
    }));

    // Get all sns and show icon if exist.
    const fileReader = new FileReader();
    const sns: Sns = fileReader.getSNS();


    // state for sns buttons. This is for making icons big or small
    const [git, setGit] = useState(false);
    const [linkedin, setLinkedin] = useState(false);
    const [facebook, setFacebook] = useState(false);
    const [instagram, setInstagram] = useState(false);

    return(
        <div>
            <SnsTemplate>

                { sns.github &&
                    <SnsDiv
                        onMouseEnter={() => setGit(true) }
                        onMouseLeave={() => setGit(false) }
                        style={git? { transform: "scale(1.3)"} : linkedin || facebook || instagram? { transform: "scale(0.7)"} : {}}>
                        <a href={sns.github} target='_blank'>
                            <FontAwesomeIcon  icon={faGithub} size={"lg"}/>
                        </a>
                    </SnsDiv>
                }

                { sns.linkedin &&
                    <SnsDiv onMouseEnter={() => setLinkedin(true) }
                            onMouseLeave={() => setLinkedin(false) }
                            style={linkedin? { transform: "scale(1.3)"} : git || facebook || instagram? { transform: "scale(0.7)"} : {}}>
                        <a href={sns.linkedin} target='_blank'>
                            <FontAwesomeIcon  icon={faLinkedin} size={"lg"}/>
                        </a>
                    </SnsDiv>
                }
                { sns.facebook &&
                    <SnsDiv onMouseEnter={() => setFacebook(true) }
                            onMouseLeave={() => setFacebook(false) }
                            style={facebook? { transform: "scale(1.3)"} : git || linkedin || instagram? { transform: "scale(0.7)"} : {}}>
                        <a href={sns.facebook} target='_blank'>
                            <FontAwesomeIcon  icon={faFacebook} size={"lg"}/>
                        </a>
                    </SnsDiv>
                }
                { sns.instagram &&
                    <SnsDiv onMouseEnter={() => setInstagram(true) }
                            onMouseLeave={() => setInstagram(false) }
                            style={instagram? { transform: "scale(1.3)"} : git || linkedin || facebook? { transform: "scale(0.7)"} : {}}>
                        <a href={sns.instagram} target='_blank'>
                            <FontAwesomeIcon  icon={faInstagram} size={"lg"}/>
                        </a>
                    </SnsDiv>
                }
            </SnsTemplate>
        </div>
    )
}