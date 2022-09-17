/// <reference path="../../types/jsx.d.ts" />
import VNode from "./VNode";
import { ComponentOptions } from "../../types/tes";
import $cloneNode from "../prototype/$cloneNode";
export default class Control<T = any> {
    constructor();
    private $options;
    /**组件是否挂载到文档流 */
    readonly $mounted: boolean;
    /**组件的子组件信息 */
    readonly $children: VNode[];
    /**組件的父组件信息 */
    readonly $parent: Control;
    /**组件传入的所有prop数据 */
    readonly props: T;
    /**持有注册过 ref 引用特性的Control对象 */
    readonly $refs: {
        [key: string]: Control | Control[];
    };
    /**存储关联元素 */
    private _elem;
    /**组件渲染Watcher */
    private $forceUpdate;
    /**关联的VNode对象 */
    private $VNode;
    $watch: any;
    $destory: any;
    $info: any;
    body: HTMLElement | null;
    static $cloneNode: typeof $cloneNode;
    /**
     * 初始化组件
     * @param options
     * @returns
     */
    $init(options?: ComponentOptions): any;
    /**
     * 关联元素  节点可以由 update 方法生成,也可以直接被用户指定
     */
    get elem(): HTMLElement;
    set elem(value: HTMLElement);
    /**实例初始化后被调用 */
    protected componentWillCreate(target: any): void;
    /**实例创建完成后被调用 */
    protected componentCreated(target: any): void;
    /**组件挂载前事件 */
    protected componentWillMount(): void;
    /**组件挂载后的事件 */
    protected componentMounted(): void;
    /**组件销毁前事件 */
    protected componentWillDestory(): void;
    /**组件销毁后事件 */
    protected componentDestoryed(): void;
    /**组件更新前将被调用 */
    protected componentWillUpdate(): void;
    /**组件更新后调用 */
    protected componentUpdated(): void;
    /**
    * 将当前控件渲染到指定的父控件或节点
    * @param parent 要渲染的目标控件或节点  如果为 null 则移除当前控件
    * @param refChild 在指定的子控件或节点前添加,如果为空则添加到末尾
    */
    $renderTo(parent: Control | Node | null, refChild?: Control | Node | null): void;
    /**组件渲染函数 */
    protected render(): void;
    /**
    * 在当前控件查找指定的子控件或节点
    * @param selector 要查找的 css 选择器,如果为空则返回跟控件或节点
    * @returns 返回子控件或节点,如果找不到则返回null
    */
    find(selector?: string): HTMLElement | Control | null;
    /**
     * 向当前Control的ref中添加refName的关联对象
     * @param refName ref的名称
     * @returns 返回添加函数,由refDirective调用
     */
    addRefs(refName: string): (control: Control | Control[]) => {
        refName: string;
        refs: {
            [key: string]: Control<any> | Control<any>[];
        };
    };
}
