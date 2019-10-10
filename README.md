# 校园地图

[校园地图](http://wxy.bjczy.edu.cn:8065/map);
## 安装依赖
 ```
    npm install
 ```

## 本地运行
  ```
    npm run dev
 ```
## 打包
  ```
    npm run build
 ```

## 关于代码

代码实现思路

代码基于webpack分别打包各个文件，jquery操作dom和实现一些动画效果，three.js对模型进行一些操作，高德地图定位api。主要分为人视点、平面地图、3D地图、漫游功能，这几个主要功能都是在index.js中实现的。
1.人视点主要就是根据高德地图实时定位，获取到手机位置之后，通过计算把高德经纬度转换成在地图上的位置，把位置值赋给three.js相机，就可以实现用户所到达的位置与地图上的位置对应
2.平面地图主要是展示2D地图，主要就是加载一张地图图片，可以进行导航和位置的查询，位置查询就是模糊搜素建筑名字，返回匹配的值，导航通过自动寻路算法实现。
3.3D地图主要就是展示3D模型地图，主要就是加载一张地图图片和一些3D模型，也可以可以进行导航和位置的查询，说明如上。
4.漫游功能主要就是可以自己移动相机围着学校走一圈，先固定一个走的圈，然后获取到需要经过的点，赋值给相机，一直让相机移动，就实现了漫游功能。支持点击播放和暂停


目录结构如下

```
├── README.md
├── .babelrc      // 配置es6转es5
├── .gitignore    // git不提交的代码
├── package.json    // 需要下载依赖包名
|
├── src   // 所有的页面都在这里
│   ├── js     //  
|   |——static //静态文件
|   |   |——image //图片  
│   ├── style      // 
|   |—— utils //
|   |   ├── loadGltf.js   // 加载gltf模型对象
|   |   ├── more.js       // 一些可能会用到的代码
|   |   ├── test.json     // 寻路算法依赖的数组
|   |   └── util.js     // 一些公共的方法
|   |—— indx.html // 首页
|   |—— panorama.html // 全景图展示页面
|   |—— panoramaContainer.html // 全景图页面
|   |—— periphery.html // 发现周边页面
|   |—— photo.html // 轮播图页面（没用）
|   |—— roam.html // 漫游视频播放页面（没用）
|   |—— route.html // 起始点页面
|   |—— school.html // 学校页面
|
├── build   // webpack配置
│   ├── webpack.base.conf.js     //  全局webpack配置
│   ├── webpack.dev.conf.js      //  开发环境webpack配置
│   ├── webpack.prod.conf.js      // 生产环境webpack配置
|—— config // 环境配置
│   ├── dev.env   //  开发环境地址
│   ├── prod.env  //  生产环境地址
│    
└──
    
```

代码中方法基本都有注释