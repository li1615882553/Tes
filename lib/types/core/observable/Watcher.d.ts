export default class Watcher {
    isComputed: boolean;
    targetProxy: any;
    id: string;
    deps: Set<any>;
    fn: Function;
    isInit: boolean;
    before: Function;
    /**针对计算属性生效,计算属性值发生变化后,下次访问应重新获取值 */
    shouldUpdate: boolean;
    [x: string]: any;
    /**
     * 构造Watcher对象
     * @param fn 需要收集依赖的方法
     */
    constructor(targetProxy: any, fn: Function, isComputed?: boolean, before?: Function);
    /**
     * 重新收集依赖
     */
    getValue(): any;
    /**
     * 依赖重新收集
     */
    update(): void;
    /**
     * 当前对象 key 添加订阅信息
     * @param subs 当前观察者子集对象的 watcher 集合
     * @param name 当前访问对象的key
     */
    add(subs: {
        string: Set<Watcher>;
    }, name: string): void;
    /**
     * 清理收集的依赖
     */
    clean(): void;
}
