import '../style/style';
import '../style/route';
import { GetQueryString, fuzzyQuery } from '../utils/util';
import $ from 'jquery';
let mapList;
// 获取模糊查询信息
$.ajax({ 
    url: "http://47.92.118.208/school-map/sitePosition/getAll", 
    success: function(res){
        console.log('模糊查询',res)
        if(res.code == 200) {
            mapList = res.data;
            mapList.forEach(item => {
                $('.open').append(
                    `
                    <p class="open-title">${item.name}</p>
                    `
                )
            });
            $(".activity-title").click(function() {
                var flag = $(this).parent('.activity').attr('data-flag');
                console.log(flag)
                if(flag == "true") {
                    var length =  $(this).parent('.activity').find('.open-title').length + 1 || 1;
                    $(this).parent('.activity').animate({
                        height: length * .9 + 'rem', 
                    },1000)
                    $(this).parent('.activity').attr('data-flag', 'flase')
                    // $(this).parent('.activity').siblings('.activity').hide();
                    // $(this).siblings('.activity').animate({
                    //     height: '1rem', 
                    // },1000)
                    // $(this).siblings('.activity').attr('data-flag', 'true')
                }else {
                    $(this).parent('.activity').animate({
                        height: '.8rem', 
                    },1000)
                    $(this).parent('.activity').attr('data-flag', 'true')
                    // $('.activity').show()
                    // $(this).siblings('.activity').attr('data-flag', 'false')
                }
            })
            $('.open-title').click(function () {
                const name = $(this).html();
                const that = this;
                // 获取坐标
                $.ajax({ 
                    url: `http://47.92.118.208/school-map/sitePosition/getByName?name=${name}`, 
                    success: function(res){
                        console.log('获取坐标',res)
                        if(res.code == 200) {
                          const positionList = res.data;
                          $(that).parent('.open').prev('input').val(positionList.name);
                          $(that).parents('.activity').animate({
                            height: '.8rem',
                          }, 1000)
                          $(that).parents('.activity').attr('data-flag', 'true')
                        }
                    }
                });
            })
        }
    }
});
$('.walk').click(function() {
    const start = $('.start').val();
    const end = $('.end').val();
    if(start == end) {
        alert('请输入不同的地点')
        return false;    
    }
    if(!start || !end) {
        alert('请输入地点')
        return false;        
    }
    const startPosition = fuzzyQuery(mapList, start);
    const endtPosition = fuzzyQuery(mapList, end);
    if(startPosition.length == 0) {
        alert('你输入的起点有误')
        return false;
    }
    if(endtPosition.length == 0) {
        alert('你输入的终点有误')
        return false;
    }
    const startCenter = startPosition[0].center.replace(/ /g, '');
    const endCenter = endtPosition[0].center.replace(/ /g, '');
    console.log(startCenter, endCenter)
    window.location = `./index.html?startCenter=${startCenter}&endCenter=${endCenter}`
})
