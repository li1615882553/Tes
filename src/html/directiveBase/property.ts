import VNode from "../../core/VNode/VNode";
import { isEqual } from "../../shared/util/index";
import { Directive, modifiers } from "./directive";

export default class BasicPropertyDirective extends Directive{
  /**当前property的key */
  public name:string;
  /**当前property的值 */
  public value: any;

  constructor(node:VNode, name:string, modifiers:modifiers){
    super(node, modifiers);

    this.name = name;
  }

  commit(value, isDirectiveFn){
    if (isDirectiveFn) return value(this);
    if(!isEqual(value, this.value)){
      this.value = value;
      // 更新属性值
      this.node.result[this.name] = value;
    }
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }
}