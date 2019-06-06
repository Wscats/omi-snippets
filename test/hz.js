const fileType = (filename)=>{
    const index1 = filename.lastIndexOf(".");
    const index2 = filename.length;
    const type = filename.substring(index1, index2);//后缀名
    return type;
}
