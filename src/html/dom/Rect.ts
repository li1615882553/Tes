export interface IPoint {
    x: number; // x坐标
    y: number;// y坐标
}
/**
 * 表示一个坐标
 */
export class Point implements IPoint {
    constructor(public x: number, public y: number) { }

    static isIPoint(obj): obj is IPoint {
        return !!obj && ('x' in obj) && ('y' in obj);
    }

    static copy(p: Point) {
        return new Point(0, 0).set(p);
    }

    /**
     * 获取指定元素的滚动距离
     * @param elem 要获取的元素或文档
     * @returns 返回作表, 如果元素不可滚动则返回原点s
     */
    static getScroll(elem: HTMLElement | Document):IPoint {
        if(elem.nodeType === 9){
            const win = (elem as Document).defaultView;
            if("scrollX" in win){
                return{
                    x : win.scrollX,
                    y : win.scrollY
                }
            }
            elem = (elem as Document).documentElement;
        }
        return{
            x : (elem as HTMLElement).scrollLeft,
            y : (elem as HTMLElement).scrollTop
        }
    }

    /**
     * 设置指定元素的滚动距离
     * @param elem 要设置的元素或文档
     * @param value 要设置的坐标
     */
    static setScroll(elem:HTMLElement | Document, value:Partial<IPoint>){
        if(elem.nodeType === 9){
            let scrollToPoint:ScrollToOptions;
            if (value.x !== null) scrollToPoint.left = value.x;
            if (value.y !== null) scrollToPoint.top = value.y;
            (elem as Document).defaultView.scrollTo(scrollToPoint)
        } else {
            if (value.x !== null) (elem as HTMLElement).scrollLeft = value.x;
            if (value.y !== null) (elem as HTMLElement).scrollTop = value.y;
        }
    }

    add(p: IPoint) {
        this.x += p.x;
        this.y += p.y;
        return this;
    }

    subtract(p: IPoint) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    }

    reset() {
        this.x = 0;
        this.y = 0;
        return this;
    }

    set(p: IPoint) {
        this.x = p.x;
        this.y = p.y;
        return this;
    }
}

/**
 * 表示一个大小
 */
export interface ISize {
    width: number,  //宽度
    height: number //高度
}

/**
 * 表示一个矩形区域
 */
export interface IRect extends IPoint, ISize { }


export class Rect implements IRect {
    constructor(public x: number, public y: number, public width: number, public height: number) { }

    static getCurrent(elem: HTMLElement | Document) {
        const doc: Document = elem.nodeType === 9 ? elem as Document : elem.ownerDocument;
        const html = doc.documentElement;

    }
}