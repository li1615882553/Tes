import Control from "../../core/VNode/Control";
import AttributeCommitter from "../directiveBase/attribute";
export default class ModelDirective {
    element: HTMLElement | Control;
    value: string;
    control: any;
    init: boolean;
    unWatch: Function;
    /**（DOM节点）当前节点绑定的监听事件 */
    events: Array<any>;
    attributes: Map<string, AttributeCommitter>;
    handler: Function;
    set: Function;
    constructor(element: HTMLElement | Control, value: string, control: any);
    commit(value: any): void;
    destory(): void;
}
