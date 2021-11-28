import axios from "axios";
import { downloadFile, unzipFile } from './util.js';
import config from "../config.js";

const checkProject = (list, pid) => {
    let isExist = list.some(item => item.id === pid);
    if(!isExist){
        console.error('不存在该项目');
        return false;
    }
    return true;
};

const fetchUserProject = async () => {
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

const DOWNLOAD_URL = 'https://www.iconfont.cn/api/project/download.zip';
const getIconfont = async () => {
    let projects = await fetchUserProject();
    
    let isExist = checkProject(projects, Number(config.pid));
    if(!isExist){
        return;
    }

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

getIconfont();