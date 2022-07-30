import { isString }  from "../../../shared/util/index";
/**
 * 解析 watch 中的值 字符串则定位到当前对象内的数据,方法则直接使用方法
 * @param expOrFn 
 * @param self 
 * @returns 
 */
export default function parseExpOrFn(expOrFn: string | (() => any), self){
  if(isString(expOrFn)){
    const segments = expOrFn.split('.');
    return function(){
      let obj = this;
      for(const segment of segments){
        if(!obj) return ;
        obj = obj[segment];
      }
      return obj;
    }.bind(self)
  }else{
    return expOrFn.bind(self);
  }
}

export function parseSetExp(exp: string, self){
  const segments = exp.split('.');
  if(segments.length === 1)  return  (value) => { self[exp as string] = value };
  if(segments.length === 2) return (value) => { self[segments[0]][segments[1]] = value };
}
