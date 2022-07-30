import { animate } from "../dom/animation";
import { getStyle, on, off, getOffset, getRect } from "../dom/dom"
import { IPoint, IRect, ISize } from '../dom/Rect'

export class Draggable {
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
  private _originCursor: string | null;

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
  private _timer: number;

  static current?: Draggable;

  /**
   * 当前实际处理鼠标移动的函数 可能是startDragging还可能是dragMove
   */
  private _handler: (e: MouseEvent) => void;

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
  enable() {
    on(this.handle, "pointerdown", this.handlerPointerDown, this);
  }

  disable() {
    off(this.handle, "pointerdown", this.handlerPointerDown, this);
  }

  /**
   * 是否禁止拖动    默认输入框不允许拖动
   * @param e 事件对象
   */
  cancel(e: MouseEvent) {
    return e.target !== this.handle && /^(?:input|textarea|button|select|option)/i.test((e.target as HTMLElement).tagName);
  }

  /**
   * 处理指针按下事件
   * @param e 事件对象
   */
  protected handlerPointerDown(e: MouseEvent) {
    if (e.button === 0 && !this.cancel(e)) {
      e.preventDefault();

      //不允许两个对象同时拖动
      if (Draggable.current) {
        Draggable.current.stopDragging(e);
      }

      //当前开始位置
      this.endX = this.startX = e.pageX;
      this.endY = this.startY = e.pageY;

      //下一步处理句柄为 startDragging
      this._handler = this.startDragging;

      //延时以避免将简单点击作为拖动处理
      this._timer = this.delay >= 0 ? setTimeout(() => {
        this._timer = 0;
        this._handler(e);
      }, this.delay) as any : -1;

      const doc = this.handle.ownerDocument;
      on(doc, "pointerup", this.handlerPointerUp, this);
      on(doc, "pointermove", this.handlerPointerMove, this);
    }
  }

  /**
   * 处理指针移动事件
   * @param e 事件对象
   */
  protected handlerPointerMove(e: MouseEvent) {
    e.preventDefault();

    this.endX = e.pageX;
    this.endY = e.pageY;

    this._handler(e);
  }

  /**
   * 处理指针松开事件
   * @param e 事件对象
   */
  protected handlerPointerUp(e: MouseEvent) {
    if (e.button === 0) {
      e.preventDefault();
      this.stopDragging(e);
    }
  }

  /**
   * 触发拖动开始事件     可以重载,用于自定义的内容拖动 例如 splitter
   * @param e 事件对象
   * @returns 如果返回false,则忽略本次拖动
   */
  protected dragStart(e: MouseEvent) {
    if (this.onDragStart && this.onDragStart(e, this) === false) {
      return false;
    }
    const offset = getOffset(this.elem);
    this.endClientX = this.startClientX = offset.x;
    this.endClientY = this.startClientY = offset.y;
    return true;
  }

  /**
   * 触发拖动事件
   * @param e 事件对象
   */
  protected dragMove(e: MouseEvent) {
    this.endClientX = this.startClientX + this.endX - this.startX;
    this.endClientY = this.startClientY + this.endY - this.startY;
    if (!this.onBeforeDragMove || this.onBeforeDragMove(e, this) !== false) {
      this.elem.style.top = this.endClientY + "px";
      this.elem.style.left = this.endClientX + "px";
      this.onAfterDragMove && this.onAfterDragMove(e, this);
    }
  }

  /**
   * 触发拖动结束事件
   * @param e 事件对象
   */
  protected dragEnd(e: MouseEvent) {
    this.onDragEnd && this.onDragEnd(e, this);
  }
  /**
   * 进入拖动状态
   * @param e 事件对象
   */
  private startDragging(e: MouseEvent) {
    /**
     * 进入拖动状态有两种可能:
     * 1. 鼠标按下超时
     * 2. 鼠标按下然后移动超过一定的距离
     */

    //如果当前this._timer > 0 ,那么一定是移动触发的 startDragging 
    if (this._timer) {
      if ((this.endX - this.startX) ** 2 + (this.endY - this.endX) ** 2 < this.distance ** 2) {
        return;
      }
      clearTimeout(this._timer);
      this._timer = 0;
    }
    //更新当前正在拖动的对象,全局只存在一个可拖动的对象
    Draggable.current = this;

    this._originCursor = document.documentElement.style.cursor;
    document.documentElement.style.cursor = getStyle(this.handle, "cursor");
    if ("pointerEvents" in document.body.style) {
      document.body.style.pointerEvents = "none";
    } else if ((document.body as any).setCapture) {
      (document.body as any).setCapture();
    }

    if (this.dragStart(e) !== false) {
      this._handler = this.dragMove;
      this.dragMove(e);
    } else {
      this.stopDragging(e);
    }
  }

  /**
   * 退出拖动状态
   * @param e 事件对象
   */
  private stopDragging(e: MouseEvent) {
    //解绑全局指针松开事件
    const doc = this.handle.ownerDocument;
    off(doc, "pointermove", this.handlerPointerMove, this);
    off(doc, "pointerup", this.handlerPointerUp, this);

    //清空计时器
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = 0;
    }

    if (this._handler === this.startDragging && this.onDragCancel) {
      this.onDragCancel(e, this);
    }

    if (Draggable.current === this) {
      if (document.body.style.pointerEvents === "none") {
        document.body.style.pointerEvents = "";
      } else if ((document.body as any).reseaseCapture) {
        (document.body as any).reseaseCapture();
      }
      document.documentElement.style.cursor = this._originCursor;

      this.dragEnd(e);
      Draggable.current = undefined;
    }
  }

  /**
   * 限制拖动的方向
   * @param value "vertical" 限制垂直方向移动, "horizontal限制水平方向移动   
   */
  direction(value: "vertical" | "horizontal") {
    this[value === "vertical" ? "endClientX" : "endClientY"] = this[value === "vertical" ? "startClientX" : "startClientY"]
  }

  /**
   * 限制只能在指定区域内移动
   * @param container 限制的区域或元素
   * @param padding 容器的内边距
   */
  limit(container: Document | HTMLElement | IRect, padding = 0) {
    container = (container as Document | HTMLElement).nodeType ? getRect(container as Document | HTMLElement) : container as IRect;
    this.elem.style.top = this.endClientY + "px";
    this.elem.style.left = this.endClientX + "px";
    const currentRect = getRect(this.elem);
    let delta: number;
    if ((delta = currentRect.x - container.x - padding) <= 0 || (delta = currentRect.x + currentRect.width - container.x - container.width + padding) >= 0) {
      this.endClientX -= delta;
    }
    if ((delta = currentRect.y - container.y - padding) <= 0 || (delta = currentRect.y + currentRect.height - container.y - container.height + padding) >= 0) {
      this.endClientY -= delta;
    }
  }

  /**
   * 设置当前拖动的步长
   * @param value 拖动的步长
   */
  step(value: number) {
    this.endClientX = this.startClientX + Math.floor((this.endClientX - this.startClientX + value / 2) / value) * value;
    this.endClientY = this.startClientY + Math.floor((this.endClientY - this.startClientY + value / 2) / value) * value;
  }

  /**
   * 还原节点位置
   * @param duration 渐变的总毫秒数
   */
  revert(duration?: number) {
    this.disable()
    animate(this.elem, {
      left: this.startClientX,
      top: this.startClientY
    }, () => {
      this.enable();
    }, duration);
  }

  /**
   * 使当前元素吸附于目标元素
   * @param target 吸附的目标区域或元素
   * @param padding 容器的内边距
   * @param distance 吸附的最小距离,当距离小于这个值后产生吸附效果
   * @param position 吸附的位置
   * @returns 如果未吸附成功则返回0, 如果水平吸附则返回1,如果垂直吸附则返回2,如果都吸附成功则返回3
   */
  snap(target: Document | HTMLElement | IRect, padding = 0, distance = 15, position: "both" | "inside" | "outside" = "both") {
    target = (target as Document | HTMLElement).nodeType ? getRect(target as Document | HTMLElement) : target as IRect;
    const inside = position !== "outside";
    const outside = position !== "inside";

    this.elem.style.top = this.endClientY + "px";
    this.elem.style.left = this.endClientX + "px";
    const rect = getRect(this.elem);

    let result = 0;

    let deltaX = distance;
    if (inside) {
      deltaX = target.x + padding - rect.x;
      if (Math.abs(deltaX) >= distance) {
        deltaX = target.x + target.width - padding - rect.x - rect.width;
      }
      if (Math.abs(deltaX) >= distance && outside) {
        deltaX = target.x + padding - rect.x - rect.width;
        if (Math.abs(deltaX) >= distance) {
          deltaX = target.x + target.width - padding - rect.x;
        }
      }
      if (Math.abs(deltaX) < distance) {
        this.endClientX += deltaX;
        result += 1;
      }
    }

    let deltaY = distance;
    if (inside) {
      deltaY = target.y + padding - rect.y;
      if (Math.abs(deltaY) >= distance) {
        deltaY = target.y + target.height - padding - rect.y - rect.height;
      }
    }
    if (Math.abs(deltaY) >= distance && outside) {
      deltaY = target.y + padding - rect.y - rect.height;
      if (Math.abs(deltaY) >= distance) {
        deltaY = target.y + target.height - padding - rect.y;
      }
    }
    if (Math.abs(deltaY) < distance) {
      this.endClientY += deltaY;
      result += 2;
    }

    return result;
  }
}

/**
 * Draggable的默认值
 */
const dafautls: Partial<Draggable> = {
  delay: 500,
  distance: 3
}
/**
 * 将指定元素设置为可拖动
 * @param elem  要拖动的元素
 * @param options  拖动元素的选项
 * @returns 返回一个可拖动对象
 */
export default function draggable(elem: HTMLElement, options?: Partial<Draggable>) {
  const position = getStyle(elem, 'position')
  if (!position || position === 'static') {
    elem.style.position = 'relative'
  }
  const result = new Draggable();
  result.handle = result.elem = elem;
  Object.assign(result, dafautls, options);
  result.enable();
  return result;
}