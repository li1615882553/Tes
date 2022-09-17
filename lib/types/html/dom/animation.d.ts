/**
 * 动画相关的 DOM 操作
 */
export declare var animateFix: {
    /**
     * 是否支持CSS3动画
     */
    support: boolean;
    /**
     * transition 属性名
     */
    transition: string;
    /**
     * transitionEnd 事件名
     */
    transitionEnd: string;
};
/**
 * 执行一个自定义动画渐变
 * @param elem 要渐变的元素
 * @param propNames 要渐变的 CSS 属性名和最终的属性值组成的键值对
 * @param callback 执行渐变结束的回调函数
 * @param duration 渐变执行的总毫秒数
 * @param timingFunction 渐变函数, 可以可以使用CSS3预设的特效渐变函数
 * @example animate(element.body, { height: 400 })
 */
export declare function animate(elem: HTMLElement, propNames: {
    [propName: string]: string | number;
}, callback?: (this: typeof elem) => void, duration?: number, timingFunction?: string): void;
/**
 * 存储默认显示动画
 */
declare var toggleAnimations: {
    [animation: string]: {
        [propName: string]: string | number;
    };
};
export declare type ToggleAnimation = "opacity" | "height" | "top" | "bottom" | "left" | "right" | "scale" | "scaleX" | "scaleY" | "slideDown" | "slideRight" | "slideUp" | "slideLeft" | "zoomIn" | "zoomOut" | "rotate" | typeof toggleAnimations[""];
/**
 * 判断指定的元素是否被隐藏
 * @param elem 要判断的元素
 * @returns 如果元素被隐藏则返回 true, 否则返回false
 */
export declare function isHidden(elem: HTMLElement): boolean;
/**
 * 显示指定元素
 * @param elem 要显示的元素
 * @param animation 显示时使用的动画
 * @param callback 动画执行完的回调函数
 * @param duration 动画执行的总毫秒数
 * @param timingFunction 渐变函数,支持 CSS3 中预设的渐变函数
 * @param target 动画的目标元素
 */
export declare function show(elem: HTMLElement, animation?: ToggleAnimation, callback?: (this: HTMLElement, value: boolean) => void, duration?: number, timingFunction?: string): void;
/**
 * 隐藏指定元素
 * @param elem 要隐藏的元素
 * @param animation 隐藏时使用的动画
 * @param callback 动画执行完的回调函数
 * @param duration 动画执行的总毫秒数
 * @param timingFunction 渐变函数,支持 CSS3 中预设的渐变函数
 * @param target 动画的目标元素
 */
export declare function hide(elem: HTMLElement, animation?: ToggleAnimation, callback?: (this: HTMLElement, value: boolean) => void, duration?: number, timingFunction?: string, target?: HTMLElement): void;
/**
 * 切换显示或隐藏指定元素
 * @param elem 要显示或隐藏的元素
 * @param animation 要显示或隐藏使用的动画
 * @param callback 动画执行完成后的回调函数
 * @param duration 动画执行的总毫秒数
 * @param timingFunction 渐变函数, 支持CSS3预设的特效渐变函数
 * @param target 动画的目标函数
 */
export declare function toggle(elem: HTMLElement, animation?: ToggleAnimation, callback?: (this: HTMLElement, value: boolean) => void, duration?: number, timingFunction?: string, target?: HTMLElement): void;
/**
 * 切换显示或隐藏指定元素
 * @param elem 要显示或隐藏的元素
 * @param value true 显示元素, false 则隐藏元素
 * @param animation 要显示或隐藏使用的动画
 * @param callback 动画执行完成后的回调函数
 * @param duration 动画执行的总毫秒数
 * @param timingFunction 渐变函数, 支持CSS3预设的特效渐变函数
 * @param target 动画的目标函数
 */
export declare function toggle(elem: HTMLElement, value: boolean, animation?: ToggleAnimation, callback?: (this: HTMLElement, value: boolean) => void, duration?: number, timingFunction?: string, target?: HTMLElement): void;
export {};
