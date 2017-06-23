/**
 * Created by kevin chen on 2017/6/23.
 */

var winHeight;
$(document).ready(function () {
setTimeout(setWidAndHei,300);


})
function getWindowHeight() {
    // 获取窗口高度
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
// 通过深入 Document 内部对 body 进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }

    //alert(winHeight);
}

function setWidAndHei() {
    getWindowHeight();

    $("#htmlMidea").css('width', $("#parentMedia").css('width').substr(0,$("#parentMedia").css('width').length-2)-15+'px');
    $("#htmlMidea").css('height', winHeight - 160);
}