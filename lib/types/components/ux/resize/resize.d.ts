import { ISize } from "../dom/Rect";
import ResizeHandle from "./widgets/resize-handle";
import "./resize.scss";
/**
 * 边界自定义样式
 */
interface ResizeHandleType {
    n?: string;
    s?: string;
    w?: string;
    e?: string;
    ne?: string;
    nw?: string;
    se?: string;
    sw?: string;
}
export declare class Resizeable {
    /**
     * 当前正在使用的 ResizeHandler
     */
    private _handleResizing;
    /**
     * 当前存储的ResizeHandler和type的对应关系
     */
    private _handles;
    /**
     * 所有的handleType
     */
    private _handleType;
    /**
     * 原始的位置
     */
    private originRect;
    /**
     * 当前的位置
     */
    private curRect;
    /**
     * 鼠标初始位置
     */
    private origMousePos;
    /**
     * 元素最小大小
     */
    minSize: ISize;
    /**
     * 元素最大大小
     */
    maxSize: ISize;
    /**
     * 变更大小的元素
     */
    elem: HTMLElement;
    /**
     * 更改大小的手柄
     */
    handle?: HTMLElement;
    /**
     * 缩放类型
     */
    rzHandles: string | ResizeHandleType;
    /**
     * 当前缩放对象
     */
    static current?: Resizeable;
    constructor(config: Partial<Resizeable>);
    /**
     * 根据 rzHandles 创建缩放ResizeHandle的实例handles
     * @returns
     */
    private createHandles;
    /**
     * 根据 type 创建对应的 ResizeHandle
     * @param type
     * @param css
     * @returns
     */
    private createHandleByType;
    /**
     * 移除所有ResizeHandle的实例handles
     */
    private removeHandles;
    /**
     * resize开始事件
     * @param e 事件对象
     * @param sender 事件源
     * @returns 如果返回false则忽略本次缩放
     */
    onRzStart?: (e: MouseEvent, sender: this) => boolean | void;
    /**
      * resize事件
      * @param e 事件对象
      * @param sender 事件源
      * @returns 如果返回false则忽略本次缩放
      */
    onRzMove?: (e: MouseEvent, sender: this) => boolean | void;
    /**
      * resize结束事件
      * @param e 事件对象
      * @param sender 事件源
      */
    onRzEnd?: (e: MouseEvent, sender: this) => void;
    /**
     * 处理指针按下事件
     * @param e 事件对象
     * @param handle 当前缩放对象
     */
    handlerPointerDown(e: MouseEvent, handle: ResizeHandle): void;
    handlerPointerMove(e: MouseEvent): void;
    handlerPointerUp(e: MouseEvent): void;
    private resizeStart;
    /**
     * 计算当前elem 变化大小之后的位置以及大小
     * @param p 当前变化大小之后鼠标的位置
     */
    private resizeTo;
    /**
     * 变更elem的大小以及位置
     */
    private doResize;
    /**
     * 还原改变大小大小以及位置
     * @param duration 渐变的总毫秒数
     */
    revert(duration?: number): void;
    /**
     * 启用更改大小
     */
    enable(): void;
    /**
     * 禁用更改大小
     */
    disable(): void;
}
export default function resizeable(elem: HTMLElement, options?: Partial<Resizeable>): Resizeable;
export {};
