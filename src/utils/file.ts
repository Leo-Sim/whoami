
import info from '../../public/info/detail.json';

interface FileContent {
    imagePath: string
    skills: Array<Skill>
    sns: Sns
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

    public getSkills(): Array<Skill> {
       return this.f.skills;
    }

    // return all name and URL value of SNS
    public getSNS() : Sns {
        return this.f.sns;
    }
}




export {FileContent, FileReader, Skill, Sns};