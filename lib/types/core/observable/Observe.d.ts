import Watcher from "./Watcher";
import { dataOptions } from "../../types/index";
interface observeOptions {
    /**原始对象 */
    target: any;
    /**订阅了当前观察者子集对象的 watcher 集合*/
    subs: {
        string: Set<Watcher>;
    };
    /**订阅了当前观察者对象深度监听的 watcher 集合 */
    deepSubs: Set<Watcher>;
    /**上次访问值缓存 */
    lastValue: any;
    isArray: boolean;
    /**当前对象创建的Proxy对象 */
    proxy?: any;
}
export default class Observe {
    /**原始对象与选项参数以及Proxy对象的关联映射 */
    static observeMap: WeakMap<any, observeOptions>;
    /**Proxy对象和选项参数的关联映射 */
    static observeProxyMap: WeakMap<any, observeOptions>;
    static observe(target: any, options?: dataOptions): any;
    static createObserve(target: any, options: dataOptions): any;
    static observable(obj: any): any;
    static getOriginTarget(val: any): any;
}
export declare function observerProxySetValue(subs: any, deepSubs: any, lastValue: any, isArray: any, target: any, name: any, value: any, proxy: any): boolean;
/**
 * 触发依赖收集
 */
export declare class ToggleCollection {
    private _targetStack;
    private _target;
    private static instance;
    private constructor();
    static get targetStack(): Watcher[];
    static get target(): Watcher;
    /**
     * watch 收集依赖
     * @param target
     * @param fn
     * @returns
     */
    static toggle(target: Watcher, fn: Function): any;
    /**
     * 用于防止方法执行时被依赖收集
     * @param fn 执行的方法
     */
    static safety(fn: Function): any;
}
export {};
