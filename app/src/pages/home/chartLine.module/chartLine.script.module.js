

//let chart = document.getElementsByTagName('chart-static');


//console.log(chart)3
 
app.module.controller(function(){
    console.log(this)

    let chart = document.getElementsByTagName('chart-static')

        chart[0].controller(function(){
            var _self = this
            console.log(_self)
            _self.element.querySelector('.head').innerHTML = `Module: <b> ${_self.element.tagName} </b>`
            _self.element.querySelector('.body').innerHTML = `Chart-static "one" Body`;
        });

        chart[1].controller(function(){
            var _self = this;
            _self.element.querySelector('.head').innerHTML = `Module: <b> ${_self.element.tagName} </b>`
            _self.element.querySelector('.body').innerHTML = "Chart-static two Body";
        });

        chart[2].controller(function(){
            var _self = this;
            _self.element.querySelector('.head').innerHTML = `Module: <b> ${_self.element.tagName} </b>`
            _self.element.querySelector('.body').innerHTML = "Chart-static three Body";
        });





});//@module.controller






