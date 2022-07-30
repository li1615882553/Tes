import Observe, { ToggleCollection } from "../../../core/observable/Observe";

const hasTraverse = new Set();

function traverse(value:any, deep:number){
  const options = Observe.observeProxyMap.get(value);

  if(options){
    if(hasTraverse.has(value)) return ;

    hasTraverse.add(value);

    if (deep) {
      //进行遍历 对象添加监听
      if (options.isArray) {
        value.forEach((_value) => traverse(_value, deep));
      } else {
        Object.keys(value).forEach(key => {
          traverse(value[key], deep);
        })
      }
    } else {
      options.deepSubs.add(ToggleCollection.target);
    }
  }
}

export default (value, deep) => {
  traverse(value, deep);
  hasTraverse.clear();
}