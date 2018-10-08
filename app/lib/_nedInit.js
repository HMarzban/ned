import { component_add, component_initial, component_controller } from "./component";
import {router_add, router_controller, navigateTo, router_initial} from "./router";
import { _clearAllTimer, _DynamicURL, pubsub} from "./utils";
import { module_add, module_controller } from "./module";
import { GlobVarb } from "./_glob";


//FIXME: now this map is just work for one controller 
//after a while work for multi controller loade with array,
//it's work like pubsub pattern.


// we need this for IE, beacus IE can not work with array of element with foreach
if (typeof NodeList !== "undefined" && NodeList.prototype && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
} // NodeList


class NedLibrary {

    pubsub = pubsub;
    config = config;
    init = initialss;
    router = {
        add: router_add,
        controller: router_controller
    }
    component = {
        add: component_add,
        controller: component_controller
    }

    module = {
        add: module_add,
        controller: module_controller
    }

}



global.Ned = NedLibrary;



const config = (_obj) => {
    GlobVarb.setting.root = _obj.root ? _obj.root : 'app-root';
    GlobVarb.setting.defualtRoot = _obj.defualtRoot ? _obj.defualtRoot : '/';
    GlobVarb.setting.customAttributeNavigate = _obj.customAttributeNavigate ? _obj.customAttributeNavigate : 'ned-href';
} // @Function: config(_obj)


window.onpopstate = async function (event) {
    if (event.state) {
        let _path = event.state.path;
        navigateTo(_path, true);
    }
}; // @Watch: onpopstate; back and forward browser history button 

//init all component, route
const initialss = () => {
    if (GlobVarb.routes[GlobVarb.setting.defualtRoot])
        router_initial();
    component_initial();
} // @Function: initial()