
import {isObject, _DynamicURL, $ajax, $insertHTML, _fnthis} from "./utils";
import { GlobVarb } from "./_glob";

export const component_add = (_path, _obj) => {
    if (isObject(_path)) {
        let key = Object.keys(_path);
        for (let i = 0; i < key.length; i++) {
            GlobVarb.components[key[i]] = _path[key[i]]
        }
    } else {
        GlobVarb.components[_path] = _obj
    }
    // initComponent();
} // @Function: component_add(_path, _obj)

export const component_initial = () => {
    let key = Object.keys(GlobVarb.components);
    //FIXME: convert to es6
    for (let i = 0; i < key.length; i++) {
        component_load(key[i]);
    }
} // @Function: component_initial()


const component_load = (_path) => {

    if (GlobVarb.components[_path].html) {

        $ajax("GET", _DynamicURL(GlobVarb.components[_path].html), function (_data) {

            let tag = document.querySelector(_path)

            $insertHTML(tag, _data);

            if (GlobVarb.components[_path].style)
                $insertHTML(tag, "<link rel='stylesheet' type='text/css' href='" + _DynamicURL(GlobVarb.components[_path].style) + "' />", "beforeend", false)

            if (GlobVarb.components[_path].script) {
                let script = document.createElement("script");
                script.src = _DynamicURL(GlobVarb.components[_path].script);
                tag.appendChild(script);
            }

            if (GlobVarb.components[_path].controller)
                GlobVarb.components[_path].controller();

        }); //@Ajax Call
    } else {
        throw new Error("HTML Does not defind.");
    }
} // @Function: component_load(_path)


export const component_controller = (_callback) => {
    let _controllerName = history.state.path;
    let _this = _fnthis("component")
    delete _this.info

    //TODO: add way to find witch function for component and root
    if (!GlobVarb.map_controller.components[_controllerName])
        GlobVarb.map_controller.components[_controllerName] = [];

    GlobVarb.map_controller.components[_controllerName].push(
        _callback.bind(_this)
    );
    _callback.bind(_this)();
} // @Function: component_controller( callback )