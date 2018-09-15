
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
    (
        global.Component = factory());
}(this, (function () { 

        function Component(){
            let components = {};

            function isObject(_obj) {
                return (typeof _obj === "object" && _obj !== null) || typeof _obj === "function";
            }//@Function: isObject(_obj)

            function add(_path, _obj){
                if( isObject(_path) ){
                    let key = Object.keys(_path);
                    for(let i = 0; i < key.length; i++ ){
                        components[key[i]] = _path[key[i]]
                    }
                }else{
                    components[_path] = _obj
                }
                initComponent();
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
                    $.get(components[_path].html,function(_data){  
                             
                            $(_path).html(_data);
                            if(components[_path].script)
                                $(_path).append("<script src='"+components[_path].script+"'><\/script> ");
                            if(components[_path].controller)
                                components[_path].controller();
                    });
                }else{
                    throw Error("HTML Does not defind.");
                }
            }//@Function: _loadComponent()

            return Object.freeze({
                add,
                components
            });

        };//@Function: Component()

    return Component;

})));