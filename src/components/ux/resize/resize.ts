import { on, off, addClass, children, getStyle, getRect } from "../dom/dom";
import { Point, IRect, ISize } from "../dom/Rect";
import ResizeHandle from "./widgets/resize-handle";
import { animate } from "../dom/animation";

import "./resize.scss";
/**
 * 边界自定义样式
 */
interface ResizeHandleType {
  n?: string,
  s?: string,
  w?: string,
  e?: string,
  ne?: string,
  nw?: string,
  se?: string,
  sw?: string
}


export class Resizeable {
  /**
   * 当前正在使用的 ResizeHandler
   */
  private _handleResizing: ResizeHandle = null;
  /**
   * 当前存储的ResizeHandler和type的对应关系
   */
  private _handles: { [key: string]: ResizeHandle } = {}
  /**
   * 所有的handleType
   */
  private _handleType: string[] = [];

  /**
   * 原始的位置
   */
  private originRect: IRect;

  /**
   * 当前的位置
   */
  private curRect: IRect;

  /**
   * 鼠标初始位置
   */
  private origMousePos: Point;

  /**
   * 元素最小大小
   */
  public minSize:ISize;

  /**
   * 元素最大大小
   */
  public maxSize:ISize;

  /**
   * 变更大小的元素
   */
  public elem: HTMLElement;

  /**
   * 更改大小的手柄
   */
  public handle?: HTMLElement;

  /**
   * 缩放类型
   */
  public rzHandles: string | ResizeHandleType;

  /**
   * 当前缩放对象
   */
  static current?: Resizeable;

  constructor(config: Partial<Resizeable>) {
    this.elem = config.elem;
    this.handle = config.handle == undefined ? this.elem : config.handle;
    this.rzHandles = config.rzHandles;

    this.onRzStart = config.onRzStart
    this.onRzMove = config.onRzMove
    this.onRzEnd = config.onRzEnd

    this.minSize = config.minSize;
    this.maxSize = config.maxSize;

    this.enable()
  }

  /**
   * 根据 rzHandles 创建缩放ResizeHandle的实例handles
   * @returns 
   */
  private createHandles() {
    if (!this.rzHandles) {
      return;
    }
    let tmpHandleTypes: string[]
    if (typeof this.rzHandles === "string") {
      if (this.rzHandles === "all") {
        tmpHandleTypes = ['n', 'e', 'w', 's', 'ne', 'nw', 'se', 'sw'];
      } else {
        tmpHandleTypes = this.rzHandles.replace(/ /g, "").toLowerCase().split(",");
      }

      for (const type of tmpHandleTypes) {
        const handle = this.createHandleByType(type);
        if (handle) {
          this._handleType.push(type);
          this._handles[type] = handle;
        }
      }
    } else {
      tmpHandleTypes = Object.keys(this.rzHandles);
      for (const type of tmpHandleTypes) {
        const handle = this.createHandleByType(type, this.rzHandles[type]);
        if (handle) {
          this._handleType.push(type);
          this._handles[type] = handle;
        }
      }
    }
  }

  /**
   * 根据 type 创建对应的 ResizeHandle
   * @param type 
   * @param css 
   * @returns 
   */
  private createHandleByType(type: string, css?: string) {
    if (!type.match(/^(n|e|s|w|se|sw|ne|nw)$/)) {
      console.error('Invalid handle type:', type);
      return null;
    }
    return new ResizeHandle(
      this.elem,
      type,
      this.handlerPointerDown.bind(this)
    )
  }

  /**
   * 移除所有ResizeHandle的实例handles
   */
  private removeHandles() {
    for (const type of this._handleType) {
      this._handles[type].remove();
    }

    this._handleType = [];
    this._handles = {};
  }
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
  handlerPointerDown(e: MouseEvent, handle: ResizeHandle) {
    if (e.button === 0) {
      e.preventDefault()
      e.stopPropagation()

      if (!Resizeable.current) {
        Resizeable.current;
      }
      if (this.resizeStart(e, handle) !== false) {
        const doc = this.elem.ownerDocument;
        on(doc, "pointerup", this.handlerPointerUp, this);
        on(doc, "pointermove", this.handlerPointerMove, this);
      }
    }
  }

  handlerPointerMove(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.onRzMove || this.onRzMove(e, this) == true) {
      this.resizeTo(new Point(e.pageX, e.pageY));
    }
  }

  handlerPointerUp(e: MouseEvent) {
    if (e.button === 0) {
      e.preventDefault()
      e.stopPropagation()

      this.onRzEnd && this.onRzEnd(e, this);
      const doc = this.elem.ownerDocument;
      off(doc, "pointerup", this.handlerPointerUp, this);
      off(doc, "pointermove", this.handlerPointerMove, this);
    }
  }

  private resizeStart(e: MouseEvent, handle: ResizeHandle) {
    this._handleResizing = handle;
    if (this.onRzStart && this.onRzStart(e, this) === false) {
      return false;
    }

    this.origMousePos = new Point(e.pageX, e.pageY);
    this.originRect = getRect(this.elem);
    this.curRect = getRect(this.elem);
    return true;
  }

  /**
   * 计算当前elem 变化大小之后的位置以及大小
   * @param p 当前变化大小之后鼠标的位置
   */
  private resizeTo(p: Point) {
    p.subtract(this.origMousePos)
    if (this._handleResizing.type.match(/n/)) {
      //n ne nw
      this.curRect.height = this.originRect.height - p.y;
      this.curRect.y = this.originRect.y + p.y;
    }
    if (this._handleResizing.type.match(/s/)) {
      this.curRect.height = this.originRect.height + p.y;
    }
    if (this._handleResizing.type.match(/e/)) {
      console.log(p.x, p.y, this.originRect.width)
      this.curRect.width = this.originRect.width + p.x;
    }
    if (this._handleResizing.type.match(/w/)) {
      this.curRect.width = this.originRect.width - p.x;
      this.curRect.x = this.originRect.x + p.x;
    }
    this.doResize();
  }

  /**
   * 变更elem的大小以及位置
   */
  private doResize() {
    this.elem.style.top = this.curRect.y + "px";
    this.elem.style.left = this.curRect.x + "px";
    console.log(this.minSize.width)
    this.elem.style.width = (this.minSize ? this.minSize.width > this.curRect.width ? this.minSize.width : this.curRect.width :this.curRect.width)  + "px";
    this.elem.style.height = (this.minSize ? this.minSize.height > this.curRect.height ? this.minSize.height : this.curRect.height :this.curRect.height) + "px";
  }

  /**
   * 还原改变大小大小以及位置
   * @param duration 渐变的总毫秒数
   */
  public revert(duration?: number){
    this.disable()
    animate(this.elem, {
      left: this.originRect.x,
      top: this.originRect.y,
      width: this.originRect.width,
      height: this.originRect.height
    }, () => {
      this.enable();
    }, duration);
  }

  /**
   * 启用更改大小
   */
  enable() {
    this.removeHandles()
    this.createHandles()
  }

  /**
   * 禁用更改大小
   */
  disable() {
    this.removeHandles();
  }
}

const dafautls: Partial<Resizeable> = {
  rzHandles: "e,s,se"
}

export default function resizeable(elem: HTMLElement, options?: Partial<Resizeable>) {
  const position = getStyle(elem, "position");
  if (!position || position === 'static') {
    addClass(elem, "resizeable");
  }
  const result = new Resizeable(Object.assign(dafautls, {elem, ...options}));
  result.enable();
  return result;
}