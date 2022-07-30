import { ToggleCollection } from"./Observe";
import { queueUpdate } from "./Scheduler";
import { uid } from "../../shared/util/index";

export default class Watcher{
  public targetProxy:any;
  public id:string;
  public deps: Set<any>;
  public fn:Function;
  public isInit:boolean = false;
  public before:Function;
  /**针对计算属性生效,计算属性值发生变化后,下次访问应重新获取值 */
  public shouldUpdate:boolean = false;
  [x: string]: any;

  /**
   * 构造Watcher对象
   * @param fn 需要收集依赖的方法
   */
  constructor(targetProxy:any, fn:Function, public isComputed:boolean = false, before ?: Function){
    //当前构件的观察实例
    this.targetProxy = targetProxy;
    //当前Watcher的id
    this.id = uid();
    //当前watcher在运行时收集的依赖合集
    this.deps = new Set();
    //需要收集依赖的方法
    this.fn = fn;
    //执行watch方法前执行的回调函数
    this.before = before;
  }

  /**
   * 重新收集依赖
   */
  getValue(){
    //清空依赖 上次收集到的依赖
    this.clean();
    //标记初始化
    this.isInit = true;
    if(this.isComputed) this.shouldUpdate = false;

    //重新调用watch传入的方法,收集依赖
    let result;
    ToggleCollection.toggle(this, () => {
      //方法执行的过程中, 触发相应对象的 getter 进而将依赖存储进deps
      result = this.fn();
    })

    return result;
  }

  /**
   * 依赖重新收集
   */
  update(){
    if(this.isComputed){
      this.shouldUpdate = true;
    }
    queueUpdate(this);
  }

  /**
   * 当前对象 key 添加订阅信息
   * @param subs 当前观察者子集对象的 watcher 集合
   * @param name 当前访问对象的key
   */
  add(subs:{string: Set<Watcher>}, name:string){
    const sub = subs[name] || ( subs[name] = new Set() );

    //添加当前 watcher 到 sub 中
    //当前值被改变时,调用到 update 方法进入更新队列
    sub.add(this);

    //添加 sub 的信息到当前 watcher 中
    //当依赖方法被重新调用, 会移除订阅的依赖
    this.deps.add(sub);
  }

  /**
   * 清理收集的依赖
   */
  clean(){
    for(const watch of Array.from(this.deps))  watch.delete(this);
    this.deps.clear();
  }
}

