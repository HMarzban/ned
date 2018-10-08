var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this_1 = this;
import { isObject, _DynamicURL, $ajax, $insertHTML, _clearAllTimer, _fnthis } from "./utils";
import { GlobVarb } from "./_glob";
var loadedPathName;
var pathss = location.pathname.split('/').length;
if (pathss > 2)
    loadedPathName = location.pathname;
else
    loadedPathName = location.pathname.substring(0, location.pathname.lastIndexOf("/"));
var craetPathAttr = function (_path) {
    if (!GlobVarb.routes[_path].name)
        throw new Error("[Ned Warning]: You have to chose name for your \"" + _path + "\" rout");
    return _path != '/' ? _path.replace('/', '').replace(/[\/]/g, '-') : GlobVarb.routes[_path].name ? GlobVarb.routes[_path].name.replace(/\s/g, '') : _path.replace('/', '').replace(/[\/]/g, '-');
}; //@Function: craetPathAttr(_path)
//FIXME: dont forget add trycatch for async/await function
export var navigateTo = function (_path, _pop) { return __awaiter(_this_1, void 0, void 0, function () {
    var guard, lastPath, name_1, state, title, url, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (GlobVarb.routes[_path] === undefined)
                    throw new Error("Router '" + _path + "' not defind.");
                guard = true;
                if (!(GlobVarb.routes[_path].guard !== undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, GlobVarb.routes[_path].guard()];
            case 1:
                guard = _a.sent();
                _a.label = 2;
            case 2:
                lastPath = history.state ? history.state.path : "/";
                if (guard) {
                    name_1 = GlobVarb.routes[_path].name ? GlobVarb.routes[_path].name : _path.replace('/', '').replace(/[\/]/g, '-');
                    state = {
                        "lastPath": lastPath,
                        "path": _path,
                        "name": name_1,
                        "location": loadedPathName + _path,
                        "domain": location.origin
                    };
                    title = GlobVarb.routes[_path].name;
                    url = _path;
                    if (_pop)
                        history.replaceState(state, title, url);
                    else
                        history.pushState(state, title, url);
                    //After change state load Static data
                    router_loadStatic(_path);
                }
                else {
                    err = {
                        message: "[NED Guard]: You don't have permission to access this route",
                        path: _path
                    };
                    GlobVarb.routes[_path].controller(err);
                }
                return [2 /*return*/];
        }
    });
}); }; //@Function: navigateTo(_path)
export var router_add = function (_path, _obj) {
    if (isObject(_path)) {
        var key = Object.keys(_path);
        for (var i = 0; i < key.length; i++) {
            GlobVarb.routes[key[i]] = _path[key[i]];
        }
    }
    else {
        GlobVarb.routes[_path] = _obj;
    }
}; //@Function: addRoute(_path, _obj)
var router_loadStatic = function (_path) {
    //before load new data, Clear all Timer
    _clearAllTimer();
    if (GlobVarb.routes[_path].html) {
        $ajax("GET", _DynamicURL(GlobVarb.routes[_path].html), function (_data) {
            var tag = document.querySelector(GlobVarb.setting.root);
            var path = craetPathAttr(_path);
            var lastPath = craetPathAttr(history.state.lastPath);
            $(tag).html("");
            tag.removeAttribute(lastPath);
            $insertHTML(tag, _data);
            tag.setAttribute(path, '');
            if (GlobVarb.routes[_path].script && !GlobVarb.scriptsLoaded[GlobVarb.routes[_path].script]) {
                var script = document.createElement("script");
                script.src = _DynamicURL(GlobVarb.routes[_path].script);
                tag.appendChild(script);
                GlobVarb.scriptsLoaded[GlobVarb.routes[_path].script] = true;
            }
            else {
                if (GlobVarb.routes[_path].script)
                    GlobVarb.map_controller.routes[_path][0]();
            }
            if (GlobVarb.routes[_path].style)
                $insertHTML(tag, "<link rel='stylesheet' type='text/css'  href='" + _DynamicURL(GlobVarb.routes[_path].style) + "' />", "beforeend", false);
            if (GlobVarb.routes[_path].controller) {
                GlobVarb.routes[_path].controller.bind(_fnthis("component"))();
            }
        }); //@AjaxCall
    }
    else {
        throw new Error("HTML Does not defind.");
    }
}; //@Function: router_loadStatic(_path);
export var router_initial = function () {
    if (GlobVarb.setting.customAttributeNavigate) {
        var $hrefTag = document.body;
        $hrefTag.addEventListener("click", clickATag, false);
        function clickATag(e) {
            if (e.target.tagName.toLowerCase() == 'a' && e.target.getAttribute(GlobVarb.setting.customAttributeNavigate) != null) {
                e.preventDefault();
                var path_1 = e.target.getAttribute("href");
                navigateTo(path_1);
            }
            //e.stopPropagation();
        } //@Function: clickATag()
    } //@Condition: if set Custom attribute for navigate throue router, otherwise you can call "navigatTo" manually
    var path;
    if (GlobVarb.routes[location.pathname])
        path = location.pathname != GlobVarb.setting.defualtRoot ? location.pathname : GlobVarb.setting.defualtRoot;
    else
        path = GlobVarb.setting.defualtRoot;
    navigateTo(path);
}; //@Function: router_initial()
export var router_controller = function (_callback) {
    var _controllerName = history.state.path;
    var _this = _fnthis("component");
    //TODO: add way to find witch function for component and root
    if (!GlobVarb.map_controller.routes[_controllerName])
        GlobVarb.map_controller.routes[_controllerName] = [];
    GlobVarb.map_controller.routes[_controllerName].push(_callback.bind(_this));
    _callback.bind(_this)();
}; //@Function: router_controller( callback )
export var reload = function () {
    router_loadStatic(window.history.state.path);
}; //@Function: reload current state
//# sourceMappingURL=router.js.map