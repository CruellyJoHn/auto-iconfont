import axios from "axios";
import unzip from "decompress";
import type { DownloadFile, UnzipFile, Config } from './interface';

const path = require("path");
const fs = require("fs");

const rootDir = process.cwd();

export const downloadFile: DownloadFile = (url, filename, opt = {}) => {
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

export const unzipFile: UnzipFile = async (url, filename, opt = { del: false }) => {
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

export const getConfigFile = (): Config => {
    const configPath = path.join(rootDir, 'auto-iconfont.config.json');
    let config = {} as Config;

    if(!fs.existsSync(configPath)){
        console.error('请配置config文件')
        return config;
    }

    try{
        config = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf8' }));
    }catch(e){
        console.error('请配置正确JSON格式');
    }

    return config;
}
