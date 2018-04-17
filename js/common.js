
//选中字体变成蓝色背景
document.onselectstart = function() {
  return false;
}
//根据设备屏幕的宽度设置根字体大小
function fnRem(){
  var font_size;
  if(window.screen.width >= 768){
    font_size = '20px';
  }else{
    font_size = window.screen.width / 15 + 'px';
  }
  $('html').css('font-size',font_size);
}
fnRem();
$(window).resize(function(){fnRem();});