
// not plane to use it
// put it in CLI side.
module.exports.env = (environment) => {

    let env = {
        environment: environment,
        App:{
            root:"/app",
            index:"./index.html",
            favicon:"favicon.ico",
            style:[
                    "/src/assets/style/*/*.scss",
                    "/src/component/*/*scss",
                    "/src/pages/*/*.scss"
            ],//App.style
            script:[
                    "/src/assets/js/*/*.js",
                    "/src/component/*/*js",
                    "/src/pages/*/*.js"
            ],//App.script
            html:[
                    "/src/component/*/*js",
                    "/src/pages/*/*.js"
            ]//App.html
        }//App
    }//env


    return env;
});