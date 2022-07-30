import Watcher from "./Watcher";
import { isFunction, emptyObject, hasOwnProperty, has, set, ownKeys, deleteProperty, isPlainObject, isArray, isEqual, keys } from "../../shared/util/index";
import { dataOptions, dataPorxyBeforOptions } from "../../types/index";

const emptyBeforOptions = { before: undefined };

interface observeOptions {
  /**原始对象 */
  target: any,
  /**订阅了当前观察者子集对象的 watcher 集合*/
  subs: {string: Set<Watcher>},
  /**订阅了当前观察者对象深度监听的 watcher 集合 */
  deepSubs: Set<Watcher>,
  /**上次访问值缓存 */
  lastValue: any,
  //是否是数组
  isArray: boolean,
  /**当前对象创建的Proxy对象 */
  proxy?: any
}

function createObserveOptions(target: any): observeOptions {
  return {
    //原始对象
    target,
    //订阅了当前观察者子集对象更新的 watcher 集合
    //[key in target]: Set<Watcher>
    subs: Object.create(null),
    //订阅了当前观察者对象深度监听的 watcher 集合
    deepSubs: new Set<Watcher>(),
    //上次的值
    lastValue: Object.create(null),
    //是否是数组
    isArray: Array.isArray(target)
  };
}

export default class Observe {
  /**原始对象与选项参数以及Proxy对象的关联映射 */
  static observeMap = new WeakMap<any, observeOptions>();
  /**Proxy对象和选项参数的关联映射 */
  static observeProxyMap = new WeakMap<any, observeOptions>();

  static observe(target, options?: dataOptions) {
    //在这之前创建过观察者对象
    if (this.observeMap.has(target)) return this.observeMap.get(target).proxy;
    //如果传入的就是观察者对象,则直接返回
    if (this.observeProxyMap.has(target)) return this.observeProxyMap.get(target).proxy;
    //创建观察者对象
    return this.createObserve(target, options);
  }

  static createObserve(target, options: dataOptions) {
    const observeOptions = createObserveOptions(target);

    /**创建当前对象的观察者对象 */
    const proxy = observeOptions.proxy = new Proxy(target, {
      get: createGetProxy(options && options.get || emptyBeforOptions, observeOptions),
      set: createSetProxy(options && options.set || emptyBeforOptions, observeOptions),
      ownKeys: createOwnKeysProxy(observeOptions),
      deleteProperty: createDeletePropertyProxy(options && options.deleteProperty || emptyBeforOptions, observeOptions)
    })

    //更新 两个映射关系
    this.observeMap.set(target, observeOptions);
    this.observeProxyMap.set(proxy, observeOptions);

    return proxy;
  }

  static observable(obj){
    return isPlainObject(obj) || isArray(obj) ? this.observe(obj) : obj;
  }

  static getOriginTarget(val:any){
    return Observe.observeProxyMap.has(val) ? Observe.observeProxyMap.get(val).target : val;
  }
}

/**
 * 依赖收集的相应方法
 * TODO 当前所有属性都会收集依赖,而且如果深度监听lastValue在最外层无法保存
 */
function createGetProxy({ before }, { subs, deepSubs, lastValue }) {
  return (target, name, proxy) => {
    if (before) {
      //所有对象的get方法均走这里, 整个实例对象也是一个响应式对象, 比如调用 targetProxy.$emit 也会触发, 所以走before一个是为了去除$开头属性不监听
      const beforeResult = before(target, name, proxy);
      if (beforeResult === 0) {
        return target[name];
      }
    }
    // 计算属性访问 交给计算属性自己处理
    if ((Object.getOwnPropertyDescriptor(target, name) || emptyObject).get) {
      return target[name];
    }
    //获取当前值
    const value = target[name];

    //方法无需收集依赖
    if (isFunction(value) ) { //&& !hasOwnProperty.call(target, name) && has(target, name)
      return value;
    }

    //当前正在收集依赖的watcher   添加到当前数据的订阅中
    const watcher = ToggleCollection.target;
    if (watcher) {
      //添加订阅信息
      deepSubs.has(watcher) || watcher.add(subs, name);
      //存储本次值
      lastValue[name] = value;
    }

    //如果获取的值是对象类型,则返回他的观察者对象
    return Observe.observable(value);
  }
}

/**
 * 相应式更新的方法
 */
function createSetProxy({ before } = emptyObject, { subs, deepSubs, lastValue, isArray }) {
  return (target, name, value, proxy) => {
    if (before) {
      const beforeResult = before(target, name, value, proxy);
      if (beforeResult === 0) {
        return true;
      }
    }

    //如果属性值是 Object.defineProperty 定义的属性
    if ((Object.getOwnPropertyDescriptor(target, name) || emptyObject).set) {
      target[name] = value;
      return true;
    }

    // 尝试写入值 并 触发更新
    observerProxySetValue(subs, deepSubs, lastValue, isArray, target, name, value, proxy);
    return true;
  }
}

/**
 * 遍历数据时收集依赖
 */
function createOwnKeysProxy({ deepSubs }) {
  return (target) => {
    // 获取当前正在收集依赖的 watcher
    const watcher = ToggleCollection.target;

    // 当前有正在收集依赖的 watcher
    if (watcher) {
      // 标记深度监听订阅信息
      deepSubs.add(watcher);
    }

    return ownKeys(target);
  };
}

/**
 * 响应式删除数据
 */
function createDeletePropertyProxy({ before } = emptyObject, { subs, deepSubs, lastValue }) {
  return (target, name) => {
    if (before) {
      const beforeResult = before(target, name);

      if (beforeResult === 0) {
        return true;
      }
    }

    const isDelete = deleteProperty(target, name);

    //删除成功触发更新
    if (isDelete) {
      triggerUpdate(subs, deepSubs, lastValue, deleteProperty, name);
    }
    return isDelete;
  }
}

export function observerProxySetValue(subs, deepSubs, lastValue, isArray, target, name, value, proxy) {
  const oldValue = has(lastValue, name) ? lastValue[name] : target[name];

  if(isEqual(oldValue, value)){
    return true;
  }

  //改变值
  target[name] = value;

  //触发更新
  triggerUpdate(subs, deepSubs, lastValue, set, name, value)
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
function triggerUpdate(subs, deepSubs, lastValue, handler, name, value?: any) {
  //订阅了当前参数更新的 watcher 集合
  const sub = subs[name];

  //存储本次值改变  更新lastValue
  if (sub && sub.size) {
    handler(lastValue, name, value);
  }

  //遍历当前参数订阅以及父对象的深度监听数据
  for (const watcher of [...Array.from(sub || []), ...deepSubs]) {
    watcher.update();
  }
}

/**
 * 触发依赖收集
 */
export class ToggleCollection {
  private static instance = new ToggleCollection([], null);
  private constructor(private _targetStack: Array<Watcher>, private _target: Watcher) {
  }

  static get targetStack() {
    return ToggleCollection.instance._targetStack;
  }

  static get target() {
    return ToggleCollection.instance._target;
  }

  /**
   * watch 收集依赖
   * @param target 
   * @param fn 
   * @returns 
   */
  static toggle(target: Watcher, fn: Function) {
    this.targetStack.push(target);
    ToggleCollection.instance._target = target;

    const result = fn();

    this.targetStack.pop();
    ToggleCollection.instance._target = this.targetStack[this.targetStack.length - 1];
    return result;
  }

  /**
   * 用于防止方法执行时被依赖收集
   * @param fn 执行的方法
   */
  static safety(fn:Function){
    return this.toggle(null, fn);
  }
}