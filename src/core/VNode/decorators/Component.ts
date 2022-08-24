import Control from "../Control";
import { isFunction } from "../../../shared/util/index";

export declare type ControlClass = {
  new (...args: any[]):Control;
  [key:string]: any
}

export default function componentFactory(Component:ControlClass, options: any = {}) {
  options.name = options.name || Component.name;
  const proto = Component.prototype;

  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key === 'constructor') {
      return;
    }

    const descriptor = Object.getOwnPropertyDescriptor(proto, key);
    if (descriptor.value) {
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        (options.dataList || (options.dataList = [])).push(() => {
          return { [key]: descriptor.value };
        })
      }
    } else if (descriptor.get || descriptor.set) {
      //计算属性
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });

  //props
  const decorators = (Component as any).__decorators__;
  if (decorators) {
    decorators.forEach(fn => fn(options));
    delete (Component as any).__decorators__;
  }
  // const superProto = Object.getPrototypeOf(proto);
  Component.prototype.$options = options;
}