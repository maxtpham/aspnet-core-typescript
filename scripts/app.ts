import * as $ from "jquery"

$(document).ready(() => {
    document.body.innerHTML = "<i>Loading Yahoo! Weather...</i>";
    $.ajax(<JQueryAjaxSettings>{
        url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
        crossDomain: true
    }).fail(error => {
        document.body.innerHTML = '';
        $('<pre style="color: red">').text(JSON.stringify(error, null, '\t')).appendTo(document.body);
    }).done(json_weather => {
        document.body.innerHTML = '';
        // https://codepen.io/hellenlarach/pen/MYaXKb
        $('<h1>').text(json_weather.query.results.channel.title).appendTo(document.body);
        $('<h2>').text('Date: ').appendTo(document.body);
        $(document.body).append(json_weather.query.results.channel.item.condition.date);
        $('<h2>').text('Temperature: ').appendTo(document.body);
        $(document.body).append(json_weather.query.results.channel.item.condition.temp);
        $('<h2>').text('Wind Chill: ').appendTo(document.body);
        $(document.body).append(json_weather.query.results.channel.wind.chill);
    });
});