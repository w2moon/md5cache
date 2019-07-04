import * as fs from "fs";
import * as wlutil from "wlutil";

interface CacheInfo{
    md5?:string;
    date?:string;
}

export class MD5Cache{
    private configFile:string;

    private caches:{[path:string]:CacheInfo} = {};
    /**
     * @param configFile 存储路径
     */
    constructor(configFile:string){
        this.configFile = configFile;
        wlutil.createFolders(configFile,true);
        this.load();
    }

    private load():void{
        if(fs.existsSync(this.configFile)){
            try{
                let str = fs.readFileSync(this.configFile);
                this.caches = JSON.parse(str.toString());
            }
            catch(e){
                console.error(e);
            }
            
        }
    }

    private save(){
        fs.writeFileSync(this.configFile,JSON.stringify(this.caches));
    }

    /**
     * 文件是否和之前的记录相同
     * @param path 
     */
    isNew(path:string){
        let info = this.caches[path];
        if(!info){
            return true;
        }
        let md5 = wlutil.md5(path);
        return info.md5 !== md5;
    }

    /**
     * 记录文件,返回true代表和之前不一样，实际使用时看情况，如果判断和储存分开的话，要用isNew判断，逻辑都执行完后再record
     * @param path 
     */
    record(path:string){
        
        let info = this.caches[path];
        if(!info){
            info = {};
            this.caches[path] = info;
        }
        let md5 = wlutil.md5(path);
        if(md5 === info.md5){
            return false;
        }
        info.md5 = md5;
        info.date = new Date().toLocaleString();
        this.save();
        return true;
    }

   

   
}