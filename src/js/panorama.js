import '../style/panorama';
import '../style/style';
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
if (GetQueryString('imgurl')) {
  var div = document.getElementById('panorama');
  const img = GetQueryString('imgurl');
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
