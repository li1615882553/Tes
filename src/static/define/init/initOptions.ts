import Observe from "../../../core/observable/Observe";
import { uid } from "../../../shared/util/index";
import dataReadOnlyOptions from "../../../shared/const/observeReadOnlyOps";
import injectionPrivateToInstance from "../util/injectionPrivateToInstance";
import VNode from "../../../core/VNode/VNode";

/**
 * 往实例选项中添加 $options(创建的数据) 和 $info 信息
 * @param isCustomElement 
 * @param target 
 * @param root 
 * @param name 
 */
export default function initOptions(target, name) {
  const elementId = `${name}-${uid()}`;

  /**实例信息 */
  const $info = Observe.observe({
    /**当前实例的UID */
    uid: elementId,
    /**当前自定义元素的名称 */
    name,
    /**存储关联元素 */
    _elem:undefined,
    /**当前组件关联的虚拟节点 */
    vNode: undefined,
    /**当时实例的首次挂载是否已完成 */
    isMounted: false,
    /**当前自定义元素是否在文档流中 */
    isConnected: false
  }, dataReadOnlyOptions);

  injectionPrivateToInstance(target, { $info })
}