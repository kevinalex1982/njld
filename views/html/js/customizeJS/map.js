/**
 * Created by kevin on 2017/6/21.
 */
var map;          // 创建地图实例
var point;

var curmarker;
var curpointAtThismap;
var curwindow;
var curpoint;
var geoc;
var myIcon;
var winHeight;
var drawingManager;
var customLayer;
var overlays;
var pointsinMaps = {
    "gateways": [
        {
            "id": 1000001,
            "name": "园区室内",
            "loc": "麒麟工业园区演示室内",
            "pointLon": 118.92812,
            "pointLat": 32.032966,
            "isonline": 1,
            "lights": [
                {
                    "id": 2000001,
                    "name": "园区室内",
                    "loc": "麒麟工业园区演示室内",
                    "pointLon": 118.928102,
                    "pointLat": 32.03331,
                    "gateway": 1000001,
                    "isonline": 1,
                    "curele": 20,
                    "curpower": 2243,
                    "curlightnum": 15,
                    "setlightnum": 50,
                    "camera": {
                        "ip": "192.168.1.101",
                        "isonline": 1
                    },
                    "airbox": {
                        "id": 3000001,
                        "ip": "192.168.2.101",
                        "pointLon": 118.928102,
                        "pointLat": 32.03331,
                        "isonline": 1,
                        "name": "园区室内",
                        "loc": "麒麟工业园区演示室内",
                        "temprature": "29",
                        "humidity": "60%",
                        "pm2": 102,
                        "co2": 550
                    }
                },
                {
                    "id": 2000002,
                    "name": "室外1",
                    "loc": "麒麟工业园区室外1",
                    "pointLon": 118.929414,
                    "pointLat": 32.03243,
                    "gateway": 1000001,
                    "isonline": 0,
                    "curele": 10,
                    "curpower": 1250,
                    "curlightnum": 25,
                    "setlightnum": 50
                },
                {
                    "id": 2000003,
                    "name": "室外2",
                    "loc": "麒麟工业园区室外2",
                    "pointLon": 118.926701,
                    "pointLat": 32.032032,
                    "gateway": 1000001,
                    "isonline": 1,
                    "curele": 30,
                    "curpower": 3333,
                    "curlightnum": 35,
                    "setlightnum": 50,
                }
            ]
        }
    ],

};
$(document).ready(function () {


    getWindowHeight();

    $("#mapContent").css('width', $("#pageContentContainer").css('width'));
    $("#mapContent").css('height', winHeight - 230);



    map = new BMap.Map("mapContent", {
        MapOptions: {
            enableAutoResize: true
        }
    });
    
    // 创建地图实例
    map.centerAndZoom(new BMap.Point(118.92812, 32.032966), 18);
    map.addEventListener("tilesloaded", function () {
        drawpoint();
    });
    /* map.centerAndZoom('118.893562,32.020265', 12);                 // 初始化地图，设置中心点坐标和地图级别*/
    map.enableScrollWheelZoom(true);
    map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
    overlays = [];
    var overlaycomplete = function (e) {
        clearAll();
        if (drawingManager.getDrawingMode() == 'rectangle') {
            //alert(e.drawingMode);
            console.log(e.overlay);

            map.addOverlay(e.overlay);
            //console.log(e);
            /* var radius = parseInt(e.getRadius());*/
            /*  var center = e.getCenter();*/
            drawingManager.close();
            /*localSearch.searchNearby('积水点', center, radius, {
             customData: {
             geotableId: 91687
             }
             });*/

            overlays.push(e.overlay);
        }


        //console.log(overlays);
    };
    var styleOptions = {
        strokeColor: "blue",    //边线颜色。
        fillColor: "blue",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
        fillOpacity: 0.4,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    }
    //实例化鼠标绘制工具
    drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            drawingModes: [
                BMAP_DRAWING_RECTANGLE
            ]
        },
        rectangleOptions: styleOptions //矩形的样式
    });
    //添加鼠标绘制工具监听事件，用于获取绘制结果
    drawingManager.addEventListener('overlaycomplete', overlaycomplete);


    $("#clearRect").on('click', function () {

        clearAll();
    })
    //addCustomLayer();、

    $("#loveGroup").on('change',function () {
        if($(loveGroup).val().toString() =='1')
        {
            map.centerAndZoom(new BMap.Point(118.92812, 32.032966), 18);
        }else  if($(loveGroup).val().toString() =='2')
        {
            map.centerAndZoom(new BMap.Point(118.92812, 32.032966), 16);
        }
    })
})

function clearAll() {
    for (var i = 0; i < overlays.length; i++) {
        map.removeOverlay(overlays[i]);
    }
    overlays.length = 0
}


function drawpoint() {

    $.each(pointsinMaps.gateways, function (index, item) {

        var iconstr;
        if (item.isonline == 1) {
            iconstr = "img/map/point-gateway-blue.png";
        } else {
            iconstr = "img/map/point-gateway-gray.png";
        }
        var pointThis = new BMap.Point(item.pointLon, item.pointLat);

        var myIcon = new BMap.Icon(iconstr, new BMap.Size(28, 49));

        var marker = new BMap.Marker(pointThis, {
            title: item.name,
            icon: myIcon
        }); // 创建点
        marker.setTop(true);
        map.addOverlay(marker);            //增加点

        var html = '            <div class="mt-0 mb-2 ">' +
            '            <span><span>网关编号：</span><span class="ml-2">' + item.id + '</span></span>' +
            '        </div>' +
            '            <div class="mt-0 mb-2 ">' +
            '            <span><span>网关位置：</span><span class="ml-2">' + item.loc + '</span></span>' +
            '        </div>' +
            '            <div class="mt-0 mb-2 ">' +
            '            <span><span>经度纬度：</span><span class="ml-2">' + item.pointLon + ' , ' + item.pointLat + '</span></span>' +
            '        </div>' +
            '            <div class="mt-0 mb-2 ">' +
            '            <span><span>当前状态：</span><span class="ml-2">' + item.isonline + '</span></span>' +
            '        </div>' +
            '        </div>';

        var opts = {
            width: 250,     // 信息窗口宽度
            height: 150,     // 信息窗口高度
            title: item.name
        }
        var infoWindow = new BMap.InfoWindow(html, opts);  // 创建信息窗口对象
        marker.addEventListener("click", function () {
            map.openInfoWindow(infoWindow, pointThis); //开启信息窗口
            $("#lighttaba").on('click', function () {
                sellClass('lighttab', 'active');
                sellClass('lighttaba', 'active');
                clearClass([{id: 'boxtab'}, {id: 'videotab'}], 'active');
                clearClass([{id: 'boxtaba'}, {id: 'videotaba'}], 'active');
            })
            $("#boxtaba").on('click', function () {
                sellClass('boxtab', 'active');
                sellClass('boxtaba', 'active');
                clearClass([{id: 'lighttab'}, {id: 'videotab'}], 'active');
                clearClass([{id: 'lighttaba'}, {id: 'videotaba'}], 'active');
            })
            $("#videotaba").on('click', function () {
                sellClass('videotab', 'active');
                sellClass('videotaba', 'active');
                clearClass([{id: 'lighttab'}, {id: 'boxtab'}], 'active');
                clearClass([{id: 'lighttaba'}, {id: 'boxtaba'}], 'active');
            })
        })

        $.each(item.lights, function (indexlight, itemlight) {

            var iconstr;
            if (itemlight.isonline == 1) {
                iconstr = "img/map/point-light-blue.png";
            } else {
                iconstr = "img/map/point-light-gray.png";
            }
            var pointLightThis = new BMap.Point(itemlight.pointLon, itemlight.pointLat);

            var myIconLight = new BMap.Icon(iconstr, new BMap.Size(28, 49));

            var marker = new BMap.Marker(pointLightThis, {
                title: itemlight.name,
                icon: myIconLight
            }); // 创建点
            marker.setTop(true);
            map.addOverlay(marker);            //增加点


            var html = '  <div class="sixemfont " style="border-top:1px solid  black;">  ' +
                '<div class=" " style="border-top:1px solid  black;">  ' +
                '    <ul class="nav nav-tabs" role="tablist " id="ulLight">' +
                '            <li class="nav-item "> <a class="nav-link active " data-toggle="tab" id="lighttaba"  role="tab">路灯</a> </li>' +
                '            </ul>' +
                '    <!-- Tab panes -->' +
                '        <div class="tab-content" id="tabContent">' +
                '            <div class="tab-pane active sixemfont" id="lighttab" role="tabpanel"> ' +
                '            <div class="mt-0 mb-2 ">' +
                '            <span><span>路灯编号：</span><span class="ml-2">' + itemlight.id + '</span></span>' +
                '        </div>' +
                '            <div class="mt-0 mb-2 ">' +
                '            <span><span>路灯位置：</span><span class="ml-2">' + itemlight.loc + '</span></span>' +
                '        </div>' +
                '            <div class="mt-0 mb-2 ">' +
                '            <span><span>经度纬度：</span><span class="ml-2">' + itemlight.pointLon + ' , ' + itemlight.pointLat + '</span></span>' +
                '        </div>' +
                '            <div class="mt-0 mb-2 ">' +
                '            <span><span>实时电流：</span><span class="ml-2">' + itemlight.curele + '</span></span>' +
                '        </div>' +
                '            <div class="mt-0 mb-2 ">' +
                '            <span><span>实时功率：</span><span class="ml-2">' + itemlight.curpower + '</span></span>' +
                '        </div>' +
                '            <div class="mt-0 mb-2 ">' +
                '            <span><span>当前状态：</span><span class="ml-2">' + itemlight.isonline + '</span></span>' +
                '        </div>' +
                '            <div class="mt-0 mb-2 ">' +
                '            <span><span>当前亮度：</span><span class="ml-2">' + itemlight.curlightnum + '</span></span>' +
                '        </div>' +
                '<div> ' +
                '                <div class="can-toggle can-toggle--size-small " style="width: 90px;float:left;">            ' +
                '    <input id="b" type="checkbox">' +
                '                <label for="b">' +
                '                <div class="can-toggle__switch" data-checked="开" data-unchecked="关"></div>   ' +
                '  </label>' +
                '<div  style="width: 360px"><span >调光(</span> <span id="setlightnum">' + itemlight.setlightnum + '</span><span >) </span><span  style="margin-left: 10px">0 </span>' +
                '<input class="mt-1" type="range"  value="' + itemlight.setlightnum + '" style="width: 200px;margin-left: 10px" id="rangelightnum" ><span  style="margin-left: 2px">100</span></div>' +
                '            </div>   ' +

                '</div>' +
                '</div>' +

                '        </div>' +
                '        </div>';

            var opts = {
                width: 400,     // 信息窗口宽度
                height: 360,     // 信息窗口高度
                title: item.name
            }
            var infoWindow = new BMap.InfoWindow(html, opts);  // 创建信息窗口对象
            marker.addEventListener("click", function () {
                map.openInfoWindow(infoWindow, pointLightThis); //开启信息窗口

                var html_li_box = ' <li class="nav-item "> <a class="nav-link " data-toggle="tab"  role="tab" id="boxtaba">空气盒子</a> </li>';
                var html_li_video = '<li class="nav-item "> <a class="nav-link " data-toggle="tab" role="tab" id="videotaba">监控画面</a> </li>';
                var html_tabcontent_box;


                var html_tabcontent_video = '<div class="tab-pane" id="videotab" role="tabpanel"> Message  This is awesome product and, I am very happy with delivery & product packaging. Overall experience is good & I prefer to buy it again from this portals and like more orders. </div>';

                if (itemlight.airbox != null) {
                    html_tabcontent_box = '        <div class="tab-pane" id="boxtab" role="tabpanel">' +
                        '            <div class="mt-0 mb-2 ">' +
                        '            <span><span>盒子编号&nbsp;&nbsp;&nbsp;：</span><span class="ml-2">' + itemlight.airbox.id + '</span></span>' +
                        '        </div>' +
                        '            <div class="mt-0 mb-2 ">' +
                        '            <span><span>盒子位置&nbsp;&nbsp;&nbsp;：</span><span class="ml-2">' + itemlight.airbox.loc + '</span></span>' +
                        '        </div>' +
                        '            <div class="mt-0 mb-2 ">' +
                        '            <span><span>经度纬度&nbsp;&nbsp;&nbsp;：</span><span class="ml-2">' + itemlight.airbox.pointLon + ' , ' + itemlight.pointLat + '</span></span>' +
                        '        </div>' +
                        '            <div class="mt-0 mb-2 ">' +
                        '            <span><span>当前温度&nbsp;&nbsp;&nbsp;：</span><span class="ml-2">' + itemlight.airbox.temprature + '</span></span>' +
                        '        </div>' +
                        '            <div class="mt-0 mb-2 ">' +
                        '            <span><span>当前湿度&nbsp;&nbsp;&nbsp;：</span><span class="ml-2">' + itemlight.airbox.humidity + '</span></span>' +
                        '        </div>' +
                        '            <div class="mt-0 mb-2 ">' +
                        '            <span><span>当前PM2.5：</span><span class="ml-2">' + itemlight.airbox.pm2 + '</span></span>' +
                        '        </div>' +
                        '            <div class="mt-0 mb-2 ">' +
                        '            <span><span>当前CO2&nbsp;&nbsp;：</span><span class="ml-2">' + itemlight.airbox.co2 + '</span></span>' +
                        '        </div>' +

                        '            <div class="mt-0 mb-2 ">' +
                        '            <span><span>当前状态&nbsp;&nbsp;&nbsp;：</span><span class="ml-2">' + itemlight.airbox.isonline + '</span></span>' +
                        '        </div>';

                    $("#ulLight").append(html_li_box);
                    $("#tabContent").append(html_tabcontent_box);
                }

                if (itemlight.camera != null) {
                    $("#ulLight").append(html_li_video);
                    $("#tabContent").append(html_tabcontent_video);
                }


                $("#rangelightnum").RangeSlider({min: 0, max: 100, step: 1, callback: change});
                $("#lighttaba").on('click', function () {
                    sellClass('lighttab', 'active');
                    sellClass('lighttaba', 'active');
                    clearClass([{id: 'boxtab'}, {id: 'videotab'}], 'active');
                    clearClass([{id: 'boxtaba'}, {id: 'videotaba'}], 'active');
                })
                $("#boxtaba").on('click', function () {
                    sellClass('boxtab', 'active');
                    sellClass('boxtaba', 'active');
                    clearClass([{id: 'lighttab'}, {id: 'videotab'}], 'active');
                    clearClass([{id: 'lighttaba'}, {id: 'videotaba'}], 'active');
                })
                $("#videotaba").on('click', function () {
                    sellClass('videotab', 'active');
                    sellClass('videotaba', 'active');
                    clearClass([{id: 'lighttab'}, {id: 'boxtab'}], 'active');
                    clearClass([{id: 'lighttaba'}, {id: 'boxtaba'}], 'active');
                })
            })
        })

    })


}


function change($input) {
    /*内容可自行定义*/
    console.log($("#rangelightnum").val());
    $("#setlightnum").text($("#rangelightnum").val());

}

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


function sellClass(tabid, className) {
    if ($("#" + tabid).hasClass(className) == false) {
        $("#" + tabid).addClass(className)
    }
}

function clearClass(tabids, className) {
    $.each(tabids, function (index, item) {
        if ($("#" + item.id).hasClass(className)) {
            $("#" + item.id).removeClass(className);
        }
    })

}

/*

 function addCustomLayer(keyword) {
 if (customLayer) {
 map.removeTileLayer(customLayer);
 }
 customLayer=new BMap.CustomLayer({
 geotableId: 30960,
 q: '', //检索关键字
 tags: '', //空格分隔的多字符串
 filter: '' //过滤条件,参考http://developer.baidu.com/map/lbs-geosearch.htm#.search.nearby
 });
 map.addTileLayer(customLayer);
 customLayer.addEventListener('hotspotclick',callback);
 }
 function callback(e)//单击热点图层
 {
 alert('sss');
 var customPoi = e.customPoi;//poi的默认字段
 var contentPoi=e.content;//poi的自定义字段
 var content = '<p style="width:280px;margin:0;line-height:20px;">地址：' + customPoi.address + '<br/>价格:'+contentPoi.dayprice+'元'+'</p>';
 var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
 title: customPoi.title, //标题
 width: 290, //宽度
 height: 40, //高度
 panel : "panel", //检索结果面板
 enableAutoPan : true, //自动平移
 enableSendToPhone: true, //是否显示发送到手机按钮
 searchTypes :[
 BMAPLIB_TAB_SEARCH,   //周边检索
 BMAPLIB_TAB_TO_HERE,  //到这里去
 BMAPLIB_TAB_FROM_HERE //从这里出发
 ]
 });
 var point = new BMap.Point(customPoi.point.lng, customPoi.point.lat);
 searchInfoWindow.open(point);
 }*/
/*
 var opts = {
 width: 300,     // 信息窗口宽度
 height: 130,     // 信息窗口高度
 title: iteme.pointName, // 信息窗口标题
 enableMessage: true,//设置允许信息窗发送短息
 message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
 }
 var leftNum = iteme.pointLeftNum == '' ? 0 : iteme.pointLeftNum;
 var isOnline = iteme.pointIsOnline == 'true' ? "在线" : "离线";

 var infoWindow = new BMap.InfoWindow("备注：" + iteme.pointRmk + '<br><span style="font-weight: bold, color:blue">剩余：' + leftNum + '</span><br>' + "在线与否：" + isOnline + '<br><a id=' + iteme.pointID + ' class="btn btn-outline dark pull-right">修改<span hidden>' + iteme.pointRmk + '</span></a>', opts);  // 创建信息窗口对象
 /!*    curpointAtThismap=pointThis;
 curwindow=infoWindow;*!/
 marker.addEventListener("click", function () {
 map.openInfoWindow(infoWindow, pointThis); //开启信息窗口
 $("#" + iteme.pointID).on('click', function (obj) {
 console.log(infoWindow);
 curpoint = iteme;
 curmarker = marker;
 console.log(curpoint);

 setValueToModal(curpoint, marker);
 $("#responsive").modal('show');
 // $("#responsive").show();
 })
 });*/