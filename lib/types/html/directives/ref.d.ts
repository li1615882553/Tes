import Control from "../../core/VNode/Control";
export default class RefDirective {
    element: HTMLElement | Control;
    value: any;
    control: any;
    refs: {
        [key: string]: Control | Control[];
    };
    refName: string;
    constructor(element: HTMLElement | Control, value: any, control: any);
    commit(value: any): void;
    destory(): void;
}
