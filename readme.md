## auto-iconfont
> 自动拉取阿里巴巴iconfont的项目，省去手动下载粘贴复制的烦恼；

### 使用方式

使用方式分为两种：
- 拉取的iconfont直接覆盖项目的iconfont文件
- 生成npm包，项目中只需要yarn upgrade升级对应的npm包即可

#### 覆盖项目中的iconfont文件

在配置文件中，配置uncovered以及coverPath
```
{
    ...
    uncovered: false,
    coverPath: './static/iconfont'
}
```