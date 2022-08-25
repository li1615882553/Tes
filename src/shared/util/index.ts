export const { prototype, freeze, keys, create, assign } = Object;

export const { hasOwnProperty, toString } = prototype;

export const { isArray } = Array;

export const { has, apply, ownKeys, set, defineProperty, deleteProperty, getOwnPropertyDescriptor, getPrototypeOf} = Reflect;

export const emptyObject: any = freeze({});

export const emptyArray: any = freeze([]);


export function isFunction(target: any): target is Function {
  return typeof target === 'function'
}


export function isObject(target: any):target is object{
  return target !== null && typeof target === 'object';
} 


export function isSymbol(target: any):target is symbol{
  return typeof target === 'symbol';
}
/**
 * 判断传入的两个值是否相等
 */
export function isEqual(value, value2){
  return value === value2 || ( value !== value && value2 !== value2 );
}

/**
 * 判断一个对象是否是一个空对象
 * @param value 需要判断的对象
 * @returns 
 */
export function isEmptyObject(value:any):boolean{
  for(const item in value) return false;
  return true;
}

/**
 * 返回浅拷贝内容
 * @param value 
 * @returns 
 */
export function shallowCopy(value:any){
  if(isArray(value)){
    return value.slice(0);
  }else if(isObject(value)){
    return assign({}, value);
  }
  return value;
}

/**
 * 创建一个可以缓存方法返回值的方法
 * @param fn 需要缓存结果的方法
 * @returns 一个新方法,如果已经访问过则从缓存中获取,否则重新执行
 */
export function cache(fn) {
  const cache = create(null);

  return (key) => {
    if(has(cache, key)) return cache[key];
    return (cache[key]) = fn(key);
  }
}

/**
 * 判断首字母是否是 $ 
 * $字母为系统内置
 */
 export const isReserved = cache((key) => {
  const charCode = `${key}`.charCodeAt(0);
  return charCode === 0x24;
})

/**
 * 判断一个值是否是String
 * @param value 需要判断的对象
 * @returns 
 */
export function isString(value): value is string{
  return typeof value === 'string';
}

/**
 * 判断传入对象是否是纯粹的对象
 * @param value 需要判断的对象
 * @returns  是否是纯粹的对象
 */
export function isPlainObject(value) {
  return toString.call(value) === "[object Object]";
}

let _id: number = 0;

/**
 * 当前全局唯一UID
 */
export function uid(){
  return `${++_id}`;
}

/**空方法 */
export function noop(){}

/**返回传入的首个参数 */
export function returnArg(value) { return value; }

import Observe from "../../core/observable/Observe";
function getOriginObj(targetProxy, originObj, hasTransObj){
  if(hasTransObj.indexOf(targetProxy) !== -1) return;
  if(!originObj) originObj = {};
  hasTransObj.push(targetProxy);
  
  if(isObject(targetProxy)){
    for(let key in targetProxy){
      if(isObject(targetProxy[key])){
        originObj[key] = getOriginObj(targetProxy[key], originObj[key], hasTransObj)
      }else{
        if(hasTransObj.indexOf(targetProxy[key]) == -1){ 
          originObj[key] =  Observe.observeProxyMap.has(targetProxy[key]) ?  Observe.observeProxyMap.get(targetProxy[key]).target : targetProxy[key];
        }
      }
    }
  }
  return originObj;
}

export function toRaw(targetProxy){
  return getOriginObj(targetProxy, {}, []);
}