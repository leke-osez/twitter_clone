import fs from 'fs-extra';


export default function fileRelocator(fileName,userId,relPath){

    const newFilePath = `public/uploads/${userId}/` + relPath;
    const newDir =  newFilePath + fileName
    if(!fs.existsSync(newFilePath)){
        fs.ensureDirSync(newFilePath)
    }

    fs.move(`public/uploads/tmp/${fileName}`,newDir,function (err){
        if (err) {
            return console.error(err);
        }}
    )

    return '\\' + newFilePath.replace(/\//g,'\\')+fileName
}