import { isFunction, apply, isString } from "../../shared/util/index";
import $watch from "../../core/prototype/$watch";
import parseExpOrFn, { parseSetExp } from "../../core/prototype/util/parseExpOrFn";
import * as DOM from "../dom/index";
import Observe from "../../core/observable/Observe";
import { isEqual } from "../../shared/util/index";
import Control from "../../core/VNode/Control";
import AttributeCommitter from "../directiveBase/attribute";

export default class ModelDirective {
  public init: boolean;
  public unWatch: Function;
  /**（DOM节点）当前节点绑定的监听事件 */
  public events: Array<any> = [];
  public attributes: Map<string,AttributeCommitter> = new Map();
  public handler: Function;
  public set: Function;

  constructor(public element: HTMLElement | Control, public value: string, public control: any) {
    if (element instanceof Control) {
      this.handler = handleControl;
    } else {
      const tag = element.nodeName.toLowerCase();
      const type = (element as HTMLInputElement).type;

      if (tag === "select") {

      } else if (tag === "input" && type === "radio") {
        this.handler = handlerRadio;
      } else if (tag === "input" && type === "checkbox") {
        this.handler = handlerCheckBox;
      } else if (tag === "input" || tag === "textarea") {
        this.handler = handleDefault;
      }
    }
    //初始化
    this.commit(value)
  }

  commit(value: any) {
    if(this.element instanceof Control){
      this.handler(this, this.element)
    }else{
      if(this.init && isEqual(this.value, value)){
        ;
     }else{
       this.value = value;
       if (this.handler) {
         if (!this.init) {
           this.handler(this, this.element)
         }
       }
     }
    }
    this.init = true;
  }

  destory() {
    if (this.init) {
      this.unWatch();

      if(this.element instanceof Control){

      }else{
        this.events.forEach((args) => {
          apply(DOM.off, null, args);
        });
      }
    }
  }
}

function watch(model: ModelDirective, element: HTMLElement | Control, prop: string | ((value) => void)) {
  /**监听到绑定的值被更改后,给绑定的对象赋值方法 */
  const set = model.set = isFunction(prop) ? prop : parseSetExp(prop, element);
  
  const watchThis = element instanceof Control ? element: model.control;
  model.unWatch = $watch.call(
    watchThis,
    // 监听绑定的值
    parseExpOrFn(model.value, Observe.observeMap.get(model.control).proxy),
    // 响应绑定值更改
    (value) => set(value),
    { isCalledSelf: true }
  );
}

/**
 * 添加监听事件
 * @param model 
 * @param args 
 */
function addEvent(model, ...args) {
  model.events.push(args);
  apply(DOM.on, null, args);
}

/**
 * 对 input, texterea 元value素进行双向绑定
 * @param element 
 * @param options 
 */
function handleDefault(model: ModelDirective, element: HTMLElement) {
  watch(model, element, "value")

  let input;
  addEvent(model, element, "compositionstart", () => {
    (element as any).composing = true;
  })
  addEvent(model, element, "compositionend", () => {
    if (!(element as any).composing) return;

    (element as any).composing = false;
    input();
  })
  addEvent(model, element, "input", input = () => {
    if ((element as any).composing) return;

    //输入框中数据发生变化, 同步更新变量
    Observe.observeMap.get(model.control).proxy[model.value] = (element as HTMLInputElement).value;
  })
}

/**
 * 对 input[type="radio"]元素进行双向绑定
 * @param model 
 * @param element 
 */
function handlerRadio(model: ModelDirective, element: HTMLInputElement){
  //值变化 radio状态变化
  watch(model, element, (value) => {
    element.checked = value === (element.getAttribute('value') || null)
  }),
  //radio状态变化 带动值变化
  addEvent(model, element, "change", () => {
    Observe.observeMap.get(model.control).proxy[model.value] = (element as HTMLInputElement).value;
  })
}

/**
 * 对 input[type="checkbox"]元素进行双向绑定
 * @param model 
 * @param element 
 */
function handlerCheckBox(model:ModelDirective, element:HTMLElement){
  watch(model, element, "checked");
  addEvent(model, element, "change", function(e){
    parseSetExp(model.value, Observe.observeMap.get(model.control).proxy)((element as HTMLInputElement).checked)
  })
}

function handleControl(model:ModelDirective, element:Control){
  /**创建当前model的属性对象 */
  //TODO 可以不使用父到子的watch只使用AttributeCommitter即可
  let controlProxy = Observe.observeMap.get(model.control).proxy;

  if(model.attributes.has("value")){
    model.attributes.get("value").commit(controlProxy[model.value]);
  }else{
    model.attributes.set("value",new AttributeCommitter("value", controlProxy[model.value], element));
  }
  
  /**外部变量变化后,自动传入内部更新子组件   父 -> 子 */
  // watch(model, element, "props.value")

  /**内部变量发生变化时,自动更新外部父组件  子 -> 父*/
  if(!model.init){
    model.attributes.set("model",new AttributeCommitter("model", model.value, element));
    element.$watch(
      "props.value",
      (value) => controlProxy[this.value] = value
    )
  }
  
}