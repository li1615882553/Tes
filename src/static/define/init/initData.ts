import { isFunction, has, ownKeys, create } from "../../../shared/util/index";
import Observe from "../../../core/observable/Observe";
import injectionToInstance from "../util/injectionToInstance";
import injectionPrivateToInstance from "../util/injectionPrivateToInstance";

/**
 * 初始化data属性   target.$data  并且将data属性添加到 target 上,访问此数据即访问 target.$data 的数据, target.$data即触发相应式
 * @param isCustomElement 
 * @param target 
 * @param root 
 * @param options 
 * @param targetProxy 
 * @returns 
 */
export default function initData(target, options, targetProxy) {
    const dataList = options.dataList;
    let dataTarget;

    if (dataList && dataList.length) {
        for (let data of dataList) {
            data = target[data];
            if (isFunction(data)) data = data.call(targetProxy);
            if (!dataTarget) dataTarget = data;

            for (let name of ownKeys(data)){
                has(dataTarget, name) || (dataTarget[name] = data[name]); 
            }
        }
    }else{
        dataTarget = create(null);
    }

    //将所有data,全部添加到 dataTarget中,一起监听
    const dataTargetProxy = Observe.observe(dataTarget);

    //将data的访问以及修改,和data对象整体的 Proxy 对象关联
    //并且将 属性 添加到 target 上
    for(let key of ownKeys(dataTarget)){
        injectionToInstance(target, key, {
            get: () => dataTargetProxy[key],
            set: (value) => (dataTargetProxy[key] = value)
        })
    }

    //将data的 Proxy 对象放到 $data 中
    injectionPrivateToInstance(target, {
        $data: dataTargetProxy
    })
}