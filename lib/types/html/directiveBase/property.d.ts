import VNode from "../../core/VNode/VNode";
import { Directive, modifiers } from "./directive";
export default class BasicPropertyDirective extends Directive {
    /**当前property的key */
    name: string;
    /**当前property的值 */
    value: any;
    constructor(node: VNode, name: string, modifiers: modifiers);
    commit(value: any, isDirectiveFn: any): any;
    destroy(): void;
}
