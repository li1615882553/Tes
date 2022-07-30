import { isString } from "../../shared/util/index";
import Observe from "../observable/Observe";

/**
 * 挂载实例
 * @param selector 
 */
export default function $mount(selector:string | HTMLElement){
  const $info = this.$info;
  const { isMounted, isCustomElement } = $info;

  //实例且未挂载
  if(!isCustomElement && !isMounted){
    const el = selector && (isString(selector) ? document.querySelector(selector as string) : selector);

    //不允许挂到 body 和 html 下
    if(!el || el === document.body || el === document.documentElement){
      return ;
    }

    //将挂载对象保存到实例
    Observe.observeProxyMap.get(this).target.$el = el;

    //执行 render 方法,进行渲染
    this.$forceUpdate();

    return this;
  }
}