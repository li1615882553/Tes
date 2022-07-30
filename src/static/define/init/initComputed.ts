import Computed from "../../../core/observable/Computed";
import injectionToInstance from "../util/injectionToInstance";
import injectionPrivateToInstance from "../util/injectionPrivateToInstance";
import { isEmptyObject } from "../../../shared/util/index";
import Observe from "../../../core/observable/Observe";
import dataReadOnlyOptions from "../../../shared/const/observeReadOnlyOps";

/**
 * 存放每个实例的 computed 相关数据
 */
export const computedMap = new WeakMap();
/**
 * 空计算属性
 */
let emptyComputed;

export default function initComputed(target, options, targetProxy){
  const computeds = options.computed;

  if(isEmptyObject(computeds)){
    return injectionPrivateToInstance(target, {
      $computed: emptyComputed || (
        emptyComputed = Observe.observe({}, dataReadOnlyOptions)
      )
    })
  }

  const computedInstance = new Computed(targetProxy, false);
  const computedInstanceTargetProxyInterceptor = computedInstance.targetProxyInterceptor;

  // 存储当前实例 computed 相关数据
  computedMap.set(targetProxy, computedInstance);

  Object.keys(computeds).forEach(name => {
    computedInstance.add(name, computeds[name]);
    //将计算属性挂载到target, 通过Observe访问时因存在set,所以
    injectionToInstance(target, name, {
      get: () => computedInstanceTargetProxyInterceptor[name],
      set: (value) => (computedInstanceTargetProxyInterceptor[name] = value)
    })
  })

  //将$computed注入到target中
  injectionPrivateToInstance(target, {
    $computed: computedInstanceTargetProxyInterceptor
  })
}