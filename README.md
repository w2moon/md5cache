# md5cache

记录指定文件的md5值

let cache = new MD5Cache("记录文件路径");

let filePath = "文件路径";

// 是否新文件
if(cache.isNew(filePath)){
    // 记录并刷新这个文件
    cache.record(filePath);
}