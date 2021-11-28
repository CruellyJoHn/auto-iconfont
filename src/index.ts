import axios from "axios";
import { downloadFile, unzipFile, getConfigFile } from './util';
import type { IconProject, Config } from './interface';

class AutoIconfont {
    async init() {
        const config = getConfigFile();
        if(JSON.stringify(config) === '{}'){
            return;
        }

        const projects = await this.fetchUserProject(config);
        if(!this.checkProject(projects, Number(config.pid))){
            return;
        }

        this.getIconfont(config);
    }

    async fetchUserProject(config: Config): Promise<IconProject[]> {
        const URL = 'https://www.iconfont.cn/api/user/myprojects.json';
        let { data: result } = await axios.get(URL, {
            headers: {
                cookie: config.cookie
            }
        });
    
        // 异常处理，如cookie过期等
        let { data, message } = result;
        if(!data){
            console.error(message);
            return [];
        }
        return [...data.ownProjects, ...data.corpProjects];
    };

    async getIconfont(config: Config): Promise<void> {
        const DOWNLOAD_URL = 'https://www.iconfont.cn/api/project/download.zip';
        let { url: targetUrl } = await downloadFile(DOWNLOAD_URL, 'iconfont.zip', {
            headers: {
                cookie: config.cookie,
            },
            params: {
                pid: config.pid
            },
            responseType: 'stream'
        });
    
        targetUrl && await unzipFile(targetUrl, 'iconfont', {del: true});
    }

    checkProject(list: IconProject[], pid: number): boolean {
        let isExist = list.some(item => item.id === pid);
        if(!isExist){
            console.error('不存在该项目');
            return false;
        }
        return true;
    }
}

new AutoIconfont().init();