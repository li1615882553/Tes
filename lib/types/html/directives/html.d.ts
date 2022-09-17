import Control from "../../core/VNode/Control";
export default class HtmlDirective {
    element: HTMLElement | Control;
    value: any;
    control: any;
    constructor(element: HTMLElement | Control, value: any, control: any);
    commit(value: any): void;
}
