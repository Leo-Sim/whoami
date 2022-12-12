
import info from '../../public/info/detail.json';

interface FileContent {
    imagePath: string
    skills: Array<object>

}

class FileReader {

    private f: FileContent;

    constructor() {
        this.f = info;
    }

    public getSkills(): Array<object> {
       return this.f.skills;
    }
}

export {FileContent, FileReader};