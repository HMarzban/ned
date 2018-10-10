export const _clearAllTimer = () => {
    let highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
} //@Function: clearAllTimer()

export const $ajax = (_method, _url, _callback) => {
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

export const _DynamicURL = (_path) => {
    if (_path.indexOf('./') == 0)
        _path = _path.substring(2); //remove "./"

    let path = location.pathname.split('/').length;
    if (path > 2) {
        for (let i = 0; i < path - 2; i++)
            _path = '../' + _path;
    }
    return _path;
}; //@Function: _DynamicURL(_path)



export const $insertHTML = (_el, _content, _targer, _isRemove) => {
    _isRemove = _isRemove == undefined ? true : false;
    //first remove all node
    if (_isRemove)
        while (_el.lastChild) _el.removeChild(_el.lastChild);
    //then insert it
    _targer = _targer ? _targer : "afterbegin";
    _el.insertAdjacentHTML(_targer, _content);
} //@Function: insertHTML(element, content, target)


export const craetPathAttr = (_path) => {
    if(!routes[_path].name)
        throw new Error(`[Ned Warning]: You have to chose name for your "${_path}" rout`);
    return _path != '/' ? _path.replace('/', '').replace(/[\/]/g, '-') : routes[_path].name ? routes[_path].name.replace(/\s/g, '') : _path.replace('/', '').replace(/[\/]/g, '-');
}//@Function: craetPathAttr(_path)


export const isObject =(_obj) => {
    return (typeof _obj === "object" && _obj !== null) || typeof _obj === "function";
} //@Function: isObject(_obj)


export const pubsub = {
    events: {},
    on: function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
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


import { module_add, module_initial } from "./module";
import { reload } from "./router";
import { GlobVarb} from "./_glob";

export const _fnthis = (_target) => {
    var _path = window.history.state.path;
    let _this = {};
    if (_target == "component") {
        _this = {
            info: GlobVarb.routes[_path],
            state: window.history.state,
            module: {
                add: module_add,
                init: module_initial
            },
            reload,
            pubsub,
        }
    } else if (_target == "module") {
        _this = {
            state: history.state,
            /*module: {
                add: module_add,
                init: module_initial
            },*/
            pubsub,
        }
    }
    return _this;
} //@Function: _fnthis(_target)