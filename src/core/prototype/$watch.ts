import { isPlainObject, emptyObject, isEqual, uid, shallowCopy } from "../../shared/util/index";
import Computed from "../observable/Computed";
import Observe, { ToggleCollection } from "../observable/Observe";
import parseExpOrFn from "./util/parseExpOrFn";
import traverse from "./util/traverse";

/**存放每个实例的 watch 数据 */
export const watchMap = new WeakMap();

export interface WatchOptions {
  /**对象内部值变化时也触发回调函数 */
  deep?: boolean,
  /**立即触发回调 */
  // immediate?: boolean,
  /**回调函数 */
  handler?: (this, value, oldValue) => void;
  /**是否通过 */
  readonly isCalledSelf?: boolean;
}

export default function $watch(expOrFn: string | (() => any), callback: ((this, value, oldValue) => void) | WatchOptions, options?: WatchOptions) {
  if (isPlainObject(callback)) {
    return $watch.call(this, expOrFn, (callback as WatchOptions).handler, callback);
  }

  //获取当前调用的对象
  const self = this || emptyObject;
  const watchFu = parseExpOrFn(expOrFn, self);
  let computedInstance;

  if (!watchFu) {
    return;
  }

  //当前实例到的 watch 相关数据
  if (watchMap.has(self)) {
    computedInstance = watchMap.get(self);
  } else {
    watchMap.set(
      self,
      computedInstance = new Computed(self, true)
    );
  }

  options = options || {};

  /** 当前 watch 的计算属性容器对象 */
  const computedInstanceTarget = computedInstance.target;
  /**当前 watch 的计算属性容器的获取与修改拦截器 */
  const computedInstanceTargetProxyInterceptor = computedInstance.targetProxyInterceptor;

  /**当前 watch 的存储名称 */
  const name = uid();
  const deep = options.deep || false;
  /**暂时无法判断是否是赋初值是否立即执行回调 */
  // let immediate = options.immediate;
  /** 值改变是否执行回调 */
  let runCallback = options.isCalledSelf;

  computedInstance.add(name, {
    get() {
      const oldValue = computedInstanceTarget[name];
      let value = (watchFu as (() => any))();

      // 收集深度监听依赖
      if (deep) {
        traverse(value, deep);
      }
      //转换为原始数据,防止内部修改触发刷新
      value = shallowCopy(Observe.getOriginTarget(value));
      if (runCallback) {
        if (!isEqual(value, oldValue) || deep) {  //immediate
          ToggleCollection.safety(() => {
            return (callback as ((this, value, oldValue) => void)).call(self, value, oldValue);
          })
        }
      }
      return value;
    }
  })

  //首次运行, 收集依赖
  computedInstanceTargetProxyInterceptor[name];

  runCallback = true;
  // immediate = false;

  //返回取消监听的方法
  return () => {
    computedInstance.delete(name);
  }
}