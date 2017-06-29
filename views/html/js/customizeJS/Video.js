/**
 * Created by kevin on 2017/6/29.
 */
var winHeight;

var setting = {};

var zNodes = [
    {
        name: "南京市",
        open: true,
        icon: 'img/city.png',   
        children: [
            {
                name: "江宁区",
                icon: 'img/city.png',
                open: true,
                children: [
                    {
                        name: "麒麟科技园",
                        icon: 'img/city.png',
                        open: true,
                        children: [
                            {name: "演示室摄像机",id:4004000000005003,icon:"img/camera.png"}
                        ]
                    }
                ]
            }

        ]
    }
];
$(document).ready(function () {
    getWindowHeight();
    $("#treePanel").css('height', winHeight - 80);



    $.fn.zTree.init($("#jstree_video"), setting, zNodes);

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
