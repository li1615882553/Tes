import Observe from "../../../core/observable/Observe";
import { create } from "../../../shared/util/index";
import injectionToInstance from "../util/injectionToInstance";
import dataReadOnlyOptions from "../../../shared/const/observeReadOnlyOps";

/**
 * 初始化当前组件 props 属性
 * @param target 
 * @param props 
 * @param targetProxy 
 */
export default function initProps(target, targetProxy){
  //存储所有props的值
  const propsTarget = create(null);
  const propStateProxy =  Observe.observe(propsTarget, dataReadOnlyOptions);

  //获取所有props(只读)
  injectionToInstance(target, "props", {
    get: () => {
      return propStateProxy
    }
  })
}

