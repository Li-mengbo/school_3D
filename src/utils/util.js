export function GetQueryString (name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}
/**
 * 使用test方法实现模糊查询
 * @param  {Array}  list     原数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
export function fuzzyQuery(list, keyWord) {
  console.log(list)
    var reg =  new RegExp(keyWord);
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (reg.test(list[i].name)) {
        arr.push(list[i]);
      }
    }
    return arr;
}
/*传入经度，返回基于模型的X坐标点
  *@param longitude
  *@return 基于模型的X坐标点
  *说明：
  *模型大门的坐标为(x=-0.1,z=16.5,116.64861023,39.92165992)
  *模型财贸大楼会议楼坐标为(x=40.2，z=-8.7，116.64481759,39.91972215)
  */
        
 export function CalculationX(x) {
  const a = (-0.1 - 40.2) / (116.64861023 - 116.64481759);
  const b = (-0.1 - 116.64861023 * a);
  return -(a * x + b);
}

/*传入纬度,返回基于模型的Z坐标点
  *@param latitude
  *@return 基于模型的Z坐标点
  */
 export function CalculationZ(z) {
    const a = (16.5 - -8.7) / (39.92165992 - 39.91972215);
    const b = (16.5 - 39.92165992 * a);
    return -(a * z + b);
}
/* 多维数组转换成一维数组*/
export function unid(arr){
  var arr1 = (arr + '').split(',');//将数组转字符串后再以逗号分隔转为数组
  var arr2 = arr1.map(function(x){
      return Number(x);
  });
  return arr2;
}
/* 一维数组转换为二维 */
export function erwei(baseArray) {
  let len = baseArray.length;
  let n = 2; //假设每行显示4个
  let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
  let res = [];
  for (let i = 0; i < lineNum; i++) {
      // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
      let temp = baseArray.slice(i*n, i*n+n);
      res.push(temp);
  }
  return res;
}