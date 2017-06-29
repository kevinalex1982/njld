/**
 * Created by kevin chen on 2017/6/23.
 */
var tableslight;
var columnLight;
var lightJson;
$(document).ready(function() {

    lightJson=[];
    $.each(pointsinMaps.gateways,function (index,item) {
        $.each(item.lights,function (indexlight,itemlight) {
            lightJson.push(itemlight);
        })
    })
    console.log(lightJson);
    columnLight = [
        {
            "data": "id",
            "createdCell": function (nTd, sData, oData, iRow, iCol) {
                $(nTd).html("<input type='checkbox' name='checkList' value='" + sData + "'>");
            }
        },

        {"data": "id"},
        {"data": "name"},
        {"data": "gatewayname"},
        {"data": "area"},
        {"data": "road"},
        {"data": "open",
            "render": function (data, type, full, meta) {

                if (data == '0') {
                    return '<i  class="fa fa-times-circle"></i>';
                } else if (data == '1') {

                    return '<i class="fa fa-lightbulb-o"></i>';
                }


            }
        },
        {"data": "isonline",
            "render": function (data, type, full, meta) {

                if (data == '0') {
                    return '<i class="fa fa-times-circle"></i>';
                } else if (data == '1') {

                    return '<i class="fa fa-signal"></i>';
                }


            }
        },
        {"data": "curlightnum"},
        {"data": "curpower"},
        {"data": "curele"},
        {"data": "curvol"},
        {
            "data": "id", "width": "15%",
            "createdCell": function (nTd, sData, oData, iRow, iCol) {

                $(nTd).html("<button type='button' class='btn btn-primary btn-sm datatableEditGame'>开关设置</button>");

            }
        }
        /*   {
         "data": null,
         "title": "操作",
         "defaultContent":
         }*/
    ];



    /* 生成datatable游戏*/
    tableslight = $('#dataTables-light').DataTable({
        "dom": 'fr<"pull-right"<"toolbarGame">>tip',
        lengthChange: false,
        responsive: true,
        processing: true,
        pageLength: 15,
        ordering: false,
        bAutoWidth:false,
        /*       autoWidth: false,*/

        /* data: jsondatatest,*/
        columns: columnLight,
        sPaginationType: "full_numbers",
        oLanguage: {
            "sProcessing": "处理中...",
            "sLengthMenu": "每页 _MENU_ 条记录",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "当前显示第 _START_ 至第 _END_ 条记录，共 _TOTAL_ 条记录。",
            "sInfoEmpty": "当前显示第 0 至 0 条记录，共 0 条记录",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页",
                "sJump": "跳转"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        },
        "initComplete": function () {

            //加载完成之后 初始化checkbox
            checkbox('dataTables-light');


        },
        "serverSide": false,//服务端进行分页处理
      "data":lightJson
    });


    //$("div.toolbarGame").html(" <button type='button' class='btn btn-info btn-sm ' data-toggle='modal' data-target='#addSomeGamesModal' id='addSomeGamesModalBtn'>批量添加游戏</button>    <button type='button' class='btn btn-danger btn-sm '  id='delGameGroup'>删除选中游戏</button>    <button type='button' class='btn btn-primary btn-sm ' data-toggle='modal' data-target='#addGameModal' id='addGameModalBtn'>添加游戏</button>");

    // 数据编辑
    $('#dataTables-light tbody').on('click', 'button.datatableEditGame', function () {
        var data = tableslight.row($(this).parents('tr')).data();

        openUpdGameModalInitParam(data, tableslight);

    });
    /*删除游戏*/
    $('#dataTables-light tbody').on('click', 'button.datatableDeleteGame', function () {

        var data = tableslight.row($(this).parents('tr')).data();
        swal({
                title: "确定要删除吗?",
                text: "删除后无法恢复选项!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "删除!",
                closeOnConfirm: false
            },
            function () {
                $.post("/dldata/delGame", {game: data, curuser: loginUser}, function (result) {
                    if (result == 'success') {
                        tableslight.ajax.reload();
                        swal("删除成功!", "该行数据被删除.", "success");
                    }
                    else {
                        swal("删除失败!", "请联系管理员.", "error");
                    }
                })

            });

    });


    // 任务进度
    $('#dataTables-light tbody').on('click', 'button.datatableTask', function () {
        var data = tableslight.row($(this).parents('tr')).data();

       

    });

    //选中一行 checkbox选中
    function checkbox(tableId) {
        //每次加载时都先清理
        $('#' + tableId + ' tbody').off("click", "tr");
        $('#' + tableId + ' tbody').on("click", "tr", function () {

            $(this).toggleClass('selected');
            if ($(this).hasClass("selected")) {
                $(this).find("input").prop("checked", true);
            } else {
                $(this).find("input").prop("checked", false);
            }
        });


    }
});