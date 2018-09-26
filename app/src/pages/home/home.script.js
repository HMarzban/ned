(function(){
 //console.log("readyyyyy")
})()

app.controller("/",function(){
    var _self = this

    this.module.add({
        tag:"chart-static",
        html:"./pages/home/chartLine.module/chartLine.index.module.html",
        script:"/pages/home/chartLine.module/chartLine.script.module.js",
        style:"/pages/home/chartLine.module/chartLine.style.module.css",
        controller:chart_staticController
    })


    this.module.initial();

//console.log(_self)
  //  console.log(_self.pubsub)


    
    _self.pubsub.on("dashboard",function(_data){
      //  console.log(_data)
    })

    function chart_staticController(){
      //  console.log(this)
    }


console.log(_self)




    setTimeout(() => {
       // _self.pubsub.emit("dashboard","Hello from dashboard")
    }, 4000);
//     const _self = this
//     /*console.log(this)
//     this.module.name = "hi ihi ih"
//     this.module.store["name"] = "Hossein";
//    this.module.store["lastName"] = "Marzban";
//     console.log(this)

//     globaleee="HiHossein Frome me"
//     console.log(globaleee)*/

//     this.module.pubsub.on("change",function(_data){
//         //console.log(_data)
//        //console.log(_self)
//        console.log(this)
//         //console.log(this.emit("changes","asdasd"))
//         console.log(_self.module.pubsub.events)
//     })

//     setTimeout(() => {
//         this.module.pubsub.emit("change","Hello Man from emit pubsub")
//     }, 1000);
})