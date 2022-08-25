import { isEqual } from "../../shared/util/index";
import VNode from "../../core/VNode/VNode";

export default class TextDirective{
  public value:any;
  constructor(element:VNode){

  }

  commit(value, isDirectiveFn){
    if(isDirectiveFn) return value(this);

    if(!this.value || !isEqual(this.value, value)){

    }
  }
}