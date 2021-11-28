import type { AxiosRequestConfig } from "axios";

interface FileRes {
    success: boolean;
    message?: string;
    url?: string;
}

export type DownloadFile = (url: string, filename: string, opt: AxiosRequestConfig) => Promise<FileRes>;
export type UnzipFile = (url: string, filename: string, opt?:{ del: boolean }) => Promise<void>;

// config的配置
export interface Config {
    cookie: string;
    pid: number;
}

// 后台返回的project数据
export interface IconProject {
    id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
    guid: string;
}