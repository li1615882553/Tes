import Control from "../../core/VNode/Control";

export default class RefDirective {
  public refs:{
    [key: string]: Control | Control[]
  };
  public refName:string;
  constructor(public element: HTMLElement | Control, public value, public control: any) {
    this.commit(value)
  }
  commit(value: any) {
    if (this.element instanceof Control) {
      const {refName, refs} = value(this.element);
      this.refs = refs;
      this.refName = refName;
    }
  }
  destory() {
    delete this.refs[this.refName];
  }
}