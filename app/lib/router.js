import {isObject, _DynamicURL, $ajax, $insertHTML, _clearAllTimer, _fnthis} from "./utils";
import { GlobVarb } from "./_glob";

let loadedPathName;
let pathss = location.pathname.split('/').length;
if (pathss > 2)
    loadedPathName = location.pathname;
else
    loadedPathName = location.pathname.substring(0, location.pathname.lastIndexOf("/"));

const craetPathAttr = (_path) => {
    if (!GlobVarb.routes[_path].name)
        throw new Error(`[Ned Warning]: You have to chose name for your "${_path}" rout`);
    return _path != '/' ? _path.replace('/', '').replace(/[\/]/g, '-') : GlobVarb.routes[_path].name ? GlobVarb.routes[_path].name.replace(/\s/g, '') : _path.replace('/', '').replace(/[\/]/g, '-');
} //@Function: craetPathAttr(_path)


//FIXME: dont forget add trycatch for async/await function
export const navigateTo = async (_path, _pop) => {
    if (GlobVarb.routes[_path] === undefined)
        throw new Error("Router '" + _path + "' not defind.");

    //defualt, for all route we access is true
    let guard = true;
    //before load path, cheak if we have access to route or not.
    if (GlobVarb.routes[_path].guard !== undefined)
        guard = await GlobVarb.routes[_path].guard();

    let lastPath = history.state ? history.state.path : "/";

    if (guard) {
        let name = GlobVarb.routes[_path].name ? GlobVarb.routes[_path].name : _path.replace('/', '').replace(/[\/]/g, '-');
        let state = {
            "lastPath": lastPath,
            "path": _path,
            "name": name,
            "location": loadedPathName + _path,
            "domain": location.origin
        };
        let title = GlobVarb.routes[_path].name;
        //let url = loadedPathName+_path;
        let url = _path;

        if (_pop)
            history.replaceState(state, title, url);
        else
            history.pushState(state, title, url);

        //After change state load Static data
        router_loadStatic(_path);
    } else {
        let err = {
            message: `[NED Guard]: You don't have permission to access this route`,
            path: _path
        }
        GlobVarb.routes[_path].controller(err);
    }
} //@Function: navigateTo(_path)


export const router_add = (_path, _obj) => {
    if (isObject(_path)) {
        let key = Object.keys(_path);
        for (let i = 0; i < key.length; i++) {
            GlobVarb.routes[key[i]] = _path[key[i]];
        }
    } else {
        GlobVarb.routes[_path] = _obj;
    }
} //@Function: addRoute(_path, _obj)


const router_loadStatic = (_path) => {
    //before load new data, Clear all Timer
    _clearAllTimer();
    if (GlobVarb.routes[_path].html) {
        $ajax("GET", _DynamicURL(GlobVarb.routes[_path].html), function (_data) {

            let tag = document.querySelector(GlobVarb.setting.root);
            let path = craetPathAttr(_path);
            let lastPath = craetPathAttr(history.state.lastPath);

            $(tag).html("")
            tag.removeAttribute(lastPath);
            $insertHTML(tag, _data);
            tag.setAttribute(path, '');

            if (GlobVarb.routes[_path].script && !GlobVarb.scriptsLoaded[GlobVarb.routes[_path].script]) {
                let script = document.createElement("script");
                script.src = _DynamicURL(GlobVarb.routes[_path].script);
                tag.appendChild(script);
                GlobVarb.scriptsLoaded[GlobVarb.routes[_path].script] = true;
            } else {

                if (GlobVarb.routes[_path].script)
                    GlobVarb.map_controller.routes[_path][0]();
            }

            if (GlobVarb.routes[_path].style)
                $insertHTML(tag, "<link rel='stylesheet' type='text/css'  href='" + _DynamicURL(GlobVarb.routes[_path].style) + "' />", "beforeend", false)

            if (GlobVarb.routes[_path].controller) {
                GlobVarb.routes[_path].controller.bind(_fnthis("component"))();
            }

        }); //@AjaxCall
    } else {
        throw new Error("HTML Does not defind.");
    }
} //@Function: router_loadStatic(_path);


export const router_initial = () => {

    if (GlobVarb.setting.customAttributeNavigate) {

        let $hrefTag = document.body;
        $hrefTag.addEventListener("click", clickATag, false);

        function clickATag(e) {
            if (e.target.tagName.toLowerCase() == 'a' && e.target.getAttribute(GlobVarb.setting.customAttributeNavigate) != null) {
                e.preventDefault();
                let path = e.target.getAttribute("href");
                navigateTo(path);
            }
            //e.stopPropagation();
        } //@Function: clickATag()

    } //@Condition: if set Custom attribute for navigate throue router, otherwise you can call "navigatTo" manually

    let path;

    if (GlobVarb.routes[location.pathname])
        path = location.pathname != GlobVarb.setting.defualtRoot ? location.pathname : GlobVarb.setting.defualtRoot
    else
        path = GlobVarb.setting.defualtRoot;

    navigateTo(path);
} //@Function: router_initial()


export const router_controller = (_callback) => {
    let _controllerName = history.state.path;
    let _this = _fnthis("component");

    //TODO: add way to find witch function for component and root
    if (!GlobVarb.map_controller.routes[_controllerName])
        GlobVarb.map_controller.routes[_controllerName] = [];

    GlobVarb.map_controller.routes[_controllerName].push(
        _callback.bind(_this)
    );
    _callback.bind(_this)();
} //@Function: router_controller( callback )


export const reload = () => {
    router_loadStatic(window.history.state.path)
} //@Function: reload current state
