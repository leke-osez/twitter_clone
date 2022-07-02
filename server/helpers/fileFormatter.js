//changes default size (bytes) to other sizes (mb, kb, gb)
export const fileSizeFormatter = (bytes, decimal)=>{
    if (bytes === 0){
        return bytes;
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']
    const index = Math.floor(Math.log(bytes)/Math.log(1000))
    return parseFloat((bytes/Math.pow(1000,index))). toFixed(dm) + '-' + sizes[index]
}