import { isObject, _DynamicURL, $ajax, $insertHTML, _fnthis } from "./utils";
import { GlobVarb } from "./_glob";
export var component_add = function (_path, _obj) {
    if (isObject(_path)) {
        var key = Object.keys(_path);
        for (var i = 0; i < key.length; i++) {
            GlobVarb.components[key[i]] = _path[key[i]];
        }
    }
    else {
        GlobVarb.components[_path] = _obj;
    }
    // initComponent();
}; // @Function: component_add(_path, _obj)
export var component_initial = function () {
    var key = Object.keys(GlobVarb.components);
    //FIXME: convert to es6
    for (var i = 0; i < key.length; i++) {
        component_load(key[i]);
    }
}; // @Function: component_initial()
export var component_controller = function (_callback) {
    var _controllerName = history.state.path;
    var _this = _fnthis("component");
    //TODO: add way to find witch function for component and root
    if (!GlobVarb.map_controller.components[_controllerName])
        GlobVarb.map_controller.components[_controllerName] = [];
    GlobVarb.map_controller.components[_controllerName].push(_callback.bind(_this));
    _callback.bind(_this)();
}; // @Function: component_controller( callback )
var component_load = function (_path) {
    if (GlobVarb.components[_path].html) {
        $ajax("GET", _DynamicURL(GlobVarb.components[_path].html), function (_data) {
            var tag = document.querySelector(_path);
            $insertHTML(tag, _data);
            if (GlobVarb.components[_path].style)
                $insertHTML(tag, "<link rel='stylesheet' type='text/css' href='" + _DynamicURL(GlobVarb.components[_path].style) + "' />", "beforeend", false);
            if (GlobVarb.components[_path].script) {
                var script = document.createElement("script");
                script.src = _DynamicURL(GlobVarb.components[_path].script);
                tag.appendChild(script);
            }
            if (GlobVarb.components[_path].controller)
                GlobVarb.components[_path].controller();
        }); //@Ajax Call
    }
    else {
        throw new Error("HTML Does not defind.");
    }
}; // @Function: component_load(_path)
//# sourceMappingURL=component.js.map