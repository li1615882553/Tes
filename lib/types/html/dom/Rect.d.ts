export interface IPoint {
    x: number;
    y: number;
}
/**
 * 表示一个坐标
 */
export declare class Point implements IPoint {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static isIPoint(obj: any): obj is IPoint;
    static copy(p: Point): Point;
    /**
     * 获取指定元素的滚动距离
     * @param elem 要获取的元素或文档
     * @returns 返回作表, 如果元素不可滚动则返回原点s
     */
    static getScroll(elem: HTMLElement | Document): IPoint;
    /**
     * 设置指定元素的滚动距离
     * @param elem 要设置的元素或文档
     * @param value 要设置的坐标
     */
    static setScroll(elem: HTMLElement | Document, value: Partial<IPoint>): void;
    add(p: IPoint): this;
    subtract(p: IPoint): this;
    reset(): this;
    set(p: IPoint): this;
}
/**
 * 表示一个大小
 */
export interface ISize {
    width: number;
    height: number;
}
/**
 * 表示一个矩形区域
 */
export interface IRect extends IPoint, ISize {
}
export declare class Rect implements IRect {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    static getCurrent(elem: HTMLElement | Document): void;
}
