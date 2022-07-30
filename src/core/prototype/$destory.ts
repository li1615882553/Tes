import { watchMap } from "./$watch";
import { computedMap } from "../../static/define/init/initComputed";
import { renderWatcherCache } from "../init/initForceUpdate";

export default function $destory(){
    this.componentWillDestory();

    //注销实例所有计算属性和watch数据
    removeComputed(watchMap, this);
    removeComputed(computedMap, this);

    //移除 render 方法收集到的依赖
    removeRenderDeps(this);

    this.componentDestoryed();
}

function removeComputed(optionsMap, self){
    optionsMap.has(self) && optionsMap.get(self).clean();
}


/**
 * 移除 render 方法收集到的依赖
 * @param targetProxy 
 */
function removeRenderDeps(targetProxy){
    const watch = renderWatcherCache.get(targetProxy);

    if(watch){
        watch.clean();
    }
}