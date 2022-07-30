import { IBaseComponent } from "../template/component"
import Component from "../../../core/VNode/decorators/Component"
import Control from "../../../core/VNode/Control";
import * as DOM from "../../ux/dom/index";
import classNames from 'classnames';
import VNode from "../../../core/VNode/VNode";
import pin, { alignPos } from "../../ux/align/align";
import { isArray } from "../../../shared/util";

export interface IPopupProps extends IBaseComponent {
  /**
 * - `click` 默认: 点击 `target` 后弹出,点击屏幕空白处消失
 * - `auxclick` : 右击 `target` 后弹出,点击屏幕空白处消失
 * - `contextmenu` : 作为 `target` 右菜单后弹出,点击屏幕空白处消失
 * - `pointerdown` : 指针在 `target` 按下后后弹出,点击屏幕空白处消失
 * - `pointeup` : 指针在 `target` 按出后弹出,点击屏幕空白处消失
 * - `pointerenter` : 指针移入 `target` 后弹出,点击屏幕空白处消失
 * - `hover` : 指针移入 `target` 后弹出,移出 `target` 后消失
 * - `pointermove` : 指针移入 `target` 后弹出,并跟随鼠标指针移动
 * - `active` : 指针在 `target` 按下时显示,松开后消失
 * - `focus` : `target` 获取焦点后显示,失去焦点后消失
 * - `null` : 不绑定事件
 */
  event?: "click" | "auxclick" | "contextmenu"
  | "pointerdown" | "pointeup" | "pointerenter"
  | "hover" | "pointermove" | "active"
  | "focus" | null;
  /**控制方式 event按照event方式自动控制显隐, visible按照visible相应式控制显隐 */
  type?: "event" | "visible";
  /**是否可见 */
  visible?: boolean;
  /**切换动画的毫秒数 */
  duration?: number;
  /**显示弹时的动画 */
  animatin?: DOM.ToggleAnimation;
  /**显示弹层的延时,仅对指针移动事件有效 */
  delay?: number;
  /**是否在点击屏幕空白处消失 */
  autoHide?: boolean;
  /**弹层对齐方式 */
  align?: alignPos;
  /**弹层对齐的目标节点或区域, 如果为null则不对齐,默认当前元素 */
  pinTarget?: Document | HTMLElement | DOM.Rect | null;
  /**元素的外边距 */
  margin?: number;
  /**变化回调 */
  onChange?: (visible: boolean) => void;
}

@Component
class Popup extends Control<IPopupProps> {
  _align: alignPos;
  _pinTarget: Document | HTMLElement | DOM.Rect | null;
  curVisible: boolean = false;

  /**
   * 切换显示或隐藏当前浮层
   * @param value 如果为true,强制显示,如果为false则强制隐藏
   */
  toggle(value?: boolean) {
    const { autoHide = true, onChange, animatin = "height", duration = 100 } = this.props;
    if (this.curVisible === value) {
      return;
    }
    this.curVisible = value;
    if (onChange) {
      onChange(value);
    }
    if (!value) {
      autoHide && DOM.off(document, "pointerdown", this.handleDocumentPointerDown, this);
      DOM.hide(this.elem, animatin, undefined, duration, undefined);
    } else {
      autoHide && DOM.on(document, "pointerdown", this.handleDocumentPointerDown, this);
      DOM.show(this.elem, animatin, undefined, duration, undefined);
      this.realign();
    }
  }

  /**对象包裹对象 */
  getTargetTriggerAction = () => {
    const { type = "visible", event = 'click', delay = 100 } = this.props;
    //如果通过visible控制显隐,则不另外添加显隐控制
    if (type === "visible") {

      return {};
    }
    const show = this.toggle.bind(this, true), hide = this.toggle.bind(this, false);
    const action = {};
    switch (event) {
      case "click":
      case "auxclick":
      case "pointerdown":
      case "pointeup":
        let onEvent = `on${event}`;
        action[event] = {
          [onEvent]: () => { this.toggle() }
        }

        break;
      case "focus":
        action[event] = {
          "onFocus": show,
          "onBlur": hide
        }
        break;
      case "active":
        action[event] = {
          "onPointerDown": show,
          "onPointerUp": hide
        }
        break;
      case "contextmenu":
        action[event] = {
          onPointerDown: show,
          onPointerUp: hide,
          onContextMenu: (e: MouseEvent) => {
            if (e.button === 3) {
              e.preventDefault();
              this._align = "rr-bb";
              this._pinTarget = {
                x: e.pageX,
                y: e.pageY,
                width: 1,
                height: 1
              };
              this.toggle(true);
            }
          }
        }
        break;
      case "pointermove":
        action[event] = {
          "onPointerMove": (e: MouseEvent) => {
            this._pinTarget = {
              x: e.pageX,
              y: e.pageY,
              width: 16,
              height: 16
            }
            this.realign();
          }
        };
      case "pointerenter":
      case "hover":
        let showTimer: number;
        let hideTimer: number;
        let delayShow = (e: PointerEvent) => {
          if (hideTimer) {
            //如果正在隐藏弹窗,则放弃隐藏保持打开状态
            clearTimeout(hideTimer);
            hideTimer = 0;
          } else {
            showTimer = showTimer || setTimeout(() => {
              showTimer = 0;
              this.toggle(true)
            }, delay) as any;
          }
        }
        let delayHide = (e: PointerEvent) => {
          if (showTimer) {
            //如果正在打开弹层,则放弃打开保持关闭状态
            clearTimeout(showTimer);
            showTimer = 0
          } else {
            hideTimer = hideTimer || setTimeout(() => {
              hideTimer = 0;
              this.toggle(false);
            }, delay) as any;
          }
        }
        action[event] = {
          "onPointerMove": (e: MouseEvent) => {
            this._pinTarget = {
              x: e.pageX,
              y: e.pageY,
              width: 16,
              height: 16
            }
            this.realign();
          },
          "onPointerEnter": delayShow,
          "onPointerLeave": delayHide
        }
        break;
    }
    return action[event!];
  }
  /**
   * 重新对齐浮层的位置
   */
  realign() {
    const { align = "lr-tt", margin = 5 } = this.props;
    pin(this.elem, this.$parent.elem, align, margin, this.elem.ownerDocument);
  }

  protected render() {
    const { className, style } = this.props;
    return VNode.create("div", { className, style, ...this.getTargetTriggerAction() }, this.$children)
  }

  protected componentWillMount(): void {
    const { type } = this.props;
    if (type === "visible") {
      this.$watch("props.visible", this.toggle)
    }
  }

  handleDocumentPointerDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!DOM.contains(this.elem, target) && !DOM.contains(this.$parent.elem, target)) {
      this.toggle(false)
    }
  }
}

export default Popup;