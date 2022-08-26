import Control from "./Control";
import { emptyArray, has, isFunction } from "../../shared/util/index";
import * as dom from "../../html/dom/dom";
import { directives, userDirectives } from "../../html/const";
import { curentControl } from "./render";
import { getControlValue, setControlValue } from "./util/modifyControlValue";
import AttributeCommitter from "../../html/directiveBase/attribute";
import { addCacheMth } from "./util/catchCacheMth";
import initForceUpdate from "../init/initForceUpdate";

type NodeLike = Control | Node | VNode | string;

/**
 * 虚拟节点
 */
export default class VNode {
  /**同步后生成的空间或控件 */
  public result: Text | HTMLElement | Control;

  /**当前VNode存储的指令对象 */
  public propDirectives:Map<string, any> = new Map();
  /**
   * type节点类型
   * 1.如果是null则表示文本节点; 
   * 2.如果是字符串则表示 HTML 原生节点; 
   * 3.如果是函数则表示控件
   */
  constructor(public type: null | string | (new () => Control), public props: any | { [name: string]: any }, public children: VNode[]) {
    this.type = type;
    this.props = props;
    this.children = children;
  }

  /**
   * 添加一个或多个子节点
   * @param child 要添加的字内容
   * @returns 返回 child
   */
  append<T extends any>(child: T | null) {
    if (child != null) {
      if (Array.isArray(child)) {
        for (const item of child) {
          this.append(item);
        }
      } else {
        this.children.push(child instanceof VNode ? child : new VNode(null, child, emptyArray))
      }
    }
    return child;
  }

  /**
   * 创建一个虚拟节点
   * TSX/JSX 中编译过程中通过此方法先将节点转换成 VNode
   * @param type 虚拟节点类型, 如果是null则表示文本节点;如果是字符串则表示HTML原生节点; 如果是函数表示控件
   * @param props 节点属性
   * @param childNodes 所有子内容
   * @returns 返回创建的虚拟节点
   */
  static create(type: VNode['type'], props: VNode['props'], ...childNodes: any[]) {
    const result = new VNode(type, props, []);
    result.append(childNodes);
    return result;
  }

  /**比较两个节点是否相同 */
  static isDiffVNode(newVNode: VNode, oldVNode?: VNode): boolean {
    return !oldVNode || newVNode.type !== oldVNode.type || 
    newVNode.type && newVNode.props && oldVNode.props && newVNode.props.id && oldVNode.props.id && newVNode.props.id !== oldVNode.props.id;
  }

  /**
   * 更新子节点  
   * @param parentElm 父节点 
   * @param newCh 当前更新的子节点
   * @param oldCh 当前更新子节点的原子节点
   */
  static updateChildren(parentElm: HTMLElement, newCh: VNode[], oldCh: VNode[]) {
    let oldStartIdx = 0, newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1, newEndIdx = newCh.length - 1;
    let oldStartVNode = oldCh[0], newStartVNode = newCh[0];
    let oldEndVNode = oldCh[oldEndIdx], newEndVNode = newCh[newEndIdx];

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (!this.isDiffVNode(oldStartVNode, newStartVNode)) {
        this.sync(newStartVNode, oldStartVNode, false);
        oldStartVNode = oldCh[++oldStartIdx];
        newStartVNode = newCh[++newStartIdx];
      } else if (!this.isDiffVNode(oldEndVNode, newEndVNode)) {
        this.sync(newEndVNode, oldEndVNode, false);
        oldEndVNode = oldCh[--oldEndIdx];
        newEndVNode = newCh[--newEndIdx];
      } else if (!this.isDiffVNode(oldStartVNode, newEndVNode)) {
        this.sync(newEndVNode, oldStartVNode, false);

        parentElm.insertBefore(oldStartVNode.result instanceof Control ? oldStartVNode.result.elem : oldStartVNode.result,
          (oldEndVNode.result instanceof Control ? oldEndVNode.result.elem : oldEndVNode.result).nextSibling);

        oldStartVNode = oldCh[++oldStartIdx]
        newEndVNode = newCh[--newEndIdx]
      } else if (!this.isDiffVNode(oldEndVNode, newStartVNode)) {
        this.sync(newStartVNode, oldEndVNode, false);

        parentElm.insertBefore(oldEndVNode.result instanceof Control ? oldEndVNode.result.elem : oldEndVNode.result,
          oldStartVNode.result instanceof Control ? oldStartVNode.result.elem : oldStartVNode.result);

        oldEndVNode = oldCh[--oldEndIdx]
        newStartVNode = newCh[++newStartIdx]
      } else {
        this.sync(newStartVNode);
        if (newStartVNode.result instanceof Control) {
          newStartVNode.result.$renderTo(parentElm, oldStartVNode.result);
        } else {
          parentElm.insertBefore(newStartVNode.result, oldStartVNode.result instanceof Control ? oldStartVNode.result.elem : oldStartVNode.result)
        }
        newStartVNode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      const refElm = !!newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].result as HTMLElement : null;
      this.addVNode(parentElm, newCh, newStartIdx, newEndIdx, refElm)
    } else if (newStartIdx > newEndIdx) {
      this.removeVNode(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
  }

  /**
   * 移除虚拟节点，从真实dom中移除当前虚拟节点
   * @param body 
   * @param VNodes 
   * @param start 
   * @param end 
   */
  static removeVNode(body: HTMLElement, VNodes: VNode[], start: number, end?: number) {
    end = end === undefined ? VNodes.length : end;
    for (; start <= end; start++) {
      const childResult = VNodes[start].result;
      if (childResult instanceof Control) {
        childResult.$renderTo(null);
      } else {
        body.removeChild(childResult);
      }
    }
  }

  /**
   * 新增虚拟节点, 将虚拟节点添加到真实dom中
   * @param body 
   * @param VNodes 
   * @param start 
   * @param end 
   */
  static addVNode(body: HTMLElement, VNodes: VNode[], start: number, end?: number, refChild?: HTMLElement) {
    end = end === undefined ? VNodes.length : end;
    for (; start <= end; start++) {
      if (!VNodes[start].result) {
        this.sync(VNodes[start]);
      }
      let result = VNodes[start].result
      if (result instanceof Control) {
        result.$renderTo(body, refChild);
      } else {
        if(refChild){
          body.insertBefore(result, refChild);
        }else{
          body.appendChild(result)
        }
      }
    }
  }

  /**
   * 同步虚拟节点, 创建虚拟节点对应的真实节点
   * @param newVNode 新虚拟节点
   * @param oldVNode 如果指定了原虚拟节点,则同步时尽量重用上次创建的真实节点
   * @param changed true强制更新节点, false强制使用原节点
   * @return 如果根节点发生改变则返回 true, 否则返回 false
   */
  static sync(newVNode: VNode, oldVNode?: VNode | null, changed?: boolean) {
    //1.同步根节点
    //如果节点类型和ID不变,则重用上次生成的节点,否则重新生成
    const type = newVNode.type;
    changed = changed === undefined ? this.isDiffVNode(newVNode, oldVNode) : changed;
    const isControl = typeof type === "function";
    //实例化节点 / 生成dom节点   change true 创建新节点， false 使用原始旧节点
    const result = newVNode.result = changed ? type ? isControl ? new (type as (new () => Control))() : document.createElement(type as string) : document.createTextNode(newVNode.props) : oldVNode.result;
    if(!changed){
      newVNode.propDirectives = oldVNode.propDirectives;
    }
    if (type) {
      //2.同步属性
      //TODO 应该将model的绑定放在最后执行,因为他需要访问设置了的props
      let body: HTMLElement | null;
      if (isControl) {
        if (!changed) {
          for (const prop in oldVNode.props) {
            if ((!newVNode.props || !(prop in newVNode.props)) && prop !== "control") {
              newVNode.propDirectives.has(prop) && newVNode.propDirectives.get(prop).destory();
              newVNode.propDirectives.has(prop) && newVNode.propDirectives.delete(prop);
            }
          }
        }
        for (const prop in newVNode.props) {
          const value = newVNode.props[prop];
          if ((changed || !oldVNode.props || value !== oldVNode.props[prop]) || prop === "model") {
            if(newVNode.propDirectives.has(prop)){
              newVNode.propDirectives.get(prop).commit(value)
            }else{
              let propDirective;
              if(VNode.isDirective(prop)){
                const directive = has(directives, prop) ? directives[prop] : userDirectives[prop];
                propDirective = new directive(result, value, curentControl);
              }else{
                propDirective = new AttributeCommitter(prop, value, (result as Control))
              }
              newVNode.propDirectives.set(prop, propDirective);
            }
          }
        }

        //更新控件$parent,$children信息
        setControlValue(result, "$parent", curentControl)
        if ((newVNode.children.length || !changed && oldVNode.children.length)) {
          setControlValue(result, "$children", newVNode.children.slice(0, newVNode.children.length))
        }
        if(!(result as Control).$mounted){
          addCacheMth(result);
        }

        body = (result as Control).body;
        //防止Control判断未改变,导致节点整体未发生变化的情况
        !body && oldVNode && oldVNode.result && (oldVNode.result as Control).$mounted && (body = (oldVNode.result as Control).elem);
      } else {
        //HTMLElement / Text    设置节点Attribute
        for (const prop in newVNode.props) {
          const value = newVNode.props[prop];
          if (changed || !oldVNode.props || !isFunction(value) && value !== oldVNode.props[prop] || VNode.isDirective(prop)) {
            if(oldVNode && oldVNode.propDirectives.has(prop)){
              newVNode.propDirectives.set(prop,oldVNode.propDirectives)
            }
            VNode.set(newVNode, result as HTMLElement, prop, value);
          }
        }
        if (!changed) {
          //复用oldDom, 如果此时old prop发生变化
          for (const prop in oldVNode.props) {
            if (!newVNode.props || !(prop in newVNode.props)) {
              VNode.set(newVNode, result as HTMLElement, prop, null);
            }
          }
        }
        body = result as HTMLElement;
      }
      
      //3. 同步子节点
      if (body) {
        if (newVNode.children.length) {
          if (oldVNode && oldVNode.children.length) {
            this.updateChildren(body, newVNode.children, oldVNode.children);
          } else {
            this.addVNode(body, newVNode.children, 0, newVNode.children.length - 1)
          }
        } else {
          if (oldVNode && oldVNode.children.length) {
            this.removeVNode(body, oldVNode.children, 0, oldVNode.children.length - 1);
          }
        }
      }

    } else if (!changed && oldVNode.props !== newVNode.props) {
      //2.文本节点同步属性
      (result as Text).textContent = newVNode.props;
    }
    return changed;
  }

  /**
   * 设置节点的属性  
   * @param target 要设置的节点
   * @param prop 属性名
   * @param value 属性值
   * @param args 部分属性需要附加参数  内置class,style, 监听事件的 selector等需要附加参数
   * @param scope 时间作用域
   */
  static set(vnode: VNode, target: HTMLElement, prop: string, value = null, args?: any, ) {
    if (/^on[^a-z]/.test(prop)) {   //监听事件
      const eventName = prop.slice(2).toLowerCase();
      dom.on(target, eventName, args || "", value, curentControl);
    } else if(VNode.isDirective(prop)){  //自定义标签
      if(value){
        if(!vnode.propDirectives.has(prop)){
          const directive = has(directives, prop) ? directives[prop] : userDirectives[prop];
          let propDirective = new directive(target, value, curentControl);
          vnode.propDirectives.set(prop, propDirective);
        }
      }else{
        //移除自定义指令对象
        vnode.propDirectives[prop] && vnode.propDirectives[prop].destory();
      }
    } else{ //其余属性
      dom.setAttr(target, prop, value);
    }
  }

  /**
   * 检测当前属性是否是指令
   * @param prop 
   * @returns 
   */
  static isDirective(prop:string){
    return has(directives, prop) || has(userDirectives, prop)
  }

  static copyVNode(target: VNode){
    const { type, props, children } = target;
    return VNode.create(type, props, children);
  }
}