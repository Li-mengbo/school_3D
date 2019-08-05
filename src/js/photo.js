import '../style/style';
import '../style/photo';
import { GetQueryString, fuzzyQuery } from '../utils/util';
import $ from 'jquery';
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