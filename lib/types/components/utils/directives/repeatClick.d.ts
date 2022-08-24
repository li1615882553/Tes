/**
 * 重复点击的自定义指令
 */
export default class repeatClickDirective {
    element: HTMLElement;
    value: Function;
    control: any;
    private init;
    private startTime;
    private interval;
    constructor(element: HTMLElement, value: Function, control: any);
    commit(value: any): void;
    destory(): void;
}
