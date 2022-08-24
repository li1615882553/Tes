import VNode from "../../core/VNode/VNode";
export default class TextDirective {
    value: any;
    constructor(element: VNode);
    commit(value: any, isDirectiveFn: any): any;
}
