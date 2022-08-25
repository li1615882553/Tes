import { IPoint, Point, IRect, ISize } from './Rect'
type ParseWrapper = [number, string, string];
var parseFix: { [name: string]: ParseWrapper };
var parseContiner: HTMLElement;
/**
 * 解析一段 HTML 并返回相应的节点
 * @param html 要解析的HTML片段
 * @param context 创建节点使用的文档
 * @returns 返回要创建的节点, 如果HTML中包含多个节点,则返回一个文档片段
 */
export function parse(html: string, context = document) {
    if (!parseFix) {
        const select: ParseWrapper = [1, "<select mutiple='mutiple'>", "</select>"];
        const table: ParseWrapper = [1, "<table>", "</table>"];
        const tr: ParseWrapper = [3, "<table><tbody><tr>", "</tr></tbodt></table>"];
        parseFix = {
            __proto__: null,
            option: select,
            optgroup: select,
            thead: table,
            tbody: table,
            tfoot: table,
            caption: table,
            colgroup: table,
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: tr,
            th: tr,
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"]
        };
        parseContiner = document.createElement('div');
    }
    let container = context === document ? parseContiner : context.createElement("div");
    const match = /^<(\w+)/.exec(html);
    const wrapper = match && parseFix[match[1].toLowerCase()];
    if (wrapper) {
        container.innerHTML = wrapper[1] + html + wrapper[2];
        for (let level = wrapper[0]; level--; container = container.lastChild as HTMLElement);
    }
    let result: HTMLElement | DocumentFragment | Text = container.firstChild as HTMLElement || context.createTextNode(html)
    if (result.nextSibling) {
        //如果逐个添加内容,则会导致浏览器反复渲染,使用文档片段保存,然后一次性的将他们添加到文档中
        result = context.createDocumentFragment();
        while (container.firstChild) {
            result.appendChild(container.firstChild);
        }
    }
    return result;
}


/**
 * 查找 css 选择器匹配的所有元素
 * @param node  要查找的根节点
 * @param selector 要查找的CSS选择器
 * @returns 返回匹配的元素列表
 */
export function query(node: Element | Document, selector: string): HTMLElement[];
/**
 * 查找CSS选择器匹配的所有元素 
 * @param selector  要查找的CSS选择器
 * @returns 返回匹配的元素列表
 */
export function query(selector: string): HTMLElement[]

export function query(node: Element | Document | string, selector?: string) {
    return Array.prototype.slice.call(querySelector(node, selector))
}

/**
 * 查找CSS选择器匹配的第一个元素
 * TODO 解决无法获取自身情况
 * @param node 要查找的根节点
 * @param selector 要查找的CSS选择器
 * @returns 返回匹配的第一个元素,如果找不到则返回null
 */
export function find(node: Element | Document, selector: string): HTMLElement | null;

/**
 * 查找CSS选择器匹配的第一个元素
 * @param selector 要查找的CSS选择器
 * @returns 返回匹配的第一个元素,如果找不到则返回null
 */
export function find(select: string): HTMLElement | null;

export function find(node: Element | Document | string, selector?: string) {
    return querySelector(node, selector, true);
}


function querySelector(node: Element | Document | string, selector?: string, first?: boolean) {
    if (typeof node === 'string') {
        selector = node;
        node = document;
    }
    return first ? node.querySelector(selector!) : node.querySelectorAll(selector!);
}

/**
 * 判断元素是否匹配指定的CSS选择器
 * @param elem 要判断的元素
 * @param selector 要判断的CSS选择器
 * @returns 如果匹配则返回 true, 否则返回false
 * @example matches(document.body, 'body') //true
 */
export function match(elem: Element, selector: string) {
    if (elem.matches) {
        return elem.matches(selector);
    }
    const parent = elem.parentNode as HTMLElement;
    const actualParent = parent || elem.ownerDocument.documentElement;
    parent || actualParent.appendChild(elem);
    try {
        return Array.prototype.indexOf.call(querySelector(actualParent, selector), elem) >= 0;
    } finally {
        parent || actualParent.removeChild(elem);
    }
}
/**
 * 获取节点的第一个子元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的 css 选择器
 * @returns 返回元素, 如果元素不存在则返回null
 */
export function first(node: Node, selector?: string) {
    return walk(node, selector, "nextSibling", "firstChild")
}

/**
 * 获取节点的最后一个子节点
 * @param node 要获取的节点
 * @param selector 用于筛选元素的 css 选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
export function last(node: Node, selector?: string) {
    return walk(node, selector, "previousSibling", "lastChild");
}

/**
 * 获取节点的下一个相邻元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的CSS选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
export function next(node: Node, selector?: string) {
    return walk(node, selector, "nextSibling");
}

/**
 * 获取节点的上一个相邻元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的CSS选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
export function prev(node: Node, selector?: string) {
    return walk(node, selector, "previousSibling");
}

/**
 * 获取节点的父元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的CSS选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
export function parent(node: Node, selector?: string) {
    return walk(node, selector, "parentNode");
}

function walk(node: Node | null, selector: string | undefined,
    nextProp: "nextSibling" | "parentNode" | "previousSibling",
    firstProp: typeof nextProp | "firstChild" | "lastChild" = nextProp) {
    for (node = node[firstProp]; node; node = node[nextProp]) {
        if (node.nodeType === 1 && (!selector || match(node as Element, selector))) {
            return node as HTMLElement;
        }
    }
    return null;
}

/**
 * 获取指定元素的属性值
 * @param elem 要获取的元素
 * @param attrName 要获取的属性名
 * @returns 返回的属性, 如果不存在则返回 null 
 */
export function getAttr(elem: HTMLElement, attrName: string) {
    return attrName in elem ? (elem as any)[attrName] : elem.getAttribute(attrName);
}

/**
 * 设置指定元素的属性值
 * @param elem 要设置的元素
 * @param attrName 要设置的属性名
 * @param value 要设置的属性值, 如果为 null 则表示删除属性
 */
export function setAttr(elem: HTMLElement, attrName: string, value: any) {
    if (/^on./.test(attrName) && attrName in elem) {
        if (typeof value === 'string') {
            elem.setAttribute(attrName, value);
        } else {
            (elem as any)[attrName] = value;
        }
    } else {
        if (attrName in elem || value != null && typeof value !== 'string') {
            (elem as any)[attrName] = value;
        } else if (value == null) {
            elem.removeAttribute(attrName);
        } else {
            elem.setAttribute(attrName, value);
        }
    }
}

/**
 * 从指定节点开始向父元素查找第一个匹配指定 CSS 选择器的元素
 * @param node  要开始查找的节点
 * @param selector  要匹配的CSS选择器
 * @param context  如果提供了上下文,则在指定的元素内查找
 * @returns 返回元素  如果不存在则返回 null
 * @example closest(document.)
 */
export function colsest(node: Node, selector: string, context?: HTMLElement | Document | null) {
    while (node && node !== context && (node.nodeType !== 1 || !match(node as HTMLElement, selector))) {
        node = node.parentNode;
    }
    return node === context ? null : node as HTMLElement;
}

/**
 * 获取指定节点的所有子元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的 CSS 选择器
 * @returns 返回包含所有子元素的数组
 */
export function children(node: Node, selector?: string) {
    const result: HTMLElement[] = []
    for (node = node.firstChild; node; node = node.nextSibling) {
        if (node.nodeType === 1 && (!selector && match(node as HTMLElement, selector))) {
            result.push(node as HTMLElement);
        }
    }
    return result;
}

/**
 * 判断指定节点是否包含另一个节点
 * @param node 要判断的节点
 * @param child 要判断的子节点
 * @returns 如果child同node或实其子节点,则返回 true, 否则返回false
 */
export function contains(node: Node, child: Node) {
    if (node.contains) {
        return node.contains(child);
    }
    for (; child; child = child.parentNode) {
        if (child === node) {
            return true;
        }
    }
    return false;
}

/**
 * 获取指定节点在父节点中的索引
 * @param node 要处理的节点
 * @returns 返回索引,如果没有父元素则返回 0
 */
export function index(node: Node) {
    let result = 0;
    while ((node = node.previousSibling)) {
        if (node.nodeType === 1) {
            result++;
        }
    }
    return result;
}

/**
 * 将节点插入到子节点最后一位
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 */
export function append(node:Node, content: string | Node | null){
    return insert(node, content, false, false);
}

/**
 *  将节点插入到子节点第一位
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 * @returns 
 */
export function prepend(node:Node, content: string | Node | null){
    return insert(node, content, true, false);
}

/**
 * 在指定节点前插入节点或HTML
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 * @returns 
 */
export function before(node:Node, content:string | Node | null){
    return insert(node, content, true, true);
}

/**
 * 在指定节点后插入节点或HTML
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 * @returns 
 */
export function after(node:Node, content:string | Node | null){
    return insert(node, content, false, true);
}

function insert(node: Node, content: string | Node | null, prepend: boolean, sibling: boolean) {
    if(content){
        if(typeof content === "string"){
            content = parse(content, node.ownerDocument);
        }
        if(sibling){
            return node.parentNode.insertBefore(content, prepend ? node : node.nextSibling);
        }
        return prepend ? node.insertBefore(content, node.firstChild) : node.appendChild(content);
    }
}


/**
 * 为当前的 css 属性添加当前浏览器特定的后缀
 * @param propName  要处理的 CSS 属性名
 * @return 返回已添加后缀的 CSS 属性名
 * @example vendor("transform")    比如 webkit 内核的 webkitOpacity 属性
 */
export function vendor(propName: string): string {
    if (!(propName in document.documentElement.style)) {
        const capName = propName.charAt(0).toUpperCase() + propName.slice(1)
        for (const prefix of ['webkit', 'Moz', 'ms', 'O']) {
            if ((prefix + capName) in document.documentElement.style) {
                return prefix + capName
            }
        }
    }
    return propName
}

/**
 * 获取指定元素的 CSS 属性值
 * @param element 要获取的元素
 * @param propName  要获取的 CSS 属性名
 */
export function getStyle(elem: HTMLElement, propName: string): string {
    return elem.ownerDocument.defaultView.getComputedStyle(elem)[vendor(propName)]
}

/**
 * 设置指定元素的css属性值
 * @param elem 要设置的元素
 * @param propName 要设置的css属性名
 * @param value 要设置的css属性值,如果是数字,则自动添加像素单位
 */
export function setStyle(elem: HTMLElement, propName: string, value: string | number) {
    elem.style[vendor(propName) as any] = value && typeof value === "number" && !/^(?:columnCount|fillOpacity|flexGrow|flexShrink|fontWeight|lineHeight|opacity|order|orphans|widows|zIndex|zoom)$/.test(propName) ? value + "px" : value as any;
}

/**
 * 计算一个元素的样式值
 * @param elem 要计算的元素
 * @param propNames 要计算的CSS属性名列表
 * @returns 返回所有的 CSS属性值的和
 */
export function computeStyle(elem: HTMLElement, ...propNames: string[]) {
    let result = 0;
    const computedStyle = elem.ownerDocument.defaultView.getComputedStyle(elem);
    for (const prop of propNames) {
        result += parseFloat(computedStyle[prop]) || 0;
    }
    return result;
}

/**
 * 获取指定元素内部HTML
 * @param elem 要回去的元素
 * @returns 返回内部HTML
 */
export function getHtml(elem:HTMLElement){
    return elem.innerHTML;
}

/**
 * 设置指定元素内部的HTML
 * @param elem 要设置的元素
 * @param value 要设置的内部HTML
 */
export function setHtml(elem:HTMLElement,  value:string){
    elem.innerHTML = value;
}

/**
 * 判断指定元素是否已添加指定的 CSS 类名
 * @param elem 要判断的元素
 * @param className 要判断的 类名
 */
export function hasClass(elem: HTMLElement, className: string) {
    return (" " + elem.className + " ").indexOf(" " + className + " ") >= 0;
}

/**
 * 添加指定元素的 CSS 类名
 * @param elem 要判断的元素
 * @param className 要添加的 CSS 类名
 */
export function addClass(elem: HTMLElement, className: string) {
    toggleClass(elem, className, true);
}

/**
 * 删除指定元素的 CSS 类名
 * @param elem 要判断的元素
 * @param className 要删除的 CSS 类名
 */
export function removeClass(elem: HTMLElement, className: string) {
    toggleClass(elem, className, false);
}

/**
 * 如果存在则删除,不存在则添加指定的CSS类名
 * @param elem 要处理的元素
 * @param className 要添加或删除的类名
 * @param value 如果为true则添加 CSS 类名,如果为 false 则删除 CSS 类名
 */
export function toggleClass(elem: HTMLElement, className: string, value?: boolean) {
    if (hasClass(elem, className)) {
        if (value !== true) {
            elem.className = (" " + elem.className + " ").replace(" " + className + " ", "").trim();
        }
    } else if (value !== false) {
        elem.className = elem.className ? elem.className + " " + className : className;
    }

}

interface EventFix {
    /**
     * 绑定当前事件时实际绑定的事件
     */
    bind?: string;
    /**
     * 委托当前事件时实际绑定的事件
     */
    delegate?: string;

    /**
     * 实际绑定的事件触发后筛选是否触发当前事件的过滤器
     */
    filter?: (this: EventFix, e: Event, elem: Element | Document) => boolean | void;

    /**
     * 自定义绑定事件的函数
     * @param elem 需绑定事件的元素
     * @param listener 手工添加的方法
     */
    add?: (this: EventFix, elem: Element | Document, listener: EventListener) => void;

    /**
     * 自定义解绑事件的函数
     */
    remove?: (this: EventFix, elem: Element | Document, listener: EventListener) => void;
}

var eventFix: { [event: string]: EventFix }
/**
 * 绑定指定元素的事件
 * @param elem 要绑定的元素或文档
 * @param eventName 要绑定的事件名
 * @param selector 要委托的目标元素的css选择器
 * @param listener 要绑定的事件监听器
 * @param scope 设置 listener 中 this 的值
 * @example on(document.body, "mousteenter", "a", function(e) { this.firstChild.innerHTML = e.pageX })
 */
export function on(elem: HTMLElement | Document, eventName: string, selector: string, listener: (e: Event, target: HTMLElement) => void, scope?: any): void;

/**
 * 绑定指定元素的事件
 * @param elem 要绑定的元素或文档
 * @param eventName 要绑定的事件名
 * @param listener 要绑定的事件监听器
 * @param scope 设置listener 中的this值
 * @example on(document.body, "click", e => { alert("点击事件") })
 */
export function on(elem: HTMLElement | Document, eventName: string, listener: (e: Event, target: typeof elem) => void, scope?: any): void;

export function on(elem: HTMLElement | Document, eventName: string, selector: string | typeof listener, listener?: ((e: Event, target?: HTMLElement | Document) => void) | typeof scope, scope?: any) {
    if (!eventFix) {
        const isEnterOrLeave: EventFix['filter'] = (e: MouseEvent, target) => 
        /(?:ter|e)$/.test(e.type) || !contains(target, e.relatedTarget as Node);

        eventFix = {
            __proto__: null,

            // focus/blur 不支持冒泡, 委托时使用 foucin/focusout
            focus: { delegate: "focusin" },
            blur: { delegate: 'focusout' },

            // mouseenter/mouselave 不支持冒泡.委托时使用 mouseover/mouseout
            mouseenter: { delegate: "mouseover", filter: isEnterOrLeave },
            mouseleave: { delegate: "mouseout", filter: isEnterOrLeave },

            // pointerenter/pointerleave 不支持冒泡,委托时使用 pointerover/pointerout
            pointerenter: { delegate: "pointerover", filter: isEnterOrLeave },
            pointerleave: { delegate: "pointerout", filter: isEnterOrLeave },

            //支持绑定原生click
            mouseclick: { bind: "click" }
        };

        const html = Document.prototype;

        // Firefox 浏览器不支持 focusin/focusout 事件
        // Chorme 实际支持focusin/focusout 事件,但是判断比较复杂,所以按不支持处理
        if (!("onfocusin" in html)) {
            const focusAdd: EventFix['add'] = function (elem, listener) {
                elem.addEventListener(this.bind, listener, true);
            }
            const focusRemove: EventFix['remove'] = function (elem, listener) {
                elem.removeEventListener(this.bind, listener, true);
            }
            eventFix.focusin = { bind: 'focus', add: focusAdd, remove: focusRemove };
            eventFix.focusout = { bind: 'blur', add: focusAdd, remove: focusRemove };
        }
        // mouseover 和 mouseenter 两者之前区别 mouseenter 不支持冒泡 
        if (!("onmouseenter" in html)) {
            eventFix.mouseenter.bind = "mouseover";
            eventFix.mouseleave.bind = "mouseout";
        }

        /**
        * Firefox: 不支持mousewheel事件,使用 "DOMMouseScroll" 事件代替
        * mousewheel 事件中的 event.wheelDelta 属性值,如果正值说明滚轮向上滚动,如果负值说明向下滚动,返回的值均为120的倍数   幅度大小: event.wheelDelta / 120
        * DOMMouseScroll 事件 event.detail 属性值, 如果是负数则说明向上滚动,如果是正值说明向下滚动,返回的值均为3的倍数  幅度大小: event.detail / 3
        */
        if (!("onmousewheel" in html)) {
            eventFix.mousewheel = {
                bind: "DOMMouseScroll",
                filter(e: MouseEvent) {
                    (e as any).wheelDelta = -(e.detail || 0) / 3;
                }
            }
        }

        /**
         * 低版本浏览器不支持 auxclick 事件
         * 使用mouseup事件代替,并且只有 button 是鼠标右键是触发 事件
         */
        if (!("onauxclick" in html)) {
            eventFix.auxclick = {
                bind: "mouseup",
                filter: (e: MouseEvent) => e.button === 3
            }
        }

        /**
         * 低版本浏览器不兼容
         * 
         */
        if (!("onpointerdown" in html)) {
            eventFix.pointerover = { bind: 'mouseover' };
            eventFix.pointerout = { bind: 'mouseover' };
            eventFix.pointerenter.bind = eventFix.mouseenter.bind || "mouseenter";
            eventFix.pointerenter.delegate = "mouseover";
            eventFix.pointerleave.bind = eventFix.mouseleave.bind || "mouseleave";
            eventFix.pointerleave.delegate = "mouseout";
            eventFix.pointerdown = { bind: 'mousedown' };
            eventFix.pointerup = { bind: 'mouseup' };
            eventFix.pointermove = { bind: 'mousemove' };
        }

        if (window.TouchEvent) {
            const initTouchEvent: EventFix['filter'] = function (e: TouchEvent) {
                //PC chorme 修复触摸事件的 pageX 和 pageY 都是0
                if (!(e as any).pageX && !(e as any).pageY && e.changedTouches.length) {
                    Object.defineProperty(e, "pageX", { get(this: TouchEvent) { return this.changedTouches[0].pageX; } });
                    Object.defineProperty(e, "pageY", { get(this: TouchEvent) { return this.changedTouches[0].pageY; } });
                    Object.defineProperty(e, "clientX", { get(this: TouchEvent) { return this.changedTouches[0].clientX; } });
                    Object.defineProperty(e, "clientY", { get(this: TouchEvent) { return this.changedTouches[0].clientY; } });
                    Object.defineProperty(e, "which", { value: 1 });
                }
            }
            eventFix.click = {
                filter: initTouchEvent,
                add(elem, listener) {
                    let state: any = 0;
                    elem.addEventListener('touchstart', (listener as any).__touchStart__ = function (e: TouchEvent) {
                        if (e.changedTouches.length === 1) {
                            state = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
                        }
                    }, false);
                    elem.addEventListener('touchend', (listener as any).__touchEnd__ = function (e: TouchEvent) {
                        if (state && e.changedTouches.length === 1 && Math.pow(e.changedTouches[0].pageX - state[0], 2) + Math.pow(e.changedTouches[0].pageY - state[1], 2) < 25) {
                            state = 1;
                            listener.call(elem, e);
                        }
                    }, false);
                    elem.addEventListener("click", (listener as any).__click__ = function (e: MouseEvent) {
                        const trigger = state !== 1;
                        state = 0;
                        trigger && listener.call(this, e);
                    }, false)
                },
                remove(elem, listener) {
                    elem.removeEventListener("touchstart", (listener as any).__touchStart__, false);
                    elem.removeEventListener("touchend", (listener as any).__touchEnd__, false);
                    elem.removeEventListener("click", (listener as any).__click__, false);
                }
            }

            if (eventFix.pointerout) {
                const pointerAdd: EventFix["add"] = function (elem, listener) {
                    let state = 0;
                    elem.addEventListener((this as any).touch, (listener as any).__touch__ = function (e: MouseEvent) {
                        state = 1;
                        listener.call(this, e);
                    }, false);
                    elem.addEventListener(this.bind, (listener as any).__mouse__ = function (e: MouseEvent) {
                        if (state) {
                            state = 0;
                        } else {
                            listener.call(this, e)
                        }
                    }, false);
                }
                const pointerRemove: EventFix["remove"] = function (elem, listener) {
                    elem.removeEventListener((this as any).touch, (listener as any).__touch__, false);
                    elem.removeEventListener(this.bind, (listener as any).__mouse__, false);
                }
                eventFix.pointerdown = { bind: "mousedown", touch: "touchstart", filter: initTouchEvent, add: pointerAdd, remove: pointerRemove } as any;
                eventFix.pointerup = { bind: "mouseup", touch: "touchend", filter: initTouchEvent, add: pointerAdd, remove: pointerRemove } as any;
                eventFix.pointermove = { bind: "mousemove", touch: "touchmove", filter: initTouchEvent, add: pointerAdd, remove: pointerRemove } as any;
            }
        }
    }
    if (typeof selector !== 'string') {
        scope = listener;
        listener = selector;
        selector = "";
    }
    scope = scope || elem

    //当前节点上绑定的数据
    const events = (elem as any).__events__ || ((elem as any).__events__ = Object.create(null));
    const key = selector ? eventName + " " + selector : eventName;
    //当前节点绑定的当前事件回调
    const listeners = events[key];

    const delegateFix = eventFix[eventName] || undefined;
    const bindFix = selector && delegateFix && delegateFix.delegate ? eventFix[eventName = delegateFix.delegate!] : delegateFix;

    /**
     * 满足以下任一情况,需要重新封装监听器
     * 1.事件委托, 需要重新定位目标元素
     * 2.事件有特殊的过滤器,仅在满足条件时触发
     * 3.需要重写回调函数的 this
     * 4.监听器具有第二参数,需要重写回调函数的第二参数
     * 5.监听器已添加需重新封装才能绑定成功
     */
    if (selector || scope !== elem || bindFix && bindFix.filter || listener.length > 1 || listeners && indexOfListener(listeners, listener, scope) >= 0) {
        const originalListener = listener;
        listener = (e: Event) => {
            let target = scope;
            if (selector && (!(target = colsest(e.target as Node, selector, target)) || (delegateFix !== bindFix && delegateFix.filter && delegateFix.filter(e, target) === false))) {
                return;
            }
            if (bindFix && bindFix.filter && bindFix.filter(e, target) === false) {
                return;
            }
            originalListener.call(scope, e, target);
        }
        listener.__original__ = originalListener;
        listener.__scope__ = scope;
    }

    if (!listeners) {
        events[key] = listener;
    } else if (Array.isArray(listeners)) {
        listeners.push(listener);
    } else {
        events[key] = [listeners, listener];
    }

    bindFix && bindFix.add ? bindFix.add(elem, listener) : elem.addEventListener(bindFix && bindFix.bind || eventName, listener, false);
}

/**
 * 解绑指定元素的事件
 * @param elem  要解绑的元素或文档
 * @param eventName 要解绑的事件名
 * @param selector 要委托的没有标元素的CSS选择器
 * @param listener 要解绑的事件监听器,如果未提供则解绑所有监听器
 * @param scope 设置 listener 中的this值
 */
export function off(elem: HTMLElement | Document, eventName: string, selector: string, listener?: (e: Event, target: HTMLElement | Document) => void, scope?: any): void;

/**
 * 解绑指定元素的事件
 * @param elem 要解绑的元素或文档
 * @param eventName 要解绑的事件名
 * @param listener 要解绑的事件监听器,如果未提供则解绑所有监听器
 * @param scope 设置 listener 中的this值
 */
export function off(elem: HTMLElement | Document, eventName: string, listener?: (e: Event, target: HTMLElement | Document) => void, scope?: any): void;

export function off(elem: HTMLElement | Document, eventName: string, selector?: string | typeof listener, listener?: (e: Event, target: HTMLElement | Document) => void, scope?: any) {
    if (typeof selector !== "string") {
        scope = listener;
        listener = selector;
        selector = "";
    }
    scope = scope || elem;

    const events = (elem as any).__events__;
    const key = selector ? eventName + " " + selector : eventName;
    const listeners = events && events[key];

    if (listeners) {
        if (listener) {
            const index = indexOfListener(listeners, listener, scope);
            if (~index) {
                if (Array.isArray(listeners)) {
                    listener = listeners[index];
                    listeners.splice(index, 1);
                    if (!listeners.length) {
                        delete events[key];
                    }
                } else {
                    listener = listeners;
                    delete events[key];
                }
            }

            const bindFix = eventFix && eventFix[eventName];
            bindFix && bindFix.remove ? bindFix.remove(elem, listener as EventListener) : elem.removeEventListener((selector ? bindFix && bindFix.delegate : bindFix && bindFix.bind) || eventName, listener as EventListener, false);
        } else if (Array.isArray(listeners)) {
            for (listener of listeners) {
                off(elem, eventName, selector, listener, scope);
            }
        } else {
            off(elem, eventName, selector, listeners, scope);
        }
    }






}

/**
 * 绑定元素只执行一次的事件
 * @param elem 要解绑的元素或文档
 * @param eventName 要解绑的事件名
 * @param listener 要解绑的事件监听器,如果未提供则解绑所有监听器
 * @param scope 设置 listener 中的this值
 */
export function once(elem: HTMLElement | Document, eventName: string,  listener?: (e: Event, target: HTMLElement | Document) => void, scope?: any){
    let fn = function(){
        if(listener){
            listener.apply(scope|| this, arguments);
        }
        off(elem, eventName, fn, scope);
    }
    on(elem, eventName, fn, scope);
}

function indexOfListener(listeners: typeof listener[] | typeof listener | undefined, listener: (e: Event, target: HTMLElement | Document) => void, scope: any) {
    if (Array.isArray(listeners)) {
        for (let i = 0; i < listeners.length; i++) {
            //先 && 后 ||
            if (listeners[i] === listener || (listeners[i] as any).__original__ === listener && (listeners[i] as any).__scope__ == scope) {
                return i;
            }
        }
        return -1;
    }
    return listeners === listener || (listeners as any).__original__ === listener && (listeners as any).__scope__ === scope ? 0 : -1;
}

/**
 * 获取指定元素的定位父元素
 * @param elem 要获取的元素
 * @returns 要返回定位父元素
 */
export function offsetParent(elem: HTMLElement) {
    let result = elem;
    //一致向上寻找, position属性非 static 的,定位元素
    while ((result = result.offsetParent as HTMLElement) && result.nodeName !== "HTML" && getStyle(result, "position") === "static");
    return result || elem.ownerDocument.documentElement;
}

/**
 * 获取指定元素和其定位父元素的偏移距离
 * @param elem 要获取的元素
 * @returns 返回坐标
 */
export function getOffset(elem: HTMLElement): IPoint {
    const left = getStyle(elem, "left");
    const top = getStyle(elem, "top");
    if ((left && top && left !== 'auto' && top !== 'auto') || getStyle(elem, "position") !== "absolute") {
        return new Point(parseFloat(left) || 0, parseFloat(top) || 0);
    }
    //当 position 属性是 absolute 时,需要寻找定位父元素,并且根据定位父元素获取偏移距离
    const parent = offsetParent(elem);
    const rect = getRect(elem);
    if (parent.nodeName !== "HTML") {
        const rootRect = getRect(parent);
        rect.x -= rootRect.x;
        rect.y -= rootRect.y;
    }
    //位置减去当前 border 和 margin 宽度
    rect.x -= computeStyle(elem, "marginLeft") + computeStyle(parent, "borderLeftWidth");
    rect.y -= computeStyle(elem, "marginTop") + computeStyle(parent, "borderTopWidth");

    return rect;
}

/**
 * 设置元素和其定位父元素的便宜距离
 * @param elem 要处理的元素
 * @param value 要设置的坐标
 */
export function setOffset(elem: HTMLElement, value: Partial<Point>) {
    if (value.x >= 0) {
        elem.style.left = value.x + "px";
    }
    if (value.y >= 0) {
        elem.style.top = value.y + "px";
    }
}

/**
 * 获取指定元素的滚动距离
 * @param elem 要获取的元素或文档
 * @returns 返回作表, 如果元素不可滚动则返回原点s
 */
export function getScroll(elem: HTMLElement | Document) {
    if (elem.nodeType === 9) {
        const win = (elem as Document).defaultView;
        if ("scrollX" in win) {
            return {
                x: win.scrollX,
                y: win.scrollY
            } as IPoint
        }
        elem = (elem as Document).documentElement;
    }
    return {
        x: (elem as HTMLElement).scrollLeft,
        y: (elem as HTMLElement).scrollTop
    } as IPoint
}

/**
 * 设置指定元素的滚动距离
 * @param elem 要设置的元素或文档
 * @param value 要设置的坐标
 */
export function setScroll(elem: HTMLElement | Document, value: Partial<Point>) {
    if (elem.nodeType === 9) {
        (elem as Document).defaultView.scrollTo(
            (value.x == null ? getScroll(elem) : value).x,
            (value.y == null ? getScroll(elem) : value).y,
        )
    } else {
        if (value.x !== null) (elem as HTMLElement).scrollLeft = value.x;
        if (value.y !== null) (elem as HTMLElement).scrollTop = value.y;
    }
}

/**
 * 获取指定元素的区域
 * @param elem 要获取的元素或文档
 * @returns 返回元素实际占用区域(含内边距和边框,不含外边距), 如果元素不可见则返回空区域
 */
export function getRect(elem: HTMLElement | Document) {
    const doc: Document = elem.nodeType === 9 ? elem as Document : elem.ownerDocument;
    const html = doc.documentElement;
    const result = getScroll(doc) as IRect;
    if (elem.nodeType === 9) {
        result.width = html.clientWidth;
        result.height = html.clientHeight;
    } else {
        const rect = (elem as Element).getBoundingClientRect();
        result.x = rect.left - html.clientLeft; //到左侧的距离 - 左边框宽度
        result.y = rect.top - html.clientTop;
        result.width = rect.width;
        result.height = rect.height;
    }
    return result;
}

/**
 * 设置指定元素的区域
 * @param elem 要设置的元素
 * @param value 要设置的内容区域(含内边距和边框, 不包含外边距)
 * @example setRect(document.body, {width:200, height:400})
 */
export function setRect(elem: HTMLElement, value: Partial<IRect>){
    const style = elem.style;
    if(value.x != null || value.y != null){
        if(!/^(?:abs|fix)/.test(getStyle(elem, "position"))){
            style.position = "relative";
        }
        const currentPosition = getRect(elem);
        const offset = getOffset(elem);

        if(value.x !== null){
            style.left = offset.x + value.x - currentPosition.x + "px";
        }
        if(value.y !== null){
            style.top = offset.y + value.y - currentPosition.y + "px";
        }
    }
    if(value.width != null || value.height != null){
        const boxSizing = getStyle(elem, "boxSizing") === "border-box";
        if(value.width != null) {
            style.width = value.width - (boxSizing ? 0 : computeStyle(elem, "borderLeftWidth", "paddingLeft", "paddingRight", "borderRightWidth")) + "px";
        }
        if(value.height != null){
            style.height = value.height - (boxSizing ? 0 : computeStyle(elem, "borderTopWidth", "paddingTop", "paddingBottom", "borderBottomWidth")) + "px";
        }
    }
}

/**
 * 触发指定元素的指定事件,执行以添加的事件监听器
 * @param elem 要触发事件的元素或文档
 * @param eventName 要触发的事件名
 * @param event 传递给监听器的事件参数
 */
export function trigger(elem: HTMLElement | Document, eventName: string, event?: Partial<Event>);

/**
 * 触发指定元素的指定事件,执行以添加的事件监听器
 * @param elem 要触发事件的元素或文档
 * @param eventName 要触发的事件名
 * @param selector 要委托的目标元素的css选择器
 * @param event 传递给监听器的事件参数
 */
export function trigger(elem: HTMLElement | Document, eventName: string, selector: string, event?: Partial<Event>);

export function trigger(elem: HTMLElement | Document, eventName: string, selector: string | typeof event, event?: Partial<Event>) {
    if (typeof selector !== "string") {
        event = selector;
        selector = "";
    }
    const listeners = (elem as any).__events__[selector ? eventName + " " + selector : eventName];
    if (listeners) {
        event = event || {};
        if (!event.type) (event as any).type = eventName;
        if (!event.target) (event as any).target = selector ? find(elem, selector as string) : elem;
        if (Array.isArray(listeners)) {
            for (const listener of listeners) {
                listener.call(elem, event);
            }
        } else {
            listeners.call(elem, event);
        }
    }
}

/**
 * 页面可以访问到dom元素后执行指定函数
 * @param callback 要执行后的回调函数
 * @param context 要等待的文档对象
 */
export function ready(callback: (this:Document) => void, context = document){
    if(/^(?:complete|interactive)$/.test(context.readyState) && context.body){
        callback.call(context);
    }else{
        context.addEventListener("DOMContentLoaded", callback, false);
    }
}
