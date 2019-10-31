import '../style/roam';
import '../style/style';
import { GetQueryString, fuzzyQuery } from '../utils/util';
import $ from 'jquery';
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
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
var video =$("#myvideo")[0];
$('.play').click(function () {
    $(this).hide();
    video.play();
})
// const player = new ChimeePlayer({
//     wrapper: '#wrapper',  // video dom容器
//     src: '${process.env.BASE_API}3dschool/mv/整体录屏.mp4',
//     controls: false,
//     autoplay: true,
// });
// var video = new Player({
//     "id": "wrapper",
//     "url": "${process.env.BASE_API}3dschool/mv/整体录屏.mp4",
//     "playsinline": true,
//     "closeVideoClick": true,
//     "closeVideoTouch": true,
//     // "controls": false,
//     // "autoplay": true,
// });
const videoList = [
    {
        name: "学校北门",
        video: `${process.env.BASE_API}3dschool/mv/学校北门_batch.mp4`
    },
    {
        name: "电教馆",
        video: `${process.env.BASE_API}3dschool/mv/电教馆_batch.mp4`
    },
    {
        name: "体育场",
        video: `${process.env.BASE_API}3dschool/mv/体育场_batch.mp4`
    },
    {
        name: "中心食堂",
        video: `${process.env.BASE_API}3dschool/mv/中心食堂_batch.mp4`
    },
    {
        name: "会议楼",
        video: `${process.env.BASE_API}3dschool/mv/会议楼_batch.mp4`
    },
    {
        name: "教学楼",
        video: `${process.env.BASE_API}3dschool/mv/教学楼_batch.mp4`
    },
    {
        name: "1号学生公寓",
        video:`${process.env.BASE_API}3dschool/mv/1号学生公寓_batch.mp4`
    },
    {
        name: "2号学生公寓",
        video: `${process.env.BASE_API}3dschool/mv/2号学生公寓_batch.mp4`
    },
    {
        name: "3号学生公寓",
        video: `${process.env.BASE_API}3dschool/mv/3号学生公寓_batch.mp4`
    },
    {
        name: "4号学生公寓",
        video: `${process.env.BASE_API}3dschool/mv/4号学生公寓_batch.mp4`
    },
    {
        name: "5号学生公寓",
        video: `${process.env.BASE_API}3dschool/mv/5号学生公寓_batch.mp4`
    },
    {
        name: "六号学生公寓",
        video: `${process.env.BASE_API}3dschool/mv/六号学生公寓_batch.mp4`
    },
    {
        name: "学生中心",
        video: `${process.env.BASE_API}3dschool/mv/学生中心_batch.mp4`
    },
    {
        name: "国际教育学院",
        video: `${process.env.BASE_API}3dschool/mv/国际教育学院_batch.mp4`
    },
    {
        name: "文化广场",
        video: `${process.env.BASE_API}3dschool/mv/文化广场_batch.mp4`
    },
    {
        name: "运河微缩景观（西）",
        video: `${process.env.BASE_API}3dschool/mv/运河微缩景观（西）_batch.mp4`
    },
    {
        name: "运河微缩景观（东）",
        video: `${process.env.BASE_API}3dschool/mv/运河微缩景观（东）_batch.mp4`
    },
    {
        name: "两岸水吧",
        video: `${process.env.BASE_API}3dschool/mv/两岸水吧_batch.mp4`
    },
    {
        name: "办公楼",
        video: `${process.env.BASE_API}3dschool/mv/办公楼_batch.mp4`
    },
    {
        name: "商苑",
        video: `${process.env.BASE_API}3dschool/mv/商苑_batch.mp4`
    },
    {
        name: "篮球场",
        video: `${process.env.BASE_API}3dschool/mv/篮球场_batch.mp4`
    },
    {
        name: "潘序伦铜像",
        video: `${process.env.BASE_API}3dschool/mv/潘序伦铜像_batch.mp4`
    },
    {
        name: "财贸大楼",
        video: `${process.env.BASE_API}3dschool/mv/财贸大楼_batch.mp4`
    },
    {
        name: "家属区北宿舍楼",
        video: `${process.env.BASE_API}3dschool/mv/家属区北宿舍楼_batch.mp4`
    },
    {
        name: "图书馆",
        video: `${process.env.BASE_API}3dschool/mv/图书馆_batch.mp4`
    },
]
videoList.forEach(item => {
    $('.video-list').append(
        `
            <div class="video-item" data-video="${item.video}">${item.name}</div>
        `
    )
})
$('.video-item').click(function () {
    $('.video-item').css("background", "rgba(255, 255, 255, 0.5)")
    const url = $(this).attr('data-video');
    video.src = url
    video.play()
    $(this).css("background", "skyblue")
    // console.log(url)
    // player.load(url);
})

setRem();
window.addEventListener("onorientationchange" in window ? "orientationchange":"resize",function(){
    setRem();
});
function setRem(){
    var html = document.querySelector("html");
    var width = html.getBoundingClientRect().width;
    var height = html.getBoundingClientRect().height;
    //判断横屏
    if(width < height){
        //竖屏
        html.style.fontSize = height/16 +"px";
    };
    if(width > height){
        //横屏
        html.style.fontSize = width/16 +"px";
    }
    
}