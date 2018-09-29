

app.router.controller(function(){
    var _self = this
    console.log(this)


    this.module.add({
        tag:"chart-static",
        html:"./pages/home/chartLine.module/chartLine.index.module.html",
        script:"/pages/home/chartLine.module/chartLine.script.module.js",
        style:"/pages/home/chartLine.module/chartLine.style.module.css"
    })


    this.module.init();

    
    _self.pubsub.on("dashboard",function(_data){
      //  console.log(_data)
    })


});//@component.controller