import { _DynamicURL, $ajax, $insertHTML, pubsub, _fnthis } from "./utils";
import { GlobVarb } from "./_glob";
export var module_add = function (_obj) {
    var currentSate = history.state.path;
    if (GlobVarb.modules[currentSate] == undefined) {
        GlobVarb.modules[currentSate] = [];
        GlobVarb.modules[currentSate].push(_obj);
    }
}; // @Function: module_add(_path, _obj)
var module_loadStatic = function (_tag, _el) {
    var path = history.state.path;
    if (_el.html) {
        //TODO: Examin conscience clearTime, and efected part
        // _clearAllTimer();
        $ajax("GET", _DynamicURL(_el.html), function (_data) {
            var tags = document.querySelectorAll(_el.tag);
            var root = document.querySelector(GlobVarb.setting.root);
            //mabe some time we use one mudel morethan onece
            //loop just html, and inject style and js once
            tags.forEach(function (_tag, index) {
                var _this = {
                    pubsub: pubsub,
                };
                _this["element"] = _tag;
                _tag["controller"] = function (_callback) {
                    _callback.bind(Object.assign(_this))();
                };
                //inject html elements to module
                $insertHTML(_tag, _data);
                _tag.setAttribute(_el.tag + "_" + (index + 1), '');
            }); //@loop: for each module user created
            if (_el.script && !GlobVarb.scriptsLoade.modules[path]) {
                var script = document.createElement("script");
                script.src = _DynamicURL(_el.script);
                script.id = "script_" + _el.tag;
                root.appendChild(script);
                GlobVarb.scriptsLoade.modules[path] = true;
            }
            else {
                GlobVarb.map_controller.module[path]();
            }
            if (_el.style)
                $insertHTML(root, "<link id='style_" + _el.tag + "'  rel='stylesheet' type='text/css'  href='" + _DynamicURL(_el.style) + "' />", "beforeend", false);
            if (_el.controller) {
                _el.controller();
            }
        });
    }
    else {
        throw new Error("HTML Does not defind.");
    }
}; //@Function: module_loadStatic(_tag, _el )
export var module_controller = function (_callback) {
    var _moduleNane = history.state.path;
    var _this = _fnthis("module");
    if (GlobVarb.modules[_moduleNane] != undefined && !GlobVarb.map_controller.module[_moduleNane]) {
        GlobVarb.map_controller.module[_moduleNane] = _callback.bind(_this);
        GlobVarb.map_controller.module[_moduleNane]();
    }
    else {
        throw new Error("Controller Name does not find/defind.");
    }
}; //@Function: module_controller( _callback )
//TODO: find way to work this?!?!?!
// we have  problem when injection done and that injection 
// stick in DOM and every time i can not remove it or replace it.
//function reload(){ 
//    loadModules()
//}
var module_load = function () {
    var currentSate = history.state.path;
    GlobVarb.modules[currentSate].forEach(function (_el, index) {
        //TODO: add parrall and qeuea load module, setting
        // now just inject parral
        module_loadStatic(currentSate, _el);
    });
}; //@Function: module_load()
export var module_initial = function () {
    module_load();
}; //@Function: module_initial()
//# sourceMappingURL=module.js.map