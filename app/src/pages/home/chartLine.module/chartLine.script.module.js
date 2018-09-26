

let chart = document.getElementsByTagName('chart-static');

console.log(chart)

chart[0].controller(function(){
    var _self = this
    chart[0].innerHTML = "chart-static one";
});

chart[1].controller(function(){
    var _self = this;
    chart[1].innerHTML = "chart-static one";
});

chart[2].controller(function(){
    var _self = this;
    chart[2].innerHTML = "chart-static one";
});






