// Read resume file and parse into separate information

import info from '../../public/info/detail.json';

interface FileContent {
    skills: Array<Skill>
    sns: Sns,
    workHistory: Array<WorkHistory>
    personalInfo: PersonalInfo
}

interface PersonalInfo {
    name: string
    email: string
    phone?: string
    imagePath?: string
    // paragraph is separated by array index
    descriptions: Array<string>
}

interface WorkHistory {
    name: string
    location: string
    startDate: string
    endDate?: string
    role: string
    projects?: Array<Project>
}

interface Project {
    name: string
    startDate: string
    endDate?: string
    skills: Array<string>
    role: Array<string>
    desc: string
}

interface Skill {
    name: string
    score: number
}

// Possible list of SNS.
interface Sns {
    github?: string
    linkedin?: string
    facebook?: string
    instagram?: string
}

class FileReader {

    private f: FileContent;

    constructor() {
        this.f = info;
    }

    public getPersonalInfo(): PersonalInfo {
        return this.f.personalInfo;
    }

    public getSkills(): Array<Skill> {
       return this.f.skills;
    }

    // return all name and URL value of SNS
    public getSNS() : Sns {
        return this.f.sns;
    }

    public getWorkHistory() : Array<WorkHistory> {
        return this.f.workHistory;
    }
}




export {FileContent, FileReader, Sns};
export {Skill}
export {WorkHistory, Project, PersonalInfo}