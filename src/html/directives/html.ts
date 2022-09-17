import { setHtml } from "../dom/index";
import Control from "../../core/VNode/Control";


export default class HtmlDirective{
  constructor(public element: HTMLElement | Control, public value, public control: any) {
    this.commit(value)
  }

  commit(value){
    setHtml(this.element instanceof HTMLElement ? this.element : this.element.elem, value);
  }
}