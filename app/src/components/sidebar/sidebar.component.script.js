app.component.controller(function(){

    let _self = this


    $("app-sidebar #like").on('click',function(){
        console.log("click")
        _self.pubsub.emit("rateApp", {like:1} );
    })
    $("app-sidebar #dislike").on('click',function(){
        console.log("disclick")
        _self.pubsub.emit("rateApp", {dislike:1} );
    })


})