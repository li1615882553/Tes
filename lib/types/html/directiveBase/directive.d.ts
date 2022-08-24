import VNode from "../../core/VNode/VNode";
export declare type modifiers = {
    string?: boolean;
};
/**
 * 指令的基类
 */
export declare abstract class Directive {
    node: VNode;
    DirectiveModifiers: modifiers;
    constructor(node: VNode, DirectiveModifiers: modifiers);
    /**
     * 指令被设置值时调用
     * - 正常传值调用
     * - 传递指令的方式调用
     *    - 传递指令调用时, 需要将当前指令类传递给指令方法,然后退出当前方法
     */
    abstract commit(value: any, isDirectiveFn: boolean): void;
    /**
     * 当前指令被释放时的调用
     */
    abstract destroy(): void;
}
