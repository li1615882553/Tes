import Observe from "../../../core/observable/Observe";
import dataObserveOptions from "../../../shared/const/observeOps";
import initForceUpdate from "../../../core/init/initForceUpdate";
import initOptions from "./initOptions";
import initProps from "./initProps";
import initMethods from "./initMethods";
import initComputed from "./initComputed";
import initWatch from "./initWatch";

/**
 * 初始化当前组件属性
 * @param name 组件名称
 * @param options 组件配置
 * @param userOptions 用户组件配置
 * @returns 
 */
export default function init(name, options) {
  //创建整个实例的观察者对象
  const TesProxy = Observe.observe(this, dataObserveOptions);

  initOptions(this, name);
  initProps(this, TesProxy);
  initMethods(this, options.methods, TesProxy);

  //运行 beforeCreate 生命周期函数
  this.componentWillCreate();

  initComputed(this, options, TesProxy);
  initWatch(this, options, TesProxy);
  //确保renderWatcher在当前组件最后创建   userWatcher执行顺序优于renderWatcher
  initForceUpdate(this, TesProxy);

  //运行 created 生命周期函数
  this.componentCreated();
  return TesProxy;
}