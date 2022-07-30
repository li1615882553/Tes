import { addClass, on, off } from '../../dom/dom'
/**
 * resize 辅助类   
 */
export default class ResizeHandle{
  protected _handle: HTMLElement;
  private _onResize;

  constructor(
    protected parent:HTMLElement,
    public type:string,
    private onMouseDown: any,
    public css?:string
  ){
    const handle = document.createElement('div');
    addClass(handle, 'resizeable-handle');
    if(this.css) {
      addClass(handle, css);
    }else{
      addClass(handle, `resizeable-${this.type}`);
    }

    parent.appendChild(handle);

    this._onResize = (e:MouseEvent) => {
      this.onMouseDown(e, this);
    }
    on(handle, "pointerdown", this._onResize, this);

    this._handle = handle;
  }

  /**
   * 获取当前操作的句柄
   */
  get el(){
    return this._handle;
  }

  /**
   * 移除当前改变大小事件
   */
  remove(){
    off(this._handle, "pointerdown", this._onResize, this);

    if(this.parent){
      this.parent.removeChild(this._handle);
    }

    this._handle = null;
    this._onResize = null;
  }
}