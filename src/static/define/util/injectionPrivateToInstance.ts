/**
 * 在实例和自定义元素上建立内部对象的引用
 */
export default (target, data) => {
  Object.keys(data).forEach(key => {
    //实例上直接写入, 常规操作有观察者对象进行拦截
    target[key] = data[key];
  })
}