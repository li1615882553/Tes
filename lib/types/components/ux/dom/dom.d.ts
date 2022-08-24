import { IPoint, Point, IRect } from './Rect';
/**
 * 解析一段 HTML 并返回相应的节点
 * @param html 要解析的HTML片段
 * @param context 创建节点使用的文档
 * @returns 返回要创建的节点, 如果HTML中包含多个节点,则返回一个文档片段
 */
export declare function parse(html: string, context?: Document): HTMLElement | DocumentFragment | Text;
/**
 * 查找 css 选择器匹配的所有元素
 * @param node  要查找的根节点
 * @param selector 要查找的CSS选择器
 * @returns 返回匹配的元素列表
 */
export declare function query(node: Element | Document, selector: string): HTMLElement[];
/**
 * 查找CSS选择器匹配的所有元素
 * @param selector  要查找的CSS选择器
 * @returns 返回匹配的元素列表
 */
export declare function query(selector: string): HTMLElement[];
/**
 * 查找CSS选择器匹配的第一个元素
 * TODO 解决无法获取自身情况
 * @param node 要查找的根节点
 * @param selector 要查找的CSS选择器
 * @returns 返回匹配的第一个元素,如果找不到则返回null
 */
export declare function find(node: Element | Document, selector: string): HTMLElement | null;
/**
 * 查找CSS选择器匹配的第一个元素
 * @param selector 要查找的CSS选择器
 * @returns 返回匹配的第一个元素,如果找不到则返回null
 */
export declare function find(select: string): HTMLElement | null;
/**
 * 判断元素是否匹配指定的CSS选择器
 * @param elem 要判断的元素
 * @param selector 要判断的CSS选择器
 * @returns 如果匹配则返回 true, 否则返回false
 * @example matches(document.body, 'body') //true
 */
export declare function match(elem: Element, selector: string): boolean;
/**
 * 获取节点的第一个子元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的 css 选择器
 * @returns 返回元素, 如果元素不存在则返回null
 */
export declare function first(node: Node, selector?: string): HTMLElement;
/**
 * 获取节点的最后一个子节点
 * @param node 要获取的节点
 * @param selector 用于筛选元素的 css 选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
export declare function last(node: Node, selector?: string): HTMLElement;
/**
 * 获取节点的下一个相邻元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的CSS选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
export declare function next(node: Node, selector?: string): HTMLElement;
/**
 * 获取节点的上一个相邻元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的CSS选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
export declare function prev(node: Node, selector?: string): HTMLElement;
/**
 * 获取节点的父元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的CSS选择器
 * @returns 返回元素,如果元素不存在则返回null
 */
export declare function parent(node: Node, selector?: string): HTMLElement;
/**
 * 获取指定元素的属性值
 * @param elem 要获取的元素
 * @param attrName 要获取的属性名
 * @returns 返回的属性, 如果不存在则返回 null
 */
export declare function getAttr(elem: HTMLElement, attrName: string): any;
/**
 * 设置指定元素的属性值
 * @param elem 要设置的元素
 * @param attrName 要设置的属性名
 * @param value 要设置的属性值, 如果为 null 则表示删除属性
 */
export declare function setAttr(elem: HTMLElement, attrName: string, value: any): void;
/**
 * 从指定节点开始向父元素查找第一个匹配指定 CSS 选择器的元素
 * @param node  要开始查找的节点
 * @param selector  要匹配的CSS选择器
 * @param context  如果提供了上下文,则在指定的元素内查找
 * @returns 返回元素  如果不存在则返回 null
 * @example closest(document.)
 */
export declare function colsest(node: Node, selector: string, context?: HTMLElement | Document | null): HTMLElement;
/**
 * 获取指定节点的所有子元素
 * @param node 要获取的节点
 * @param selector 用于筛选元素的 CSS 选择器
 * @returns 返回包含所有子元素的数组
 */
export declare function children(node: Node, selector?: string): HTMLElement[];
/**
 * 判断指定节点是否包含另一个节点
 * @param node 要判断的节点
 * @param child 要判断的子节点
 * @returns 如果child同node或实其子节点,则返回 true, 否则返回false
 */
export declare function contains(node: Node, child: Node): boolean;
/**
 * 获取指定节点在父节点中的索引
 * @param node 要处理的节点
 * @returns 返回索引,如果没有父元素则返回 0
 */
export declare function index(node: Node): number;
/**
 * 将节点插入到子节点最后一位
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 */
export declare function append(node: Node, content: string | Node | null): Node;
/**
 *  将节点插入到子节点第一位
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 * @returns
 */
export declare function prepend(node: Node, content: string | Node | null): Node;
/**
 * 在指定节点前插入节点或HTML
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 * @returns
 */
export declare function before(node: Node, content: string | Node | null): Node;
/**
 * 在指定节点后插入节点或HTML
 * @param node 插入所在的节点
 * @param content 要插入的HTML或节点
 * @returns
 */
export declare function after(node: Node, content: string | Node | null): Node;
/**
 * 为当前的 css 属性添加当前浏览器特定的后缀
 * @param propName  要处理的 CSS 属性名
 * @return 返回已添加后缀的 CSS 属性名
 * @example vendor("transform")    比如 webkit 内核的 webkitOpacity 属性
 */
export declare function vendor(propName: string): string;
/**
 * 获取指定元素的 CSS 属性值
 * @param element 要获取的元素
 * @param propName  要获取的 CSS 属性名
 */
export declare function getStyle(elem: HTMLElement, propName: string): string;
/**
 * 设置指定元素的css属性值
 * @param elem 要设置的元素
 * @param propName 要设置的css属性名
 * @param value 要设置的css属性值,如果是数字,则自动添加像素单位
 */
export declare function setStyle(elem: HTMLElement, propName: string, value: string | number): void;
/**
 * 计算一个元素的样式值
 * @param elem 要计算的元素
 * @param propNames 要计算的CSS属性名列表
 * @returns 返回所有的 CSS属性值的和
 */
export declare function computeStyle(elem: HTMLElement, ...propNames: string[]): number;
/**
 * 获取指定元素内部HTML
 * @param elem 要回去的元素
 * @returns 返回内部HTML
 */
export declare function getHtml(elem: HTMLElement): string;
/**
 * 设置指定元素内部的HTML
 * @param elem 要设置的元素
 * @param value 要设置的内部HTML
 */
export declare function setHtml(elem: HTMLElement, value: string): void;
/**
 * 判断指定元素是否已添加指定的 CSS 类名
 * @param elem 要判断的元素
 * @param className 要判断的 类名
 */
export declare function hasClass(elem: HTMLElement, className: string): boolean;
/**
 * 添加指定元素的 CSS 类名
 * @param elem 要判断的元素
 * @param className 要添加的 CSS 类名
 */
export declare function addClass(elem: HTMLElement, className: string): void;
/**
 * 删除指定元素的 CSS 类名
 * @param elem 要判断的元素
 * @param className 要删除的 CSS 类名
 */
export declare function removeClass(elem: HTMLElement, className: string): void;
/**
 * 如果存在则删除,不存在则添加指定的CSS类名
 * @param elem 要处理的元素
 * @param className 要添加或删除的类名
 * @param value 如果为true则添加 CSS 类名,如果为 false 则删除 CSS 类名
 */
export declare function toggleClass(elem: HTMLElement, className: string, value?: boolean): void;
/**
 * 绑定指定元素的事件
 * @param elem 要绑定的元素或文档
 * @param eventName 要绑定的事件名
 * @param selector 要委托的目标元素的css选择器
 * @param listener 要绑定的事件监听器
 * @param scope 设置 listener 中 this 的值
 * @example on(document.body, "mousteenter", "a", function(e) { this.firstChild.innerHTML = e.pageX })
 */
export declare function on(elem: HTMLElement | Document, eventName: string, selector: string, listener: (e: Event, target: HTMLElement) => void, scope?: any): void;
/**
 * 绑定指定元素的事件
 * @param elem 要绑定的元素或文档
 * @param eventName 要绑定的事件名
 * @param listener 要绑定的事件监听器
 * @param scope 设置listener 中的this值
 * @example on(document.body, "click", e => { alert("点击事件") })
 */
export declare function on(elem: HTMLElement | Document, eventName: string, listener: (e: Event, target: typeof elem) => void, scope?: any): void;
/**
 * 解绑指定元素的事件
 * @param elem  要解绑的元素或文档
 * @param eventName 要解绑的事件名
 * @param selector 要委托的没有标元素的CSS选择器
 * @param listener 要解绑的事件监听器,如果未提供则解绑所有监听器
 * @param scope 设置 listener 中的this值
 */
export declare function off(elem: HTMLElement | Document, eventName: string, selector: string, listener?: (e: Event, target: HTMLElement | Document) => void, scope?: any): void;
/**
 * 解绑指定元素的事件
 * @param elem 要解绑的元素或文档
 * @param eventName 要解绑的事件名
 * @param listener 要解绑的事件监听器,如果未提供则解绑所有监听器
 * @param scope 设置 listener 中的this值
 */
export declare function off(elem: HTMLElement | Document, eventName: string, listener?: (e: Event, target: HTMLElement | Document) => void, scope?: any): void;
/**
 * 绑定元素只执行一次的事件
 * @param elem 要解绑的元素或文档
 * @param eventName 要解绑的事件名
 * @param listener 要解绑的事件监听器,如果未提供则解绑所有监听器
 * @param scope 设置 listener 中的this值
 */
export declare function once(elem: HTMLElement | Document, eventName: string, listener?: (e: Event, target: HTMLElement | Document) => void, scope?: any): void;
/**
 * 获取指定元素的定位父元素
 * @param elem 要获取的元素
 * @returns 要返回定位父元素
 */
export declare function offsetParent(elem: HTMLElement): HTMLElement;
/**
 * 获取指定元素和其定位父元素的偏移距离
 * @param elem 要获取的元素
 * @returns 返回坐标
 */
export declare function getOffset(elem: HTMLElement): IPoint;
/**
 * 设置元素和其定位父元素的便宜距离
 * @param elem 要处理的元素
 * @param value 要设置的坐标
 */
export declare function setOffset(elem: HTMLElement, value: Partial<Point>): void;
/**
 * 获取指定元素的滚动距离
 * @param elem 要获取的元素或文档
 * @returns 返回作表, 如果元素不可滚动则返回原点s
 */
export declare function getScroll(elem: HTMLElement | Document): IPoint;
/**
 * 设置指定元素的滚动距离
 * @param elem 要设置的元素或文档
 * @param value 要设置的坐标
 */
export declare function setScroll(elem: HTMLElement | Document, value: Partial<Point>): void;
/**
 * 获取指定元素的区域
 * @param elem 要获取的元素或文档
 * @returns 返回元素实际占用区域(含内边距和边框,不含外边距), 如果元素不可见则返回空区域
 */
export declare function getRect(elem: HTMLElement | Document): IRect;
/**
 * 设置指定元素的区域
 * @param elem 要设置的元素
 * @param value 要设置的内容区域(含内边距和边框, 不包含外边距)
 * @example setRect(document.body, {width:200, height:400})
 */
export declare function setRect(elem: HTMLElement, value: Partial<IRect>): void;
/**
 * 触发指定元素的指定事件,执行以添加的事件监听器
 * @param elem 要触发事件的元素或文档
 * @param eventName 要触发的事件名
 * @param event 传递给监听器的事件参数
 */
export declare function trigger(elem: HTMLElement | Document, eventName: string, event?: Partial<Event>): any;
/**
 * 触发指定元素的指定事件,执行以添加的事件监听器
 * @param elem 要触发事件的元素或文档
 * @param eventName 要触发的事件名
 * @param selector 要委托的目标元素的css选择器
 * @param event 传递给监听器的事件参数
 */
export declare function trigger(elem: HTMLElement | Document, eventName: string, selector: string, event?: Partial<Event>): any;
/**
 * 页面可以访问到dom元素后执行指定函数
 * @param callback 要执行后的回调函数
 * @param context 要等待的文档对象
 */
export declare function ready(callback: (this: Document) => void, context?: Document): void;
