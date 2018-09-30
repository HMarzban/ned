app.module.controller(function(){
    console.log(this)
    var _self = this

    let survay = document.getElementsByTagName('app-survey')

    survay[0].controller(function(){

        $(this.element).find("#like").on("click",function(){
            _self.pubsub.emit("rateApp", {like:1} );
        });
        $(this.element).find("#dislike").on("click",function(){
            _self.pubsub.emit("rateApp", {dislike:1} );
        });

    });




})