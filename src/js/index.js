import '../style/index';
import '../style/style';
import { GetQueryString, fuzzyQuery, CalculationX, CalculationZ, unid, erwei } from '../utils/util';
import $ from 'jquery';
/* 地图路线绘制 */
const map = new AMap.Map("mapBox", {
    viewMode:'3D',
    zoom: 18,
    center: [116.64863,39.920623]
});
/* 必须有的值
    * scene 场景
    * camera 相机
    * renderer 渲染器 
    * controls 控制器
    * mesh 箭头相当于一个人的指示
    * meshEnd 终点坐标
    * curve路线的绘制
    * progress 漫游相机速度
    * x 在x轴上的位置
    * z 在z轴上的位置
    * controlsFlag 相机切换
    * stepsList 路线点
    * clickX 点击终点的x坐标
    * clickZ 点击终点的y坐标
    * center 全景图位置
    * nearby 附近的坐标
    * startCenter 导航起点
    * endCenter 导航终点
    * position 校园风光位置
*/
let scene, camera, renderer, controls, mesh, meshEnd, curve, progress=0, x, z, controlsFlag, stepsList = [], clickX, clickZ;

const center = GetQueryString('center');
const nearby = GetQueryString('nearby');
const startCenter = GetQueryString('startCenter');
const endCenter = GetQueryString('endCenter');
const position = GetQueryString('position');
// 导航初始值
let initCenter = [116.648432,39.92166];
//导航结束值
let endPosition = [];

/* 初始坐标在北门 */
x = CalculationX(116.64861023);
z = CalculationZ(39.92165992);
console.log(CalculationX(116.646901))
console.log(CalculationZ(39.919333))
// 默认为地三人称相机
controlsFlag = GetQueryString('controlsFlag') ? GetQueryString('controlsFlag') : 'pingmian';

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
   console.log(controlsFlag)
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    if(controlsFlag == 'pingmian') {
        // alert(1)
        // 默认相机坐标
        camera.position.set(0, 45, 0)
    }else if(controlsFlag == 'renwu') {
        // 修改相机坐标
        camera.position.set(x, .2, z)
    }else if(controlsFlag == '3d') {
        camera.position.set(30, 20, 30)
    }
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
    scene.add(new THREE.AmbientLight(0xffffff));
}

/* 控制器 */
function initControls() {
    console.log(controlsFlag)
    if(controlsFlag == 'pingmian' || controlsFlag == '3d') {
        // alert(1)
        controls = new THREE.OrbitControls(camera, renderer.domElement);
    }else if(controlsFlag == 'renwu') {
        // 第一人称相机控制器
        controls = new THREE.FirstPersonControls(camera, renderer.domElement);
        controls.movementSpeed = 300; //相机移动速度
        controls.noFly = true;
        controls.constrainVertical = true; //约束垂直
        controls.lat = 0; //初始视角进入后y轴的角度
        controls.lon = 90;
    }
}

/* 场景中的内容 */
function initContent() {

    // 加载 glTF 格式的模型
    let loader = new THREE.GLTFLoader(); /*实例化加载器*/

    loader.load('http://47.92.118.208:8081/7311/7311.gltf', function (obj) {
        console.log(obj)
        // 修改位置坐标
        obj.scene.position.y = 0;
        obj.scene.position.x = 0;
        obj.scene.position.z = 0;
        scene.add(obj.scene);
        // document.getElementById('loading').style.display = 'none';

    }, function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    }, function (error) {

        console.log('load error!' + error.getWebGLErrorMessage());

    })

}

/* 设置中心显示坐标轴 红色为x 蓝色为z */
function axes() {
    // var axes = new THREE.AxisHelper(10);
    // scene1.add(axes);
    //定义材质THREE.LineBasicMaterial . MeshBasicMaterial...都可以
    var material = new THREE.LineBasicMaterial({color:0x0000ff});
    // 空几何体，里面没有点的信息,不想BoxGeometry已经有一系列点，组成方形了。
    // var geometry = new THREE.Geometry();
    curve = new THREE.CatmullRomCurve3();
    //步行导航
    var walking = new AMap.Walking({
        map: map
    }); 
    //根据起终点坐标规划步行路线
    walking.search([116.64861023,39.92165992], [116.646901,39.919333], function(status, result) {
        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
            console.log(result.routes[0].steps)
            const steps = result.routes[0].steps;
            steps.forEach((item, index) => {
                let arr = [];
                if(item.path) {
                    item.path.forEach((items, index) => {
                        const x = CalculationX(items.lng);
                        const z = CalculationZ(items.lat);
                        arr.push([-x, -z])
                    })
                }
                stepsList.push(arr)
                // arr.push(item.end_location.lat)
                // arr.push(item.end_location.lng)
            });
            const uuidArr = unid(stepsList);
            const erweiArr = erwei(uuidArr); 
            erweiArr.forEach(item => {
                // 给空白几何体添加点信息，这里写3个点，geometry会把这些点自动组合成线，面。
                // geometry.vertices.push(new THREE.Vector3(-item[0],0,-item[1]));
                curve.points.push(new THREE.Vector3(-item[0], 0, -item[1]))
            })
            curve.points.push(new THREE.Vector3(CalculationX(116.646901), 0, CalculationZ(39.919333)))
            var tubeGeometry = new THREE.TubeGeometry(curve, 70, 0.05, 10, false);
            var textureLoader = new THREE.TextureLoader();
            var texture = textureLoader.load('http://47.92.118.208:8081/01.png');
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT=THREE.RepeatWrapping
            // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
            //等价texture.repeat= new THREE.Vector2(20,1)
            texture.repeat.x = 20;
            var tubeMaterial = new THREE.MeshPhongMaterial({
                map: texture,
                transparent: true,
            });
            var tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
            scene.add(tube)
            // geometry.vertices.push(new THREE.Vector3(x,0,z));
            
            //线构造
            // var line=new THREE.Line(geometry,material);
            // 加入到场景中
            // scene1.add(line);  
            // log.success('绘制步行路线完成')
        } else {
            console.log('失败')
            // log.error('步行路线数据查询失败' + result)
        } 
    });
}

/* 窗口变动触发 */
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

/* 加载导航箭头图片 */
function loadImg() {
    //模型大门的坐标为(x=-0.1,z=16.5,116.64861023,39.92165992)
    // 116.647605,39.919496
    // 需要改为定位获取
    const x = CalculationX(116.64856);
    const z = CalculationZ(39.921263);
    var skyBoxGeometry = new THREE.PlaneGeometry(); 
    var texture = new THREE.TextureLoader().load('http://47.92.118.208:8081/01.png');
    var material = new THREE.MeshBasicMaterial({
            map: texture
    });
    mesh = new THREE.Mesh(skyBoxGeometry, material);
    mesh.position.y = 0;
    mesh.position.x = x;
    mesh.position.z = z;
    mesh.rotation.x = -1.5;
    scene.add(mesh);
}

function loadEndImg() {
    //模型大门的坐标为(x=-0.1,z=16.5,116.64861023,39.92165992)
    // 116.647605,39.919496
    // 需要改为定位获取
    clickX = CalculationX(116.646901);
    clickZ = CalculationZ(39.919333);
    var skyBoxGeometry = new THREE.CubeGeometry(); 
    var texture = new THREE.TextureLoader().load('http://47.92.118.208:8081/01.png');
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });
    meshEnd = new THREE.Mesh(skyBoxGeometry, material);
    meshEnd.position.y = 2;
    meshEnd.position.x = clickX;
    meshEnd.position.z = clickZ;
    // mesh.rotation.x = -1.5;
    // mesh.rotation.y = -1.5;
    // mesh.rotation.z = 1.57 * 4;
    scene.add(meshEnd);
}

/**封装点击事件 */
//声明raycaster和mouse变量
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseClick( event ) {

    //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera( mouse, camera );

    // 获取raycaster直线和所有模型相交的数组集合
    const intersects = raycaster.intersectObjects( scene.children );
    if(intersects[0]) {
        const clicksX = Math.floor(clickX);
        const clicksZ = Math.floor(clickZ);
        const intersectsX = Math.floor(intersects[0].point.x);
        const intersectsZ = Math.floor(intersects[0].point.z);
        // console.log(clicksX, clicksZ);
        // console.log(intersectsX, intersectsZ)
        // console.log(clicksX - intersectsX < 1, clicksZ - intersectsZ < 1)
        if( clicksX - intersectsX < 1 &&  clicksZ - intersectsZ < 1) {
            alert('点击了')
        }
    }
}

window.addEventListener( 'click', onMouseClick, false );

/*加载终点图标*/

        
/* 初始化 */
function init() {

    initScene();
    initRender();
    initCamera();
    initLight();
    initControls();
    loadImg();
    loadEndImg();
    initContent();
    // initGui();
    axes();
    /* 监听事件 */

    window.addEventListener('resize', onWindowResize, false);

}

var clock = new THREE.Clock();
/* 循环渲染 */
function animate() {
    controls.update(clock.getDelta());
    requestAnimationFrame(animate);
    if(progress>1.0){
        return;    //停留在管道末端,否则会一直跑到起点 循环再跑
    }
    // 相机漫游模式
    // if (curve.points.length > 0) {
    //     progress += 0.0009;
    //     let point = curve.getPoint(progress);
    //     if (point&&point.x) {
    //         mesh.position.set(point.x,point.y,point.z);
    //     }
    // }
    renderer.render(scene, camera);

}

/* 初始加载 */
(function () {
    console.log("three init start...");

    init();
    animate();

    console.log("three init send...");
})();

/*模糊查询列表 */
let mapList = [];
// 获取模糊查询信息
$.ajax({ 
    url: "http://47.92.118.208/school-map/sitePosition/getAll", 
    success: function(res){
        console.log('模糊查询',res)
        if(res.code == 200) {
            mapList = res.data;
        }
    }
});

/* 高德地图逻辑 */

/* 全景图展示 */
if (center) {
    // 获取全景展示信息
    // http://47.92.118.208/school-map/quanjing/getAll
    $('.head').show().find('span').html('退出全景');
    $('.serach').hide();
    $('.menu').hide();
    $('.footer').hide();
    $.ajax({ 
        url: "http://47.92.118.208/school-map/quanjing/getAll", 
        success: function(res){
            console.log('全景图',res)
            if(res.code == 200) {
               const provinces = res.data;
               var markers = []; //province见Demo引用的JS文件
               var marker;
               for (let i = 0; i < provinces.length; i += 1) {
                   marker = new AMap.Marker({
                       position: provinces[i].center.split(','),
                       offset: new AMap.Pixel(-10, -10),
                       title: provinces[i].name,
                       map: map
                   });
                   var markerContent = document.createElement("div");
                   if(provinces[i].center == center) {
                        map.setCenter(provinces[i].center.split(','));
                        // 点标记中的图标
                        var markerImg = document.createElement("img");
                        // markerImg.attr('data-type' , 'false');  
                        markerImg.className = "markerlnglat";
                        markerImg.src = "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
                        markerContent.appendChild(markerImg);
                       // 点标记中的文本
                       var markerSpan = document.createElement("span");
                       markerSpan.className = 'marker';
                       markerSpan.innerHTML = provinces[i].name;
                       markerContent.append(markerSpan);
                   }
                   // markerImg.src = "http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
                   
                   marker.on('click', function(e) {
                       window.location.href = './panorama.html?imgurl=' + provinces[i].imgUrl
                   })
                   marker.setContent(markerContent); //更新点标记内容
               }
               markers.push(marker);
               // map.add(marker);
            }
        }
    });
}

// 搜索模糊查询
$('.search-btn').click(function() {
    const str = $('input').val();
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
            map.setCenter(position);
            map.clearMap();
            const marker = new AMap.Marker({
                position,
                offset: new AMap.Pixel(-10, -10),
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                map: map
            });
            marker.on('click', function(e) {
                $('.serach').hide();
                walk([116.648432,39.92166], position, name, false)
            })
        })
    }else {
        $('.search-list').append('<li>没有查到</li>')
    }
    // 模糊查询关闭
    $('#mapBox').click(function() {
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
    // 获取周边详细信息
    $.ajax({ 
        url: `http://47.92.118.208/school-map/circum/getByTypeId?typeId=${nearby}`, 
        success: function(res){
            console.log('周边详细信息',res)
            if(res.code == 200) {
                const zhoubian = res.data;
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
                    $('.nearby-details').click(function () {
                        $('.nearby').hide();
                        $('.footer').hide();
                        const name = $(this).find('.left-title').html();
                        const position = $(this).attr('data-position').split(',');
                        endPosition = position;
                        map.setCenter(position);
                        const marker = new AMap.Marker({
                            position,
                            offset: new AMap.Pixel(-10, -10),
                            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
                            map: map
                        });
                        marker.on('click', function(e) {
                            console.log(position)
                            walk([116.648432,39.92166], position, name, false)
                        })
                    })
                })
            }
        }
    });
    $('.nearby').show();
}

if (position) {
    $('.serach').hide();
    $('.menu').hide();
    $('.footer').hide();
    $('.head').show().find('span').html('主页面');
    const positions = position.split(',');
    map.setCenter(positions);
    map.clearMap();
    const marker = new AMap.Marker({
        position: positions,
        offset: new AMap.Pixel(-10, -10),
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
        map: map
    });
    marker.on('click', function(e) {
        console.log(positions)
        walk([116.648432,39.92166], positions, name, false)
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
    // new AMap.Marker({
    //     position: startCenterArr,
    //     icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
    //     map: map
    // })
    walk(startCenterArr, endCenterArr, name, true, false)
    // setInterval(() => {
    //     geolocation();
    //     walk(initCenter, endCenterArr, name, true, true);
    // }, 3000);
}

// 绘制步行路线
/**
 * start 起点
 * end 终点必须
 * name 非必须名字
 * flag 判断有没有起点或者终点
 * dingwei 非必须定位导航
 */
function walk(start, end, name, flag, dingwei) {
    // 当前示例的目标是展示如何根据规划结果绘制路线，因此walkOption为空对象
    var walkingOption = {}

    // 步行导航
    var walking = new AMap.Walking(walkingOption)
    if(dingwei) {
        map.clearMap();
    }
    //根据起终点坐标规划步行路线
    walking.search(start, end, function(status, result) {
        // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        if (status === 'complete') {
            if (result.routes && result.routes.length) {
                if(flag) {
                    drawRoute(result.routes[0], true)
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

function drawRoute(route, flag) {
    var path = parseRouteToPath(route)
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


    var routeLine = new AMap.Polyline({
        path: path,
        zIndex: 10000,
        isOutline: true,
        outlineColor: '#ffeeee',
        borderWeight: 2,
        strokeWeight: 5,
        strokeColor: '#0091ff',
        lineJoin: 'round'
    })

    routeLine.setMap(map)

    // 调整视野达到最佳显示区域
    // map.setFitView([ startMarker, endMarker, routeLine ])
}
// 解析WalkRoute对象，构造成AMap.Polyline的path参数需要的格式
// WalkRoute对象的结构文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkRoute
function parseRouteToPath(route) {
    var path = []
    console.log(route)
    for (var i = 0, l = route.steps.length; i < l; i++) {
        var step = route.steps[i]

        for (var j = 0, n = step.path.length; j < n; j++) {
          path.push(step.path[j])
        }
    }

    return path
}
// 地图定位
function geolocation () {
    map.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
}
function onComplete(data) {
    initCenter = data.position.split(',');
}
//解析定位错误信息
function onError(data) {
    console.log(data)
}
$(".service").click(function(){
    $(".service-container").show();
    $(".container").show();
    map.clearMap();
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
        url: `http://47.92.118.208/school-map/serviceInfo/getByType?type=${index}`, 
        success: function(res){
            console.log('校园服务中心',res)
            if(res.code == 200) {
                const schoolList = res.data;
                $('.open:eq('+ index +')').html('')
                schoolList.forEach((item, ind) => {
                    let str = '';
                    if( item.positions.length > 1 ) {
                        console.log(item);
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
                    const center = $(this).parent('.open-con').attr('data-center');
                    if(center) {
                        $('.serach').hide();
                        $('.menu').hide();
                        $('.footer').hide();
                        $('.head').show().find('span').html('主页面');
                        $(".service-container").hide();
                        $(".container").hide();
                        const endCenterArr = center.split(',');
                        walk([116.648432,39.92166], endCenterArr, name, true)
                    }else {
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
                            walk([116.648432,39.92166], endCenterArr, name, false)
                        })                        
                    }
                })
            }
        }
    });      
})
// 导航
$('.daohang').click(function () {
    $('.distance').hide()
    geolocation();
    walk(initCenter, endPosition, name, true, true);
    setInterval(() => {
        geolocation();
        walk(initCenter, endPosition, name, true, true);
    }, 3000);
})
// 视角切换
$('.3D').click(function () {
    window.location.href = './index.html?controlsFlag=3d';  
})
$('.pingmian').click(function () {
    window.location.href = './index.html?controlsFlag=pingmian';  
})
$('.renwu').click(function() {
    window.location.href = './index.html?controlsFlag=renwu';
})