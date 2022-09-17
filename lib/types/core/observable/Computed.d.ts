/**
 * 计算属性
 * 一个对象实例一个Computed对象
 */
export default class Computed {
    target: any;
    /**计算属性容器的观察者对象 */
    targetProxy: any;
    /**计算属性容器拦截器 */
    targetProxyInterceptor: any;
    /**当前计算属性容器参数 */
    optionsMap: any;
    self: any;
    observeOptions: any;
    isWatch: boolean;
    constructor(self: any, isWatch: boolean);
    /**
     * 添加计算属性
     * @param name 计算属性名称
     * @param computed 计算属性 getter/setter 对象
     */
    add(name: any, computed: any): void;
    delete(name: any): void;
    /**
     * 清空计算属性
     */
    clean(): void;
}
