import { isString, isReserved, has, defineProperty } from "../../../shared/util/index"

/**
 * 在实例和自定义元素上建立对象的引用
 */
export default (target, key, attributes) => {
  const keyIsString = isString(key);

  if(keyIsString && isReserved(key)){
    return ;
  }

  //实例中存在同名变量,则删除
  has(target, key) && delete target[key];
  //在实例中添加变量映射
  defineProperty(target, key, attributes);
}