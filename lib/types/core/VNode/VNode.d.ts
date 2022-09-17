import Control from "./Control";
/**
 * 虚拟节点
 */
export default class VNode {
    type: null | string | (new () => Control);
    props: any | {
        [name: string]: any;
    };
    children: VNode[];
    /**同步后生成的空间或控件 */
    result: Text | HTMLElement | Control;
    /**当前VNode存储的指令对象 */
    propDirectives: Map<string, any>;
    /**
     * type节点类型
     * 1.如果是null则表示文本节点;
     * 2.如果是字符串则表示 HTML 原生节点;
     * 3.如果是函数则表示控件
     */
    constructor(type: null | string | (new () => Control), props: any | {
        [name: string]: any;
    }, children: VNode[]);
    /**
     * 添加一个或多个子节点
     * @param child 要添加的字内容
     * @returns 返回 child
     */
    append<T extends any>(child: T | null): T;
    /**
     * 创建一个虚拟节点
     * TSX/JSX 中编译过程中通过此方法先将节点转换成 VNode
     * @param type 虚拟节点类型, 如果是null则表示文本节点;如果是字符串则表示HTML原生节点; 如果是函数表示控件
     * @param props 节点属性
     * @param childNodes 所有子内容
     * @returns 返回创建的虚拟节点
     */
    static create(type: VNode['type'], props: VNode['props'], ...childNodes: any[]): VNode;
    /**比较两个节点是否相同 */
    static isDiffVNode(newVNode: VNode, oldVNode?: VNode): boolean;
    /**
     * 更新子节点
     * @param parentElm 父节点
     * @param newCh 当前更新的子节点
     * @param oldCh 当前更新子节点的原子节点
     */
    static updateChildren(parentElm: HTMLElement, newCh: VNode[], oldCh: VNode[]): void;
    /**
     * 移除虚拟节点，从真实dom中移除当前虚拟节点
     * @param body
     * @param VNodes
     * @param start
     * @param end
     */
    static removeVNode(body: HTMLElement, VNodes: VNode[], start: number, end?: number): void;
    /**
     * 新增虚拟节点, 将虚拟节点添加到真实dom中
     * @param body
     * @param VNodes
     * @param start
     * @param end
     */
    static addVNode(body: HTMLElement, VNodes: VNode[], start: number, end?: number, refChild?: HTMLElement): void;
    /**
     * 同步虚拟节点, 创建虚拟节点对应的真实节点
     * @param newVNode 新虚拟节点
     * @param oldVNode 如果指定了原虚拟节点,则同步时尽量重用上次创建的真实节点
     * @param changed true强制更新节点, false强制使用原节点
     * @return 如果根节点发生改变则返回 true, 否则返回 false
     */
    static sync(newVNode: VNode, oldVNode?: VNode | null, changed?: boolean): boolean;
    /**
     * 设置节点的属性
     * @param target 要设置的节点
     * @param prop 属性名
     * @param value 属性值
     * @param args 部分属性需要附加参数  内置class,style, 监听事件的 selector等需要附加参数
     * @param scope 时间作用域
     */
    static set(vnode: VNode, target: HTMLElement, prop: string, value?: any, args?: any): void;
    /**
     * 检测当前属性是否是指令
     * @param prop
     * @returns
     */
    static isDirective(prop: string): boolean;
    static copyVNode(target: VNode): VNode;
}
