$(document).ready(function () {
    /* prgress cricle */
    $('.progress-success').circleProgress({
        fill: {gradient: ["#2dc1c9", "#0d769f   "]},
        lineCap: 'butt'
    }).on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').html(Math.round(100 * progress * stepValue) + '<i>%</i>');
    });
    $('.progress-danger').circleProgress({
        fill: {gradient: ["#f6775a", "#ed5a7c"]},
    }).on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').html(Math.round(100 * progress * stepValue) + '<i>%</i>');
    });
    $('.progress-warning').circleProgress({
        fill: {gradient: ["#ff9300", "#ff5800"]},
        lineCap: 'butt'
    }).on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').html(Math.round(100 * progress * stepValue) + '<i>%</i>');
    });
    $('.progress-primary').circleProgress({
        fill: {gradient: ["#a758f5", "#7a79fe"]},
        lineCap: 'butt'
    }).on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').html(Math.round(100 * progress * stepValue) + '<i>%</i>');
    });


})