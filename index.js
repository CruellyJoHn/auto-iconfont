let path = require("path");
let fs = require("fs");
let axios = require("axios");
let config = require("./config.json");

const isExits = (list, pid) => {
    return list.some(item => item.id === pid);
};

const getUserInfo = async () => {
    const URL = 'https://www.iconfont.cn/api/user/myprojects.json';

    // todo: 异常处理，如cookie过期等
    let { data } = await axios.get(URL, {
        headers: {
            cookie: config.cookie
        }
    });
    console.log(data);
    return data;
};

const downloadFile = async () => {
    const URL = 'https://www.iconfont.cn/api/project/download.zip';

    let { data } = await axios(URL, {
        method: 'get',
        headers: {
            cookie: config.cookie,
        },
        params: {
            pid: config.pid
        },
        responseType: 'stream'
    });
    data.pipe(fs.createWriteStream(path.join(__dirname, 'iconfont.zip')));
}

downloadFile();