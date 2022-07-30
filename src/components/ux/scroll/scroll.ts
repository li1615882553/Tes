import { getStyle, getRect } from "../dom/dom";

/**
 * 返回指定元素第一个可滚动的父元素
 * @param elem 指定的元素
 * @returns 返回可滚动的父元素
 */
export function scrollParent(elem: HTMLElement | Document) {
    if (elem.nodeType !== 9) {
        while ((elem = elem.parentElement as HTMLElement)
            && elem.nodeType === 1
            && !/^(?:auto|scroll)$/.test(getStyle(elem, "overflow")));
    }
    return elem as HTMLElement | Document
}

/**
 * 判断指定元素是否在可见区域内
 * @param elem 要判断的元素或文档
 * @param scrollable 滚动的容器元素
 * @param padding 判断在区域内的最小距离
 * @returns 如果元素部分或全部都在可见区域内则返回true, 否则返回false
 */
export function isScrollIntoView(elem: HTMLElement | Document, scrollable: HTMLElement | Document = scrollParent(elem), padding = 0){
    const container = getRect(scrollable);
    const rect = getRect(elem);
    const deltaX =rect.x - container.x;
    const deltaY = rect.y - container.y;
    return (deltaX < padding ? deltaX + rect.width > padding : deltaX < container.width ) && (deltaY < padding ? deltaY + rect.height > padding : deltaY < container.height);
}

/**
 * 设置滚动到当前指定元素或文档时的回调
 * @param elem 要绑定时的元素或文档
 * @param callbcak 滚动到当前指定元素时的回调
 * @param once 是否只触发一次
 * @param scrollable 滚动的容器元素
 * @param padding 判断是否在区域内的最小距离
 */
export function scrollShow(elem: HTMLElement | Document, callbcak: () => void, once = true, scrollable:HTMLElement | Document = scrollParent(elem), padding = 0) {
    const container = scrollable.nodeType === 9 ? (scrollable as Document).defaultView : scrollable;
    let inView = false;
    const handleScroll = () => {
        const oldInView = inView;
        if((inView = isScrollIntoView(elem, scrollable, padding))){
            if(!oldInView){
                callbcak();
            }
            if(once) {
                container.removeEventListener("scroll", handleScroll, false);
            }
        };
        container.addEventListener("scroll", handleScroll, false);
        handleScroll();
    }
}