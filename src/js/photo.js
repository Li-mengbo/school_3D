import '../style/style';
import '../style/photo';
import { GetQueryString, fuzzyQuery } from '../utils/util';
import $ from 'jquery';
//防止页面后退
history.pushState(null, null, document.URL);
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
let index = 0;
const length = $('img').length;
$('.left').click(function () {
    index--;
    if(index < 0) {
        index = 0;
        return false;
    }
    $('img').hide();
    $('img:eq('+ index +')').show();
})
$('.right').click(function () {
    index++;
    if(index >= length) {
        index = length - 1;
        return false;
    }
    $('img').hide();
    $('img:eq('+ index +')').show();
})