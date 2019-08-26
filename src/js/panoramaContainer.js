import '../style/style';
import '../style/panoramaContainer';
import $ from 'jquery';

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