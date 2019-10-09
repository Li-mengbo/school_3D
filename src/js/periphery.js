import '../style/style'
import '../style/periphery';
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
// 获取模糊查询信息
$.ajax({ 
    // ${process.env.BASE_API}
    url: `${process.env.BASE_API}school-map/circumType/getAll`, 
    success: function(res){
        console.log('周边',res)
        if(res.code == 200) {
            const periphery = res.data;
            periphery.forEach(item => {
                console.log(item)
                $('.nav').append(
                    `
                    <li class="item">
                        <a href="./index.html?nearby=${item.id}">
                            <img src="${item.imgUrl}" alt="">
                            <span>${item.type}</span>
                        </a>
                    </li>
                    `
                )
                // $('.title').append(
                //     `
                //     <li class="item">
                //         <a href="./index.html?nearby=${item.id}">
                //             <span>${item.type}</span>
                //         </a>
                //     </li>
                //     `
                // )
            });
        }
    }
});