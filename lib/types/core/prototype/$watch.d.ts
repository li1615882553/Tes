/**存放每个实例的 watch 数据 */
export declare const watchMap: WeakMap<object, any>;
export interface WatchOptions {
    /**对象内部值变化时也触发回调函数 */
    deep?: boolean;
    /**立即触发回调 */
    /**回调函数 */
    handler?: (this: any, value: any, oldValue: any) => void;
    /**是否通过 */
    readonly isCalledSelf?: boolean;
}
export default function $watch(expOrFn: string | (() => any), callback: ((this: any, value: any, oldValue: any) => void) | WatchOptions, options?: WatchOptions): any;
