import '../style/style';
import '../style/panoramaContainer';
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
$.ajax({ 
    // ${process.env.BASE_API}
    url: `${process.env.BASE_API}school-map/quanjing/getAll`, 
    success: function(res){
        if(res.code == 200) {
            res.data.forEach(item => {
              if(item.name == '财贸大楼北门') {
                $('.abroad:eq(1)').append(
                  `
                  <div class="activity" data-flag="true">
                    <a class="activity-title" href="./index.html?center=${item.center}">${item.name}</a>
                  </div> 
                  `
                )
              }else {
                $('.abroad:eq(0)').append(
                  `
                  <div class="activity" data-flag="true">
                    <a class="activity-title" href="./index.html?center=${item.center}">${item.name}</a>
                  </div> 
                  `
                )
              }
            })
        }
    }
});

$('.item').click(function() {
  var index = $(this).attr('data-index');
  $('.abroad').hide()
  $('.abroad:eq('+ index +')').show();
})