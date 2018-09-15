
       var app = Router();

            app.config({
                customAttributeNavigate:"rehf",
                defualtRoot:'/'
            });


            
            app.addRoute({
                '/':{
                    name:"Dashboard Page",
                    html:"./pages/home/home.page.html",
                    script:"./pages/home/home.script.js",
                    style:"./pages/home/home.style.css",
                    controller:function(){ /*console.log("/ Controller loaded")*/ }
                },
                '/about':{
                    name:"About Us",
                    html:"./pages/about/about.page.html",
                    script:"./pages/about/about.script.js",
                    style:"./pages/about/about.style.css",
                    guard:function(){
                        return new Promise(function(resolve, reject){
                            resolve(false);
                        });
                    },
                    controller:function(err){ 
                        //console.log(err)
                        //console.log("/about controller loaded")
                    }
                },
                '/products':{
                    name:"./products",
                    html:"./pages/product/product.page.html",
                    script:"./pages/product/product.script.js",
                    style:"./pages/product/product.style.css",
                    controller:function(){ /*console.log("/products controller loaded")*/ }
                }
            });


            app.addRoute({
                '/posts':{
                    name:"posts Page",
                    html:"./pages/posts/posts.page.html",
                    script: "./pages/posts/posts.script.js",
                    style:"./pages/posts/posts.style.css",
                    controller:function(){ /*console.log("/products controller loaded")*/ }
                },
                '/posts/archive':{
                    name:"posts archive Page",
                    html:"../pages/posts/archive/archive.page.html",
                    script: "../pages/posts/archive/archive.script.js",
                    style:"../pages/posts/archive/archive.style.css",
                    controller:function(){ /*console.log("/products controller loaded")*/ }
                },
                '/posts/archive/test':{
                    name:"posts archive test Page",
                    html:"../../pages/posts/archive/testRoute/testRoute.page.html",
                }
            });
            


            app.initial();
           
            // var component = Component();

            // component.add('app-head',{
            //     name:"Main Header",
            //     state:"root",
            //     html:"components/header/header.component.html",
            //     //script:"components/header/header.component.js",
            //     style:"components/header/header.components.css",
            //     controller:function(){ /*console.log("<app-head> component loaded")*/ },
               
            // })

            // console.log( component )



           // console.log( app.routes )
           // console.log(app.setting)

