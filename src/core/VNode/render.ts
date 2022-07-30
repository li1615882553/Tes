import VNode from "../VNode/VNode";
import Control from "./Control";
import { create } from "../../shared/util/index";
import { execMountedMth, execWillMountMth } from "../VNode/util/catchCacheMth";
import Observe from "../observable/Observe";

/**当前 HTMLElement 节点的Control队列 */
export let ControlStack = [];
export let curentControl = create(null);

function basicRender(target, renderFunction: Function) {
    let targetProxy = Observe.observeMap.get(target).proxy;
    execWillMountMth(targetProxy);
    const oldVNode = target.$VNode;
    //同步当前控件中的 $VNode 为render中返回的 VNode 内容
    const newVNode = target.$VNode = renderFunction.call(targetProxy) || VNode.create(null, "");
    VNode.sync(newVNode, oldVNode);
    const result = newVNode.result as HTMLElement | Control;
    //更新Control节点状态
    target.elem = result instanceof Control ? result.elem : result;

    execMountedMth(targetProxy);
}

export default function render(target, renderFunction: Function) {
    // console.log('当前Control入栈', target.$info.uid)
    ControlStack.push(target);
    curentControl = target;
    basicRender(target, renderFunction);
    ControlStack.pop();
    curentControl = ControlStack[ControlStack.length - 1];
    // console.log('当前Control出栈', target.$info.uid)
}