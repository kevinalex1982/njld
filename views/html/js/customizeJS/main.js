/**
 * Created by kevin on 2017/6/20.
 */
var jsonWeatherBox;
$(document).ready(function () {

    

    $.post('/getJsonFile', {fileurl: "weatherbox.json"}, function (json) {
         jsonWeatherBox = JSON.parse(json);
        $.each(jsonWeatherBox, function (index, item) {

            if (item.id == Number($(userFormGameSelect).val())) {
                $("#curBoxName").text(item.name);
                $("#curBoxLoc").text(item.loc);
                $("#curBoxTemprature").text(item.temprature +" ℃");
                $("#curBoxTempratureMax").text(item.maxtemprature +" ℃");
                $("#curBoxTempratureMin").text(item.mintemprature +" ℃");
                $("#curBoxHumidity").text(item.humidity +" %");
                $("#curBoxHumidityMax").text(item.maxhumidity );
                $("#curBoxHumidityMin").text(item.minhumidity);
                $("#curBoxPM25").text(item.pm2);
                $("#curBoxPM25Max").text(item.maxpm2);
                $("#curBoxPM25Min").text(item.minpm2);
                $("#curBoxCO2").text(item.co2+" ppa");
                $("#curBoxCO2Max").text(item.maxco2);
                $("#curBoxCO2Min").text(item.minco2);
            }
        })
    });

    $('#userFormGameSelect').change(function () {
        $.each(jsonWeatherBox, function (index, item) {

            if (item.id == Number($(userFormGameSelect).val())) {
                $("#curBoxName").text(item.name);
                $("#curBoxLoc").text(item.loc);
                $("#curBoxTemprature").text(item.temprature +" ℃");
                $("#curBoxTempratureMax").text(item.maxtemprature +" ℃");
                $("#curBoxTempratureMin").text(item.mintemprature +" ℃");
                $("#curBoxHumidity").text(item.humidity +" %");
                $("#curBoxHumidityMax").text(item.maxhumidity );
                $("#curBoxHumidityMin").text(item.minhumidity);
                $("#curBoxPM25").text(item.pm2);
                $("#curBoxPM25Max").text(item.maxpm2);
                $("#curBoxPM25Min").text(item.minpm2);
                $("#curBoxCO2").text(item.co2+" ppa");
                $("#curBoxCO2Max").text(item.maxco2);
                $("#curBoxCO2Min").text(item.minco2);
            }
        })
    })
})