import { isEqual, isFunction } from "../../shared/util/index";
import Control from "../../core/VNode/Control";
import Observe from "../../core/observable/Observe";
import { setValueByReadOnly } from "../../shared/const/observeReadOnlyOps";

export default class AttributeCommitter {
  public init: boolean = false;
  constructor(public key: string, public value: any, public control: Control) {
    this.commit(value);
  }
  commit(value: any): void {
    if (!this.init || !isEqual(value, this.value)) {
      value = Observe.observeProxyMap.has(value) ? Observe.observeProxyMap.get(value).target : value;
      setValueByReadOnly(this.control.props, this.key, value);
      this.value = value;
      this.init = true;
    }
  }

  //TODO 销毁时删除依赖的收集等信息
  destory(): void {
    
  }
}