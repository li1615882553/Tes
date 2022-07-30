import Observe from "../observable/Observe";
import Watcher from "../observable/Watcher";
import render from "../VNode/render";
/**渲染函数的 Watcher 缓存 */
export const renderWatcherCache = new WeakMap();

export default function initForceUpdate(target, targetProxy){
    // let target = Observe.observeProxyMap.get(targetProxy).target;
    /**当前实例的渲染方法 */
    const userRender = target.render;
    const renderWatcher = new Watcher(targetProxy, 
    () => {
        if(userRender){
            render(target, userRender);
        }
    }, false, function() {
        if(target.$mounted){
            targetProxy.componentWillUpdate();
        }
    });

    //缓存当前实例渲染方法的Watcher
    renderWatcherCache.set(targetProxy, renderWatcher);
    //返回收集依赖方法
    // target.$watch = renderWatcher;
    // 将$forceUpdate放到 原型方法上
    target.$forceUpdate = renderWatcher
}