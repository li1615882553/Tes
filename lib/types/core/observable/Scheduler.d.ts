import Watcher from "./Watcher";
/**异步更新队列 */
export declare const queue: Watcher[];
/**判断一个异步更新队列正在等待执行或正在执行 */
export declare const queueMap: Map<Watcher, Boolean>;
/**当前正在执行的位置 */
export declare let index: number;
export declare function queueUpdate(watcher: Watcher): void;
