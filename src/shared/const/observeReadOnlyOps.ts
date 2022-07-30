import { dataPorxyBeforOptions, dataOptions } from "../../types/index";
import Observe, { observerProxySetValue } from "../../core/observable/Observe";
import { ToggleCollection } from "../../core/observable/Observe";
import { has } from "../util";
/**
 * 使观察者对象只读 ( 不可删, 不可写(model属性除外) )
 */
const options: dataPorxyBeforOptions = () => 0;
const propsSetOptions:dataPorxyBeforOptions = (target, name) => {
  if(name === "value" && has(target, "model")){
    return null;
  }
  return 0;
}

const dataReadOnlyOptions: dataOptions = {
  set: {
    before: propsSetOptions
  },
  deleteProperty: {
    before: options
  }
};

export default dataReadOnlyOptions;


/**
 * 内部修改只读对象后触发更新   
 * 将 propsState 修改为true
 * @param target 
 * @param name 
 * @param value 
 */
export function setValueByReadOnly(targetProxy, name, value) {
  if (Observe.observeProxyMap.has(targetProxy)) {
    const { subs, deepSubs, lastValue, isArray, target } = Observe.observeProxyMap.get(targetProxy);

    //写入值并触发更新
    observerProxySetValue(subs, deepSubs, lastValue, isArray, target, name, value, targetProxy);
  }
}


export function getValueByReadOnly(target, name) {
  if (Observe.observeProxyMap.has(target)) {
    const { subs, deepSubs, lastValue} = Observe.observeProxyMap.get(target);
    const value = target[name];
    const watcher = ToggleCollection.target;
    if (watcher) {
      //添加订阅信息
      deepSubs.has(watcher) || watcher.add(subs, name);
      //存储本次值
      lastValue[name] = value;
    }
  }
}