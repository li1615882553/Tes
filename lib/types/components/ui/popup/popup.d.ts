import { IBaseComponent } from "../template/component";
import Control from "../../../core/VNode/Control";
import * as DOM from "../../ux/dom/index";
import VNode from "../../../core/VNode/VNode";
import { alignPos } from "../../ux/align/align";
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
    event?: "click" | "auxclick" | "contextmenu" | "pointerdown" | "pointeup" | "pointerenter" | "hover" | "pointermove" | "active" | "focus" | null;
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
declare class Popup extends Control<IPopupProps> {
    _align: alignPos;
    _pinTarget: Document | HTMLElement | DOM.Rect | null;
    curVisible: boolean;
    /**
     * 切换显示或隐藏当前浮层
     * @param value 如果为true,强制显示,如果为false则强制隐藏
     */
    toggle(value?: boolean): void;
    /**对象包裹对象 */
    getTargetTriggerAction: () => any;
    /**
     * 重新对齐浮层的位置
     */
    realign(): void;
    protected render(): VNode;
    protected componentWillMount(): void;
    handleDocumentPointerDown(e: MouseEvent): void;
}
export default Popup;
