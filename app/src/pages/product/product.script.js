app.router.controller(function(){
    console.log("Product controller Loaded.")
    console.log(this)

    //production.init()
    let _self = this;
    this.module.add({
        tag:"app-survey",
        html:"./pages/product/module.survey/survey.module.html",
        style:"./pages/product/module.survey/survey.module.style.css",
        script:"./pages/product/module.survey/survey.module.script.js"
    })
    this.module.init();

    
});//@component.controller