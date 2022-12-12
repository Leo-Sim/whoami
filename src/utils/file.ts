
import info from '../../public/info/detail.json';

interface FileContent {
    imagePath: string
    skills: Array<Skill>
}

interface Skill {
    name: string
    score: number
}

class FileReader {

    private f: FileContent;

    constructor() {
        this.f = info;
    }

    public getSkills(): Array<Skill> {
       return this.f.skills;
    }
}

export {FileContent, FileReader, Skill};