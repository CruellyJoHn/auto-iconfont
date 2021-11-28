import axios from "axios";
import path from "path";
import fs from "fs";
import unzip from "decompress";

const rootDir = process.cwd();
export const downloadFile = (url, filename = 'iconfont.zip' ,opt = {}) => {
    const targetUrl = path.join(rootDir, filename);

    return new Promise(async (resolve, reject) => {
        try{
            let { data } = await axios(url, {
                method: 'get',
                ...opt
            });
    
            let writeStream = data.pipe(fs.createWriteStream(targetUrl));
            writeStream.on('close', () => {
                console.debug('文件下载完毕');
                resolve({
                    success: true,
                    url: targetUrl
                });
            });
        }catch(e){
            reject({
                success: false,
                message: '文件下载失败'
            })
        }
        
    })
}

export const unzipFile = async (url: any, filename = 'iconfont', opt = { del: false }) => {
    await unzip(url, path.join(rootDir, filename), {
        strip: 1  // 去掉解压出来的根目录，如font_xxxxx_yyyy
    });

    // 删除压缩包
    opt.del && fs.unlink(url, (err) => {
        if(err){
            console.error(err);
            return;
        }
        console.log('Zip deleted');
    });
}