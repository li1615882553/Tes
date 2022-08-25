/// <reference path="../../types/jsx.ts" />
import VNode from "./VNode";
import { ComponentOptions } from "../../types/tes"
import { create, uid, assign } from "../../shared/util/index";
import init from "../../static/define/init/index";
import $watch, { WatchOptions } from "../prototype/$watch";
import $destory from "../prototype/$destory";
import $cloneNode from "../prototype/$cloneNode";
import Watcher from "../observable/Watcher";
import { find } from "../../components/ux/dom/dom";

type VNodeText = string | number;
//TODO 父类中$属性不可写,非$属性会收集对应的依赖
export default class Control<T = any> {
  constructor() {
    return this.$init(this.$options)
  }
  private $options: any;
  /**组件是否挂载到文档流 */
  readonly $mounted: boolean = false;

  /**组件的子组件信息 */
  readonly $children: VNode[];

  /**組件的父组件信息 */
  readonly $parent: Control;

  /**组件传入的所有prop数据 */
  readonly props: T;

  /**存储关联元素 */
  private _elem: HTMLElement;

  /**组件渲染Watcher */
  private $forceUpdate: Watcher;

  /**关联的VNode对象 */
  private $VNode:VNode;

  $watch;
  $destory;
  $info: any;
  body: HTMLElement | null;
  static $cloneNode = $cloneNode;

  /**
   * 初始化组件
   * @param options 
   * @returns 
   */
  $init(options?: ComponentOptions) {
    const name = options.name || `anonymous-${uid()}`;
    const targetProxy = init.call(this, name, options);
    return targetProxy;
  }

  /**
   * 关联元素  节点可以由 update 方法生成,也可以直接被用户指定
   */
  get elem() {
    if(!this._elem){
      this.$forceUpdate.getValue()
    }
    return this._elem;
  }
  set elem(value) {
    const oldELem = this._elem;
    if (value != oldELem) {
      if (oldELem) {
        const parent = oldELem.parentElement;
        if (parent) {
          if (value) {
            parent.replaceChild(value, oldELem);
          } else {
            parent.removeChild(oldELem);
          }
        }
        delete (oldELem as any).__control__;
      }
      this._elem = value;
      if (value) {
        (value as any).__control__ = (value as any).__control__ || this;
      }
    }
  }

  /**实例初始化后被调用 */
  protected componentWillCreate(target) { }
  /**实例创建完成后被调用 */
  protected componentCreated(target) { }
  /**组件挂载前事件 */
  protected componentWillMount() { }
  /**组件挂载后的事件 */
  protected componentMounted() { }
  /**组件销毁前事件 */
  protected componentWillDestory() { }
  /**组件销毁后事件 */
  protected componentDestoryed() { }
  /**组件更新前将被调用 */
  protected componentWillUpdate() { }
  /**组件更新后调用 */
  protected componentUpdated() { }

  /**
  * 将当前控件渲染到指定的父控件或节点
  * @param parent 要渲染的目标控件或节点  如果为 null 则移除当前控件
  * @param refChild 在指定的子控件或节点前添加,如果为空则添加到末尾
  */
  $renderTo(parent: Control | Node | null, refChild?: Control | Node | null) {
    // execWillMountMth();
    if (parent) {
      //当前组件存在elem
      if (this.elem) {
        if (parent instanceof Control) {
          parent = parent.body || parent.elem;
        }
        if (refChild) {
          (parent as Node).insertBefore(this.elem, refChild instanceof Control ? refChild.elem : refChild);
        } else {
          (parent as Node).appendChild(this.elem);
        }
      }
      // execWillMountMth();
      // execMountedMth(this);
    } else if (this._elem && this._elem.parentNode) {
      this.$destory();
      this._elem.parentNode.removeChild(this._elem);
    }
  }

  /**组件渲染函数 */
  protected render() { }
  /**
  * 在当前控件查找指定的子控件或节点
  * @param selector 要查找的 css 选择器,如果为空则返回跟控件或节点
  * @returns 返回子控件或节点,如果找不到则返回null
  */
  find(selector?: string): HTMLElement | Control | null {
    //获取组件HTMLElement, 如果没有,就调用update获取
    let elem = this.elem as HTMLElement | null;
    if (selector) {
      elem = elem && find(elem, selector);
      //__control__ 当前元素关联的控件实例
      return elem && (elem as any).__control__ || elem
    }
    return this.$VNode ? this.$VNode.result as HTMLElement | Control : elem;
  }
}

assign(Control.prototype, {
  $watch,
  $destory
})