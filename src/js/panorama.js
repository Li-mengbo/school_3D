import '../style/panorama';
import '../style/style';
import $ from 'jquery';
import { GetQueryString } from '../utils/util';
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
/* 全景图展示 */
const center = GetQueryString('center');
const id = GetQueryString('id');
if (center) {
  // 获取全景展示信息
  // https://ryxy-china.picp.vip/school-map/quanjing/getAll
  $.ajax({ 
      // ${process.env.BASE_API}
      url: `${process.env.BASE_API}school-map/quanjing/getAll`, 
      success: function(res){
          console.log('全景图',res)
          if(res.code == 200) {
             const provinces = res.data;
             for (let i = 0; i < provinces.length; i += 1) {
                 // var markerContent = document.createElement("div");
                 if(provinces[i].center == center) {
                   var div = document.getElementById('panorama');
                   const img = provinces[i].imgUrl;
                   var PSV = new PhotoSphereViewer({
                     // Panorama, given in base 64
                     panorama: img,
                   
                     // Container
                     container: div,
                   
                     // Deactivate the animation
                     time_anim: false,
                   
                     // Display the navigation bar
                     navbar: false,
                   
                     // Resize the panorama
                     size: {
                       width: '100%',
                       height: '100%'
                     },
                   
                     // No XMP data
                     usexmpdata: false
                   });
                 }
             }
          }
      }
  });
}
$('.return').click(function() {
  if(id) {
    window.location.href = `./panoramaContainer.html?id=${id}`
  } else {
    window.location.href = `./panoramaContainer.html`
  }
})
