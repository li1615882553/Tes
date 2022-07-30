import { watchMap, WatchOptions } from "../../prototype/$watch";
import { create, isArray, apply } from "../../../shared/util/index";
import { createDecorator } from "./util";

export default function watch(path:string, options:Omit<WatchOptions, "handler" | "isCalledSelf"> = {}){
  return createDecorator(function(componentOptions, handler) {
    if(typeof componentOptions.watch !== 'object'){
      componentOptions.watch = create(null);
    }

    let watch = componentOptions.watch;
    if(typeof watch[path] === 'object' && !isArray(watch[path])){
      watch[path] = [watch[path]];
    }else if(typeof watch[path] === 'undefined'){
      watch[path]= [];
    }
    watch[path].push({
      //这里的 this 在哪里调用的this就是谁
      handler: function () {return apply(this[handler], this, arguments);}, 
      deep: options.deep || false, 
      // immediate: options.immediate || false,
      isCalledSelf: false})
  })
}