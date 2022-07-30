import Observe from "./Observe";
import { create, noop } from "../../shared/util/index";
import { queueMap, queue, index } from "./Scheduler";
import Watcher from "./Watcher";

/**
 * 计算属性
 * 一个对象实例一个Computed对象
 */
export default class Computed {
  public target: any;
  /**计算属性容器的观察者对象 */
  public targetProxy: any;
  /**计算属性容器拦截器 */
  public targetProxyInterceptor: any;
  /**当前计算属性容器参数 */
  public optionsMap: any;

  public self: any;

  public observeOptions: any;

  public isWatch: boolean;

  constructor(self: any, isWatch: boolean) {
    this.optionsMap = new Map();

    this.target = create(null);

    //渲染watcher收集依赖的对象
    this.targetProxy = Observe.observe(this.target);
    /** 当前计算属性容器的获取与修改拦截器 */
    this.targetProxyInterceptor = new Proxy(this.targetProxy, {
      get: computedTargetProxyInterceptorGet(this.optionsMap),
      set: computedTargetProxyInterceptorSet(this.optionsMap),
      deleteProperty: () => true
    });
    this.self = self;
    this.isWatch = isWatch;
    this.observeOptions = !isWatch && Observe.observeMap.get(this.target);
  }

  /**
   * 添加计算属性
   * @param name 计算属性名称
   * @param computed 计算属性 getter/setter 对象
   */
  add(name, computed) {
    const { self, isWatch, optionsMap, target, targetProxy, observeOptions } = this;

    /** 计算属性的 setter */
    const set = (computed.set || noop).bind(self);
    /** 计算属性的 getter */
    const get = computed.get.bind(self);
    /** 计算属性的 watcher */
    const watcher = new Watcher(
      self,
      () => {
        if (isWatch) return (target[name] = get());
        //如果是计算属性 需要触发更新
        return (targetProxy[name] = get(self));
      },
      true
    );
    // 存储计算属性参数
    optionsMap.set(name, {
      watcher,
      set
    });
  }

  delete(name) {
    const options = this.optionsMap.get(name);

    if (options) {
      const watch = options.watcher;
      watch.clean();

      this.optionsMap.delete(name);
      //如果当前 计算属性 在异步更新队列中,则进行删除
      if (queueMap.has(watch)) {
        queueMap.delete(watch);
        for (let i = index, len = queue.length; i < len; i++) {
          if (queue[i] === watch) {
            queue.splice(i, 1);
            break;
          }
        }
      }
    }
  }

  /**
   * 清空计算属性
   */
  clean() {
    for (const [name] of this.optionsMap) {
      this.delete(name);
    }
  }
}

/**
 * 计算属性容器get拦截器
 * @param optionsMap 
 * @returns 
 */
function computedTargetProxyInterceptorGet(optionsMap) {
  return (target, name) => {
    // 获取计算属性的参数
    const options = optionsMap.get(name);

    if (options) {
      const watcher = options.watcher;
      if (!watcher.isInit || watcher.shouldUpdate) {
        watcher.getValue();
      }
    }
    return target[name];
  }
}

/**
 * 计算属性容器set拦截器
 * @param optionsMap 
 * @returns 
 */
function computedTargetProxyInterceptorSet(optionsMap) {
  return (target, name, value) => {
    // 获取计算属性的参数
    const options = optionsMap.get(name);

    if (options) {
      options.set(value);
      return true;
    }
    return true;
  }
}