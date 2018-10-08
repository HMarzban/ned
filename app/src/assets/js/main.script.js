var app = new Ned();

app.config({
    customAttributeNavigate: "ndhref",
    defualtRoot: '/'
});

app.router.add({
    '/': {
        name: "Dashboard Page",
        html: "./pages/home/home.page.html",
        script: "./pages/home/home.script.js",
        style: "./pages/home/home.style.css",
        controller: function () { /*console.log("/ Controller loaded")*/ /*console.log(this)*/ }
    },
    '/about': {
        name: "About Us",
        html: "./pages/about/about.page.html",
        script: "./pages/about/about.script.js",
        style: "./pages/about/about.style.css",
        guard: function () {
            return new Promise(function (resolve, reject) {
                resolve(false);
            });
        },
        controller: function (err) {
            console.log(err)
            alert(err.message)
            //console.log("/about controller loaded")
        }
    },
    '/products': {
        name: "./products",
        html: "./pages/product/product.page.html",
        script: "./pages/product/product.script.js",
        style: "./pages/product/product.style.css",
        controller: function () { /*console.log("/products controller loaded")*/ }
    }
});

app.router.add({
    '/posts': {
        name: "posts Page",
        html: "./pages/posts/posts.page.html",
        script: "./pages/posts/posts.script.js",
        style: "./pages/posts/posts.style.css",
        controller: function () { /*console.log("/products controller loaded")*/ }
    },
    '/posts/archive': {
        name: "posts archive Page",
        html: "./pages/posts/archive/archive.page.html",
        script: "./pages/posts/archive/archive.script.js",
        style: "./pages/posts/archive/archive.style.css",
        controller: function () { /*console.log("/products controller loaded")*/ }
    },
    '/posts/archive/test': {
        name: "posts archive test Page",
        html: "./pages/posts/archive/testRoute/testRoute.page.html",
    }
});

app.component.add('app-head', {
    name: "Main Header",
    html: "./components/header/header.component.html",
    script: "./components/header/header.component.js",
    style: "./components/header/header.components.css",
    controller: function () { /*console.log("<app-head> component loaded")*/ }
});

app.component.add('app-footer', {
    name: "Main Footer",
    html: "./components/footer/footer.component.html",
    script: "./components/footer/footer.component.script.js",
    style: "./components/footer/footer.component.style.css",
    controller: function () { /*console.log("<app-head> component loaded")*/ }
});

app.component.add('app-sidebar', {
    name: "Main sidebar",
    html: "./components/sidebar/sidebar.component.html",
    script: "./components/sidebar/sidebar.component.script.js",
    style: "./components/sidebar/sidebar.component.style.css",
    controller: function () { /*console.log("<app-head> component loaded")*/ }
});

app.init();