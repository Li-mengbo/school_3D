import '../style/style';
import '../style/school';
import { GetQueryString, fuzzyQuery } from '../utils/util';
import $ from 'jquery';

$('.item').click(function () {
    const index = $(this).attr('data-index')
    $.ajax({ 
        url: `http://47.92.118.208/school-map/schoolInfo/getByType?type=${index}`, 
        success: function(res){
            console.log('校园查询',res)
            if(res.code == 200) {
                const schoolList = res.data;
                $('.open:eq('+ index +')').html('')
                schoolList.forEach((item, ind) => {
                    let str = '';
                    if(index == 2) {
                         str = `
                        <div class="small-btn">
                            <a class="dingwei" href="./index.html?position=${item.center.replace(/ /g, '')}">
                                <img src="${require('../static/img/location.png')}" alt="">
                            </a>
                            <a class="tuji" data-index="${ ind }">
                                <img src="${require('../static/img/photos.png')}" alt="">
                            </a>
                        </div>
                        ` 
                    }
                   $('.open:eq('+ index +')').append(
                       `
                       <div class="open-con" data-flag="true">
                            <p class="open-title">${item.title}</p>
                            <div class="small-open">
                                <div class="small-small">
                                    ${item.description}
                                </div>
                            </div>
                            ${str}
                        </div>
                       `
                   ) 
                });
                var length =  $('.activity:eq('+ index +')').find('.open-con').length + 1 || 1;
                $('.activity').animate({
                    height: '.8rem', 
                },300)
                $('.activity').attr('data-flag', 'true')
                $('.activity:eq('+ index +')').animate({
                    height: length * 1.95 + 'rem', 
                },300)
                $('.activity:eq('+ index +')').attr('data-flag', 'flase')
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
                })
                $('.tuji').click(function () {
                    const ind = $(this).attr('data-index');
                    // console.log(schoolList[ind])
                    schoolList[ind].images.forEach((img) => {
                        console.log(img)
                        $('.photo-img').append(
                            `
                                <img class="fengguang" src="${img}" alt="" />
                            `
                        )
                    })
                    const length = $('.fengguang').length;
                    let index = 0;
                    $('.left').click(function () {
                        index--;
                        if(index < 0) {
                            index = 0;
                            return false;
                        }
                        $('.fengguang').hide();
                        $('.fengguang:eq('+ index +')').show();
                    })
                    $('.right').click(function () {
                        index++;
                        if(index >= length) {
                            index = length - 1;
                            return false;
                        }
                        $('.fengguang').hide();
                        $('.fengguang:eq('+ index +')').show();
                    })
                    $('.photo-container').show();
                    $('.photo').show();
                })
            }
        }
    });    
});
$(".activity-title").click(function() {
    const index = $(this).parent('.activity').attr('data-index');
    const flag = $(this).parent('.activity').attr('data-flag');
    $.ajax({ 
        url: `http://47.92.118.208/school-map/schoolInfo/getByType?type=${index}`, 
        success: function(res){
            console.log('校园查询',res)
            let schoolList = [];
            if(res.code == 200) {
                schoolList = res.data;
                $('.open:eq('+ index +')').html('')
                schoolList.forEach((item, ind) => {
                    let str = '';
                    if(index == 2) {
                         str = `
                        <div class="small-btn">
                            <a class="dingwei" href="./index.html?position=${item.center.replace(/ /g, '')}">
                                <img src="${require('../static/img/location.png')}" alt="">
                            </a>
                            <a class="tuji" data-index="${ ind }">
                                <img src="${require('../static/img/photos.png')}" alt="">
                            </a>
                        </div>
                        `
                    }
                   $('.open:eq('+ index +')').append(
                       `
                       <div class="open-con" data-flag="true">
                            <p class="open-title">${item.title}</p>
                            <div class="small-open">
                                <div class="small-small">
                                    ${item.description}
                                </div>
                            </div>
                            ${str}
                        </div>
                       `
                   ) 
                });
                $('.activity').animate({
                    height: '.8rem', 
                },300)
                $('.activity').attr('data-flag', 'true')
                if(flag == "true") {
                    var length =  $('.activity:eq('+ index +')').find('.open-con').length + 1 || 1;
                    $('.activity:eq('+ index +')').animate({
                        height: length * 1.95 + 'rem', 
                    },300)
                    $('.activity:eq('+ index +')').attr('data-flag', 'flase')
                }
                $('.open-con').animate({
                    height: '.8rem', 
                },300)
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
                })
                let lengths;
                let indexs = 0;
                $('.tuji').click(function () {
                    const ind = $(this).attr('data-index');
                    // console.log(schoolList[ind])
                    $('.photo-img').html('');
                    lengths = schoolList[ind].images.length;
                    console.log(lengths)
                    schoolList[ind].images.forEach((img) => {
                        $('.photo-img').append(
                            `
                                <img class="fengguang" src="${img}" alt="" />
                            `
                        )
                    })
                    $('.photo-container').show();
                    $('.photo').show();
                })
                $('.left').click(function () {
                    indexs--;
                    console.log(indexs, lengths)
                    if(indexs < 0) {
                        indexs = 0;
                        return false;
                    }
                    $(this).css({"background": "#fff"})
                    $('.right').css({"background": "skyblue"})
                    $('.fengguang').hide();
                    $('.fengguang:eq('+ indexs +')').show();
                })
                $('.right').click(function () {
                    indexs++;
                    console.log(indexs, lengths)
                    if(indexs >= lengths) {
                        indexs = lengths - 1;
                        return false;
                    }
                    $(this).css({"background": "#fff"})
                    $('.left').css({"background": "skyblue"})
                    $('.fengguang').hide();
                    $('.fengguang:eq('+ indexs +')').show();
                })
            }
        }
    });      
})
$('.photo-container').click(function () {
    $('.left').css({"background": "skyblue"})
    $('.right').css({"background": "skyblue"})
    $('.photo-container').hide();
    $('.photo').hide();
})