import { isArray, isPlainObject, isFunction } from "../../../shared/util/index";
import { WatchOptions } from "../../../core/prototype/$watch";

function createWatch(expOrFn, watchOptions:WatchOptions | Array<WatchOptions>, targetProxy){
  if(isArray(watchOptions)){
    for(const handle of watchOptions){
      createWatch(expOrFn, handle, targetProxy);
    }
  }else if(isPlainObject(watchOptions) || isFunction(watchOptions)){
    targetProxy.$watch(expOrFn, watchOptions); 
  }
}

//watch 初始化
export default function initWatch(target, options, targetProxy){
  if(!options.watch){
    return ;
  }
  Object.keys(options.watch).forEach(expOrFn => {
    createWatch(expOrFn, options.watch[expOrFn], targetProxy);
  })
}