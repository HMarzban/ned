(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global.Router = factory());
}(this, (function () {

    //FIXME: now this map is just work for one controller 
    //after a while work for multi controller loade with array,
    //it's work like pubsub pattern.
    let map_controller = {
        module:{},
        components:{}
    }
    //privite Scope
    let scriptsLoaded = {}
    let scriptsLoade={
        modules:{},
        components:{}
    }
    let routes = {};
    let components = {};
    let setting = {
        customAttributeNavigate: "ned-href",
        root: "app-root",
        defualtRoot: "/",
    }


    function $insertHTML(_el, _content, _targer, _isRemove) {
        _isRemove = _isRemove == undefined ? true : false;
        //first remove all node
        if (_isRemove)
            while (_el.lastChild) _el.removeChild(_el.lastChild);
        //then insert it
        _targer = _targer ? _targer : "afterbegin";
        _el.insertAdjacentHTML(_targer, _content);
    } //@Function: insertHTML(element, content, target)


    function _DynamicURL(_path) {
        if (_path.indexOf('./') == 0)
            _path = _path.substring(2); //remove "./"

        let path = location.pathname.split('/').length;
        if (path > 2) {
            for (let i = 0; i < path - 2; i++)
                _path = '../' + _path;
        }
        return _path;
    }; //@Function: _DynamicURL(_path)

    function _clearAllTimer() {
        let highestTimeoutId = setTimeout(";");
        for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }
    } //@Function: clearAllTimer()

    function isObject(_obj) {
        return (typeof _obj === "object" && _obj !== null) || typeof _obj === "function";
    } //@Function: isObject(_obj)

    function $ajax(_method, _url, _callback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                _callback(this.responseText);
            }
        };
        //TODO: cheack it in large and complex scenario third parameter,
        //witch is for async and sync.
        request.open(_method, _url, true);
        request.send();
    }; //@Function: $ajax(methid, url, callback)



    
    /**
     * ===========================
     * ===========================
     */


    var pubsub = {
        events: {},
        on: function (eventName, fn) {

            this.events[eventName] = this.events[eventName] || [];
            //fn.bind({off:this.off, emit:this.emit});
            //console.log(fn)
            //fn["emit"] = this.emit 
            this.events[eventName].push(fn);

            // return Object.freeze({
            //     off: this.off,
            //     emit: this.emit
            // });
        },
        off: function (eventName, fn) {
            if (this.events[eventName]) {
                for (var i = 0; i < this.events[eventName].length; i++) {
                    if (this.events[eventName][i] === fn) {
                        this.events[eventName].splice(i, 1);
                        break;
                    }
                };
            }
        },
        emit: function (eventName, data) {
            if (this.events[eventName]) {
                this.events[eventName].forEach(function (fn) {
                    fn(data);
                });
            }
        }
    };



    let modules = {}


    function module(_route) {


        function add(_obj) {
            let currentSate = history.state.path;
            if(modules[currentSate] == undefined ){
                modules[currentSate] =  [];
                modules[currentSate].push(_obj);  
            }  
        } //@Function: addRoute(_path, _obj)


        function _loadStatic(_tag, _el) {
            //console.log(_tag);
            let path = history.state.path;
            if (_el.html ) {

                //TODO: Examin conscience clearTime, and efected part
               // _clearAllTimer();

                $ajax("GET", _DynamicURL(_el.html), function (_data) {

                    let tags = document.querySelectorAll(_el.tag);
                    let root = document.querySelector(setting.root)

                    //mabe some time we use one mudel morethan onece
                    //loop just html, and inject style and js once
                    tags.forEach(function(_tag, index){

                        let obj = {
                            //TODO: find way to resolve this.
                            //reload,
                            pubsub,
                            tagName: _el.tag,
                            controller: _el.controller
                        }

                         //attach object "this"
                        obj["element"] = _tag;                
                        _tag["controller"] = function(_callback){ 
                            (function(){
                                _callback.bind(Object.assign(obj))(); 
                            })();
                        };

                        //inject html elements to module
                        $insertHTML(_tag, _data);
                        _tag.setAttribute(`${_el.tag}_${index+1}`, '');

                    });//@loop: for each module user created
                   
                   
                    if (_el.script && !scriptsLoade.modules[path]) {
                        let script = document.createElement("script");
                        script.src = _DynamicURL(_el.script);
                        script.id = "script_"+_el.tag;
                        root.appendChild(script);
                        scriptsLoade.modules[path] = true;
                    }else{
                        map_controller.module[path]();
                    }

                    if (_el.style)
                        $insertHTML(root, "<link id='style_"+_el.tag+"'  rel='stylesheet' type='text/css'  href='" + _DynamicURL(_el.style) + "' />", "beforeend", false)
                
                
                    if (_el.controller) {
                        _el.controller();
                    }
                });

            } else {
                throw new Error("HTML Does not defind.");
            }
        } //@Function: _loadStatic()


  

        //TODO: find way to work this?!?!?!
        // we have  problem when injection done and that injection 
        // stick in DOM and every time i can not remove it or replace it.

        //function reload(){ 
        //    loadModules()
        //}


        function loadModules() {
            var currentSate = history.state.path;
            modules[currentSate].forEach(function (_el, index) {
                //TODO: add parrall and qeuea load module, setting
                // now just inject parral
                _loadStatic(currentSate, _el)
            });
        }//@Function: loadModules()


        function initial() {
                loadModules();
        } //@Function: initial()




        return Object.seal({
            store: {},
            add,
            initial
        })
    }





    function Router() {

        let loadedPathName;
        let pathss = location.pathname.split('/').length;
        if (pathss > 2) {
            loadedPathName = location.pathname
        } else {
            loadedPathName = location.pathname.substring(0, location.pathname.lastIndexOf("/"));
        }


     


        if (typeof Object.assign != 'function') {
            // Must be writable: true, enumerable: false, configurable: true
            Object.defineProperty(Object, "assign", {
                value: function assign(target, varArgs) { // .length of function is 2
                    'use strict';
                    if (target == null) { // TypeError if undefined or null
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    let to = Object(target);

                    for (let index = 1; index < arguments.length; index++) {
                        let nextSource = arguments[index];

                        if (nextSource != null) { // Skip over if undefined or null
                            for (let nextKey in nextSource) {
                                // Avoid bugs when hasOwnProperty is shadowed
                                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                    to[nextKey] = nextSource[nextKey];
                                }
                            }
                        }
                    }
                    return to;
                },
                writable: true,
                configurable: true
            });
        } //@Object.defineProperty : assign





        function config(_obj) {
            setting.root = _obj.root ? _obj.root : 'app-root';
            setting.defualtRoot = _obj.defualtRoot ? _obj.defualtRoot : '/';
            setting.customAttributeNavigate = _obj.customAttributeNavigate ? _obj.customAttributeNavigate : 'ned-href';
        } //@Function: config(_obj)

        function addRoute(_path, _obj) {
            if (isObject(_path)) {
                let key = Object.keys(_path);
                for (let i = 0; i < key.length; i++) {
                    routes[key[i]] = _path[key[i]];
                }
            } else {
                routes[_path] = _obj;
            }
        } //@Function: addRoute(_path, _obj)


        //FIXME: dont forget add trycatch for async/await function
        async function navigateTo(_path, _pop) {
            if (routes[_path] === undefined)
                throw new Error("Router '" + _path + "' not defind.");

            //defualt, for all route we access is true
            let guard = true;
            //before load path, cheak if we have access to route or not.
            if (routes[_path].guard !== undefined)
                guard = await routes[_path].guard();

            let lastPath = history.state ? history.state.path : "/";

            if (guard) {
                let name = routes[_path].name ? routes[_path].name : _path.replace('/', '').replace(/[\/]/g, '-');
                let state = {
                    "lastPath": lastPath,
                    "path": _path,
                    "name": name,
                    "location": loadedPathName + _path,
                    "domain": location.origin
                };
                let title = routes[_path].name;
                //let url = loadedPathName+_path;
                let url = _path;

                if (_pop)
                    history.replaceState(state, title, url);
                else
                    history.pushState(state, title, url);

                //After change state load Static data
                _loadpage(_path);
            } else {
                let err = {
                    message: `[NED Guard]: You don't have permission to access this route`,
                    path: _path
                }
                routes[_path].controller(err);
            }
        } //@Function: navigateTo(_path)

        function craetPathAttr(_path) {
            return _path != '/' ? _path.replace('/', '').replace(/[\/]/g, '-') : routes[_path].name ? routes[_path].name.replace(/\s/g, '') : _path.replace('/', '').replace(/[\/]/g, '-');
        }




        function _loadpage(_path) {
            //before load new data, Clear all Timer
            _clearAllTimer();
            if (routes[_path].html) {
                $ajax("GET", _DynamicURL(routes[_path].html), function (_data) {

                    let tag = document.querySelector(setting.root);
                    let path = craetPathAttr(_path);
                    let lastPath = craetPathAttr(history.state.lastPath);

                    $(tag).html("")
                    tag.removeAttribute(lastPath);
                    $insertHTML(tag, _data);
                    tag.setAttribute(path, '');
                    

                    if (routes[_path].script && !scriptsLoaded[routes[_path].script]) {
                        let script = document.createElement("script");
                        script.src = _DynamicURL(routes[_path].script);
                        tag.appendChild(script);
                        scriptsLoaded[routes[_path].script] = true;
                    }else{
                        map_controller.components[_path](); 
                    }

                    if (routes[_path].style)
                        $insertHTML(tag, "<link rel='stylesheet' type='text/css'  href='" + _DynamicURL(routes[_path].style) + "' />", "beforeend", false)
                        
                    

                    if (routes[_path].controller) {
                        //FIXME: is it true?!
                        //
                        //CurrentState.bind(Object.assign(new module())).
                        CurrentState["module"] = module();
                        // Object.assign(CurrentState["module"], {state:history.state} );

                        routes[_path].controller.bind(Object.assign(CurrentState))();
                    }

                }); //@AjaxCall
            } else {
                throw new Error("HTML Does not defind.");
            }
        } //@Function: _loadpage(_path);


        //=======================


        function reload() {
            _loadpage(this.state.path)
        } //@Function: reload current state

        let CurrentState = {
            reload,
            state: history.state,
            pubsub
        }



        function _initRouter() {

            if (setting.customAttributeNavigate) {

                let $hrefTag = document.body;
                $hrefTag.addEventListener("click", clickATag, false);

                function clickATag(e) {
                    if (e.target.tagName.toLowerCase() == 'a' && e.target.getAttribute(setting.customAttributeNavigate) != null) {
                        e.preventDefault();
                        let path = e.target.getAttribute("href");
                        navigateTo(path);
                    }
                    //e.stopPropagation();
                } //@Function: clickATag()


            } //@Condition: if set Custom attribute for navigate throue router, otherwise you can call "navigatTo" manually


            let path;

            if (routes[location.pathname])
                path = location.pathname != setting.defualtRoot ? location.pathname : setting.defualtRoot
            else
                path = setting.defualtRoot;

            navigateTo(path);
        } //@Function: initRouter()

        window.onpopstate = async function (event) {
            if (event.state) {
                let _path = event.state.path;
                navigateTo(_path, true);
            }
        }; //@Watch: onpopstate; back and forward browser history button 


        /**      =========        */
        /**      Component        */
        /**      =========        */




        function addComponent(_path, _obj) {
            if (isObject(_path)) {
                let key = Object.keys(_path);
                for (let i = 0; i < key.length; i++) {
                    components[key[i]] = _path[key[i]]
                }
            } else {
                components[_path] = _obj
            }
            //initComponent();
        } //@Function: addRoute(_path, _obj)

        function initComponent() {
            // if(document.readyState === 'complete'){  
            let key = Object.keys(components);
            for (let i = 0; i < key.length; i++) {
                _loadComponent(key[i]);
            }
            //};
        } //@Function: initComponent()




        function _loadComponent(_path) {

            if (components[_path].html) {

                $ajax("GET", _DynamicURL(components[_path].html), function (_data) {


                    let tag = document.querySelector(_path)
                    $insertHTML(tag, _data);

                    if (components[_path].style)
                        $insertHTML(tag, "<link rel='stylesheet' type='text/css' href='" + _DynamicURL(components[_path].style) + "' />", "beforeend", false)

                    if (components[_path].script) {
                        let script = document.createElement("script");
                        script.src = _DynamicURL(components[_path].script);
                        tag.appendChild(script);
                    }


                    if (components[_path].controller)
                        components[_path].controller();

                }); //@Ajax Call
            } else {
                throw new Error("HTML Does not defind.");
            }
        } //@Function: _loadComponent()

        function initial() {
            if (routes[setting.defualtRoot])
                _initRouter();
            initComponent();
        } //@Function: initial()


       

/*        const controller = function (_controllerName, _callback) {
            
            if (routes[_controllerName] != undefined)
                _callback.bind(Object.assign(routes[_controllerName], CurrentState))();
            else
                throw new Error("Controller Name does not find/defind.");

        }*/ //@Function: controller(_controllerName, _callback())

       


        return Object.freeze({
            navigateTo,
            config,
            addRoute,
            addComponent,
            routes,
            components,
            setting,
            initial,
            //controller,
            component:{
                //FIXME: first parameter can take two prototype type, function and objec
                //this comment for next level of controller function, explain top.
                controller: function (_callback) {
                    let _controllerName = history.state.path;
                    if(routes[_controllerName] !== undefined && !map_controller.components[_controllerName]){
                        map_controller.components[_controllerName] = _callback.bind(Object.assign(routes[_controllerName], CurrentState));
                        map_controller.components[_controllerName]();
                    }else{
                        throw new Error("Controller Name does not find/defind.");
                    }
                }
            },
            module: {
                //FIXME: first parameter can take two prototype type, function and objec
                //this comment for next level of controller function, explain top.
                controller : function (_callback){
                let _moduleNane = history.state.path;
                if (modules[_moduleNane] != undefined && !map_controller.module[_moduleNane]  ){
                    map_controller.module[_moduleNane] = _callback.bind(Object.assign(modules[_moduleNane], CurrentState));
                    map_controller.module[_moduleNane]()
                }else{
                    throw new Error("Controller Name does not find/defind.");
                }
            }}
        });

    } //@Function: Route()

    return Router;
})));