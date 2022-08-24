export default class DisableScroll {
    private elem;
    private scrollX;
    private scrollY;
    private scrollFun;
    constructor(elem: HTMLElement | Document);
    /**
     * 获取当前禁用滚动状态
     * @returns 0 当前滚动可用 1当前滚动不可用
     */
    get state(): 0 | 1;
    /**
     * 禁用屏幕滚动
     * @param disableX  true|undefined 禁止横向滚动, false不禁用横向滚动
     * @param disableY  true|undefined 禁止纵向滚动, false不禁用纵向滚动
     */
    disableWindowScroll(disableX?: boolean, disableY?: boolean): void;
    /**
     * 启用屏幕滚动
     */
    enableWindowScroll(): void;
}
