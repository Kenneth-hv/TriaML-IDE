import * as fs from 'fs';

export default class FileManager {
    static openFile(fileLocation: string): string {
        return fs.readFileSync(fileLocation,'utf8');
    } 
    
    static saveFile(fileLocation: string, fileContent: string){
        fs.writeFileSync(fileLocation, fileContent);
    }
}