


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
            customAttributeNavigate:"ndHref",
            root:"app-root",
            defualtRoot:"/",
       }

       jQuery.fn.removeAttributes = function() {
            return this.each(function() {
                var attributes = $.map(this.attributes, function(item) {
                return item.name;
                });
                var img = $(this);
                $.each(attributes, function(i, item) {
                img.removeAttr(item);
                });
            });
        }//@JQ.removeAttributes = function()


       function _clearAllTimer(){
            var highestTimeoutId = setTimeout(";");
            for (var i = 0 ; i < highestTimeoutId ; i++) {
                clearTimeout(i); 
            }
        }//@Function: clearAllTimer()
    
        function isObject(_obj) {
            return (typeof _obj === "object" && _obj !== null) || typeof _obj === "function";
        }//@Function: isObject(_obj)
    
        function config(_obj){
            setting.root = _obj.root ? _obj.root : 'app-root';
            setting.defualtRoot = _obj.defualtRoot ? _obj.defualtRoot : '/' ;
            setting.customAttributeNavigate = _obj.customAttributeNavigate ? _obj.customAttributeNavigate : 'ndHref';
        }//@Function: config(_obj)
        
        function addRoute(_path, _obj){
            if( isObject(_path) ){
                var key = Object.keys(_path);
                for(var i = 0; i < key.length; i++ ){
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
               throw Error("Router '"+_path+"' not defind.");

            //defualt, for all route we access is true
            let guard = true;
            //before load path, cheak if we have access to route or not.
            if(routes[_path].guard !== undefined)
                guard =  await routes[_path].guard();

            if(guard){
                let name = routes[_path].name ? routes[_path].name : _path.replace('/','').replace(/[\/]/g,'-');
                let state = {"path":_path, "name":name,"location":loadedPathName+_path,"fullPath":location.origin};
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
                $.get(routes[_path].html,function(_data){  
                    var path = _path != '/' ? _path.replace('/','').replace(/[\/]/g,'-') : routes[_path].name ? routes[_path].name.replace(/\s/g,'') :_path.replace('/','').replace(/[\/]/g,'-');
                    $(setting.root)
                    .removeAttributes()
                    .attr(path,'')
                    .html(_data);
                 
                    if(routes[_path].script)
                        $(setting.root).append("<script src='"+routes[_path].script+"'><\/script> ");
    
                    if(routes[_path].style)
                        $(setting.root).append("<link rel='stylesheet'  href='"+routes[_path].style+"' />");
                            
                    if(routes[_path].controller)
                        routes[_path].controller();
                });
            }else{
                throw Error("HTML Does not defind.");
            }
        }//@Function: _loadpage(_path);
    
        //=======================
        
    
        function initial(){
            if(routes[setting.defualtRoot])
                _initRouter();
        }//@Function: initial()

        function _initRouter(){

            if(setting.customAttributeNavigate){
                function _navigationBTNs(_e){
                    _e.preventDefault() 
                    let path = _e.target.getAttribute(setting.customAttributeNavigate)
                    _e.setat
                    navigateTo(path);
                }// @Function: _navigationBTNs(_e)
                let navigationBTN = document.querySelectorAll('a['+setting.customAttributeNavigate+']');
                for( let  i = 0; i < navigationBTN.length ; i++ ){
                    navigationBTN[i].setAttribute('href',navigationBTN[i].getAttribute(setting.customAttributeNavigate))
                    navigationBTN[i].addEventListener('click', _navigationBTNs,false);
                }
            }//@Condition: if set Custom attribute for navigate throue router, otherwise you can call "navigatTo" manually
    
            //load first root

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
        };//@Watch: onpopstate
                
        return Object.freeze({
            navigateTo,
            config,
            addRoute,
            routes,
            setting,
            initial
        });
    
    }//@Function: Route()
    

    return Router;

})));



