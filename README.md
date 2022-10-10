# mylibs

这是开发 npm 包的脚手架，使用 ts 作为开发语言。
mylibs 指包名，实际使用请替换为正确的包名。
以下内容以 mylibs 为例。

## 使用

### 安装

`npm i mylibs`

### API

- 睡眠等待
  `function sleep(time: number): Promise<void>`

## 开发

### 依赖包

注意使用 dev 依赖，例如：

```
npm install axios --save-dev
```

### 源码编写

- `src` 目录下编写源码
- `test` 目录下编写测试
- `npm run test` 执行测试文件 `test/index.ts`

### 打包编译

```
npm run build 生成index.ts文件和.d.ts声明文件
```

### npm 发布

第一次发布：

- 修改版本号
- 提交 github
  `npm publish`

更新版本：
`npm run release`
