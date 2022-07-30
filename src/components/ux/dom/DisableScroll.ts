import { getScroll, off, on } from "./dom";

export default class DisableScroll {
  private scrollX: number | null;
  private scrollY: number | null;
  private scrollFun: () => void;
  public constructor(private elem: HTMLElement | Document) {
    this.scrollX = null
    this.scrollY = null
    this.scrollFun = () => {
      if (this.scrollX !== null || this.scrollY !== null) {
        let point = getScroll(this.elem);
        if (elem.nodeType === 9) {
          const win = (elem as Document).defaultView;
          win.scrollTo(this.scrollX ? this.scrollX : point.x, this.scrollY ? this.scrollY : point.y);
        }else{
          (this.elem as HTMLElement).scrollTo(this.scrollX === null ? point.x : this.scrollX, this.scrollY === null ? point.y : this.scrollY);
        }
      }
    }
  }

  /**
   * 获取当前禁用滚动状态
   * @returns 0 当前滚动可用 1当前滚动不可用
   */
  get state(){
    if(this.scrollX == null && this.scrollY == null){
      return 0;
    }
    return 1;
  }
  
  /**
   * 禁用屏幕滚动
   * @param disableX  true|undefined 禁止横向滚动, false不禁用横向滚动
   * @param disableY  true|undefined 禁止纵向滚动, false不禁用纵向滚动
   */
  public disableWindowScroll(disableX?: boolean, disableY?: boolean) {
    let point = getScroll(this.elem);
    if (disableX !== false) {
      this.scrollX = point.x;
    }
    if (disableY !== false) {
      this.scrollY = point.y;
    }
    on(this.elem, "scroll", this.scrollFun, this);
  }

  /**
   * 启用屏幕滚动
   */
  public enableWindowScroll() {
    this.scrollX = null
    this.scrollY = null
    off(this.elem, "scroll", this.scrollFun, this);
  }
}