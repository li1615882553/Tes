/**
 * watcher 任务指定调度器
 */
import nextTick from "./util/nextTick";
import Watcher from "./Watcher";
import { getControlValue } from "../VNode/util/modifyControlValue";

/**异步更新队列 */
export const queue:Watcher[] = [];
/**判断一个异步更新队列正在等待执行或正在执行 */
export const queueMap = new Map<Watcher,Boolean>();
/**是否已经有一个队列正在等待执行或正在执行了 */
let waiting = false;
/**是否已经有一个队列正在执行 */
let flushing = false;
/**当前正在执行的位置 */
export let index = 0;

export function queueUpdate(watcher:Watcher){
  if(!queueMap.has(watcher)){
    queueMap.set(watcher, true);

    //当当前异步更新队列还未启动
    if(!flushing){
      queue.push(watcher);
    }else{
      //当前异步更新队列已经启动
      //将渲染watcher放在后面执行  将watcher插入队列
      let i = queue.length - 1;
      while(i > index){
        if(queue[i].targetProxy.$info.uid === watcher.targetProxy.$info.uid && queue[i].isComputed !== watcher.isComputed){
          if(queue[i].isComputed) break;
          else i--;
        }else if(+queue[i].id > +watcher.id){
          i--;
        }else{
          break;
        }
      }
      queue.splice(i+1, 0, watcher);
      // console.log(queue.slice(0, queue.length))
      // console.log(queue.map(item => item.targetProxy.$info.uid))
    }
    if(!waiting){
      waiting = true;
      nextTick(flushSchedukerQueue)
    }
  }
}

/**
 * 执行异步更新队列
 */
function flushSchedukerQueue(){
  flushing = true;
  index = 0;

  queue.sort(sortOrder)

  for(let watcher:Watcher; index < queue.length; index ++){
    watcher = queue[index];
    if (watcher.before) {
      watcher.before()
    }
    //执行更新
    watcher.getValue();
  }

  for(let i=queue.length-1; i>= 0; i--){
    const watcher = queue[i];
    const targetProxy = watcher.targetProxy
    if(targetProxy.$forceUpdate === watcher && targetProxy.$mounted ){
      targetProxy.componentUpdated();
    }
  }

  //当前异步更新队列已经执行完毕
  waiting = flushing = false;
  index = queue.length = 0;
  queueMap.clear();
}

function sortOrder(watchA:Watcher, watchB:Watcher){
  if(watchA.targetProxy.$info.uid === watchB.targetProxy.$info.uid && watchA.isComputed !== watchB.isComputed){
    return watchA.isComputed ? -1 : 1;
  }
  return +watchA.id - +watchB.id;
}