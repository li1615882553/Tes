import { IRect } from '../dom/Rect';
export declare class Draggable {
    /**
     * 拖动手柄元素, 只有点击手柄才能开始拖动
     */
    handle: HTMLElement;
    /**
     * 拖动的元素
     */
    elem: HTMLElement;
    /**
     * 指针按下不动到开始拖动的等待毫秒数, 如果为-1则忽略指针按下不动的操作
     */
    delay: number;
    /**
     * 开始拖动的最小距离,拖动距离小于这个值时认为时点击操作
     */
    distance: number;
    /**
    * 开始拖动时指针样式
    */
    private _originCursor;
    /**
     * startClientX: 开始拖动时的水平相对定位父元素偏移距离
     * startX: 开始拖动时的鼠标的水平坐标
     */
    startClientX: number;
    startX: number;
    /**
     * 开始拖动时垂直偏移距离
     */
    startClientY: number;
    startY: number;
    /**
     * 当前的水平偏移距离
     */
    endClientX: number;
    endX: number;
    /**
     * 当前竖直偏移距离
     */
    endClientY: number;
    endY: number;
    /**
     * 开始拖动的倒计时
     */
    private _timer;
    static current?: Draggable;
    /**
     * 当前实际处理鼠标移动的函数 可能是startDragging还可能是dragMove
     */
    private _handler;
    /**
     * 拖动开始事件
     * @param e 事件对象
     * @param sender 事件源
     * @returns 如果返回false则忽略本次拖动
     */
    onDragStart?: (e: MouseEvent, sender: this) => boolean | void;
    /**
     * 拖动移动前事件
     * @param e 事件对象
     * @param sender 事件源
     * @returns 如果返回false则忽略本次拖动
     */
    onBeforeDragMove?: (e: MouseEvent, sender: this) => boolean | void;
    /**
     * 拖动移动后事件
     * @param e 事件对象
     * @param sender 事件源
     */
    onAfterDragMove?: (e: MouseEvent, sender: this) => void;
    /**
     * 拖动结束事件
     * @param e 事件对象
     * @param sender 事件源
     */
    onDragEnd?: (e: MouseEvent, sender: this) => void;
    /**
     * 拖动取消事件
     * @param e 事件对象
     * @param sender 事件源
     */
    onDragCancel?: (e: MouseEvent, sender: this) => void;
    /**
     * 启用拖动
     */
    enable(): void;
    disable(): void;
    /**
     * 是否禁止拖动    默认输入框不允许拖动
     * @param e 事件对象
     */
    cancel(e: MouseEvent): boolean;
    /**
     * 处理指针按下事件
     * @param e 事件对象
     */
    protected handlerPointerDown(e: MouseEvent): void;
    /**
     * 处理指针移动事件
     * @param e 事件对象
     */
    protected handlerPointerMove(e: MouseEvent): void;
    /**
     * 处理指针松开事件
     * @param e 事件对象
     */
    protected handlerPointerUp(e: MouseEvent): void;
    /**
     * 触发拖动开始事件     可以重载,用于自定义的内容拖动 例如 splitter
     * @param e 事件对象
     * @returns 如果返回false,则忽略本次拖动
     */
    protected dragStart(e: MouseEvent): boolean;
    /**
     * 触发拖动事件
     * @param e 事件对象
     */
    protected dragMove(e: MouseEvent): void;
    /**
     * 触发拖动结束事件
     * @param e 事件对象
     */
    protected dragEnd(e: MouseEvent): void;
    /**
     * 进入拖动状态
     * @param e 事件对象
     */
    private startDragging;
    /**
     * 退出拖动状态
     * @param e 事件对象
     */
    private stopDragging;
    /**
     * 限制拖动的方向
     * @param value "vertical" 限制垂直方向移动, "horizontal限制水平方向移动
     */
    direction(value: "vertical" | "horizontal"): void;
    /**
     * 限制只能在指定区域内移动
     * @param container 限制的区域或元素
     * @param padding 容器的内边距
     */
    limit(container: Document | HTMLElement | IRect, padding?: number): void;
    /**
     * 设置当前拖动的步长
     * @param value 拖动的步长
     */
    step(value: number): void;
    /**
     * 还原节点位置
     * @param duration 渐变的总毫秒数
     */
    revert(duration?: number): void;
    /**
     * 使当前元素吸附于目标元素
     * @param target 吸附的目标区域或元素
     * @param padding 容器的内边距
     * @param distance 吸附的最小距离,当距离小于这个值后产生吸附效果
     * @param position 吸附的位置
     * @returns 如果未吸附成功则返回0, 如果水平吸附则返回1,如果垂直吸附则返回2,如果都吸附成功则返回3
     */
    snap(target: Document | HTMLElement | IRect, padding?: number, distance?: number, position?: "both" | "inside" | "outside"): number;
}
/**
 * 将指定元素设置为可拖动
 * @param elem  要拖动的元素
 * @param options  拖动元素的选项
 * @returns 返回一个可拖动对象
 */
export default function draggable(elem: HTMLElement, options?: Partial<Draggable>): Draggable;
