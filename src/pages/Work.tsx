
import React from "react";

import {WorkInfo, ProjectInfo} from "../component/common/WorkInfo";
import {FileReader, WorkHistory, Project} from "../utils/file";

// #TODO replace text with text components (BigText, MiddleText, SmallText)
export default () => {

    const workHistory: Array<WorkHistory> = new FileReader().getWorkHistory();
    let w: any = [];

    // Add work history and projects
    workHistory.forEach( (work, i) => {

        let p: any = [];
        const projects = work.projects

        projects.forEach((project, j) => {
            p.push(<ProjectInfo key={j}
                                name={project.name}
                                startDate={project.startDate}
                                endDate={project.endDate? project.endDate : ""}
                                skills={project.skills}
                                role={project.role}
                                desc={project.desc}/>
            )
        });

         w.push(<WorkInfo key={i}
                          name={work.name}
                          location={work.location}
                          startDate={work.startDate}
                          endDate={work.endDate}
                          role={work.role}>

             {p}

             </WorkInfo>
         );



    })

    return(
        <div>
            { w }
        </div>
    )
}