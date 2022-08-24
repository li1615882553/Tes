/**
 * resize 辅助类
 */
export default class ResizeHandle {
    protected parent: HTMLElement;
    type: string;
    private onMouseDown;
    css?: string;
    protected _handle: HTMLElement;
    private _onResize;
    constructor(parent: HTMLElement, type: string, onMouseDown: any, css?: string);
    /**
     * 获取当前操作的句柄
     */
    get el(): HTMLElement;
    /**
     * 移除当前改变大小事件
     */
    remove(): void;
}
