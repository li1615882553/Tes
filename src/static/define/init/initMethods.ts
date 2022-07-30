import { create } from "../../../shared/util/index";
import injectionToInstance from "../util/injectionToInstance";

/**
 * 绑定methods内部this指向,并且绑定到target
 * @param isCustomElement 
 * @param target 
 * @param root 
 * @param methods 
 * @param targetProxy 
 */
export default function initMethods(target, methods, targetProxy){
  // $methods 实例属性,非相应式,会在实例上添加方法的副本
  const methodsTarget = create(null);

  if(methods){
    Object.keys(methods).forEach((name) => {
      //将 method 方法中this指向当前实例
      const method = methodsTarget[name] = methods[name].bind(targetProxy);
  
      injectionToInstance(target, name, {
        writable: true,
        value: method
      });
    })
  }
}