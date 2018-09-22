(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
    (global.Router = factory());
}(this, (function () { 


    function Router(){

        let loadedPathName;
        let pathss = location.pathname.split('/').length;
        if( pathss > 2){
            loadedPathName = location.pathname
        }else{
            loadedPathName = location.pathname.substring(0, location.pathname.lastIndexOf("/"));
        }

        let routes = {}
        let setting = {
            customAttributeNavigate:"ned-href",
            root:"app-root",
            defualtRoot:"/",
       }

       $.fn.removeAttributes = function() {
            return this.each(function() {
                let attributes = $.map(this.attributes, function(item) {
                return item.name;
                });
                let el = $(this);
                $.each(attributes, function(i, item) {
                    if(item != 'class')
                        el.removeAttr(item);
                });
            });
        }//@JQ.removeAttributes = function()

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
        }//@Object.defineProperty : assign


        function _DynamicURL(_path){
            if(_path.indexOf('./')==0)
                _path =_path.substring(2);//remove "./"
            
            let path = location.pathname.split('/').length;
            if( path > 2){
                for(let i = 0 ; i < path -2 ; i++ )
                    _path= '../'+_path;  
            }
           
            return _path;

        };//@Function: _DynamicURL(_path)

       function _clearAllTimer(){
            let highestTimeoutId = setTimeout(";");
            for (let i = 0 ; i < highestTimeoutId ; i++) {
                clearTimeout(i); 
            }
        }//@Function: clearAllTimer()
    
        function isObject(_obj) {
            return (typeof _obj === "object" && _obj !== null) || typeof _obj === "function";
        }//@Function: isObject(_obj)
    
        function config(_obj){
            setting.root = _obj.root ? _obj.root : 'app-root';
            setting.defualtRoot = _obj.defualtRoot ? _obj.defualtRoot : '/' ;
            setting.customAttributeNavigate = _obj.customAttributeNavigate ? _obj.customAttributeNavigate : 'ned-href';
        }//@Function: config(_obj)
        
        function addRoute(_path, _obj){
            if( isObject(_path) ){
                let key = Object.keys(_path);
                for(let i = 0; i < key.length; i++ ){
                  routes[key[i]] = _path[key[i]];
                }
            }else{
                routes[_path]= _obj;
            }
            //each time call thise, check if defuatl root added then init route as a base root
           // if(routes[setting.defualtRoot] && !activeRoute)
               // _initRouter();
        }//@Function: addRoute(_path, _obj)

    
        //FIXME: dont forget add trycatch for async/await function
        async function navigateTo(_path,_pop){
            if(routes[_path]===undefined)
               throw new Error("Router '"+_path+"' not defind.");

            //defualt, for all route we access is true
            let guard = true;
            //before load path, cheak if we have access to route or not.
            if(routes[_path].guard !== undefined)
                guard =  await routes[_path].guard();

            if(guard){
                let name = routes[_path].name ? routes[_path].name : _path.replace('/','').replace(/[\/]/g,'-');
                let state = {"path":_path, "name":name,"location":loadedPathName+_path,"domain":location.origin};
                let title = routes[_path].name;
                //let url = loadedPathName+_path;
                let url = _path;

                if(_pop)
                    history.replaceState(state, title , url);
                else
                    history.pushState(state, title , url);
                
                //After change state load Static data
                _loadpage(_path);
            }else{
                let err = {
                    message:`[NED Guard]: You don't have permission to access this route`,
                    path:_path
                }
               routes[_path].controller(err);
            }
        }//@Function: navigateTo(_path)
    
      
        function _loadpage(_path){

            //before load new data, Clear all Timer
                _clearAllTimer();
            if(routes[_path].html){
                $.get(_DynamicURL(routes[_path].html),function(_data){  
                    let path = _path != '/' ? _path.replace('/','').replace(/[\/]/g,'-') : routes[_path].name ? routes[_path].name.replace(/\s/g,'') :_path.replace('/','').replace(/[\/]/g,'-');
                    $(setting.root)
                    .removeAttributes()
                    .attr(path,'')
                    .html(_data);
                 
                    if(routes[_path].script)
                        $(setting.root).append("<script src='"+_DynamicURL(routes[_path].script)+"'><\/script> ");
    
                    if(routes[_path].style)
                        $(setting.root).append("<link rel='stylesheet' type='text/css'  href='"+_DynamicURL(routes[_path].style)+"' />");
                            
                    if(routes[_path].controller){
                        //FIXE: is it true?!
                        routes[_path].controller.bind(Object.assign(CurrentState))();
                    }
                        
                });
            }else{
                throw new Error("HTML Does not defind.");
            }
        }//@Function: _loadpage(_path);
    
       
        //=======================


        function reload(){
            _loadpage(this.state.path)
        }//@Function: reload current state

        let CurrentState = {
            reload,
            state:history.state
        }
      
        
    
       

        function _initRouter(){

            if(setting.customAttributeNavigate){

                $(document).on('click',`a[${setting.customAttributeNavigate}]` ,function(_e){
                    _e.preventDefault() ;
                    let path = $(this).attr('href');
                    navigateTo(path);
                });
                
            }//@Condition: if set Custom attribute for navigate throue router, otherwise you can call "navigatTo" manually
    

            let path;

            if(routes[location.pathname])
                path = location.pathname != setting.defualtRoot ? location.pathname : setting.defualtRoot
            else
                path = setting.defualtRoot;

            navigateTo(path);
        }//@Function: initRouter()
    
        window.onpopstate = async function(event) {
            if(event.state){
                let _path = event.state.path;
                navigateTo(_path, true);
            }     
        };//@Watch: onpopstate; back and forward browser history button 
                

        /**      =========        */
        /**      Component        */
        /**      =========        */


        let components = {};

        function addComponent(_path, _obj){
            if( isObject(_path) ){
                let key = Object.keys(_path);
                for(let i = 0; i < key.length; i++ ){
                    components[key[i]] = _path[key[i]]
                }
            }else{
                components[_path] = _obj
            }
            //initComponent();
        }//@Function: addRoute(_path, _obj)

        function initComponent(){
           $(function(){          
                let key = Object.keys(components);
                for(let i = 0; i < key.length; i++ ){
                    _loadComponent(key[i]);
                }
            });
        }//@Function: initComponent()


       

        function _loadComponent(_path){

            if(components[_path].html){

                $.get( _DynamicURL(components[_path].html) ,function(_data){  
                         
                        $(_path).html(_data);

                        if(components[_path].style)
                            $(_path).append("<link rel='stylesheet' type='text/css' href='"+_DynamicURL(components[_path].style)+"' />");

                        if(components[_path].script)
                            $(_path).append("<script src='"+_DynamicURL(components[_path].script)+"'><\/script> ");

                        if(components[_path].controller)
                            components[_path].controller();

                });
            }else{
                throw new Error("HTML Does not defind.");
            }
        }//@Function: _loadComponent()

        function initial(){
            if(routes[setting.defualtRoot])
                _initRouter();initComponent();
        }//@Function: initial()




        const controller = (_controllerName, _callback) =>{
            if(routes[_controllerName] != undefined)
                _callback.bind( Object.assign( routes[_controllerName],CurrentState) )();
            else
                throw new Error("Controller Name does not find/defind.");
        }//@Function: controller(_controllerName, _callback())



        return Object.freeze({
            navigateTo,
            config,
            addRoute,
            addComponent,
            routes,
            components,
            setting,
            initial,
            controller
        });
    
    }//@Function: Route()
    
    return Router;
})));



