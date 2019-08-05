import '../style/style'
import '../style/periphery';
import $ from 'jquery';
// 获取模糊查询信息
$.ajax({ 
    url: "http://47.92.118.208/school-map/circumType/getAll", 
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