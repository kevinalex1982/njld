$(document).ready(function () {
    /* Card fullscreeen button script */
    $('.fullscreen-btn').on('click', function () {
        $(this).closest(".full-screen-container").toggleClass("fullscreen");
        $('body').toggleClass("fullscreen");
        console.log('change');

        if ($(this).closest(".full-screen-container")[0].id == 'PowerCons') {
            if ($(this).closest(".full-screen-container").hasClass("fullscreen")) {
                buildBigPowerCharts();
            }
            else {
                buildPowerCharts();
            }
        }

        if ($(this).closest(".full-screen-container")[0].id == 'LivePower') {
            if ($(this).closest(".full-screen-container").hasClass("fullscreen")) {
                buildBigLivePowerCharts();
            }
            else {
                buildLivePowerCharts();
            }
        }
    });

    setTimeout(buildPowerCharts, 300);
    setTimeout(buildLivePowerCharts, 300);
});

function buildPowerCharts() {
    $("#containerPowerConsumptionHistory").css('width', $("#parentPowerConsumptionHistory").css('width').substr(0, $("#parentPowerConsumptionHistory").css('width').length - 2) - 35 + 'px');
    $("#containerPowerConsumptionHistory").css('height', '383px');
    PowerChartDataInit();
}
function buildBigPowerCharts() {
    $("#containerPowerConsumptionHistory").css('width', $("#parentPowerConsumptionHistory").css('width'));
    $("#containerPowerConsumptionHistory").css('height', $("#parentPowerConsumptionHistory").css('height').substr(0, $("#parentPowerConsumptionHistory").css('height').length - 2) - 70 + 'px');
    PowerChartDataInit();
}


function buildLivePowerCharts() {
    $("#containerLivePower").css('width', $("#parentLivePowerContainer").css('width').substr(0, $("#parentLivePowerContainer").css('width').length - 2) - 35 + 'px');
    $("#containerLivePower").css('height', '383px');
    LivePowerChartDataInit();
}
function buildBigLivePowerCharts() {
    $("#containerLivePower").css('width', $("#parentLivePowerContainer").css('width'));
    $("#containerLivePower").css('height', $("#parentLivePowerContainer").css('height').substr(0, $("#parentLivePowerContainer").css('height').length - 2) - 70 + 'px');
    LivePowerChartDataInit();
}

//修改能耗数据的地方
function PowerChartDataInit() {
    $('#containerPowerConsumptionHistory').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: ''
        },
        xAxis: [{
            categories: ['Jul-16', 'Aug-16', 'Sep-16', 'Oct-16', 'Nov-16', 'Dec-16',
                'Jan-17', 'Feb-17', 'Mar-17', 'Apr-17', 'May-17', 'Jun-17'],
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}kwh',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '能耗',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            gridLineColor: 'rgba(255, 255, 255, 0.1)'
        }, { // Secondary yAxis
            title: {
                text: '增长率',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true,
            gridLineColor: 'rgba(255, 255, 255, 0.1)'
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 200,
            verticalAlign: 'top',
            y: 10,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#ffffff'
        },
        series: [{
            name: '能耗',
            type: 'column',
            data: [132.99, 134.85, 111.78, 113.83, 100.08, 105.65, 108.62, 102.14, 117.18, 115.83, 134.85, 128.7],
            tooltip: {
                valueSuffix: ' kwh'
            },
            color: '#6284ee',
            borderColor: ''
        }, {
            name: '增长率',
            type: 'spline',
            yAxis: 1,
            data: [9, 1, -17, 2, -12, 6, 3, -6, 15, -1, 16, -5],
            tooltip: {
                valueSuffix: '%'
            },
            color: '#ff6262'
        }]
    });
}

//修改实时能耗数据的地方
function LivePowerChartDataInit() {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    function activeLastPointToolip(chart) {
        var points = chart.series[0].points;
        chart.tooltip.refresh(points[points.length - 1]);
    }

    $('#containerLivePower').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0],
                        chart = this;
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = parseInt(Math.random() * 20 + 140, 10) * 3;
                        series.addPoint([x, y], true, true);
                        activeLastPointToolip(chart)
                    }, 10000);
                }
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 100
        },
        yAxis: {
            labels: {
                format: '{value}kwh',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '能耗',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            gridLineColor: 'rgba(255, 255, 255, 0.1)'
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '能耗',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 10000,
                        y: parseInt(Math.random() * 20 + 140, 10) * 3
                    });
                }
                return data;
            }())
            ,
            color: '#6284ee'
        }]
    }, function (c) {
        activeLastPointToolip(c)
    });
}

/*
 1500-800 = 700
 Math.random()*700
 var num = Math.random()*700 + 800;
 num = parseInt(num, 10);*/
