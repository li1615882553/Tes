(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Tes"] = factory();
	else
		root["Tes"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _static_define_init_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _prototype_$watch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _prototype_$destory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);
/* harmony import */ var _prototype_$cloneNode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var _html_dom_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);






//TODO 父类中$属性不可写,非$属性会收集对应的依赖
var Control = /** @class */ (function () {
    function Control() {
        /**组件是否挂载到文档流 */
        this.$mounted = false;
        /**持有注册过 ref 引用特性的Control对象 */
        this.$refs = {};
        return this.$init(this.$options);
    }
    /**
     * 初始化组件
     * @param options
     * @returns
     */
    Control.prototype.$init = function (options) {
        var name = options.name || "anonymous-".concat((0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.uid)());
        var targetProxy = _static_define_init_index__WEBPACK_IMPORTED_MODULE_1__["default"].call(this, name, options);
        return targetProxy;
    };
    Object.defineProperty(Control.prototype, "elem", {
        /**
         * 关联元素  节点可以由 update 方法生成,也可以直接被用户指定
         */
        get: function () {
            if (!this._elem) {
                this.$forceUpdate.getValue();
            }
            return this._elem;
        },
        set: function (value) {
            var oldELem = this._elem;
            if (value != oldELem) {
                if (oldELem) {
                    var parent_1 = oldELem.parentElement;
                    if (parent_1) {
                        if (value) {
                            parent_1.replaceChild(value, oldELem);
                        }
                        else {
                            parent_1.removeChild(oldELem);
                        }
                    }
                    delete oldELem.__control__;
                }
                this._elem = value;
                if (value) {
                    value.__control__ = value.__control__ || this;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    /**实例初始化后被调用 */
    Control.prototype.componentWillCreate = function (target) { };
    /**实例创建完成后被调用 */
    Control.prototype.componentCreated = function (target) { };
    /**组件挂载前事件 */
    Control.prototype.componentWillMount = function () { };
    /**组件挂载后的事件 */
    Control.prototype.componentMounted = function () { };
    /**组件销毁前事件 */
    Control.prototype.componentWillDestory = function () { };
    /**组件销毁后事件 */
    Control.prototype.componentDestoryed = function () { };
    /**组件更新前将被调用 */
    Control.prototype.componentWillUpdate = function () { };
    /**组件更新后调用 */
    Control.prototype.componentUpdated = function () { };
    /**
    * 将当前控件渲染到指定的父控件或节点
    * @param parent 要渲染的目标控件或节点  如果为 null 则移除当前控件
    * @param refChild 在指定的子控件或节点前添加,如果为空则添加到末尾
    */
    Control.prototype.$renderTo = function (parent, refChild) {
        // execWillMountMth();
        if (parent) {
            //当前组件存在elem
            if (this.elem) {
                if (parent instanceof Control) {
                    parent = parent.body || parent.elem;
                }
                if (refChild) {
                    parent.insertBefore(this.elem, refChild instanceof Control ? refChild.elem : refChild);
                }
                else {
                    parent.appendChild(this.elem);
                }
            }
            // execWillMountMth();
            // execMountedMth(this);
        }
        else if (this._elem && this._elem.parentNode) {
            this.$destory();
            this._elem.parentNode.removeChild(this._elem);
        }
    };
    /**组件渲染函数 */
    Control.prototype.render = function () { };
    /**
    * 在当前控件查找指定的子控件或节点
    * @param selector 要查找的 css 选择器,如果为空则返回跟控件或节点
    * @returns 返回子控件或节点,如果找不到则返回null
    */
    Control.prototype.find = function (selector) {
        //获取组件HTMLElement, 如果没有,就调用update获取
        var elem = this.elem;
        if (selector) {
            elem = elem && (0,_html_dom_index__WEBPACK_IMPORTED_MODULE_5__.find)(elem, selector);
            //__control__ 当前元素关联的控件实例
            return elem && elem.__control__ || elem;
        }
        return this.$VNode ? this.$VNode.result : elem;
    };
    /**
     * 向当前Control的ref中添加refName的关联对象
     * @param refName ref的名称
     * @returns 返回添加函数,由refDirective调用
     */
    Control.prototype.addRefs = function (refName) {
        var _this = this;
        return function (control) {
            _this.$refs[refName] = control;
            return { refName: refName, refs: _this.$refs };
        };
    };
    Control.$cloneNode = _prototype_$cloneNode__WEBPACK_IMPORTED_MODULE_4__["default"];
    return Control;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Control);
(0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.assign)(Control.prototype, {
    $watch: _prototype_$watch__WEBPACK_IMPORTED_MODULE_2__["default"],
    $destory: _prototype_$destory__WEBPACK_IMPORTED_MODULE_3__["default"]
});


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apply": () => (/* binding */ apply),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "cache": () => (/* binding */ cache),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "defineProperty": () => (/* binding */ defineProperty),
/* harmony export */   "deleteProperty": () => (/* binding */ deleteProperty),
/* harmony export */   "emptyArray": () => (/* binding */ emptyArray),
/* harmony export */   "emptyObject": () => (/* binding */ emptyObject),
/* harmony export */   "freeze": () => (/* binding */ freeze),
/* harmony export */   "getOwnPropertyDescriptor": () => (/* binding */ getOwnPropertyDescriptor),
/* harmony export */   "getPrototypeOf": () => (/* binding */ getPrototypeOf),
/* harmony export */   "has": () => (/* binding */ has),
/* harmony export */   "hasOwnProperty": () => (/* binding */ hasOwnProperty),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isEmptyObject": () => (/* binding */ isEmptyObject),
/* harmony export */   "isEqual": () => (/* binding */ isEqual),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isPlainObject": () => (/* binding */ isPlainObject),
/* harmony export */   "isReserved": () => (/* binding */ isReserved),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isSymbol": () => (/* binding */ isSymbol),
/* harmony export */   "keys": () => (/* binding */ keys),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "ownKeys": () => (/* binding */ ownKeys),
/* harmony export */   "prototype": () => (/* binding */ prototype),
/* harmony export */   "returnArg": () => (/* binding */ returnArg),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "shallowCopy": () => (/* binding */ shallowCopy),
/* harmony export */   "toRaw": () => (/* binding */ toRaw),
/* harmony export */   "toString": () => (/* binding */ toString),
/* harmony export */   "uid": () => (/* binding */ uid)
/* harmony export */ });
/* harmony import */ var _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
var prototype = Object.prototype, freeze = Object.freeze, keys = Object.keys, create = Object.create, assign = Object.assign;
var hasOwnProperty = prototype.hasOwnProperty, toString = prototype.toString;
var isArray = Array.isArray;
var has = Reflect.has, apply = Reflect.apply, ownKeys = Reflect.ownKeys, set = Reflect.set, defineProperty = Reflect.defineProperty, deleteProperty = Reflect.deleteProperty, getOwnPropertyDescriptor = Reflect.getOwnPropertyDescriptor, getPrototypeOf = Reflect.getPrototypeOf;
var emptyObject = freeze({});
var emptyArray = freeze([]);
function isFunction(target) {
    return typeof target === 'function';
}
function isObject(target) {
    return target !== null && typeof target === 'object';
}
function isSymbol(target) {
    return typeof target === 'symbol';
}
/**
 * 判断传入的两个值是否相等
 */
function isEqual(value, value2) {
    return value === value2 || (value !== value && value2 !== value2);
}
/**
 * 判断一个对象是否是一个空对象
 * @param value 需要判断的对象
 * @returns
 */
function isEmptyObject(value) {
    for (var item in value)
        return false;
    return true;
}
/**
 * 返回浅拷贝内容
 * @param value
 * @returns
 */
function shallowCopy(value) {
    if (isArray(value)) {
        return value.slice(0);
    }
    else if (isObject(value)) {
        return assign({}, value);
    }
    return value;
}
/**
 * 创建一个可以缓存方法返回值的方法
 * @param fn 需要缓存结果的方法
 * @returns 一个新方法,如果已经访问过则从缓存中获取,否则重新执行
 */
function cache(fn) {
    var cache = create(null);
    return function (key) {
        if (has(cache, key))
            return cache[key];
        return (cache[key]) = fn(key);
    };
}
/**
 * 判断首字母是否是 $
 * $字母为系统内置
 */
var isReserved = cache(function (key) {
    var charCode = "".concat(key).charCodeAt(0);
    return charCode === 0x24;
});
/**
 * 判断一个值是否是String
 * @param value 需要判断的对象
 * @returns
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * 判断传入对象是否是纯粹的对象
 * @param value 需要判断的对象
 * @returns  是否是纯粹的对象
 */
function isPlainObject(value) {
    return toString.call(value) === "[object Object]";
}
var _id = 0;
/**
 * 当前全局唯一UID
 */
function uid() {
    return "".concat(++_id);
}
/**空方法 */
function noop() { }
/**返回传入的首个参数 */
function returnArg(value) { return value; }

function getOriginObj(targetProxy, originObj, hasTransObj) {
    if (hasTransObj.indexOf(targetProxy) !== -1)
        return;
    if (!originObj)
        originObj = {};
    hasTransObj.push(targetProxy);
    if (isObject(targetProxy)) {
        for (var key in targetProxy) {
            if (isObject(targetProxy[key])) {
                originObj[key] = getOriginObj(targetProxy[key], originObj[key], hasTransObj);
            }
            else {
                if (hasTransObj.indexOf(targetProxy[key]) == -1) {
                    originObj[key] = _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observeProxyMap.has(targetProxy[key]) ? _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observeProxyMap.get(targetProxy[key]).target : targetProxy[key];
                }
            }
        }
    }
    return originObj;
}
function toRaw(targetProxy) {
    return getOriginObj(targetProxy, {}, []);
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToggleCollection": () => (/* binding */ ToggleCollection),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "observerProxySetValue": () => (/* binding */ observerProxySetValue)
/* harmony export */ });
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var emptyBeforOptions = { before: undefined };
function createObserveOptions(target) {
    return {
        //原始对象
        target: target,
        //订阅了当前观察者子集对象更新的 watcher 集合
        //[key in target]: Set<Watcher>
        subs: Object.create(null),
        //订阅了当前观察者对象深度监听的 watcher 集合
        deepSubs: new Set(),
        //上次的值
        lastValue: Object.create(null),
        //是否是数组
        isArray: Array.isArray(target)
    };
}
var Observe = /** @class */ (function () {
    function Observe() {
    }
    Observe.observe = function (target, options) {
        //在这之前创建过观察者对象
        if (this.observeMap.has(target))
            return this.observeMap.get(target).proxy;
        //如果传入的就是观察者对象,则直接返回
        if (this.observeProxyMap.has(target))
            return this.observeProxyMap.get(target).proxy;
        //创建观察者对象
        return this.createObserve(target, options);
    };
    Observe.createObserve = function (target, options) {
        var observeOptions = createObserveOptions(target);
        /**创建当前对象的观察者对象 */
        var proxy = observeOptions.proxy = new Proxy(target, {
            get: createGetProxy(options && options.get || emptyBeforOptions, observeOptions),
            set: createSetProxy(options && options.set || emptyBeforOptions, observeOptions),
            ownKeys: createOwnKeysProxy(observeOptions),
            deleteProperty: createDeletePropertyProxy(options && options.deleteProperty || emptyBeforOptions, observeOptions)
        });
        //更新 两个映射关系
        this.observeMap.set(target, observeOptions);
        this.observeProxyMap.set(proxy, observeOptions);
        return proxy;
    };
    Observe.observable = function (obj) {
        return (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(obj) || (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isArray)(obj) ? this.observe(obj) : obj;
    };
    Observe.getOriginTarget = function (val) {
        return Observe.observeProxyMap.has(val) ? Observe.observeProxyMap.get(val).target : val;
    };
    /**原始对象与选项参数以及Proxy对象的关联映射 */
    Observe.observeMap = new WeakMap();
    /**Proxy对象和选项参数的关联映射 */
    Observe.observeProxyMap = new WeakMap();
    return Observe;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Observe);
/**
 * 依赖收集的相应方法
 * TODO 当前所有属性都会收集依赖,而且如果深度监听lastValue在最外层无法保存
 */
function createGetProxy(_a, _b) {
    var before = _a.before;
    var subs = _b.subs, deepSubs = _b.deepSubs, lastValue = _b.lastValue;
    return function (target, name, proxy) {
        if (before) {
            //所有对象的get方法均走这里, 整个实例对象也是一个响应式对象, 比如调用 targetProxy.$emit 也会触发, 所以走before一个是为了去除$开头属性不监听
            var beforeResult = before(target, name, proxy);
            if (beforeResult === 0) {
                return target[name];
            }
        }
        // 计算属性访问 交给计算属性自己处理
        if ((Object.getOwnPropertyDescriptor(target, name) || _shared_util_index__WEBPACK_IMPORTED_MODULE_0__.emptyObject).get) {
            return target[name];
        }
        //获取当前值
        var value = target[name];
        //方法无需收集依赖
        if ((0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isFunction)(value)) { //&& !hasOwnProperty.call(target, name) && has(target, name)
            return value;
        }
        //当前正在收集依赖的watcher   添加到当前数据的订阅中
        var watcher = ToggleCollection.target;
        if (watcher) {
            //添加订阅信息
            deepSubs.has(watcher) || watcher.add(subs, name);
            //存储本次值
            lastValue[name] = value;
        }
        //如果获取的值是对象类型,则返回他的观察者对象
        return Observe.observable(value);
    };
}
/**
 * 相应式更新的方法
 */
function createSetProxy(_a, _b) {
    var _c = _a === void 0 ? _shared_util_index__WEBPACK_IMPORTED_MODULE_0__.emptyObject : _a, before = _c.before;
    var subs = _b.subs, deepSubs = _b.deepSubs, lastValue = _b.lastValue, isArray = _b.isArray;
    return function (target, name, value, proxy) {
        if (before) {
            var beforeResult = before(target, name, value, proxy);
            if (beforeResult === 0) {
                return true;
            }
        }
        //如果属性值是 Object.defineProperty 定义的属性
        if ((Object.getOwnPropertyDescriptor(target, name) || _shared_util_index__WEBPACK_IMPORTED_MODULE_0__.emptyObject).set) {
            target[name] = value;
            return true;
        }
        // 尝试写入值 并 触发更新
        observerProxySetValue(subs, deepSubs, lastValue, isArray, target, name, value, proxy);
        return true;
    };
}
/**
 * 遍历数据时收集依赖
 */
function createOwnKeysProxy(_a) {
    var deepSubs = _a.deepSubs;
    return function (target) {
        // 获取当前正在收集依赖的 watcher
        var watcher = ToggleCollection.target;
        // 当前有正在收集依赖的 watcher
        if (watcher) {
            // 标记深度监听订阅信息
            deepSubs.add(watcher);
        }
        return (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.ownKeys)(target);
    };
}
/**
 * 响应式删除数据
 */
function createDeletePropertyProxy(_a, _b) {
    var _c = _a === void 0 ? _shared_util_index__WEBPACK_IMPORTED_MODULE_0__.emptyObject : _a, before = _c.before;
    var subs = _b.subs, deepSubs = _b.deepSubs, lastValue = _b.lastValue;
    return function (target, name) {
        if (before) {
            var beforeResult = before(target, name);
            if (beforeResult === 0) {
                return true;
            }
        }
        var isDelete = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.deleteProperty)(target, name);
        //删除成功触发更新
        if (isDelete) {
            triggerUpdate(subs, deepSubs, lastValue, _shared_util_index__WEBPACK_IMPORTED_MODULE_0__.deleteProperty, name);
        }
        return isDelete;
    };
}
function observerProxySetValue(subs, deepSubs, lastValue, isArray, target, name, value, proxy) {
    var oldValue = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.has)(lastValue, name) ? lastValue[name] : target[name];
    if ((0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isEqual)(oldValue, value)) {
        return true;
    }
    //改变值
    target[name] = value;
    //触发更新
    triggerUpdate(subs, deepSubs, lastValue, _shared_util_index__WEBPACK_IMPORTED_MODULE_0__.set, name, value);
}
/**
 * 触发更新
 * @param subs
 * @param deepSubs
 * @param lastValue
 * @param handler
 * @param name
 * @param value
 */
function triggerUpdate(subs, deepSubs, lastValue, handler, name, value) {
    //订阅了当前参数更新的 watcher 集合
    var sub = subs[name];
    //存储本次值改变  更新lastValue
    if (sub && sub.size) {
        handler(lastValue, name, value);
    }
    //遍历当前参数订阅以及父对象的深度监听数据
    for (var _i = 0, _a = __spreadArray(__spreadArray([], Array.from(sub || []), true), deepSubs, true); _i < _a.length; _i++) {
        var watcher = _a[_i];
        watcher.update();
    }
}
/**
 * 触发依赖收集
 */
var ToggleCollection = /** @class */ (function () {
    function ToggleCollection(_targetStack, _target) {
        this._targetStack = _targetStack;
        this._target = _target;
    }
    Object.defineProperty(ToggleCollection, "targetStack", {
        get: function () {
            return ToggleCollection.instance._targetStack;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToggleCollection, "target", {
        get: function () {
            return ToggleCollection.instance._target;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * watch 收集依赖
     * @param target
     * @param fn
     * @returns
     */
    ToggleCollection.toggle = function (target, fn) {
        this.targetStack.push(target);
        ToggleCollection.instance._target = target;
        var result = fn();
        this.targetStack.pop();
        ToggleCollection.instance._target = this.targetStack[this.targetStack.length - 1];
        return result;
    };
    /**
     * 用于防止方法执行时被依赖收集
     * @param fn 执行的方法
     */
    ToggleCollection.safety = function (fn) {
        return this.toggle(null, fn);
    };
    ToggleCollection.instance = new ToggleCollection([], null);
    return ToggleCollection;
}());



/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _shared_const_observeOps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _core_init_initForceUpdate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _initOptions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
/* harmony import */ var _initProps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31);
/* harmony import */ var _initMethods__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(33);
/* harmony import */ var _initComputed__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(34);
/* harmony import */ var _initWatch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(35);








/**
 * 初始化当前组件属性
 * @param name 组件名称
 * @param options 组件配置
 * @param userOptions 用户组件配置
 * @returns
 */
function init(name, options) {
    //创建整个实例的观察者对象
    var TesProxy = _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observe(this, _shared_const_observeOps__WEBPACK_IMPORTED_MODULE_1__["default"]);
    (0,_initOptions__WEBPACK_IMPORTED_MODULE_3__["default"])(this, name);
    (0,_initProps__WEBPACK_IMPORTED_MODULE_4__["default"])(this, TesProxy);
    (0,_initMethods__WEBPACK_IMPORTED_MODULE_5__["default"])(this, options.methods, TesProxy);
    //运行 beforeCreate 生命周期函数
    this.componentWillCreate();
    (0,_initComputed__WEBPACK_IMPORTED_MODULE_6__["default"])(this, options, TesProxy);
    (0,_initWatch__WEBPACK_IMPORTED_MODULE_7__["default"])(this, options, TesProxy);
    //确保renderWatcher在当前组件最后创建   userWatcher执行顺序优于renderWatcher
    (0,_core_init_initForceUpdate__WEBPACK_IMPORTED_MODULE_2__["default"])(this, TesProxy);
    //运行 created 生命周期函数
    this.componentCreated();
    return TesProxy;
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

var options = function (target, name) {
    return (0,_util_index__WEBPACK_IMPORTED_MODULE_0__.isString)(name) && (0,_util_index__WEBPACK_IMPORTED_MODULE_0__.isReserved)(name) ? 0 : null;
};
var dataObserveOptions = {
    set: {
        before: options
    },
    get: {
        before: options
    },
    deleteProperty: {
        before: options
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dataObserveOptions);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initForceUpdate),
/* harmony export */   "renderWatcherCache": () => (/* binding */ renderWatcherCache)
/* harmony export */ });
/* harmony import */ var _observable_Watcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _VNode_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);


/**渲染函数的 Watcher 缓存 */
var renderWatcherCache = new WeakMap();
function initForceUpdate(target, targetProxy) {
    // let target = Observe.observeProxyMap.get(targetProxy).target;
    /**当前实例的渲染方法 */
    var userRender = target.render;
    var renderWatcher = new _observable_Watcher__WEBPACK_IMPORTED_MODULE_0__["default"](targetProxy, function () {
        if (userRender) {
            (0,_VNode_render__WEBPACK_IMPORTED_MODULE_1__["default"])(target, userRender);
        }
    }, false, function () {
        if (target.$mounted) {
            targetProxy.componentWillUpdate();
        }
    });
    //缓存当前实例渲染方法的Watcher
    renderWatcherCache.set(targetProxy, renderWatcher);
    //返回收集依赖方法
    // target.$watch = renderWatcher;
    // 将$forceUpdate放到 原型方法上
    target.$forceUpdate = renderWatcher;
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);



var Watcher = /** @class */ (function () {
    /**
     * 构造Watcher对象
     * @param fn 需要收集依赖的方法
     */
    function Watcher(targetProxy, fn, isComputed, before) {
        if (isComputed === void 0) { isComputed = false; }
        this.isComputed = isComputed;
        this.isInit = false;
        /**针对计算属性生效,计算属性值发生变化后,下次访问应重新获取值 */
        this.shouldUpdate = false;
        //当前构件的观察实例
        this.targetProxy = targetProxy;
        //当前Watcher的id
        this.id = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_2__.uid)();
        //当前watcher在运行时收集的依赖合集
        this.deps = new Set();
        //需要收集依赖的方法
        this.fn = fn;
        //执行watch方法前执行的回调函数
        this.before = before;
    }
    /**
     * 重新收集依赖
     */
    Watcher.prototype.getValue = function () {
        var _this = this;
        //清空依赖 上次收集到的依赖
        this.clean();
        //标记初始化
        this.isInit = true;
        if (this.isComputed)
            this.shouldUpdate = false;
        //重新调用watch传入的方法,收集依赖
        var result;
        _Observe__WEBPACK_IMPORTED_MODULE_0__.ToggleCollection.toggle(this, function () {
            //方法执行的过程中, 触发相应对象的 getter 进而将依赖存储进deps
            result = _this.fn();
        });
        return result;
    };
    /**
     * 依赖重新收集
     */
    Watcher.prototype.update = function () {
        if (this.isComputed) {
            this.shouldUpdate = true;
        }
        (0,_Scheduler__WEBPACK_IMPORTED_MODULE_1__.queueUpdate)(this);
    };
    /**
     * 当前对象 key 添加订阅信息
     * @param subs 当前观察者子集对象的 watcher 集合
     * @param name 当前访问对象的key
     */
    Watcher.prototype.add = function (subs, name) {
        var sub = subs[name] || (subs[name] = new Set());
        //添加当前 watcher 到 sub 中
        //当前值被改变时,调用到 update 方法进入更新队列
        sub.add(this);
        //添加 sub 的信息到当前 watcher 中
        //当依赖方法被重新调用, 会移除订阅的依赖
        this.deps.add(sub);
    };
    /**
     * 清理收集的依赖
     */
    Watcher.prototype.clean = function () {
        for (var _i = 0, _a = Array.from(this.deps); _i < _a.length; _i++) {
            var watch = _a[_i];
            watch.delete(this);
        }
        this.deps.clear();
    };
    return Watcher;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Watcher);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "index": () => (/* binding */ index),
/* harmony export */   "queue": () => (/* binding */ queue),
/* harmony export */   "queueMap": () => (/* binding */ queueMap),
/* harmony export */   "queueUpdate": () => (/* binding */ queueUpdate)
/* harmony export */ });
/* harmony import */ var _util_nextTick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/**
 * watcher 任务指定调度器
 */

/**异步更新队列 */
var queue = [];
/**判断一个异步更新队列正在等待执行或正在执行 */
var queueMap = new Map();
/**是否已经有一个队列正在等待执行或正在执行了 */
var waiting = false;
/**是否已经有一个队列正在执行 */
var flushing = false;
/**当前正在执行的位置 */
var index = 0;
function queueUpdate(watcher) {
    if (!queueMap.has(watcher)) {
        queueMap.set(watcher, true);
        //当当前异步更新队列还未启动
        if (!flushing) {
            queue.push(watcher);
        }
        else {
            //当前异步更新队列已经启动
            //将渲染watcher放在后面执行  将watcher插入队列
            var i = queue.length - 1;
            while (i > index) {
                if (queue[i].targetProxy.$info.uid === watcher.targetProxy.$info.uid && queue[i].isComputed !== watcher.isComputed) {
                    if (queue[i].isComputed)
                        break;
                    else
                        i--;
                }
                else if (+queue[i].id > +watcher.id) {
                    i--;
                }
                else {
                    break;
                }
            }
            queue.splice(i + 1, 0, watcher);
            // console.log(queue.slice(0, queue.length))
            // console.log(queue.map(item => item.targetProxy.$info.uid))
        }
        if (!waiting) {
            waiting = true;
            (0,_util_nextTick__WEBPACK_IMPORTED_MODULE_0__["default"])(flushSchedukerQueue);
        }
    }
}
/**
 * 执行异步更新队列
 */
function flushSchedukerQueue() {
    flushing = true;
    index = 0;
    queue.sort(sortOrder);
    for (var watcher = void 0; index < queue.length; index++) {
        watcher = queue[index];
        if (watcher.before) {
            watcher.before();
        }
        //执行更新
        watcher.getValue();
    }
    for (var i = queue.length - 1; i >= 0; i--) {
        var watcher = queue[i];
        var targetProxy = watcher.targetProxy;
        if (targetProxy.$forceUpdate === watcher && targetProxy.$mounted) {
            targetProxy.componentUpdated();
        }
    }
    //当前异步更新队列已经执行完毕
    waiting = flushing = false;
    index = queue.length = 0;
    queueMap.clear();
}
function sortOrder(watchA, watchB) {
    if (watchA.targetProxy.$info.uid === watchB.targetProxy.$info.uid && watchA.isComputed !== watchB.isComputed) {
        return watchA.isComputed ? -1 : 1;
    }
    return +watchA.id - +watchB.id;
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ nextTick)
/* harmony export */ });
var callbacks = [];
var pending = false;
function flushCallbacks() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
        copies[i]();
    }
}
var timeFunc;
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p_1 = Promise.resolve();
    timeFunc = function () {
        p_1.then(flushCallbacks);
    };
}
else if (typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]')) {
    var counter_1 = 1;
    var observer = new MutationObserver(flushCallbacks);
    var textNode_1 = document.createTextNode(String(counter_1));
    observer.observe(textNode_1, {
        characterData: true
    });
    timeFunc = function () {
        counter_1 = (counter_1 + 1) % 2;
        textNode_1.data = String(counter_1);
    };
}
else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timeFunc = function () {
        setImmediate(flushCallbacks);
    };
}
else {
    timeFunc = function () {
        setTimeout(flushCallbacks, 0);
    };
}
function nextTick(cb, ctx) {
    var _resolve;
    callbacks.push(function () {
        if (cb) {
            cb.call(ctx);
        }
        else if (_resolve) {
            _resolve(ctx);
        }
    });
    if (!pending) {
        pending = true;
        timeFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        });
    }
}
function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlStack": () => (/* binding */ ControlStack),
/* harmony export */   "curentControl": () => (/* binding */ curentControl),
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _VNode_VNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _VNode_util_catchCacheMth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var _observable_Observe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);





/**当前 HTMLElement 节点的Control队列 */
var ControlStack = [];
var curentControl = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_2__.create)(null);
function basicRender(target, renderFunction) {
    var targetProxy = _observable_Observe__WEBPACK_IMPORTED_MODULE_4__["default"].observeMap.get(target).proxy;
    (0,_VNode_util_catchCacheMth__WEBPACK_IMPORTED_MODULE_3__.execWillMountMth)(targetProxy);
    var oldVNode = target.$VNode;
    //同步当前控件中的 $VNode 为render中返回的 VNode 内容
    var newVNode = target.$VNode = renderFunction.call(targetProxy) || _VNode_VNode__WEBPACK_IMPORTED_MODULE_0__["default"].create(null, "");
    _VNode_VNode__WEBPACK_IMPORTED_MODULE_0__["default"].sync(newVNode, oldVNode);
    var result = newVNode.result;
    //更新Control节点状态
    target.elem = result instanceof _Control__WEBPACK_IMPORTED_MODULE_1__["default"] ? result.elem : result;
    (0,_VNode_util_catchCacheMth__WEBPACK_IMPORTED_MODULE_3__.execMountedMth)(targetProxy);
}
function render(target, renderFunction) {
    // console.log('当前Control入栈', target.$info.uid)
    ControlStack.push(target);
    curentControl = target;
    basicRender(target, renderFunction);
    ControlStack.pop();
    curentControl = ControlStack[ControlStack.length - 1];
    // console.log('当前Control出栈', target.$info.uid)
}


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _html_dom_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _html_const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _util_modifyControlValue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(27);
/* harmony import */ var _html_directiveBase_attribute__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/* harmony import */ var _util_catchCacheMth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(28);








/**
 * 虚拟节点
 */
var VNode = /** @class */ (function () {
    /**
     * type节点类型
     * 1.如果是null则表示文本节点;
     * 2.如果是字符串则表示 HTML 原生节点;
     * 3.如果是函数则表示控件
     */
    function VNode(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
        /**当前VNode存储的指令对象 */
        this.propDirectives = new Map();
        this.type = type;
        this.props = props;
        this.children = children;
    }
    /**
     * 添加一个或多个子节点
     * @param child 要添加的字内容
     * @returns 返回 child
     */
    VNode.prototype.append = function (child) {
        if (child != null) {
            if (Array.isArray(child)) {
                for (var _i = 0, child_1 = child; _i < child_1.length; _i++) {
                    var item = child_1[_i];
                    this.append(item);
                }
            }
            else {
                this.children.push(child instanceof VNode ? child : new VNode(null, child, _shared_util_index__WEBPACK_IMPORTED_MODULE_1__.emptyArray));
            }
        }
        return child;
    };
    /**
     * 创建一个虚拟节点
     * TSX/JSX 中编译过程中通过此方法先将节点转换成 VNode
     * @param type 虚拟节点类型, 如果是null则表示文本节点;如果是字符串则表示HTML原生节点; 如果是函数表示控件
     * @param props 节点属性
     * @param childNodes 所有子内容
     * @returns 返回创建的虚拟节点
     */
    VNode.create = function (type, props) {
        var childNodes = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            childNodes[_i - 2] = arguments[_i];
        }
        var result = new VNode(type, props, []);
        result.append(childNodes);
        return result;
    };
    /**比较两个节点是否相同 */
    VNode.isDiffVNode = function (newVNode, oldVNode) {
        return !oldVNode || newVNode.type !== oldVNode.type ||
            newVNode.type && newVNode.props && oldVNode.props && newVNode.props.id && oldVNode.props.id && newVNode.props.id !== oldVNode.props.id;
    };
    /**
     * 更新子节点
     * @param parentElm 父节点
     * @param newCh 当前更新的子节点
     * @param oldCh 当前更新子节点的原子节点
     */
    VNode.updateChildren = function (parentElm, newCh, oldCh) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1, newEndIdx = newCh.length - 1;
        var oldStartVNode = oldCh[0], newStartVNode = newCh[0];
        var oldEndVNode = oldCh[oldEndIdx], newEndVNode = newCh[newEndIdx];
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (!this.isDiffVNode(oldStartVNode, newStartVNode)) {
                this.sync(newStartVNode, oldStartVNode, false);
                oldStartVNode = oldCh[++oldStartIdx];
                newStartVNode = newCh[++newStartIdx];
            }
            else if (!this.isDiffVNode(oldEndVNode, newEndVNode)) {
                this.sync(newEndVNode, oldEndVNode, false);
                oldEndVNode = oldCh[--oldEndIdx];
                newEndVNode = newCh[--newEndIdx];
            }
            else if (!this.isDiffVNode(oldStartVNode, newEndVNode)) {
                this.sync(newEndVNode, oldStartVNode, false);
                parentElm.insertBefore(oldStartVNode.result instanceof _Control__WEBPACK_IMPORTED_MODULE_0__["default"] ? oldStartVNode.result.elem : oldStartVNode.result, (oldEndVNode.result instanceof _Control__WEBPACK_IMPORTED_MODULE_0__["default"] ? oldEndVNode.result.elem : oldEndVNode.result).nextSibling);
                oldStartVNode = oldCh[++oldStartIdx];
                newEndVNode = newCh[--newEndIdx];
            }
            else if (!this.isDiffVNode(oldEndVNode, newStartVNode)) {
                this.sync(newStartVNode, oldEndVNode, false);
                parentElm.insertBefore(oldEndVNode.result instanceof _Control__WEBPACK_IMPORTED_MODULE_0__["default"] ? oldEndVNode.result.elem : oldEndVNode.result, oldStartVNode.result instanceof _Control__WEBPACK_IMPORTED_MODULE_0__["default"] ? oldStartVNode.result.elem : oldStartVNode.result);
                oldEndVNode = oldCh[--oldEndIdx];
                newStartVNode = newCh[++newStartIdx];
            }
            else {
                this.sync(newStartVNode);
                if (newStartVNode.result instanceof _Control__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                    newStartVNode.result.$renderTo(parentElm, oldStartVNode.result);
                }
                else {
                    parentElm.insertBefore(newStartVNode.result, oldStartVNode.result instanceof _Control__WEBPACK_IMPORTED_MODULE_0__["default"] ? oldStartVNode.result.elem : oldStartVNode.result);
                }
                newStartVNode = newCh[++newStartIdx];
            }
        }
        if (oldStartIdx > oldEndIdx) {
            var refElm = !!newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].result : null;
            this.addVNode(parentElm, newCh, newStartIdx, newEndIdx, refElm);
        }
        else if (newStartIdx > newEndIdx) {
            this.removeVNode(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    };
    /**
     * 移除虚拟节点，从真实dom中移除当前虚拟节点
     * @param body
     * @param VNodes
     * @param start
     * @param end
     */
    VNode.removeVNode = function (body, VNodes, start, end) {
        end = end === undefined ? VNodes.length : end;
        for (; start <= end; start++) {
            var childResult = VNodes[start].result;
            if (childResult instanceof _Control__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                childResult.$renderTo(null);
            }
            else {
                body.removeChild(childResult);
            }
        }
    };
    /**
     * 新增虚拟节点, 将虚拟节点添加到真实dom中
     * @param body
     * @param VNodes
     * @param start
     * @param end
     */
    VNode.addVNode = function (body, VNodes, start, end, refChild) {
        end = end === undefined ? VNodes.length : end;
        for (; start <= end; start++) {
            if (!VNodes[start].result) {
                this.sync(VNodes[start]);
            }
            var result = VNodes[start].result;
            if (result instanceof _Control__WEBPACK_IMPORTED_MODULE_0__["default"]) {
                result.$renderTo(body, refChild);
            }
            else {
                if (refChild) {
                    body.insertBefore(result, refChild);
                }
                else {
                    body.appendChild(result);
                }
            }
        }
    };
    /**
     * 同步虚拟节点, 创建虚拟节点对应的真实节点
     * @param newVNode 新虚拟节点
     * @param oldVNode 如果指定了原虚拟节点,则同步时尽量重用上次创建的真实节点
     * @param changed true强制更新节点, false强制使用原节点
     * @return 如果根节点发生改变则返回 true, 否则返回 false
     */
    VNode.sync = function (newVNode, oldVNode, changed) {
        //1.同步根节点
        //如果节点类型和ID不变,则重用上次生成的节点,否则重新生成
        var type = newVNode.type;
        changed = changed === undefined ? this.isDiffVNode(newVNode, oldVNode) : changed;
        var isControl = typeof type === "function";
        //实例化节点 / 生成dom节点   change true 创建新节点， false 使用原始旧节点
        var result = newVNode.result = changed ? type ? isControl ? new type() : document.createElement(type) : document.createTextNode(newVNode.props) : oldVNode.result;
        if (!changed) {
            newVNode.propDirectives = oldVNode.propDirectives;
        }
        if (type) {
            //2.同步属性
            //TODO 应该将model的绑定放在最后执行,因为他需要访问设置了的props
            var body = void 0;
            if (isControl) {
                if (!changed) {
                    for (var prop in oldVNode.props) {
                        if ((!newVNode.props || !(prop in newVNode.props)) && prop !== "control") {
                            newVNode.propDirectives.has(prop) && newVNode.propDirectives.get(prop).destory();
                            newVNode.propDirectives.has(prop) && newVNode.propDirectives.delete(prop);
                        }
                    }
                }
                for (var prop in newVNode.props) {
                    var value = newVNode.props[prop];
                    if ((changed || !oldVNode.props || value !== oldVNode.props[prop]) || prop === "model") {
                        if (newVNode.propDirectives.has(prop)) {
                            newVNode.propDirectives.get(prop).commit(value);
                        }
                        else {
                            var propDirective = void 0;
                            if (VNode.isDirective(prop)) {
                                var directive = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_1__.has)(_html_const__WEBPACK_IMPORTED_MODULE_3__.directives, prop) ? _html_const__WEBPACK_IMPORTED_MODULE_3__.directives[prop] : _html_const__WEBPACK_IMPORTED_MODULE_3__.userDirectives[prop];
                                propDirective = new directive(result, value, _render__WEBPACK_IMPORTED_MODULE_4__.curentControl);
                            }
                            else {
                                propDirective = new _html_directiveBase_attribute__WEBPACK_IMPORTED_MODULE_6__["default"](prop, value, result);
                            }
                            newVNode.propDirectives.set(prop, propDirective);
                        }
                    }
                }
                //更新控件$parent,$children信息
                (0,_util_modifyControlValue__WEBPACK_IMPORTED_MODULE_5__.setControlValue)(result, "$parent", _render__WEBPACK_IMPORTED_MODULE_4__.curentControl);
                if ((newVNode.children.length || !changed && oldVNode.children.length)) {
                    (0,_util_modifyControlValue__WEBPACK_IMPORTED_MODULE_5__.setControlValue)(result, "$children", newVNode.children.slice(0, newVNode.children.length));
                }
                if (!result.$mounted) {
                    (0,_util_catchCacheMth__WEBPACK_IMPORTED_MODULE_7__.addCacheMth)(result);
                }
                body = result.body;
                //防止Control判断未改变,导致节点整体未发生变化的情况
                !body && oldVNode && oldVNode.result && oldVNode.result.$mounted && (body = oldVNode.result.elem);
            }
            else {
                //HTMLElement / Text    设置节点Attribute
                for (var prop in newVNode.props) {
                    var value = newVNode.props[prop];
                    if (changed || !oldVNode.props || !(0,_shared_util_index__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value) && value !== oldVNode.props[prop] || VNode.isDirective(prop)) {
                        if (oldVNode && oldVNode.propDirectives.has(prop)) {
                            newVNode.propDirectives.set(prop, oldVNode.propDirectives);
                        }
                        VNode.set(newVNode, result, prop, value);
                    }
                }
                if (!changed) {
                    //复用oldDom, 如果此时old prop发生变化
                    for (var prop in oldVNode.props) {
                        if (!newVNode.props || !(prop in newVNode.props)) {
                            VNode.set(newVNode, result, prop, null);
                        }
                    }
                }
                body = result;
            }
            //3. 同步子节点
            if (body) {
                if (newVNode.children.length) {
                    if (oldVNode && oldVNode.children.length) {
                        this.updateChildren(body, newVNode.children, oldVNode.children);
                    }
                    else {
                        this.addVNode(body, newVNode.children, 0, newVNode.children.length - 1);
                    }
                }
                else {
                    if (oldVNode && oldVNode.children.length) {
                        this.removeVNode(body, oldVNode.children, 0, oldVNode.children.length - 1);
                    }
                }
            }
        }
        else if (!changed && oldVNode.props !== newVNode.props) {
            //2.文本节点同步属性
            result.textContent = newVNode.props;
        }
        return changed;
    };
    /**
     * 设置节点的属性
     * @param target 要设置的节点
     * @param prop 属性名
     * @param value 属性值
     * @param args 部分属性需要附加参数  内置class,style, 监听事件的 selector等需要附加参数
     * @param scope 时间作用域
     */
    VNode.set = function (vnode, target, prop, value, args) {
        if (value === void 0) { value = null; }
        if (/^on[^a-z]/.test(prop)) { //监听事件
            var eventName = prop.slice(2).toLowerCase();
            _html_dom_dom__WEBPACK_IMPORTED_MODULE_2__.on(target, eventName, args || "", value, _render__WEBPACK_IMPORTED_MODULE_4__.curentControl);
        }
        else if (VNode.isDirective(prop)) { //自定义标签
            if (value) {
                if (!vnode.propDirectives.has(prop)) {
                    var directive = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_1__.has)(_html_const__WEBPACK_IMPORTED_MODULE_3__.directives, prop) ? _html_const__WEBPACK_IMPORTED_MODULE_3__.directives[prop] : _html_const__WEBPACK_IMPORTED_MODULE_3__.userDirectives[prop];
                    var propDirective = new directive(target, value, _render__WEBPACK_IMPORTED_MODULE_4__.curentControl);
                    vnode.propDirectives.set(prop, propDirective);
                }
            }
            else {
                //移除自定义指令对象
                vnode.propDirectives[prop] && vnode.propDirectives[prop].destory();
            }
        }
        else { //其余属性
            _html_dom_dom__WEBPACK_IMPORTED_MODULE_2__.setAttr(target, prop, value);
        }
    };
    /**
     * 检测当前属性是否是指令
     * @param prop
     * @returns
     */
    VNode.isDirective = function (prop) {
        return (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_1__.has)(_html_const__WEBPACK_IMPORTED_MODULE_3__.directives, prop) || (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_1__.has)(_html_const__WEBPACK_IMPORTED_MODULE_3__.userDirectives, prop);
    };
    VNode.copyVNode = function (target) {
        var type = target.type, props = target.props, children = target.children;
        return VNode.create(type, props, children);
    };
    return VNode;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VNode);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addClass": () => (/* binding */ addClass),
/* harmony export */   "after": () => (/* binding */ after),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "before": () => (/* binding */ before),
/* harmony export */   "children": () => (/* binding */ children),
/* harmony export */   "colsest": () => (/* binding */ colsest),
/* harmony export */   "computeStyle": () => (/* binding */ computeStyle),
/* harmony export */   "contains": () => (/* binding */ contains),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "first": () => (/* binding */ first),
/* harmony export */   "getAttr": () => (/* binding */ getAttr),
/* harmony export */   "getHtml": () => (/* binding */ getHtml),
/* harmony export */   "getOffset": () => (/* binding */ getOffset),
/* harmony export */   "getRect": () => (/* binding */ getRect),
/* harmony export */   "getScroll": () => (/* binding */ getScroll),
/* harmony export */   "getStyle": () => (/* binding */ getStyle),
/* harmony export */   "hasClass": () => (/* binding */ hasClass),
/* harmony export */   "index": () => (/* binding */ index),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "match": () => (/* binding */ match),
/* harmony export */   "next": () => (/* binding */ next),
/* harmony export */   "off": () => (/* binding */ off),
/* harmony export */   "offsetParent": () => (/* binding */ offsetParent),
/* harmony export */   "on": () => (/* binding */ on),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "parent": () => (/* binding */ parent),
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "prepend": () => (/* binding */ prepend),
/* harmony export */   "prev": () => (/* binding */ prev),
/* harmony export */   "query": () => (/* binding */ query),
/* harmony export */   "ready": () => (/* binding */ ready),
/* harmony export */   "removeClass": () => (/* binding */ removeClass),
/* harmony export */   "setAttr": () => (/* binding */ setAttr),
/* harmony export */   "setHtml": () => (/* binding */ setHtml),
/* harmony export */   "setOffset": () => (/* binding */ setOffset),
/* harmony export */   "setRect": () => (/* binding */ setRect),
/* harmony export */   "setScroll": () => (/* binding */ setScroll),
/* harmony export */   "setStyle": () => (/* binding */ setStyle),
/* harmony export */   "toggleClass": () => (/* binding */ toggleClass),
/* harmony export */   "trigger": () => (/* binding */ trigger),
/* harmony export */   "vendor": () => (/* binding */ vendor)
/* harmony export */ });
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);

var parseFix;
var parseContiner;
/**
 * 解析一段 HTML 并返回相应的节点
 * @param html 要解析的HTML片段
 * @param context 创建节点使用的文档
 * @returns 返回要创建的节点, 如果HTML中包含多个节点,则返回一个文档片段
 */
function parse(html, context) {
    if (context === void 0) { context = document; }
    if (!parseFix) {
        var select = [1, "<select mutiple='mutiple'>", "</select>"];
        var table = [1, "<table>", "</table>"];
        var tr = [3, "<table><tbody><tr>", "</tr></tbodt></table>"];
        parseFix = {
            __proto__: null,
            option: select,
            optgroup: select,
            thead: table,
            tbody: table,
            tfoot: table,
            caption: table,
            colgroup: table,
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: tr,
            th: tr,
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"]
        };
        parseContiner = document.createElement('div');
    }
    var container = context === document ? parseContiner : context.createElement("div");
    var match = /^<(\w+)/.exec(html);
    var wrapper = match && parseFix[match[1].toLowerCase()];
    if (wrapper) {
        container.innerHTML = wrapper[1] + html + wrapper[2];
        for (var level = wrapper[0]; level--; container = container.lastChild)
            ;
    }
    var result = container.firstChild || context.createTextNode(html);
    if (result.nextSibling) {
        //如果逐个添加内容,则会导致浏览器反复渲染,使用文档片段保存,然后一次性的将他们添加到文档中
        result = context.createDocumentFragment();
        while (container.firstChild) {
            result.appendChild(container.firstChild);
        }
    }
    return result;
}
function query(node, selector) {
    return Array.prototype.slice.call(querySelector(node, selector));
}
function find(node, selector) {
    return querySelector(node, selector, true);
}
function querySelector(node, selector, first) {
    if (typeof node === 'string') {
        selector = node;
        node = document;
    }
    return first ? node.querySelector(selector) : node.querySelectorAll(selector);
}
/**
 * 判断元素是否匹配指定的CSS选择器
 * @param elem 要判断的元素
 * @param selector 要判断的CSS选择器
 * @returns 如果匹配则返回 true, 否则返回false
 * @example matches(document.body, 'body') //true
 */
function match(elem, selector) {
    if (elem.matches) {
        return elem.matches(selector);
    }
    var parent = elem.parentNode;
    var actualParent = parent || elem.ownerDocument.documentElement;
    parent || actualParent.appendChild(elem);
    try {
        return Array.prototype.indexOf.call(querySelector(actualParent, selector), elem) >= 0;
    }
    finally {
        parent || actualParent.removeChild(elem);
    }
}
/**
 * 获取节点的第一个子元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的 css 选择器
 * @returns 返回元素, 如果元素不存在则返回null
 */
function first(node, selector) {
    return walk(node, selector, "nextSibling", "firstChild");
}
/**
 * 获取节点的最后一个子节点
 * @param node 要获取的节点
 * @param selector 用于筛选元素的 css 选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
function last(node, selector) {
    return walk(node, selector, "previousSibling", "lastChild");
}
/**
 * 获取节点的下一个相邻元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的CSS选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
function next(node, selector) {
    return walk(node, selector, "nextSibling");
}
/**
 * 获取节点的上一个相邻元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的CSS选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
function prev(node, selector) {
    return walk(node, selector, "previousSibling");
}
/**
 * 获取节点的父元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的CSS选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
function parent(node, selector) {
    return walk(node, selector, "parentNode");
}
function walk(node, selector, nextProp, firstProp) {
    if (firstProp === void 0) { firstProp = nextProp; }
    for (node = node[firstProp]; node; node = node[nextProp]) {
        if (node.nodeType === 1 && (!selector || match(node, selector))) {
            return node;
        }
    }
    return null;
}
/**
 * 获取指定元素的属性值
 * @param elem 要获取的元素
 * @param attrName 要获取的属性名
 * @returns 返回的属性, 如果不存在则返回 null
 */
function getAttr(elem, attrName) {
    return attrName in elem ? elem[attrName] : elem.getAttribute(attrName);
}
/**
 * 设置指定元素的属性值
 * @param elem 要设置的元素
 * @param attrName 要设置的属性名
 * @param value 要设置的属性值, 如果为 null 则表示删除属性
 */
function setAttr(elem, attrName, value) {
    if (/^on./.test(attrName) && attrName in elem) {
        if (typeof value === 'string') {
            elem.setAttribute(attrName, value);
        }
        else {
            elem[attrName] = value;
        }
    }
    else {
        if (attrName in elem || value != null && typeof value !== 'string') {
            elem[attrName] = value;
        }
        else if (value == null) {
            elem.removeAttribute(attrName);
        }
        else {
            elem.setAttribute(attrName, value);
        }
    }
}
/**
 * 从指定节点开始向父元素查找第一个匹配指定 CSS 选择器的元素
 * @param node  要开始查找的节点
 * @param selector  要匹配的CSS选择器
 * @param context  如果提供了上下文,则在指定的元素内查找
 * @returns 返回元素  如果不存在则返回 null
 * @example closest(document.)
 */
function colsest(node, selector, context) {
    while (node && node !== context && (node.nodeType !== 1 || !match(node, selector))) {
        node = node.parentNode;
    }
    return node === context ? null : node;
}
/**
 * 获取指定节点的所有子元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的 CSS 选择器
 * @returns 返回包含所有子元素的数组
 */
function children(node, selector) {
    var result = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
        if (node.nodeType === 1 && (!selector && match(node, selector))) {
            result.push(node);
        }
    }
    return result;
}
/**
 * 判断指定节点是否包含另一个节点
 * @param node 要判断的节点
 * @param child 要判断的子节点
 * @returns 如果child同node或实其子节点,则返回 true, 否则返回false
 */
function contains(node, child) {
    if (node.contains) {
        return node.contains(child);
    }
    for (; child; child = child.parentNode) {
        if (child === node) {
            return true;
        }
    }
    return false;
}
/**
 * 获取指定节点在父节点中的索引
 * @param node 要处理的节点
 * @returns 返回索引,如果没有父元素则返回 0
 */
function index(node) {
    var result = 0;
    while ((node = node.previousSibling)) {
        if (node.nodeType === 1) {
            result++;
        }
    }
    return result;
}
/**
 * 将节点插入到子节点最后一位
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 */
function append(node, content) {
    return insert(node, content, false, false);
}
/**
 *  将节点插入到子节点第一位
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 * @returns
 */
function prepend(node, content) {
    return insert(node, content, true, false);
}
/**
 * 在指定节点前插入节点或HTML
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 * @returns
 */
function before(node, content) {
    return insert(node, content, true, true);
}
/**
 * 在指定节点后插入节点或HTML
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 * @returns
 */
function after(node, content) {
    return insert(node, content, false, true);
}
function insert(node, content, prepend, sibling) {
    if (content) {
        if (typeof content === "string") {
            content = parse(content, node.ownerDocument);
        }
        if (sibling) {
            return node.parentNode.insertBefore(content, prepend ? node : node.nextSibling);
        }
        return prepend ? node.insertBefore(content, node.firstChild) : node.appendChild(content);
    }
}
/**
 * 为当前的 css 属性添加当前浏览器特定的后缀
 * @param propName  要处理的 CSS 属性名
 * @return 返回已添加后缀的 CSS 属性名
 * @example vendor("transform")    比如 webkit 内核的 webkitOpacity 属性
 */
function vendor(propName) {
    if (!(propName in document.documentElement.style)) {
        var capName = propName.charAt(0).toUpperCase() + propName.slice(1);
        for (var _i = 0, _a = ['webkit', 'Moz', 'ms', 'O']; _i < _a.length; _i++) {
            var prefix = _a[_i];
            if ((prefix + capName) in document.documentElement.style) {
                return prefix + capName;
            }
        }
    }
    return propName;
}
/**
 * 获取指定元素的 CSS 属性值
 * @param element 要获取的元素
 * @param propName  要获取的 CSS 属性名
 */
function getStyle(elem, propName) {
    return elem.ownerDocument.defaultView.getComputedStyle(elem)[vendor(propName)];
}
/**
 * 设置指定元素的css属性值
 * @param elem 要设置的元素
 * @param propName 要设置的css属性名
 * @param value 要设置的css属性值,如果是数字,则自动添加像素单位
 */
function setStyle(elem, propName, value) {
    elem.style[vendor(propName)] = value && typeof value === "number" && !/^(?:columnCount|fillOpacity|flexGrow|flexShrink|fontWeight|lineHeight|opacity|order|orphans|widows|zIndex|zoom)$/.test(propName) ? value + "px" : value;
}
/**
 * 计算一个元素的样式值
 * @param elem 要计算的元素
 * @param propNames 要计算的CSS属性名列表
 * @returns 返回所有的 CSS属性值的和
 */
function computeStyle(elem) {
    var propNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        propNames[_i - 1] = arguments[_i];
    }
    var result = 0;
    var computedStyle = elem.ownerDocument.defaultView.getComputedStyle(elem);
    for (var _a = 0, propNames_1 = propNames; _a < propNames_1.length; _a++) {
        var prop = propNames_1[_a];
        result += parseFloat(computedStyle[prop]) || 0;
    }
    return result;
}
/**
 * 获取指定元素内部HTML
 * @param elem 要回去的元素
 * @returns 返回内部HTML
 */
function getHtml(elem) {
    return elem.innerHTML;
}
/**
 * 设置指定元素内部的HTML
 * @param elem 要设置的元素
 * @param value 要设置的内部HTML
 */
function setHtml(elem, value) {
    elem.innerHTML = value;
}
/**
 * 判断指定元素是否已添加指定的 CSS 类名
 * @param elem 要判断的元素
 * @param className 要判断的 类名
 */
function hasClass(elem, className) {
    return (" " + elem.className + " ").indexOf(" " + className + " ") >= 0;
}
/**
 * 添加指定元素的 CSS 类名
 * @param elem 要判断的元素
 * @param className 要添加的 CSS 类名
 */
function addClass(elem, className) {
    toggleClass(elem, className, true);
}
/**
 * 删除指定元素的 CSS 类名
 * @param elem 要判断的元素
 * @param className 要删除的 CSS 类名
 */
function removeClass(elem, className) {
    toggleClass(elem, className, false);
}
/**
 * 如果存在则删除,不存在则添加指定的CSS类名
 * @param elem 要处理的元素
 * @param className 要添加或删除的类名
 * @param value 如果为true则添加 CSS 类名,如果为 false 则删除 CSS 类名
 */
function toggleClass(elem, className, value) {
    if (hasClass(elem, className)) {
        if (value !== true) {
            elem.className = (" " + elem.className + " ").replace(" " + className + " ", "").trim();
        }
    }
    else if (value !== false) {
        elem.className = elem.className ? elem.className + " " + className : className;
    }
}
var eventFix;
function on(elem, eventName, selector, listener, scope) {
    if (!eventFix) {
        var isEnterOrLeave = function (e, target) {
            return /(?:ter|e)$/.test(e.type) || !contains(target, e.relatedTarget);
        };
        eventFix = {
            __proto__: null,
            // focus/blur 不支持冒泡, 委托时使用 foucin/focusout
            focus: { delegate: "focusin" },
            blur: { delegate: 'focusout' },
            // mouseenter/mouselave 不支持冒泡.委托时使用 mouseover/mouseout
            mouseenter: { delegate: "mouseover", filter: isEnterOrLeave },
            mouseleave: { delegate: "mouseout", filter: isEnterOrLeave },
            // pointerenter/pointerleave 不支持冒泡,委托时使用 pointerover/pointerout
            pointerenter: { delegate: "pointerover", filter: isEnterOrLeave },
            pointerleave: { delegate: "pointerout", filter: isEnterOrLeave },
            //支持绑定原生click
            mouseclick: { bind: "click" }
        };
        var html = Document.prototype;
        // Firefox 浏览器不支持 focusin/focusout 事件
        // Chorme 实际支持focusin/focusout 事件,但是判断比较复杂,所以按不支持处理
        if (!("onfocusin" in html)) {
            var focusAdd = function (elem, listener) {
                elem.addEventListener(this.bind, listener, true);
            };
            var focusRemove = function (elem, listener) {
                elem.removeEventListener(this.bind, listener, true);
            };
            eventFix.focusin = { bind: 'focus', add: focusAdd, remove: focusRemove };
            eventFix.focusout = { bind: 'blur', add: focusAdd, remove: focusRemove };
        }
        // mouseover 和 mouseenter 两者之前区别 mouseenter 不支持冒泡 
        if (!("onmouseenter" in html)) {
            eventFix.mouseenter.bind = "mouseover";
            eventFix.mouseleave.bind = "mouseout";
        }
        /**
        * Firefox: 不支持mousewheel事件,使用 "DOMMouseScroll" 事件代替
        * mousewheel 事件中的 event.wheelDelta 属性值,如果正值说明滚轮向上滚动,如果负值说明向下滚动,返回的值均为120的倍数   幅度大小: event.wheelDelta / 120
        * DOMMouseScroll 事件 event.detail 属性值, 如果是负数则说明向上滚动,如果是正值说明向下滚动,返回的值均为3的倍数  幅度大小: event.detail / 3
        */
        if (!("onmousewheel" in html)) {
            eventFix.mousewheel = {
                bind: "DOMMouseScroll",
                filter: function (e) {
                    e.wheelDelta = -(e.detail || 0) / 3;
                }
            };
        }
        /**
         * 低版本浏览器不支持 auxclick 事件
         * 使用mouseup事件代替,并且只有 button 是鼠标右键是触发 事件
         */
        if (!("onauxclick" in html)) {
            eventFix.auxclick = {
                bind: "mouseup",
                filter: function (e) { return e.button === 3; }
            };
        }
        /**
         * 低版本浏览器不兼容
         *
         */
        if (!("onpointerdown" in html)) {
            eventFix.pointerover = { bind: 'mouseover' };
            eventFix.pointerout = { bind: 'mouseover' };
            eventFix.pointerenter.bind = eventFix.mouseenter.bind || "mouseenter";
            eventFix.pointerenter.delegate = "mouseover";
            eventFix.pointerleave.bind = eventFix.mouseleave.bind || "mouseleave";
            eventFix.pointerleave.delegate = "mouseout";
            eventFix.pointerdown = { bind: 'mousedown' };
            eventFix.pointerup = { bind: 'mouseup' };
            eventFix.pointermove = { bind: 'mousemove' };
        }
        if (window.TouchEvent) {
            var initTouchEvent = function (e) {
                //PC chorme 修复触摸事件的 pageX 和 pageY 都是0
                if (!e.pageX && !e.pageY && e.changedTouches.length) {
                    Object.defineProperty(e, "pageX", { get: function () { return this.changedTouches[0].pageX; } });
                    Object.defineProperty(e, "pageY", { get: function () { return this.changedTouches[0].pageY; } });
                    Object.defineProperty(e, "clientX", { get: function () { return this.changedTouches[0].clientX; } });
                    Object.defineProperty(e, "clientY", { get: function () { return this.changedTouches[0].clientY; } });
                    Object.defineProperty(e, "which", { value: 1 });
                }
            };
            eventFix.click = {
                filter: initTouchEvent,
                add: function (elem, listener) {
                    var state = 0;
                    elem.addEventListener('touchstart', listener.__touchStart__ = function (e) {
                        if (e.changedTouches.length === 1) {
                            state = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
                        }
                    }, false);
                    elem.addEventListener('touchend', listener.__touchEnd__ = function (e) {
                        if (state && e.changedTouches.length === 1 && Math.pow(e.changedTouches[0].pageX - state[0], 2) + Math.pow(e.changedTouches[0].pageY - state[1], 2) < 25) {
                            state = 1;
                            listener.call(elem, e);
                        }
                    }, false);
                    elem.addEventListener("click", listener.__click__ = function (e) {
                        var trigger = state !== 1;
                        state = 0;
                        trigger && listener.call(this, e);
                    }, false);
                },
                remove: function (elem, listener) {
                    elem.removeEventListener("touchstart", listener.__touchStart__, false);
                    elem.removeEventListener("touchend", listener.__touchEnd__, false);
                    elem.removeEventListener("click", listener.__click__, false);
                }
            };
            if (eventFix.pointerout) {
                var pointerAdd = function (elem, listener) {
                    var state = 0;
                    elem.addEventListener(this.touch, listener.__touch__ = function (e) {
                        state = 1;
                        listener.call(this, e);
                    }, false);
                    elem.addEventListener(this.bind, listener.__mouse__ = function (e) {
                        if (state) {
                            state = 0;
                        }
                        else {
                            listener.call(this, e);
                        }
                    }, false);
                };
                var pointerRemove = function (elem, listener) {
                    elem.removeEventListener(this.touch, listener.__touch__, false);
                    elem.removeEventListener(this.bind, listener.__mouse__, false);
                };
                eventFix.pointerdown = { bind: "mousedown", touch: "touchstart", filter: initTouchEvent, add: pointerAdd, remove: pointerRemove };
                eventFix.pointerup = { bind: "mouseup", touch: "touchend", filter: initTouchEvent, add: pointerAdd, remove: pointerRemove };
                eventFix.pointermove = { bind: "mousemove", touch: "touchmove", filter: initTouchEvent, add: pointerAdd, remove: pointerRemove };
            }
        }
    }
    if (typeof selector !== 'string') {
        scope = listener;
        listener = selector;
        selector = "";
    }
    scope = scope || elem;
    //当前节点上绑定的数据
    var events = elem.__events__ || (elem.__events__ = Object.create(null));
    var key = selector ? eventName + " " + selector : eventName;
    //当前节点绑定的当前事件回调
    var listeners = events[key];
    var delegateFix = eventFix[eventName] || undefined;
    var bindFix = selector && delegateFix && delegateFix.delegate ? eventFix[eventName = delegateFix.delegate] : delegateFix;
    /**
     * 满足以下任一情况,需要重新封装监听器
     * 1.事件委托, 需要重新定位目标元素
     * 2.事件有特殊的过滤器,仅在满足条件时触发
     * 3.需要重写回调函数的 this
     * 4.监听器具有第二参数,需要重写回调函数的第二参数
     * 5.监听器已添加需重新封装才能绑定成功
     */
    if (selector || scope !== elem || bindFix && bindFix.filter || listener.length > 1 || listeners && indexOfListener(listeners, listener, scope) >= 0) {
        var originalListener_1 = listener;
        listener = function (e) {
            var target = scope;
            if (selector && (!(target = colsest(e.target, selector, target)) || (delegateFix !== bindFix && delegateFix.filter && delegateFix.filter(e, target) === false))) {
                return;
            }
            if (bindFix && bindFix.filter && bindFix.filter(e, target) === false) {
                return;
            }
            originalListener_1.call(scope, e, target);
        };
        listener.__original__ = originalListener_1;
        listener.__scope__ = scope;
    }
    if (!listeners) {
        events[key] = listener;
    }
    else if (Array.isArray(listeners)) {
        listeners.push(listener);
    }
    else {
        events[key] = [listeners, listener];
    }
    bindFix && bindFix.add ? bindFix.add(elem, listener) : elem.addEventListener(bindFix && bindFix.bind || eventName, listener, false);
}
function off(elem, eventName, selector, listener, scope) {
    if (typeof selector !== "string") {
        scope = listener;
        listener = selector;
        selector = "";
    }
    scope = scope || elem;
    var events = elem.__events__;
    var key = selector ? eventName + " " + selector : eventName;
    var listeners = events && events[key];
    if (listeners) {
        if (listener) {
            var index_1 = indexOfListener(listeners, listener, scope);
            if (~index_1) {
                if (Array.isArray(listeners)) {
                    listener = listeners[index_1];
                    listeners.splice(index_1, 1);
                    if (!listeners.length) {
                        delete events[key];
                    }
                }
                else {
                    listener = listeners;
                    delete events[key];
                }
            }
            var bindFix = eventFix && eventFix[eventName];
            bindFix && bindFix.remove ? bindFix.remove(elem, listener) : elem.removeEventListener((selector ? bindFix && bindFix.delegate : bindFix && bindFix.bind) || eventName, listener, false);
        }
        else if (Array.isArray(listeners)) {
            for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
                listener = listeners_1[_i];
                off(elem, eventName, selector, listener, scope);
            }
        }
        else {
            off(elem, eventName, selector, listeners, scope);
        }
    }
}
/**
 * 绑定元素只执行一次的事件
 * @param elem 要解绑的元素或文档
 * @param eventName 要解绑的事件名
 * @param listener 要解绑的事件监听器,如果未提供则解绑所有监听器
 * @param scope 设置 listener 中的this值
 */
function once(elem, eventName, listener, scope) {
    var fn = function () {
        if (listener) {
            listener.apply(scope || this, arguments);
        }
        off(elem, eventName, fn, scope);
    };
    on(elem, eventName, fn, scope);
}
function indexOfListener(listeners, listener, scope) {
    if (Array.isArray(listeners)) {
        for (var i = 0; i < listeners.length; i++) {
            //先 && 后 ||
            if (listeners[i] === listener || listeners[i].__original__ === listener && listeners[i].__scope__ == scope) {
                return i;
            }
        }
        return -1;
    }
    return listeners === listener || listeners.__original__ === listener && listeners.__scope__ === scope ? 0 : -1;
}
/**
 * 获取指定元素的定位父元素
 * @param elem 要获取的元素
 * @returns 要返回定位父元素
 */
function offsetParent(elem) {
    var result = elem;
    //一致向上寻找, position属性非 static 的,定位元素
    while ((result = result.offsetParent) && result.nodeName !== "HTML" && getStyle(result, "position") === "static")
        ;
    return result || elem.ownerDocument.documentElement;
}
/**
 * 获取指定元素和其定位父元素的偏移距离
 * @param elem 要获取的元素
 * @returns 返回坐标
 */
function getOffset(elem) {
    var left = getStyle(elem, "left");
    var top = getStyle(elem, "top");
    if ((left && top && left !== 'auto' && top !== 'auto') || getStyle(elem, "position") !== "absolute") {
        return new _Rect__WEBPACK_IMPORTED_MODULE_0__.Point(parseFloat(left) || 0, parseFloat(top) || 0);
    }
    //当 position 属性是 absolute 时,需要寻找定位父元素,并且根据定位父元素获取偏移距离
    var parent = offsetParent(elem);
    var rect = getRect(elem);
    if (parent.nodeName !== "HTML") {
        var rootRect = getRect(parent);
        rect.x -= rootRect.x;
        rect.y -= rootRect.y;
    }
    //位置减去当前 border 和 margin 宽度
    rect.x -= computeStyle(elem, "marginLeft") + computeStyle(parent, "borderLeftWidth");
    rect.y -= computeStyle(elem, "marginTop") + computeStyle(parent, "borderTopWidth");
    return rect;
}
/**
 * 设置元素和其定位父元素的便宜距离
 * @param elem 要处理的元素
 * @param value 要设置的坐标
 */
function setOffset(elem, value) {
    if (value.x >= 0) {
        elem.style.left = value.x + "px";
    }
    if (value.y >= 0) {
        elem.style.top = value.y + "px";
    }
}
/**
 * 获取指定元素的滚动距离
 * @param elem 要获取的元素或文档
 * @returns 返回作表, 如果元素不可滚动则返回原点s
 */
function getScroll(elem) {
    if (elem.nodeType === 9) {
        var win = elem.defaultView;
        if ("scrollX" in win) {
            return {
                x: win.scrollX,
                y: win.scrollY
            };
        }
        elem = elem.documentElement;
    }
    return {
        x: elem.scrollLeft,
        y: elem.scrollTop
    };
}
/**
 * 设置指定元素的滚动距离
 * @param elem 要设置的元素或文档
 * @param value 要设置的坐标
 */
function setScroll(elem, value) {
    if (elem.nodeType === 9) {
        elem.defaultView.scrollTo((value.x == null ? getScroll(elem) : value).x, (value.y == null ? getScroll(elem) : value).y);
    }
    else {
        if (value.x !== null)
            elem.scrollLeft = value.x;
        if (value.y !== null)
            elem.scrollTop = value.y;
    }
}
/**
 * 获取指定元素的区域
 * @param elem 要获取的元素或文档
 * @returns 返回元素实际占用区域(含内边距和边框,不含外边距), 如果元素不可见则返回空区域
 */
function getRect(elem) {
    var doc = elem.nodeType === 9 ? elem : elem.ownerDocument;
    var html = doc.documentElement;
    var result = getScroll(doc);
    if (elem.nodeType === 9) {
        result.width = html.clientWidth;
        result.height = html.clientHeight;
    }
    else {
        var rect = elem.getBoundingClientRect();
        result.x = rect.left - html.clientLeft; //到左侧的距离 - 左边框宽度
        result.y = rect.top - html.clientTop;
        result.width = rect.width;
        result.height = rect.height;
    }
    return result;
}
/**
 * 设置指定元素的区域
 * @param elem 要设置的元素
 * @param value 要设置的内容区域(含内边距和边框, 不包含外边距)
 * @example setRect(document.body, {width:200, height:400})
 */
function setRect(elem, value) {
    var style = elem.style;
    if (value.x != null || value.y != null) {
        if (!/^(?:abs|fix)/.test(getStyle(elem, "position"))) {
            style.position = "relative";
        }
        var currentPosition = getRect(elem);
        var offset = getOffset(elem);
        if (value.x !== null) {
            style.left = offset.x + value.x - currentPosition.x + "px";
        }
        if (value.y !== null) {
            style.top = offset.y + value.y - currentPosition.y + "px";
        }
    }
    if (value.width != null || value.height != null) {
        var boxSizing = getStyle(elem, "boxSizing") === "border-box";
        if (value.width != null) {
            style.width = value.width - (boxSizing ? 0 : computeStyle(elem, "borderLeftWidth", "paddingLeft", "paddingRight", "borderRightWidth")) + "px";
        }
        if (value.height != null) {
            style.height = value.height - (boxSizing ? 0 : computeStyle(elem, "borderTopWidth", "paddingTop", "paddingBottom", "borderBottomWidth")) + "px";
        }
    }
}
function trigger(elem, eventName, selector, event) {
    if (typeof selector !== "string") {
        event = selector;
        selector = "";
    }
    var listeners = elem.__events__[selector ? eventName + " " + selector : eventName];
    if (listeners) {
        event = event || {};
        if (!event.type)
            event.type = eventName;
        if (!event.target)
            event.target = selector ? find(elem, selector) : elem;
        if (Array.isArray(listeners)) {
            for (var _i = 0, listeners_2 = listeners; _i < listeners_2.length; _i++) {
                var listener = listeners_2[_i];
                listener.call(elem, event);
            }
        }
        else {
            listeners.call(elem, event);
        }
    }
}
/**
 * 页面可以访问到dom元素后执行指定函数
 * @param callback 要执行后的回调函数
 * @param context 要等待的文档对象
 */
function ready(callback, context) {
    if (context === void 0) { context = document; }
    if (/^(?:complete|interactive)$/.test(context.readyState) && context.body) {
        callback.call(context);
    }
    else {
        context.addEventListener("DOMContentLoaded", callback, false);
    }
}


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point": () => (/* binding */ Point),
/* harmony export */   "Rect": () => (/* binding */ Rect)
/* harmony export */ });
/**
 * 表示一个坐标
 */
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.isIPoint = function (obj) {
        return !!obj && ('x' in obj) && ('y' in obj);
    };
    Point.copy = function (p) {
        return new Point(0, 0).set(p);
    };
    /**
     * 获取指定元素的滚动距离
     * @param elem 要获取的元素或文档
     * @returns 返回作表, 如果元素不可滚动则返回原点s
     */
    Point.getScroll = function (elem) {
        if (elem.nodeType === 9) {
            var win = elem.defaultView;
            if ("scrollX" in win) {
                return {
                    x: win.scrollX,
                    y: win.scrollY
                };
            }
            elem = elem.documentElement;
        }
        return {
            x: elem.scrollLeft,
            y: elem.scrollTop
        };
    };
    /**
     * 设置指定元素的滚动距离
     * @param elem 要设置的元素或文档
     * @param value 要设置的坐标
     */
    Point.setScroll = function (elem, value) {
        if (elem.nodeType === 9) {
            var scrollToPoint = void 0;
            if (value.x !== null)
                scrollToPoint.left = value.x;
            if (value.y !== null)
                scrollToPoint.top = value.y;
            elem.defaultView.scrollTo(scrollToPoint);
        }
        else {
            if (value.x !== null)
                elem.scrollLeft = value.x;
            if (value.y !== null)
                elem.scrollTop = value.y;
        }
    };
    Point.prototype.add = function (p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    };
    Point.prototype.subtract = function (p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    };
    Point.prototype.reset = function () {
        this.x = 0;
        this.y = 0;
        return this;
    };
    Point.prototype.set = function (p) {
        this.x = p.x;
        this.y = p.y;
        return this;
    };
    return Point;
}());

var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rect.getCurrent = function (elem) {
        var doc = elem.nodeType === 9 ? elem : elem.ownerDocument;
        var html = doc.documentElement;
    };
    return Rect;
}());



/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "directives": () => (/* binding */ directives),
/* harmony export */   "userDirectives": () => (/* binding */ userDirectives)
/* harmony export */ });
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _directives_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _directives_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/* harmony import */ var _directives_ref__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);




/**
 * 系统内置指令
 */
var directives = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.create)({
    html: _directives_html__WEBPACK_IMPORTED_MODULE_2__["default"],
    model: _directives_model__WEBPACK_IMPORTED_MODULE_1__["default"],
    ref: _directives_ref__WEBPACK_IMPORTED_MODULE_3__["default"]
});
/**
 * 用户定义指令
 */
var userDirectives = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.create)({});


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _core_prototype_$watch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _core_prototype_util_parseExpOrFn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _dom_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _core_observable_Observe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _core_VNode_Control__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var _directiveBase_attribute__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);








var ModelDirective = /** @class */ (function () {
    function ModelDirective(element, value, control) {
        this.element = element;
        this.value = value;
        this.control = control;
        /**（DOM节点）当前节点绑定的监听事件 */
        this.events = [];
        this.attributes = new Map();
        if (element instanceof _core_VNode_Control__WEBPACK_IMPORTED_MODULE_5__["default"]) {
            this.handler = handleControl;
        }
        else {
            var tag = element.nodeName.toLowerCase();
            var type = element.type;
            if (tag === "select") {
            }
            else if (tag === "input" && type === "radio") {
                this.handler = handlerRadio;
            }
            else if (tag === "input" && type === "checkbox") {
                this.handler = handlerCheckBox;
            }
            else if (tag === "input" || tag === "textarea") {
                this.handler = handleDefault;
            }
        }
        //初始化
        this.commit(value);
    }
    ModelDirective.prototype.commit = function (value) {
        if (this.element instanceof _core_VNode_Control__WEBPACK_IMPORTED_MODULE_5__["default"]) {
            this.handler(this, this.element);
        }
        else {
            if (this.init && (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isEqual)(this.value, value)) {
                ;
            }
            else {
                this.value = value;
                if (this.handler) {
                    if (!this.init) {
                        this.handler(this, this.element);
                    }
                }
            }
        }
        this.init = true;
    };
    ModelDirective.prototype.destory = function () {
        if (this.init) {
            this.unWatch();
            if (this.element instanceof _core_VNode_Control__WEBPACK_IMPORTED_MODULE_5__["default"]) {
            }
            else {
                this.events.forEach(function (args) {
                    (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.apply)(_dom_index__WEBPACK_IMPORTED_MODULE_3__.off, null, args);
                });
            }
        }
    };
    return ModelDirective;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModelDirective);
function watch(model, element, prop) {
    /**监听到绑定的值被更改后,给绑定的对象赋值方法 */
    var set = model.set = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isFunction)(prop) ? prop : (0,_core_prototype_util_parseExpOrFn__WEBPACK_IMPORTED_MODULE_2__.parseSetExp)(prop, element);
    var watchThis = element instanceof _core_VNode_Control__WEBPACK_IMPORTED_MODULE_5__["default"] ? element : model.control;
    model.unWatch = _core_prototype_$watch__WEBPACK_IMPORTED_MODULE_1__["default"].call(watchThis, 
    // 监听绑定的值
    (0,_core_prototype_util_parseExpOrFn__WEBPACK_IMPORTED_MODULE_2__["default"])(model.value, _core_observable_Observe__WEBPACK_IMPORTED_MODULE_4__["default"].observeMap.get(model.control).proxy), 
    // 响应绑定值更改
    function (value) { return set(value); }, { isCalledSelf: true });
}
/**
 * 添加监听事件
 * @param model
 * @param args
 */
function addEvent(model) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    model.events.push(args);
    (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.apply)(_dom_index__WEBPACK_IMPORTED_MODULE_3__.on, null, args);
}
/**
 * 对 input, texterea 元value素进行双向绑定
 * @param element
 * @param options
 */
function handleDefault(model, element) {
    watch(model, element, "value");
    var input;
    addEvent(model, element, "compositionstart", function () {
        element.composing = true;
    });
    addEvent(model, element, "compositionend", function () {
        if (!element.composing)
            return;
        element.composing = false;
        input();
    });
    addEvent(model, element, "input", input = function () {
        if (element.composing)
            return;
        //输入框中数据发生变化, 同步更新变量
        _core_observable_Observe__WEBPACK_IMPORTED_MODULE_4__["default"].observeMap.get(model.control).proxy[model.value] = element.value;
    });
}
/**
 * 对 input[type="radio"]元素进行双向绑定
 * @param model
 * @param element
 */
function handlerRadio(model, element) {
    //值变化 radio状态变化
    watch(model, element, function (value) {
        element.checked = value === (element.getAttribute('value') || null);
    }),
        //radio状态变化 带动值变化
        addEvent(model, element, "change", function () {
            _core_observable_Observe__WEBPACK_IMPORTED_MODULE_4__["default"].observeMap.get(model.control).proxy[model.value] = element.value;
        });
}
/**
 * 对 input[type="checkbox"]元素进行双向绑定
 * @param model
 * @param element
 */
function handlerCheckBox(model, element) {
    watch(model, element, "checked");
    addEvent(model, element, "change", function (e) {
        (0,_core_prototype_util_parseExpOrFn__WEBPACK_IMPORTED_MODULE_2__.parseSetExp)(model.value, _core_observable_Observe__WEBPACK_IMPORTED_MODULE_4__["default"].observeMap.get(model.control).proxy)(element.checked);
    });
}
function handleControl(model, element) {
    var _this = this;
    /**创建当前model的属性对象 */
    //TODO 可以不使用父到子的watch只使用AttributeCommitter即可
    var controlProxy = _core_observable_Observe__WEBPACK_IMPORTED_MODULE_4__["default"].observeMap.get(model.control).proxy;
    if (model.attributes.has("value")) {
        model.attributes.get("value").commit(controlProxy[model.value]);
    }
    else {
        model.attributes.set("value", new _directiveBase_attribute__WEBPACK_IMPORTED_MODULE_6__["default"]("value", controlProxy[model.value], element));
    }
    /**外部变量变化后,自动传入内部更新子组件   父 -> 子 */
    // watch(model, element, "props.value")
    /**内部变量发生变化时,自动更新外部父组件  子 -> 父*/
    if (!model.init) {
        model.attributes.set("model", new _directiveBase_attribute__WEBPACK_IMPORTED_MODULE_6__["default"]("model", model.value, element));
        element.$watch("props.value", function (value) { return controlProxy[_this.value] = value; });
    }
}


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ $watch),
/* harmony export */   "watchMap": () => (/* binding */ watchMap)
/* harmony export */ });
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _observable_Computed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _observable_Observe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _util_parseExpOrFn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var _util_traverse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);





/**存放每个实例的 watch 数据 */
var watchMap = new WeakMap();
function $watch(expOrFn, callback, options) {
    if ((0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(callback)) {
        return $watch.call(this, expOrFn, callback.handler, callback);
    }
    //获取当前调用的对象
    var self = this || _shared_util_index__WEBPACK_IMPORTED_MODULE_0__.emptyObject;
    var watchFu = (0,_util_parseExpOrFn__WEBPACK_IMPORTED_MODULE_3__["default"])(expOrFn, self);
    var computedInstance;
    if (!watchFu) {
        return;
    }
    //当前实例到的 watch 相关数据
    if (watchMap.has(self)) {
        computedInstance = watchMap.get(self);
    }
    else {
        watchMap.set(self, computedInstance = new _observable_Computed__WEBPACK_IMPORTED_MODULE_1__["default"](self, true));
    }
    options = options || {};
    /** 当前 watch 的计算属性容器对象 */
    var computedInstanceTarget = computedInstance.target;
    /**当前 watch 的计算属性容器的获取与修改拦截器 */
    var computedInstanceTargetProxyInterceptor = computedInstance.targetProxyInterceptor;
    /**当前 watch 的存储名称 */
    var name = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.uid)();
    var deep = options.deep || false;
    /**暂时无法判断是否是赋初值是否立即执行回调 */
    // let immediate = options.immediate;
    /** 值改变是否执行回调 */
    var runCallback = options.isCalledSelf;
    computedInstance.add(name, {
        get: function () {
            var oldValue = computedInstanceTarget[name];
            var value = watchFu();
            // 收集深度监听依赖
            if (deep) {
                (0,_util_traverse__WEBPACK_IMPORTED_MODULE_4__["default"])(value, deep);
            }
            //转换为原始数据,防止内部修改触发刷新
            value = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.shallowCopy)(_observable_Observe__WEBPACK_IMPORTED_MODULE_2__["default"].getOriginTarget(value));
            if (runCallback) {
                if (!(0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isEqual)(value, oldValue) || deep) { //immediate
                    _observable_Observe__WEBPACK_IMPORTED_MODULE_2__.ToggleCollection.safety(function () {
                        return callback.call(self, value, oldValue);
                    });
                }
            }
            return value;
        }
    });
    //首次运行, 收集依赖
    computedInstanceTargetProxyInterceptor[name];
    runCallback = true;
    // immediate = false;
    //返回取消监听的方法
    return function () {
        computedInstance.delete(name);
    };
}


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _Scheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _Watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);




/**
 * 计算属性
 * 一个对象实例一个Computed对象
 */
var Computed = /** @class */ (function () {
    function Computed(self, isWatch) {
        this.optionsMap = new Map();
        this.target = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_1__.create)(null);
        //渲染watcher收集依赖的对象
        this.targetProxy = _Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observe(this.target);
        /** 当前计算属性容器的获取与修改拦截器 */
        this.targetProxyInterceptor = new Proxy(this.targetProxy, {
            get: computedTargetProxyInterceptorGet(this.optionsMap),
            set: computedTargetProxyInterceptorSet(this.optionsMap),
            deleteProperty: function () { return true; }
        });
        this.self = self;
        this.isWatch = isWatch;
        this.observeOptions = !isWatch && _Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observeMap.get(this.target);
    }
    /**
     * 添加计算属性
     * @param name 计算属性名称
     * @param computed 计算属性 getter/setter 对象
     */
    Computed.prototype.add = function (name, computed) {
        var _a = this, self = _a.self, isWatch = _a.isWatch, optionsMap = _a.optionsMap, target = _a.target, targetProxy = _a.targetProxy, observeOptions = _a.observeOptions;
        /** 计算属性的 setter */
        var set = (computed.set || _shared_util_index__WEBPACK_IMPORTED_MODULE_1__.noop).bind(self);
        /** 计算属性的 getter */
        var get = computed.get.bind(self);
        /** 计算属性的 watcher */
        var watcher = new _Watcher__WEBPACK_IMPORTED_MODULE_3__["default"](self, function () {
            if (isWatch)
                return (target[name] = get());
            //如果是计算属性 需要触发更新
            return (targetProxy[name] = get(self));
        }, true);
        // 存储计算属性参数
        optionsMap.set(name, {
            watcher: watcher,
            set: set
        });
    };
    Computed.prototype.delete = function (name) {
        var options = this.optionsMap.get(name);
        if (options) {
            var watch = options.watcher;
            watch.clean();
            this.optionsMap.delete(name);
            //如果当前 计算属性 在异步更新队列中,则进行删除
            if (_Scheduler__WEBPACK_IMPORTED_MODULE_2__.queueMap.has(watch)) {
                _Scheduler__WEBPACK_IMPORTED_MODULE_2__.queueMap["delete"](watch);
                for (var i = _Scheduler__WEBPACK_IMPORTED_MODULE_2__.index, len = _Scheduler__WEBPACK_IMPORTED_MODULE_2__.queue.length; i < len; i++) {
                    if (_Scheduler__WEBPACK_IMPORTED_MODULE_2__.queue[i] === watch) {
                        _Scheduler__WEBPACK_IMPORTED_MODULE_2__.queue.splice(i, 1);
                        break;
                    }
                }
            }
        }
    };
    /**
     * 清空计算属性
     */
    Computed.prototype.clean = function () {
        for (var _i = 0, _a = this.optionsMap; _i < _a.length; _i++) {
            var name_1 = _a[_i][0];
            this.delete(name_1);
        }
    };
    return Computed;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Computed);
/**
 * 计算属性容器get拦截器
 * @param optionsMap
 * @returns
 */
function computedTargetProxyInterceptorGet(optionsMap) {
    return function (target, name) {
        // 获取计算属性的参数
        var options = optionsMap.get(name);
        if (options) {
            var watcher = options.watcher;
            if (!watcher.isInit || watcher.shouldUpdate) {
                watcher.getValue();
            }
        }
        return target[name];
    };
}
/**
 * 计算属性容器set拦截器
 * @param optionsMap
 * @returns
 */
function computedTargetProxyInterceptorSet(optionsMap) {
    return function (target, name, value) {
        // 获取计算属性的参数
        var options = optionsMap.get(name);
        if (options) {
            options.set(value);
            return true;
        }
        return true;
    };
}


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parseExpOrFn),
/* harmony export */   "parseSetExp": () => (/* binding */ parseSetExp)
/* harmony export */ });
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

/**
 * 解析 watch 中的值 字符串则定位到当前对象内的数据,方法则直接使用方法
 * @param expOrFn
 * @param self
 * @returns
 */
function parseExpOrFn(expOrFn, self) {
    if ((0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isString)(expOrFn)) {
        var segments_1 = expOrFn.split('.');
        return function () {
            var obj = this;
            for (var _i = 0, segments_2 = segments_1; _i < segments_2.length; _i++) {
                var segment = segments_2[_i];
                if (!obj)
                    return;
                obj = obj[segment];
            }
            return obj;
        }.bind(self);
    }
    else {
        return expOrFn.bind(self);
    }
}
function parseSetExp(exp, self) {
    var segments = exp.split('.');
    if (segments.length === 1)
        return function (value) { self[exp] = value; };
    if (segments.length === 2)
        return function (value) { self[segments[0]][segments[1]] = value; };
}


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

var hasTraverse = new Set();
function traverse(value, deep) {
    var options = _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observeProxyMap.get(value);
    if (options) {
        if (hasTraverse.has(value))
            return;
        hasTraverse.add(value);
        if (deep) {
            //进行遍历 对象添加监听
            if (options.isArray) {
                value.forEach(function (_value) { return traverse(_value, deep); });
            }
            else {
                Object.keys(value).forEach(function (key) {
                    traverse(value[key], deep);
                });
            }
        }
        else {
            options.deepSubs.add(_core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__.ToggleCollection.target);
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (value, deep) {
    traverse(value, deep);
    hasTraverse.clear();
});


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point": () => (/* reexport safe */ _Rect__WEBPACK_IMPORTED_MODULE_0__.Point),
/* harmony export */   "Rect": () => (/* reexport safe */ _Rect__WEBPACK_IMPORTED_MODULE_0__.Rect),
/* harmony export */   "addClass": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.addClass),
/* harmony export */   "after": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.after),
/* harmony export */   "animate": () => (/* reexport safe */ _animation__WEBPACK_IMPORTED_MODULE_1__.animate),
/* harmony export */   "animateFix": () => (/* reexport safe */ _animation__WEBPACK_IMPORTED_MODULE_1__.animateFix),
/* harmony export */   "append": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.append),
/* harmony export */   "before": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.before),
/* harmony export */   "children": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.children),
/* harmony export */   "colsest": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.colsest),
/* harmony export */   "computeStyle": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.computeStyle),
/* harmony export */   "contains": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.contains),
/* harmony export */   "find": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.find),
/* harmony export */   "first": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.first),
/* harmony export */   "getAttr": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.getAttr),
/* harmony export */   "getHtml": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.getHtml),
/* harmony export */   "getOffset": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.getOffset),
/* harmony export */   "getRect": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.getRect),
/* harmony export */   "getScroll": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.getScroll),
/* harmony export */   "getStyle": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.getStyle),
/* harmony export */   "hasClass": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.hasClass),
/* harmony export */   "hide": () => (/* reexport safe */ _animation__WEBPACK_IMPORTED_MODULE_1__.hide),
/* harmony export */   "index": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.index),
/* harmony export */   "isHidden": () => (/* reexport safe */ _animation__WEBPACK_IMPORTED_MODULE_1__.isHidden),
/* harmony export */   "last": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.last),
/* harmony export */   "match": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.match),
/* harmony export */   "next": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.next),
/* harmony export */   "off": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.off),
/* harmony export */   "offsetParent": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.offsetParent),
/* harmony export */   "on": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.on),
/* harmony export */   "once": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.once),
/* harmony export */   "parent": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.parent),
/* harmony export */   "parse": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.parse),
/* harmony export */   "prepend": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.prepend),
/* harmony export */   "prev": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.prev),
/* harmony export */   "query": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.query),
/* harmony export */   "ready": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.ready),
/* harmony export */   "removeClass": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.removeClass),
/* harmony export */   "setAttr": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.setAttr),
/* harmony export */   "setHtml": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.setHtml),
/* harmony export */   "setOffset": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.setOffset),
/* harmony export */   "setRect": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.setRect),
/* harmony export */   "setScroll": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.setScroll),
/* harmony export */   "setStyle": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.setStyle),
/* harmony export */   "show": () => (/* reexport safe */ _animation__WEBPACK_IMPORTED_MODULE_1__.show),
/* harmony export */   "toggle": () => (/* reexport safe */ _animation__WEBPACK_IMPORTED_MODULE_1__.toggle),
/* harmony export */   "toggleClass": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.toggleClass),
/* harmony export */   "trigger": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.trigger),
/* harmony export */   "vendor": () => (/* reexport safe */ _dom__WEBPACK_IMPORTED_MODULE_2__.vendor)
/* harmony export */ });
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _DisableScroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(22);






/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animate": () => (/* binding */ animate),
/* harmony export */   "animateFix": () => (/* binding */ animateFix),
/* harmony export */   "hide": () => (/* binding */ hide),
/* harmony export */   "isHidden": () => (/* binding */ isHidden),
/* harmony export */   "show": () => (/* binding */ show),
/* harmony export */   "toggle": () => (/* binding */ toggle)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _DisableScroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);


/**
 * 动画相关的 DOM 操作
 */
var animateFix;
/**
 * 执行一个自定义动画渐变
 * @param elem 要渐变的元素
 * @param propNames 要渐变的 CSS 属性名和最终的属性值组成的键值对
 * @param callback 执行渐变结束的回调函数
 * @param duration 渐变执行的总毫秒数
 * @param timingFunction 渐变函数, 可以可以使用CSS3预设的特效渐变函数
 * @example animate(element.body, { height: 400 })
 */
function animate(elem, propNames, callback, duration, timingFunction) {
    if (duration === void 0) { duration = 200; }
    if (timingFunction === void 0) { timingFunction = "ease"; }
    if (!animateFix) {
        var transition = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.vendor)("transition");
        animateFix = {
            support: transition in document.documentElement.style,
            transition: transition,
            transitionEnd: (transition + "End").replace(transition.length > 10 ? /^[A-Z]/ : /[A-Z]/, function (w) { return w.toLowerCase(); })
        };
    }
    if (animateFix.support && duration !== 0) {
        var context_1 = elem.style.__animate__ || (elem.style.__animate__ = {});
        //设置style属性中的 transition 属性 不添加delay属性
        var setTransition_1 = function () {
            var transition = "";
            // 重组 transition 属性
            for (var key in context_1) {
                if (transition)
                    transition += ",";
                //将驼峰样式
                transition += "".concat(key.replace(/[A-Z]|^ms|^webkit/g, function (word) { return "-" + word.toLowerCase(); }), " ").concat(duration, "ms ").concat(timingFunction);
            }
            elem.style[animateFix.transition] = transition;
        };
        //transformend 触发的事件
        var end_1 = function (e) {
            //忽略冒泡导致的调用 e不存在则表示是timeout导致的调用
            if (timer_1 && (!e || e.target === e.currentTarget)) {
                clearTimeout(timer_1);
                timer_1 = 0;
                elem.removeEventListener(animateFix.transitionEnd, end_1, false);
                var contextUpdated = false;
                for (var key in context_1) {
                    //如果当前渐变效果 结束的话, 将其在 context 中移除,并且在下次更新 transition 属性的时候,将其移除
                    if (context_1[key] === end_1) {
                        delete context_1[key];
                        contextUpdated = true;
                    }
                }
                if (contextUpdated) {
                    setTransition_1();
                    callback && callback.call(elem);
                }
            }
        };
        //将所有属性设置为初始值
        //同此添加的 属性,拥有同一个end方法,因为方法传入的执行时间一致
        for (var propName in propNames) {
            propName = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.vendor)(propName);
            context_1[propName] = end_1;
            if (!elem.style[propName]) {
                elem.style[propName] = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getStyle)(elem, propName);
            }
        }
        //设置要渐变的属性
        setTransition_1();
        //绑定事件完成事件
        elem.addEventListener(animateFix.transitionEnd, end_1, false);
        //当对象移除之后即不会触发transitionEnd事件,那么我们这里使用setTimeout保证最后稳定触发一次更新,移除transition属性
        var timer_1 = setTimeout(end_1, duration);
    }
    else {
        // 如果间隔事件是 0 的话,即表示不需要渐变效果,则直接将属性设置为最终值,并且执行回调函数即可
        callback && setTimeout(function () { callback.call(elem); }, duration);
    }
    // 设置属性为最终值, 触发动画
    for (var propName in propNames) {
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(elem, propName, propNames[propName]);
    }
}
/**
 * 存储默认的 dispaly 属性
 */
var defaultDisplays;
/**
 * 存储默认显示动画
 */
var toggleAnimations;
/**
 * 判断指定的元素是否被隐藏
 * @param elem 要判断的元素
 * @returns 如果元素被隐藏则返回 true, 否则返回false
 */
function isHidden(elem) {
    return elem.style.__toggle__ === false || (elem.style.display || (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getStyle)(elem, "display")) === 'none';
}
/**
 * 显示指定元素
 * @param elem 要显示的元素
 * @param animation 显示时使用的动画
 * @param callback 动画执行完的回调函数
 * @param duration 动画执行的总毫秒数
 * @param timingFunction 渐变函数,支持 CSS3 中预设的渐变函数
 * @param target 动画的目标元素
 */
function show(elem, animation, callback, duration, timingFunction) {
    if (animation || callback) {
        toggle(elem, true, animation, callback, duration, timingFunction, elem);
    }
    else {
        elem.style.display = elem.__display__ || "";
        if ((0,_dom__WEBPACK_IMPORTED_MODULE_0__.getStyle)(elem, "display") === "none") {
            var nodeName = elem.nodeName;
            var defaultDisplay = (defaultDisplays || (defaultDisplays = Object.create(null)))[nodeName];
            if (!defaultDisplay) {
                var tmp = document.createElement(nodeName);
                document.body.append(tmp);
                defaultDisplay = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getStyle)(tmp, "display");
                document.removeChild(tmp);
                //如果计算失败,则默认使用block
                if (defaultDisplay === "none") {
                    defaultDisplay = "block";
                }
                defaultDisplays[nodeName] = defaultDisplay;
            }
            elem.style.display = defaultDisplay;
        }
    }
}
/**
 * 隐藏指定元素
 * @param elem 要隐藏的元素
 * @param animation 隐藏时使用的动画
 * @param callback 动画执行完的回调函数
 * @param duration 动画执行的总毫秒数
 * @param timingFunction 渐变函数,支持 CSS3 中预设的渐变函数
 * @param target 动画的目标元素
 */
function hide(elem, animation, callback, duration, timingFunction, target) {
    if (animation || callback) {
        toggle(elem, false, animation, callback, duration, timingFunction, target);
    }
    else {
        var currentDispaly = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getStyle)(elem, "display");
        if (currentDispaly !== "none") {
            elem.style.__display__ = elem.style.display;
            elem.style.display = "none";
        }
    }
}
function toggle(elem, value, animation, callback, duration, timingFunction, target) {
    if (typeof value !== 'boolean') {
        target = timingFunction;
        timingFunction = duration;
        duration = callback;
        callback = animation;
        animation = value;
        value = undefined;
    }
    var hidden = isHidden(elem);
    if (value === undefined) {
        value = hidden;
    }
    if (typeof animation === 'string') {
        if (!toggleAnimations) {
            toggleAnimations = {
                opacity: {
                    opacity: 0
                },
                height: {
                    marginTop: 0,
                    borderTopWidth: 0,
                    paddingTop: 0,
                    height: 0,
                    paddingBottom: 0,
                    borderBottomWidth: 0,
                    marginBottom: 0
                },
                width: {
                    marginLeft: 0,
                    borderLeftWidth: 0,
                    paddingLeft: 0,
                    width: 0,
                    paddingRight: 0,
                    borderReghtWidth: 0,
                    marginRight: 0
                },
                top: { transform: "translateY(-100%)" },
                bottom: { tarnsform: "translateY(100%)" },
                left: { transform: "translateX(-100%)" },
                right: { transform: "translateX(100%)" },
                scale: { transform: "scale(0, 0)" },
                scaleX: { transform: "scaleX(0)" },
                scaleY: { transform: "scaleY(0)" },
                slideDown: { opacity: 0, transform: "translateY(10%)" },
                slideRight: { opacity: 0, transform: "translateX(10%)" },
                slideUp: { opacity: 0, transform: "translateY(-10%)" },
                slideLeft: { opacity: 0, transform: "translateX(-10%)" },
                zoomIn: { opacity: 0, transform: "scale(0, 0)" },
                zoomOut: { opacity: 0, transform: "scale(1.2, 1.2)" },
                rotate: { opacity: 0, transform: "rotate(180deg)" }
            };
        }
        animation = toggleAnimations[animation];
    }
    if (animation && duration !== 0) {
        //优先显示元素,以便后续计算
        if (value && hidden) {
            show(elem);
        }
        //设置渐变目标
        var setTransformOrigin_1 = target && animation.transform && elem.style.__toggle__ == undefined;
        if (setTransformOrigin_1) {
            var targetRect = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getRect)(target);
            var elemRect = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getRect)(elem);
            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(elem, "transformOrigin", "".concat((elemRect.x + elemRect.width <= targetRect.x + targetRect.width / 4 ? targetRect.x : targetRect.x + targetRect.width <= elemRect.x + targetRect.width / 4 ? targetRect.x + targetRect.width : targetRect.x + targetRect.width / 2) - elemRect.x, "px ").concat((elemRect.y + elemRect.height <= targetRect.y + targetRect.height / 4 ? targetRect.y : targetRect.y + targetRect.height <= elemRect.y + targetRect.height / 4 ? targetRect.y + targetRect.height : targetRect.y + targetRect.height / 2) - elemRect.y, "px"));
        }
        //更改 高度/宽度 时隐藏滚动条
        var setOverflowX_1 = animation.width !== undefined;
        var setOverflowY_1 = animation.height !== undefined;
        var scroll_1;
        if (setOverflowX_1 || setOverflowY_1) {
            scroll_1 = new _DisableScroll__WEBPACK_IMPORTED_MODULE_1__["default"](elem);
            scroll_1.disableWindowScroll(setOverflowX_1, setOverflowY_1);
        }
        /**
         * 计算渐变属性的最终属性
         * 如果隐藏元素, 则 animation 表示最终属性
         * 如果显示元素, 则 需要手动计算最终属性
         */
        var to_1 = animation;
        if (value) {
            to_1 = {};
            var from = animation;
            if (elem.style.__toggle__ != undefined) {
                from = {};
                for (var prop in animation) {
                    from[prop] = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getStyle)(elem, prop);
                    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(elem, prop, "");
                }
                elem.style[animateFix.transition] = "";
            }
            for (var prop in animation) {
                to_1[prop] = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getStyle)(elem, prop);
                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(elem, prop, from[prop]);
            }
        }
        //执行渐变
        elem.style.__toggle__ = value;
        animate(elem, to_1, function () {
            delete elem.style.__toggle__;
            if (scroll_1 !== undefined) {
                scroll_1.enableWindowScroll();
                if (setOverflowX_1) {
                    elem.style.minWidth = "";
                }
                if (setOverflowY_1) {
                    elem.style.minHeight = "";
                }
            }
            if (setTransformOrigin_1) {
                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(elem, "transformOrigin", "");
            }
            for (var prop in to_1) {
                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(elem, prop, "");
            }
            if (!value) {
                hide(elem);
            }
            callback && callback.call(elem, value);
        }, duration, timingFunction);
    }
    else {
        value ? show(elem) : hide(elem);
        callback && (callback.call(elem, value));
    }
}


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);

var DisableScroll = /** @class */ (function () {
    function DisableScroll(elem) {
        var _this = this;
        this.elem = elem;
        this.scrollX = null;
        this.scrollY = null;
        this.scrollFun = function () {
            if (_this.scrollX !== null || _this.scrollY !== null) {
                var point = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getScroll)(_this.elem);
                if (elem.nodeType === 9) {
                    var win = elem.defaultView;
                    win.scrollTo(_this.scrollX ? _this.scrollX : point.x, _this.scrollY ? _this.scrollY : point.y);
                }
                else {
                    _this.elem.scrollTo(_this.scrollX === null ? point.x : _this.scrollX, _this.scrollY === null ? point.y : _this.scrollY);
                }
            }
        };
    }
    Object.defineProperty(DisableScroll.prototype, "state", {
        /**
         * 获取当前禁用滚动状态
         * @returns 0 当前滚动可用 1当前滚动不可用
         */
        get: function () {
            if (this.scrollX == null && this.scrollY == null) {
                return 0;
            }
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 禁用屏幕滚动
     * @param disableX  true|undefined 禁止横向滚动, false不禁用横向滚动
     * @param disableY  true|undefined 禁止纵向滚动, false不禁用纵向滚动
     */
    DisableScroll.prototype.disableWindowScroll = function (disableX, disableY) {
        var point = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getScroll)(this.elem);
        if (disableX !== false) {
            this.scrollX = point.x;
        }
        if (disableY !== false) {
            this.scrollY = point.y;
        }
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.on)(this.elem, "scroll", this.scrollFun, this);
    };
    /**
     * 启用屏幕滚动
     */
    DisableScroll.prototype.enableWindowScroll = function () {
        this.scrollX = null;
        this.scrollY = null;
        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.off)(this.elem, "scroll", this.scrollFun, this);
    };
    return DisableScroll;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisableScroll);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _core_observable_Observe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _shared_const_observeReadOnlyOps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);



var AttributeCommitter = /** @class */ (function () {
    function AttributeCommitter(key, value, control) {
        this.key = key;
        this.value = value;
        this.control = control;
        this.init = false;
        this.commit(value);
    }
    AttributeCommitter.prototype.commit = function (value) {
        if (!this.init || !(0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isEqual)(value, this.value)) {
            value = _core_observable_Observe__WEBPACK_IMPORTED_MODULE_1__["default"].observeProxyMap.has(value) ? _core_observable_Observe__WEBPACK_IMPORTED_MODULE_1__["default"].observeProxyMap.get(value).target : value;
            (0,_shared_const_observeReadOnlyOps__WEBPACK_IMPORTED_MODULE_2__.setValueByReadOnly)(this.control.props, this.key, value);
            this.value = value;
            this.init = true;
        }
    };
    //TODO 销毁时删除依赖的收集等信息
    AttributeCommitter.prototype.destory = function () {
    };
    return AttributeCommitter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AttributeCommitter);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getValueByReadOnly": () => (/* binding */ getValueByReadOnly),
/* harmony export */   "setValueByReadOnly": () => (/* binding */ setValueByReadOnly)
/* harmony export */ });
/* harmony import */ var _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



/**
 * 使观察者对象只读 ( 不可删, 不可写(model属性除外) )
 */
var options = function () { return 0; };
var propsSetOptions = function (target, name) {
    if (name === "value" && (0,_util__WEBPACK_IMPORTED_MODULE_1__.has)(target, "model")) {
        return null;
    }
    return 0;
};
var dataReadOnlyOptions = {
    set: {
        before: propsSetOptions
    },
    deleteProperty: {
        before: options
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dataReadOnlyOptions);
/**
 * 内部修改只读对象后触发更新
 * 将 propsState 修改为true
 * @param target
 * @param name
 * @param value
 */
function setValueByReadOnly(targetProxy, name, value) {
    if (_core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observeProxyMap.has(targetProxy)) {
        var _a = _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observeProxyMap.get(targetProxy), subs = _a.subs, deepSubs = _a.deepSubs, lastValue = _a.lastValue, isArray = _a.isArray, target = _a.target;
        //写入值并触发更新
        (0,_core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__.observerProxySetValue)(subs, deepSubs, lastValue, isArray, target, name, value, targetProxy);
    }
}
function getValueByReadOnly(target, name) {
    if (_core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observeProxyMap.has(target)) {
        var _a = _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observeProxyMap.get(target), subs = _a.subs, deepSubs = _a.deepSubs, lastValue = _a.lastValue;
        var value = target[name];
        var watcher = _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__.ToggleCollection.target;
        if (watcher) {
            //添加订阅信息
            deepSubs.has(watcher) || watcher.add(subs, name);
            //存储本次值
            lastValue[name] = value;
        }
    }
}


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);

var HtmlDirective = /** @class */ (function () {
    function HtmlDirective(element, value, control) {
        this.element = element;
        this.value = value;
        this.control = control;
        this.commit(value);
    }
    HtmlDirective.prototype.commit = function (value) {
        (0,_dom_index__WEBPACK_IMPORTED_MODULE_0__.setHtml)(this.element instanceof HTMLElement ? this.element : this.element.elem, value);
    };
    return HtmlDirective;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HtmlDirective);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_VNode_Control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

var RefDirective = /** @class */ (function () {
    function RefDirective(element, value, control) {
        this.element = element;
        this.value = value;
        this.control = control;
        this.commit(value);
    }
    RefDirective.prototype.commit = function (value) {
        if (this.element instanceof _core_VNode_Control__WEBPACK_IMPORTED_MODULE_0__["default"]) {
            var _a = value(this.element), refName = _a.refName, refs = _a.refs;
            this.refs = refs;
            this.refName = refName;
        }
    };
    RefDirective.prototype.destory = function () {
        delete this.refs[this.refName];
    };
    return RefDirective;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RefDirective);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getControlValue": () => (/* binding */ getControlValue),
/* harmony export */   "setControlValue": () => (/* binding */ setControlValue)
/* harmony export */ });
/* harmony import */ var _observable_Observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

function setControlValue(targetProxy, key, value) {
    var observeOptions = _observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observeProxyMap.get(targetProxy);
    if (observeOptions) {
        observeOptions.target[key] = value;
    }
}
function getControlValue(targetProxy, key) {
    var observeOptions = _observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observeProxyMap.get(targetProxy);
    if (observeOptions) {
        return observeOptions.target[key];
    }
    return undefined;
}


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCacheMth": () => (/* binding */ addCacheMth),
/* harmony export */   "execMountedMth": () => (/* binding */ execMountedMth),
/* harmony export */   "execWillMountMth": () => (/* binding */ execWillMountMth)
/* harmony export */ });
/* harmony import */ var _util_modifyControlValue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);

//缓存待执行WillMount 和 Mounted的组件
var componentNeedMountList = [], hasWillMountedList = [];
//添加缓存组件
function addCacheMth(self) {
    componentNeedMountList.push(self);
}
function execMountedMth(self) {
    if (componentNeedMountList.indexOf(self) === -1) {
        hasWillMountedList.indexOf(self) !== -1 && hasWillMountedList.splice(hasWillMountedList.indexOf(self), 1);
        if (!self.$mounted) {
            (0,_util_modifyControlValue__WEBPACK_IMPORTED_MODULE_0__.setControlValue)(self, '$mounted', true);
            self.componentMounted();
        }
    }
    else {
        while (componentNeedMountList.length > 0) {
            var comp = componentNeedMountList.pop();
            hasWillMountedList.indexOf(comp) !== -1 && hasWillMountedList.splice(hasWillMountedList.indexOf(comp), 1);
            if (!comp.$mounted) {
                (0,_util_modifyControlValue__WEBPACK_IMPORTED_MODULE_0__.setControlValue)(comp, '$mounted', true);
                comp.componentMounted();
            }
            if (comp === self)
                break;
        }
    }
}
/**
 * 执行缓存了的 componentWillMount 函数
 * @param self
 */
function execWillMountMth(self) {
    if (self && componentNeedMountList.indexOf(self) === -1 && !self.$mounted) {
        self.componentWillMount();
        hasWillMountedList.push(self);
    }
    var index = 0;
    for (; index < componentNeedMountList.length; index++) {
        var comp = componentNeedMountList[index];
        if (hasWillMountedList.indexOf(comp) === -1 && !comp.$mounted) {
            comp.componentWillMount();
            hasWillMountedList.push(comp);
        }
    }
}


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initOptions)
/* harmony export */ });
/* harmony import */ var _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _shared_const_observeReadOnlyOps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _util_injectionPrivateToInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);




/**
 * 往实例选项中添加 $options(创建的数据) 和 $info 信息
 * @param isCustomElement
 * @param target
 * @param root
 * @param name
 */
function initOptions(target, name) {
    var elementId = "".concat(name, "-").concat((0,_shared_util_index__WEBPACK_IMPORTED_MODULE_1__.uid)());
    /**实例信息 */
    var $info = _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observe({
        /**当前实例的UID */
        uid: elementId,
        /**当前自定义元素的名称 */
        name: name,
        /**存储关联元素 */
        _elem: undefined,
        /**当前组件关联的虚拟节点 */
        vNode: undefined,
        /**当时实例的首次挂载是否已完成 */
        isMounted: false,
        /**当前自定义元素是否在文档流中 */
        isConnected: false
    }, _shared_const_observeReadOnlyOps__WEBPACK_IMPORTED_MODULE_2__["default"]);
    (0,_util_injectionPrivateToInstance__WEBPACK_IMPORTED_MODULE_3__["default"])(target, { $info: $info });
}


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * 在实例和自定义元素上建立内部对象的引用
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (target, data) {
    Object.keys(data).forEach(function (key) {
        //实例上直接写入, 常规操作有观察者对象进行拦截
        target[key] = data[key];
    });
});


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initProps)
/* harmony export */ });
/* harmony import */ var _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _util_injectionToInstance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var _shared_const_observeReadOnlyOps__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);




/**
 * 初始化当前组件 props 属性
 * @param target
 * @param props
 * @param targetProxy
 */
function initProps(target, targetProxy) {
    //存储所有props的值
    var propsTarget = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_1__.create)(null);
    var propStateProxy = _core_observable_Observe__WEBPACK_IMPORTED_MODULE_0__["default"].observe(propsTarget, _shared_const_observeReadOnlyOps__WEBPACK_IMPORTED_MODULE_3__["default"]);
    //获取所有props(只读)
    (0,_util_injectionToInstance__WEBPACK_IMPORTED_MODULE_2__["default"])(target, "props", {
        get: function () {
            return propStateProxy;
        }
    });
}


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

/**
 * 在实例和自定义元素上建立对象的引用
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (target, key, attributes) {
    var keyIsString = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isString)(key);
    if (keyIsString && (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isReserved)(key)) {
        return;
    }
    //实例中存在同名变量,则删除
    (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.has)(target, key) && delete target[key];
    //在实例中添加变量映射
    (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.defineProperty)(target, key, attributes);
});


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initMethods)
/* harmony export */ });
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _util_injectionToInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);


/**
 * 绑定methods内部this指向,并且绑定到target
 * @param isCustomElement
 * @param target
 * @param root
 * @param methods
 * @param targetProxy
 */
function initMethods(target, methods, targetProxy) {
    // $methods 实例属性,非相应式,会在实例上添加方法的副本
    var methodsTarget = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.create)(null);
    if (methods) {
        Object.keys(methods).forEach(function (name) {
            //将 method 方法中this指向当前实例
            var method = methodsTarget[name] = methods[name].bind(targetProxy);
            (0,_util_injectionToInstance__WEBPACK_IMPORTED_MODULE_1__["default"])(target, name, {
                writable: true,
                value: method
            });
        });
    }
}


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computedMap": () => (/* binding */ computedMap),
/* harmony export */   "default": () => (/* binding */ initComputed)
/* harmony export */ });
/* harmony import */ var _core_observable_Computed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _util_injectionToInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/* harmony import */ var _util_injectionPrivateToInstance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _core_observable_Observe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _shared_const_observeReadOnlyOps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24);






/**
 * 存放每个实例的 computed 相关数据
 */
var computedMap = new WeakMap();
/**
 * 空计算属性
 */
var emptyComputed;
function initComputed(target, options, targetProxy) {
    var computeds = options.computed;
    if ((0,_shared_util_index__WEBPACK_IMPORTED_MODULE_3__.isEmptyObject)(computeds)) {
        return (0,_util_injectionPrivateToInstance__WEBPACK_IMPORTED_MODULE_2__["default"])(target, {
            $computed: emptyComputed || (emptyComputed = _core_observable_Observe__WEBPACK_IMPORTED_MODULE_4__["default"].observe({}, _shared_const_observeReadOnlyOps__WEBPACK_IMPORTED_MODULE_5__["default"]))
        });
    }
    var computedInstance = new _core_observable_Computed__WEBPACK_IMPORTED_MODULE_0__["default"](targetProxy, false);
    var computedInstanceTargetProxyInterceptor = computedInstance.targetProxyInterceptor;
    // 存储当前实例 computed 相关数据
    computedMap.set(targetProxy, computedInstance);
    Object.keys(computeds).forEach(function (name) {
        computedInstance.add(name, computeds[name]);
        //将计算属性挂载到target, 通过Observe访问时因存在set,所以
        (0,_util_injectionToInstance__WEBPACK_IMPORTED_MODULE_1__["default"])(target, name, {
            get: function () { return computedInstanceTargetProxyInterceptor[name]; },
            set: function (value) { return (computedInstanceTargetProxyInterceptor[name] = value); }
        });
    });
    //将$computed注入到target中
    (0,_util_injectionPrivateToInstance__WEBPACK_IMPORTED_MODULE_2__["default"])(target, {
        $computed: computedInstanceTargetProxyInterceptor
    });
}


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initWatch)
/* harmony export */ });
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

function createWatch(expOrFn, watchOptions, targetProxy) {
    if ((0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isArray)(watchOptions)) {
        for (var _i = 0, watchOptions_1 = watchOptions; _i < watchOptions_1.length; _i++) {
            var handle = watchOptions_1[_i];
            createWatch(expOrFn, handle, targetProxy);
        }
    }
    else if ((0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(watchOptions) || (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isFunction)(watchOptions)) {
        targetProxy.$watch(expOrFn, watchOptions);
    }
}
//watch 初始化
function initWatch(target, options, targetProxy) {
    if (!options.watch) {
        return;
    }
    Object.keys(options.watch).forEach(function (expOrFn) {
        createWatch(expOrFn, options.watch[expOrFn], targetProxy);
    });
}


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ $destory)
/* harmony export */ });
/* harmony import */ var _$watch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _static_define_init_initComputed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _init_initForceUpdate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);



function $destory() {
    this.componentWillDestory();
    //注销实例所有计算属性和watch数据
    removeComputed(_$watch__WEBPACK_IMPORTED_MODULE_0__.watchMap, this);
    removeComputed(_static_define_init_initComputed__WEBPACK_IMPORTED_MODULE_1__.computedMap, this);
    //移除 render 方法收集到的依赖
    removeRenderDeps(this);
    this.componentDestoryed();
}
function removeComputed(optionsMap, self) {
    optionsMap.has(self) && optionsMap.get(self).clean();
}
/**
 * 移除 render 方法收集到的依赖
 * @param targetProxy
 */
function removeRenderDeps(targetProxy) {
    var watch = _init_initForceUpdate__WEBPACK_IMPORTED_MODULE_2__.renderWatcherCache.get(targetProxy);
    if (watch) {
        watch.clean();
    }
}


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ $cloneNode)
/* harmony export */ });
/* harmony import */ var _shared_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

function $cloneNode(element, props) {
    var _a;
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    if (props) {
        if (!element.props)
            element.props = {};
        Object.keys(props).forEach(function (prop) {
            if (element.props[prop] && (0,_shared_util__WEBPACK_IMPORTED_MODULE_0__.isFunction)(props[prop])) {
                element.props[prop] = [element.props[prop], props[prop]];
            }
            else {
                element.props[prop] = props[prop];
            }
        });
    }
    if (children.length) {
        children = children.filter(function (child) { return !!child; });
        (_a = element.children).push.apply(_a, children);
    }
    return element;
}


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ componentFactory)
/* harmony export */ });
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component.name;
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor.value) {
            if (typeof descriptor.value === 'function') {
                (options.methods || (options.methods = {}))[key] = descriptor.value;
            }
            else {
                (options.dataList || (options.dataList = [])).push(function () {
                    var _a;
                    return _a = {}, _a[key] = descriptor.value, _a;
                });
            }
        }
        else if (descriptor.get || descriptor.set) {
            //计算属性
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    //props
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
        delete Component.__decorators__;
    }
    // const superProto = Object.getPrototypeOf(proto);
    Component.prototype.$options = options;
}


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ bind)
/* harmony export */ });
function bind(selector) {
    return function (target, propertyName) {
        Object.defineProperty(target, propertyName, {
            //根据css选择器获取组件中的控件节点  
            get: function () {
                return this.find(selector);
            }
        });
    };
}


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Watch)
/* harmony export */ });
/* harmony import */ var _shared_util_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);


function Watch(path, options) {
    if (options === void 0) { options = {}; }
    return (0,_util__WEBPACK_IMPORTED_MODULE_1__.createDecorator)(function (componentOptions, handler) {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.create)(null);
        }
        var watch = componentOptions.watch;
        if (typeof watch[path] === 'object' && !(0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.isArray)(watch[path])) {
            watch[path] = [watch[path]];
        }
        else if (typeof watch[path] === 'undefined') {
            watch[path] = [];
        }
        watch[path].push({
            //这里的 this 在哪里调用的this就是谁
            handler: function () { return (0,_shared_util_index__WEBPACK_IMPORTED_MODULE_0__.apply)(this[handler], this, arguments); },
            deep: options.deep || false,
            // immediate: options.immediate || false,
            isCalledSelf: false
        });
    });
}


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDecorator": () => (/* binding */ createDecorator)
/* harmony export */ });
function createDecorator(factory) {
    return function (target, key) {
        var Ctor = typeof target === 'function' ? target : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        Ctor.__decorators__.push(function (options) { return factory(options, key); });
    };
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bind": () => (/* reexport safe */ _core_VNode_decorators_Bind__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "Component": () => (/* reexport safe */ _core_VNode_decorators_Component__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Control": () => (/* reexport safe */ _core_VNode_Control__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "Observe": () => (/* reexport safe */ _core_observable_Observe__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "VNode": () => (/* reexport safe */ _core_VNode_VNode__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "Watch": () => (/* reexport safe */ _core_VNode_decorators_Watch__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "nextTick": () => (/* reexport safe */ _core_observable_util_nextTick__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "userDirectives": () => (/* reexport safe */ _html_const__WEBPACK_IMPORTED_MODULE_6__.userDirectives)
/* harmony export */ });
/* harmony import */ var _core_VNode_Control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _core_VNode_decorators_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
/* harmony import */ var _core_VNode_decorators_Bind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var _core_VNode_decorators_Watch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _core_observable_Observe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _core_VNode_VNode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _html_const__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _core_observable_util_nextTick__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
//控件基础类

//类/属性 装饰器



//Observe

//VNode

//Directives

//nextTick


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ Control: _core_VNode_Control__WEBPACK_IMPORTED_MODULE_0__["default"], Component: _core_VNode_decorators_Component__WEBPACK_IMPORTED_MODULE_1__["default"], Bind: _core_VNode_decorators_Bind__WEBPACK_IMPORTED_MODULE_2__["default"], Watch: _core_VNode_decorators_Watch__WEBPACK_IMPORTED_MODULE_3__["default"], VNode: _core_VNode_VNode__WEBPACK_IMPORTED_MODULE_5__["default"], userDirectives: _html_const__WEBPACK_IMPORTED_MODULE_6__.userDirectives, nextTick: _core_observable_util_nextTick__WEBPACK_IMPORTED_MODULE_7__["default"], Observe: _core_observable_Observe__WEBPACK_IMPORTED_MODULE_4__["default"] });

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});