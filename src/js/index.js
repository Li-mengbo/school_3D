import '../style/index';
import '../style/style';
import { GetQueryString, fuzzyQuery, CalculationX, CalculationZ, unid, erwei } from '../utils/util';
import loadGltf from '../utils/loadGltf';
import $ from 'jquery';
import arrJson from '../utils/test.json';
console.log(process.env.BASE_API)
var vConsole = new VConsole();
if(navigator.userAgent.indexOf('iPhone') == -1) {
    //防止页面后退
    var XBack = {};
    
    (function(XBack) {
        XBack.STATE = 'x - back';
        XBack.element;

        XBack.onPopState = function(event) {
            event.state === XBack.STATE && XBack.fire();
            XBack.record(XBack.STATE); //初始化事件时，push一下
        };

        XBack.record = function(state) {
            history.pushState(state, null, location.href);
        };

        XBack.fire = function() {
            var event = document.createEvent('Events');
            event.initEvent(XBack.STATE, false, false);
            XBack.element.dispatchEvent(event);
        };

        XBack.listen = function(listener) {
            XBack.element.addEventListener(XBack.STATE, listener, false);
        };

        XBack.init = function() {
            XBack.element = document.createElement('span');
            window.addEventListener('popstate', XBack.onPopState);
            XBack.record(XBack.STATE);
        };

    })(XBack); // 引入这段js文件

    XBack.init();
    XBack.listen(function() {});
}
// 模型是否加载完毕
const gltfEnd = localStorage.getItem('gltfEnd');
// 默认为地三人称相机
let controlsFlag = GetQueryString('controlsFlag') || '';
/* 地图路线绘制 */
/* 必须有的值
    * scene 场景
    * camera 相机
    * renderer 渲染器 
    * controls 控制器
    * meshEnd 终点坐标
    * curve路线的绘制
    * progress 漫游相机速度
    * startPathX 在x轴上的位置
    * startPathZ 在z轴上的位置
    * controlsFlag 相机切换
    * stepsList 路线点
    * clickX 点击终点的x坐标
    * clickZ 点击终点的y坐标
    * center 全景图位置
    * nearby 附近的坐标
    * startCenter 导航起点
    * endCenter 导航终点
    * position 校园风光位置
    * meshBg 地图底图
*/
let scene, camera, renderer, controls, mesh, meshEnd, curve, progress=0, startPathX, startPathZ, stepsList = [], clickX, clickZ;
const nearby = GetQueryString('nearby');
const startCenter = GetQueryString('startCenter');
const endCenter = GetQueryString('endCenter');
const position = GetQueryString('position');
let startPosition = [];
// 是否缓存
// const storageDB = localStorage.getItem('storageDB')
/* 初始坐标在北门 */
startPathX = 116.648592;
startPathZ = 39.921754;
/* 创建场景 */
function initScene() {
    scene = new THREE.Scene();
}
/* 相机 */
function initCamera() {
    /*
    * 视野
    * 宽高比
    * 近端渲染
    * 远端剪切平面可以看到多远
    */
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    // 修改相机坐标
    camera.position.set(CalculationX(startPathX), .18, CalculationZ(startPathZ));

}

/* 渲染器 */
function initRender() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    document.getElementById('three').appendChild(renderer.domElement);
    
}

/* 灯光 */
function initLight() {
  let light = 1.2;
  // 半球光就是渐变的光；
  // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
  var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0xffffff, light);

   // 方向光是从一个特定的方向的照射
   // 类似太阳，即所有光源是平行的
   // 第一个参数是关系颜色，第二个参数是光源强度
  var shadowLight = new THREE.DirectionalLight(0xffffff, light);

    // 设置光源的方向。  
   // 位置不同，方向光作用于物体的面也不同，看到的颜色也不同
   shadowLight.position.set(100, 100, 100);

    // 为了使这些光源呈现效果，只需要将它们添加到场景中
    var ambientLight = new THREE.AmbientLight(0xffffff, light);
    var spotLight = new  THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(100, 100, 100);
    scene.add(spotLight);
    scene.add(ambientLight);
    scene.add(hemisphereLight);  
    scene.add(shadowLight);
}

/* 
* 控制器
* 控制相机使用模式
* OrbitControlsTwo修改的第三人称相机源码加了范围和手势拖动
* FirstPersonControls 修改相机为第一人称漫游和人物视角可以用
*/
function initControls() {
    // 第一人称相机控制器
    controls = new THREE.FirstPersonControls(camera, renderer.domElement);
    controls.actualLookSpeed = 300; //相机移动速度
    controls.noFly = true;
    controls.constrainVertical = true; //约束垂直
    // 控制第一人称上下视角角度
    controls.verticalMin = 1.0;
    controls.verticalMax = 2.0;
    controls.lat = 0; //初始视角进入后y轴的角度
    controls.lon = 90;
}
// 模型加载个数初始值
let gltfNum = 0;
/* 场景中的内容加载gltf格式也可以换成其他格式*/
function initContent() {
    console.log('模型个数',loadGltf.length)
    const gltfLength = loadGltf.length;
    // 加载 glTF 格式的模型
    let loader; /*实例化加载器*/
    // 分批加载资源
    loadGltf.forEach((item, index) => {
        //  Files
        loader = new THREE.GLTFLoader();
        loader.load(`${process.env.BASE_API}3dschool/School/${item.name}/${item.name}.gltf`, function (obj) {              
            /*简便加载gltf模型*/
            var object = obj.scene
            // 修改位置坐标
            object.position.y = 0;
            object.position.x = 0;
            object.position.z = 0;
            if(controlsFlag == 'renwu') {
                scene.add(object);
            }else {
                gltfNum++
                if(gltfNum == gltfLength) {
                    // $('#loading').hide();
                    localStorage.setItem('gltfEnd', true); 
                }
                console.log('mocing',gltfNum)
            }
    
        }, function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    
        }, function (error) {
            console.log('load error!' + error.getWebGLErrorMessage());
    
        })
    })

}

/* 地图底图 加载底图图片 PlaneGeometry二维平面*/
function initBg() {
    var skyBoxGeometry2 = new THREE.PlaneGeometry(164, 164, 1);
    var texture = new THREE.TextureLoader().load(`${process.env.BASE_API}3dschool/schoolatlas/Aischool.png`);
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });
    var meshBg = new THREE.Mesh(skyBoxGeometry2, material);
    meshBg.position.y = 0;
    meshBg.position.x = 0;
    meshBg.position.z = 0;
    meshBg.rotation.x += -0.5 * Math.PI;
    scene.add(meshBg);  
    // var skyBoxGeometry1 = new THREE.PlaneGeometry(78, 39, 1);
    // for(let i = 1, n = 5; i <= n; i++) {
    //     // ${process.env.BASE_API}
    //     if(controlsFlag == '3d' || controlsFlag == 'manyou' || controlsFlag == 'renwu') {
    //         var texture = new THREE.TextureLoader().load(`${process.env.BASE_API}/3dschool/schoolatlas/0${i}a.png`);
    //     }else {
    //         var texture = new THREE.TextureLoader().load(`${process.env.BASE_API}/3dschool/schoolatlas/0${i}.png`);
    //     }
    //     var material = new THREE.MeshBasicMaterial({
    //         map: texture,
    //         transparent: true
    //     });
    //     const meshBg = new THREE.Mesh(skyBoxGeometry1, material);
    //     meshBg.position.y = 0;
    //     meshBg.position.x = 0;
    //     meshBg.position.z = 0;
    //     meshBg.rotation.x += -0.5 * Math.PI;
    //     scene.add(meshBg);
    // }
    // var skyBoxGeometry2 = new THREE.PlaneGeometry(164, 164, 1); 
    // for(let i = 1, n = 4; i <= n; i++) {
    //     // ${process.env.BASE_API}
    //     var texture = new THREE.TextureLoader().load(`${process.env.BASE_API}3dschool/schoolatlas/m0${i}.png`);
    //     var material = new THREE.MeshBasicMaterial({
    //         map: texture,
    //         transparent: true
    //     });
    //     var meshBg = new THREE.Mesh(skyBoxGeometry2, material);
    //     meshBg.position.y = -.4;
    //     meshBg.position.x = .3;
    //     meshBg.position.z = 2;
    //     meshBg.rotation.x += -0.5 * Math.PI;
    //     scene.add(meshBg);
    // }    
}

/* 加载天空盒子 */
function makeSkybox() {
    //这部分是给出图片的位置及图片名
    var directions  = ["px", "nx", "py", "ny", "pz", "nz"];//获取对象
    //创建一个立方体并且设置大小
    var skyGeometry = new THREE.CubeGeometry( 160, 160, 160 );
    //这里是用于天空盒六个面储存多个材质的数组
    var materialArray = [];
    //循环将图片加载出来变成纹理之后将这个物体加入数组中
    for (var i = 0; i < 6; i++)
        materialArray.push( new THREE.MeshBasicMaterial({
            //这里imagePrefix + directions[i] + imageSuffix 就是将图片路径弄出来
            map: new THREE.TextureLoader().load(`${process.env.BASE_API}3dschool/skybox/${directions[i]}.png`),
            side: THREE.BackSide  //因为这里我们的场景是在天空盒的里面，所以这里设置为背面应用该材质
        }));

    //MultiMaterial可以将MeshBasicMaterial多个加载然后直接通过Mesh生成物体
    var skyMaterial = new THREE.MultiMaterial( materialArray );
    //加入形状skyGeometry和材质MultiMaterial
    var sky = new THREE.Mesh( skyGeometry, skyMaterial );
    //设置天空盒的高度
    sky.position.y = 0;
    //场景当中加入天空盒
    scene.add( sky );
}

/* 窗口变动触发 */
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/* 初始化 */
function init() {
    
    initScene();
    initRender();
    initCamera();
    initLight();
    initControls();
    //以centerLng所在点tile中心点为中心，加载tile
    // loadMap(tilePos.tileinfo.x, tilePos.tileinfo.y);
    initBg();
    makeSkybox();

    if(gltfEnd) {
        initContent();
    }else {
        setTimeout(function() {
            initContent();
        },10000)
    }
    
    /* 监听事件 */
    window.addEventListener('resize', onWindowResize, false);

}

var clock = new THREE.Clock();
var renderEnabled;

/* 循环渲染 */
function animate() {
    // requestAnimationFrame(animate);
    controls.update(clock.getDelta());

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
    // renderer.render(scene, camera);
}


/* 初始加载 */
(function () {
    console.log("three init start...");
    if (controlsFlag == 'renwu') {
        init();
        animate();
        $('#three').show();
    }
    console.log("three init send...");
})();


// 导航初始值
let initCenter = [116.648432,39.92166];
//导航结束值
let endPosition = [];
var imageLayer = new AMap.ImageLayer({
    url: `${process.env.BASE_API}3dschool/schoolatlas/Aischool.png`,
    bounds: new AMap.Bounds(
        [116.643445,39.918988],
        [116.651047,39.921962]
    ),
    zooms: [16, 19]
});
const map = new AMap.Map("mapBox", {
    viewMode:'3D',
    resizeEnable: true,
    rotateEnable: true,
    pitchEnable: true,
    pitch: 40,
    rotation: 15,
    zoom: 17,
    zooms:[16,19],
    showBuildingBlock: true, // 设置地图显示3D楼块效果，移动端也可使用。推荐使用。
    // showLabel: false,
    center: [116.647643,39.920574],
    // mapStyle: 'amap://styles/macaron',
    // showIndoorMap: false,
    zoomEnable: true, // 地图是否可缩放
    forceVector:true,
    expandZoomRange: true,
    buildingAnimation:true,//楼块出现是否带动画
    layers: [
        // 高德默认标准图层
        new AMap.TileLayer(),
        imageLayer,
    ]
});
// 限制显示范围
// var bounds = map.getBounds();
// map.setLimitBounds(bounds);
// 取消楼快
map.setFeatures( ['bg', 'road', 'point']);
// 创建Object3DLayer图层
var object3Dlayer = new AMap.Object3DLayer();
map.add(object3Dlayer);
// 人的位置
const people  = new AMap.Marker({
    position: new AMap.LngLat(startPathX, startPathZ),
    content: `<div class="custom-content-marker" style="width: 13px; height: 13px;">
                <img style="width: 13px;height: 13px;position: absolute;left: 0;top: 0;" src="${process.env.BASE_API}3dschool/img/ren.png">
            </div>`,
    map: map,
    offset: new AMap.Pixel(0, 0),
    angle: 145
})
console.log(loadGltf)
map.plugin(["AMap.GltfLoader"], function () {
    var gltfObj = new AMap.GltfLoader();
    loadGltf.forEach(item => {
        gltfObj.load(`${process.env.BASE_API}3dschool/School/${item.name}/${item.name}.gltf`, function (gltfCity) {
            gltfCity.setOption(item.paramCity);
            gltfCity.rotateX(-90);
            gltfCity.rotateY(-180);
            gltfCity.rotateZ(-180);
            object3Dlayer.add(gltfCity);
        });
    })
});
/*模糊查询列表 */
let mapList = [];
// 获取模糊查询信息
$.ajax({ 
    // ${process.env.BASE_API}
    url: `${process.env.BASE_API}school-map/sitePosition/getAll`, 
    success: function(res){
        console.log('模糊查询',res)
        if(res.code == 200) {
            mapList = res.data;
            res.data.forEach((item) => {
                new AMap.Marker({
                    position: item.center.split(','),
                    offset: new AMap.Pixel(-50, -10),
                    map: map,
                    content: '<div class="custom-content-marker" style="width: 100px;color: #fff;text-align: center;">' +
                    '   <div class="close-btn">' + item.name + '</div>' +
                    '</div>'
                });
            })
        }
    }
});

/* 以下是地图逻辑 */
$('input').on('input', function(e){
    const str = $('input').val();
    if(!str) {
        $('.search-list').hide().html('')
        return
    };
    $('.search-list').show().html('');
    let searchList = fuzzyQuery(mapList, str);
    if(searchList.length > 0) {
        searchList.forEach(function(item){
            $('.search-list').append(`<li class="search-position" data-position="${item.center}">${item.name}</li>`)
        })
        // 搜索位置并导航
        $('.search-position').click(function() {
            $('.search-list').hide();
            $('.footer').hide();
            $('.school').hide();
            $('.panorama').hide();
            const name = $(this).html();
            const position = $(this).attr('data-position').split(',');
            endPosition = position;
            map.setCenter(position);
            // map.clearMap();
            const marker = new AMap.Marker({
                position,
                offset: new AMap.Pixel(-10, -10),
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                map: map
            });
            $('.serach').hide();
            console.log('起点', startPathX, startPathZ)
            startPosition = [startPathX, startPathZ]
            walk([startPathX, startPathZ], position, name, false)
        })
    }else {
        $('.search-list').append('<li>没有查到</li>')
    }
    // 模糊查询关闭
    $('#three').click(function() {
        $('.search-list').hide()
    })
})
// 搜索模糊查询
$('.search-btn').click(function() {
    const str = $('input').val();
    if(!str) {
        $('.search-list').hide().html('')
        return
    };
    $('.search-list').show().html('');
    let searchList = fuzzyQuery(mapList, str);
    if(searchList.length > 0) {
        searchList.forEach(function(item){
            $('.search-list').append(`<li class="search-position" data-position="${item.center}">${item.name}</li>`)
        })
        // 搜索位置并导航
        $('.search-position').click(function() {
            $('.search-list').hide();
            $('.footer').hide();
            $('.school').hide();
            $('.panorama').hide();
            const name = $(this).html();
            const position = $(this).attr('data-position').split(',');
            endPosition = position;
            map.setCenter(position);
            // map.clearMap();
            const marker = new AMap.Marker({
                position,
                offset: new AMap.Pixel(-10, -10),
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                map: map
            });
            $('.serach').hide();
            walk([startPathX, startPathZ], position, name, false)
            // marker.on('click', function(e) {
                
            // })
        })
    }else {
        $('.search-list').append('<li>没有查到</li>')
    }
    // 模糊查询关闭
    $('#three').click(function() {
        $('.search-list').hide()
    })
})


// 附近跳转
if (nearby) {
    $('.head').show().find('span').html('发现周边');
    $('.return').attr('href', './periphery.html');
    $('.school').hide();
    $('.panorama').hide();
    $('.serach').hide();
    /* 异步方法 */
    function runAsync(){
        return new Promise(function(resolve, reject){
            // 获取周边详细信息
            $.ajax({ 
                // ${process.env.BASE_API}
                url: `${process.env.BASE_API}school-map/circum/getByTypeId?typeId=${nearby}`, 
                success: function(res){
                    console.log('周边详细信息',res)
                    if(res.code == 200) {
                        const zhoubian = res.data;
                        resolve(zhoubian);
                    }
                }
            });
        });        
    }
    runAsync().then(function(zhoubian) {
        zhoubian.forEach(item => {
            $('.nearby').append(
                `
                <div class="nearby-con">
                    <div class="nearby-details" data-position="${item.content}">
                        <img src="${item.imgUrl}" alt="">
                        <div class="left">
                            <span class="left-title">${item.name}</span>
                            <span>
                                ${item.description}
                            </span>
                        </div>
                    </div>
                </div>
                `
            )
        })
    }).then( function() {
        $('.nearby-details').click(function () {
            $('.nearby').hide();
            $('.footer').hide();
            const name = $(this).find('.left-title').html();
            const position = $(this).attr('data-position').split(',');
            endPosition = position;
            map.setCenter(position);
            console.log(position[0] ===  "116.646301" && position[1] === "39.921176")
            if (position[0] ===  "116.646301" && position[1] === "39.921176") {
                const marker = new AMap.Marker({
                    position: [116.646119,39.9216],
                    offset: new AMap.Pixel(-10, -10),
                    icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                    map: map
                });
            } else {
                const marker = new AMap.Marker({
                    position,
                    offset: new AMap.Pixel(-10, -10),
                    icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                    map: map
                });
            }

            walk([startPathX, startPathZ], position, name, false)
            // marker.on('click', function(e) {
            //     console.log(position)
            //     walk([startPathX, startPathZ], position, name, false)
            // })
        })
    })
    $('.nearby').show();
}

if (position) {
    $('.serach').hide();
    $('.menu').hide();
    $('.footer').hide();
    $('.head').show().find('span').html('主页面');
    const positions = position.split(',');
    const name = GetQueryString('name');
    map.setCenter(positions);
    // map.clearMap();
    const marker = new AMap.Marker({
        position: positions,
        offset: new AMap.Pixel(-10, -10),
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
        map: map
    });
    marker.on('click', function(e) {
        console.log(positions)
        walk([startPathX, startPathZ], positions, name, false)
    })
}

// 路线导航 
if(startCenter && endCenter) {
    $('.serach').hide();
    $('.menu').hide();
    $('.footer').hide();
    $('.head').show().find('span').html('主页面');
    const startCenterArr = startCenter.split(',');
    const endCenterArr = endCenter.split(',');
    // 加载终点和起点坐标 并且画线
    var startMarker = new AMap.Marker({
        position: startCenterArr,
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
        map: map
    })
    walk(startCenterArr, endCenterArr, '', true, false)
}
// 地图定位
function geolocation () {
    map.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 100000,        //超过10秒后停止定位，默认：无穷大
            noIpLocate: 1,          // 移动端不使用ip定位
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: false,        //显示定位按钮，默认：true
            showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: false,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:false,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            useNative: true            // 首先使用sdK定位
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
}
function onComplete(data) {
    if(data.position) {
        const initPosition = JSON.parse(JSON.stringify(data.position));
        startPathX = 116.643804 < initPosition.lng && initPosition.lng <116.650751 ? initPosition.lng : 116.648592;
        startPathZ = 38.921923 < initPosition.lat && initPosition.lat < 40.919047 ? initPosition.lat : 39.921754;
        console.log(startPathX, startPathZ)
        if(startPathX === 116.648592 && startPathZ === 39.921754) {
            return false
        }
        /*
        var str = [];
        str.push('定位结果：' + data.position);
        str.push('定位类别：' + data.location_type);
        if(data.accuracy){
             str.push('精度：' + data.accuracy + ' 米');
        }//如为IP精确定位结果则没有精度信息
        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
        document.getElementById('weizhi').innerHTML =  str.join('<br>') + '您的位置：'+startPathX+',<br/>'+startPathZ +'<br/>' +CalculationX(startPathX)+'<br/>' +CalculationZ(startPathZ);
        */
        if(controlsFlag !== 'renwu') {
            people.setPosition([startPathX, startPathZ])
            people.setAngle(-45)
        } else {
            camera.position.set(CalculationX(startPathX), .18, CalculationZ(startPathZ))
        }
        
    }
}
//解析定位错误信息
function onError(data) {
    // alert(JSON.stringify(data))
    // if(controlsFlag == 'pingmian' || controlsFlag == '3d') {
    //     // 116.648653,39.921664 116.648592, 39.921754
    //     mesh.position.x = CalculationX(116.648592);
    //     mesh.position.z = CalculationZ(39.921754);
    // }
    // if(controlsFlag == 'renwu') {
    //     camera.position.set(CalculationX(116.648592), .18, CalculationZ(39.921754))
    // } 
    // console.log(data)
}
$(".service").click(function(){
    $(".service-container").show();
    $(".container").show();
    // map.clearMap();
});
$(".service-container").click(function() {
    $(this).hide();
    $(".container").hide();
})
// 服务中心
$(".activity-title").click(function() {
    const index = $(this).parent('.activity').attr('data-index');
    const flag = $(this).parent('.activity').attr('data-flag');
    $.ajax({ 
        // ${process.env.BASE_API}
        url: `${process.env.BASE_API}school-map/serviceInfo/getByType?type=${index}`, 
        success: function(res){
            if(res.code == 200) {
                const schoolList = res.data;
                $('.open:eq('+ index +')').html('')
                schoolList.forEach((item, ind) => {
                    let str = '';
                    if( item.positions.length > 1 ) {
                        item.positions.forEach(items => {
                            str += `
                            <div class="place" data-center="${items.center}">
                                ${items.title}
                            </div>
                            `
                        })
                    }
                     if(index == 3) {
                        $('.open:eq('+ index +')').append(
                            `
                            <div class="open-con" data-flag="true" style="font-size: .24rem">
                                 ${item.description}
                             </div>
                            `
                        ) 
                    }else {
                        $('.open:eq('+ index +')').append(
                            `
                            <div class="open-con" data-flag="true">
                                 <p class="open-title">${item.title}</p>
                                 <div class="small-open">
                                     <div class="small-small">
                                         ${str ? str : item.description}
                                     </div>
                                 </div>
                             </div>
                            `
                        ) 
                    }

                });
                
                $('.activity').animate({
                    height: '.8rem', 
                },300)
                $('.activity').attr('data-flag', 'true')
                if(flag == "true") {
                    var length =  $('.activity:eq('+ index +')').find('.open-con').length + 1 || 1;
                    if(index == 3) {
                        $('.activity:eq('+ index +')').animate({
                            height: '3rem', 
                        },300)
                    }else {
                        $('.activity:eq('+ index +')').animate({
                            height: length * 1.95 + 'rem', 
                        },300)
                    }
                    $('.activity:eq('+ index +')').attr('data-flag', 'flase')
                }
                if(index == 3) {
                    $('.open-con').animate({
                        height: '2rem', 
                    },300)
                }else {
                    $('.open-con').animate({
                        height: '.8rem', 
                    },300)
                }
                $('.open-con').attr('data-flag', 'true')
                // 底下菜单切换
                $(".open-title").click(function() {
                    var flag = $(this).parent('.open-con').attr('data-flag');
                    $('.open-con').animate({
                        height: '.8rem', 
                    },300)
                    $('.open-con').attr('data-flag', 'true')
                    if(flag == "true") {
                        $(this).parent('.open-con').animate({
                            height: '4rem', 
                        },300)
                        $(this).parent('.open-con').attr('data-flag', 'flase')
                        $(this).parent('.open-con').siblings('.open-con').animate({
                            height: '.8rem', 
                        },300)
                    }
                    $('.place').click(function(){
                        $('.serach').hide();
                        $('.menu').hide();
                        $('.footer').hide();
                        $('.head').show().find('span').html('主页面');
                        const center = $(this).attr('data-center');
                        const name = $(this).html();
                        $(".service-container").hide();
                        $(".container").hide();
                        const endCenterArr = center.split(',');
                        new AMap.Marker({
                            position: endCenterArr,
                            offset: new AMap.Pixel(-10, -10),
                            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                            map: map
                        });
                        walk([startPathX, startPathZ], endCenterArr, name, false)
                    })                        
                    
                })
            }
        }
    });      
})
// 导航
$('.daohang').click(function () {
    $('.distance').hide()
    // walk([startPathX, startPathZ], endPosition, name, true, true);
    // geolocation();
})
// 视角切换
$('.3D').click(function () {
    map.setPitch(40);
    map.setRotation(15);
    // if (controlsFlag === 'renwu') {
        window.location.href = './index.html';
    // }
})
if (controlsFlag == 'pingmian') {
    map.setPitch(0);
    map.setRotation(0);
}
$('.pingmian').click(function () {
    window.location.href = './index.html?controlsFlag=pingmian';
})
$('.renwu').click(function() {
    window.location.href = './index.html?controlsFlag=renwu';
})
/* 获取陀螺仪 */
// var text = "";  
window.addEventListener("deviceorientation", orientationHandler, false);  
function orientationHandler(event) {  
    // text = ""  
    // var arrow = document.getElementById("arrow");  
    // text += "左右旋转：rotate alpha{" + Math.round(event.alpha) + "deg)<br>";  
    // text += "前后旋转：rotate beta{" + Math.round(event.beta) + "deg)<br>";  
    // text += "扭转设备：rotate gamma{" + Math.round(event.gamma) + "deg)<br>";  
    // arrow.innerHTML = text;  
    if(controlsFlag !== 'renwu') {
        // people.setAngle(event.alpha-45)
        // console.log(event.alpha)
        // mesh.rotation.z = (event.alpha - 135)/180*Math.PI;
        // camera.rotation.y = Math.round(event.alpha + 90) * 6 / 360
    }
}
$('.amap-geo').hide();

setInterval(function() {
    geolocation();
    if(startPosition.length > 0) {
        walk(startPosition, [startPathX, startPathZ], '', false, null, true)
    }
}, 3000)
// 绘制步行路线
/**
 * start 起点
 * end 终点必须
 * name 非必须名字
 * flag 判断有没有起点或者终点
 * dingwei 非必须定位导航
 */
function walk(start, end, name, flag, dingwei, passedPolyline) {
    // 当前示例的目标是展示如何根据规划结果绘制路线，因此walkOption为空对象
    var walkingOption = {}
    // 步行导航
    var walking = new AMap.Walking(walkingOption)
    if(dingwei) {
        // map.clearMap();
    }
    //根据起终点坐标规划步行路线
    walking.search(start, end, function(status, result) {
        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
            if (result.routes && result.routes.length) {
                if(flag) {
                    drawRoute(result.routes[0], true)
                }else if(passedPolyline){
                    drawRoute(result.routes[0], null, passedPolyline)
                }else {
                    $('.distance').show();
                    $('.head').show().find('span').html('退出导航');
                    $('.title').html('');
                    $('.title').append(`
                    <span>${name}</span>
                    <span>${result.routes[0].distance}.${Math.ceil(Math.random()*10)}米</span>`)
                    drawRoute(result.routes[0])
                }
                // log.success('绘制步行路线完成')
            }
        } else {
            console.log(result)
            // log.error('步行路线数据查询失败' + result)
        } 
    });
} 
function drawRoute(route, flag, passedPolyline) {
    var path = parseRouteToPath(route)
    if(!passedPolyline) {
        if(flag) {
            var endMarker = new AMap.Marker({
                position: path[path.length - 1],
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                map: map
            })
        }else {
            var startMarker = new AMap.Marker({
                position: path[0],
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
                map: map
            })
        }
        new AMap.Polyline({
            map: map,
            path: path,
            showDir: true,
            strokeWeight: 5,
            strokeColor: '#28F',
            // lineJoin: 'round'
        })
    } else {
        new AMap.Polyline({
            map: map,
            path: path,
            strokeWeight: 5,
            strokeColor: '#AF5',
            // lineJoin: 'round'
        })
    }
    // routeLine.setMap(map)

    // 调整视野达到最佳显示区域
    // map.setFitView([ startMarker, endMarker, routeLine ])
}
// 解析WalkRoute对象，构造成AMap.Polyline的path参数需要的格式
// WalkRoute对象的结构文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkRoute
function parseRouteToPath(route) {
    var path = []
    for (var i = 0, l = route.steps.length; i < l; i++) {
        var step = route.steps[i]

        for (var j = 0, n = step.path.length; j < n; j++) {
          path.push(step.path[j])
        }
    }

    return path
}