import { Draggable } from "../drag/drag";
import "./splitter.scss";
export declare class Splitter extends Draggable {
    /**
     * 分割的第一个目标
     */
    target1: HTMLElement;
    /**
     * 分割的第二个目标
     */
    target2: HTMLElement;
    /**
     * 是否水平分割条
     */
    horizontal: boolean;
    /**
     * 当前滑块最小位置 (0-1之间)
     */
    minValue: number;
    /**
     * 当前滑块的最大位置 (0-1之间)
     */
    maxValue: number;
    /**
     * 获取当前滑块的值
     * @returns 滑块的值 (0-1之间)
     */
    getValue(): number;
    /**
     * 设置当前滑块的值
     * @param value 要设置的值(0-1之间)
     */
    setValue(value: number): void;
    /**
     * 重新对其分割条的位置
     */
    realign(): void;
    /**
     * 本次拖动开始的位置
     */
    startValue: number;
    /**
     * 本次拖动的当前值
     */
    endValue: number;
    /**
     * 触发拖动开始事件
     * @param e 事件对象
     * @returns 如果返回false, 则忽略本次拖动
     */
    protected dragStart(e: MouseEvent): boolean;
    /**
     * 拖动触发事件
     * @param e 事件对象
     * @returns
     */
    protected dragMove(e: MouseEvent): void;
    /**
     * 拖动触发结束事件
     * @param e 事件对象
     */
    protected dragEnd(e: MouseEvent): void;
}
export default function splitter(target1: HTMLElement, target2: HTMLElement, options?: Partial<Splitter>): Splitter;
