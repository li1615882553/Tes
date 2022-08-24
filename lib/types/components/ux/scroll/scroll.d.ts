/**
 * 返回指定元素第一个可滚动的父元素
 * @param elem 指定的元素
 * @returns 返回可滚动的父元素
 */
export declare function scrollParent(elem: HTMLElement | Document): HTMLElement | Document;
/**
 * 判断指定元素是否在可见区域内
 * @param elem 要判断的元素或文档
 * @param scrollable 滚动的容器元素
 * @param padding 判断在区域内的最小距离
 * @returns 如果元素部分或全部都在可见区域内则返回true, 否则返回false
 */
export declare function isScrollIntoView(elem: HTMLElement | Document, scrollable?: HTMLElement | Document, padding?: number): boolean;
/**
 * 设置滚动到当前指定元素或文档时的回调
 * @param elem 要绑定时的元素或文档
 * @param callbcak 滚动到当前指定元素时的回调
 * @param once 是否只触发一次
 * @param scrollable 滚动的容器元素
 * @param padding 判断是否在区域内的最小距离
 */
export declare function scrollShow(elem: HTMLElement | Document, callbcak: () => void, once?: boolean, scrollable?: HTMLElement | Document, padding?: number): void;
