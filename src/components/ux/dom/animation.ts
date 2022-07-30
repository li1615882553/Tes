import { vendor, setStyle, getStyle, getRect } from "./dom";
import DisableScroll from "./DisableScroll";

/**
 * 动画相关的 DOM 操作
 */
export var animateFix: {
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
export function animate(elem: HTMLElement, propNames: { [propName: string]: string | number }, callback?: (this: typeof elem) => void, duration = 200, timingFunction = "ease") {
  if (!animateFix) {
    const transition = vendor("transition");
    animateFix = {
      support: transition in document.documentElement.style,
      transition: transition,
      transitionEnd: (transition + "End").replace(transition.length > 10 ? /^[A-Z]/ : /[A-Z]/, w => w.toLowerCase())
    }
  }
  if (animateFix.support && duration !== 0) {
    const context = (elem.style as any).__animate__ || ((elem.style as any).__animate__ = {});
    //设置style属性中的 transition 属性 不添加delay属性
    const setTransition = () => {
      let transition = "";
      // 重组 transition 属性
      for (const key in context) {
        if (transition) transition += ",";
        //将驼峰样式
        transition += `${key.replace(/[A-Z]|^ms|^webkit/g, word => "-" + word.toLowerCase())} ${duration}ms ${timingFunction}`;
      }
      elem.style[animateFix.transition] = transition;
    }

    //transformend 触发的事件
    const end = (e: Event) => {
      //忽略冒泡导致的调用 e不存在则表示是timeout导致的调用
      if (timer && (!e || e.target === e.currentTarget)) {
        clearTimeout(timer);
        timer = 0;
        elem.removeEventListener(animateFix.transitionEnd, end, false);

        let contextUpdated = false;
        for (const key in context) {
          //如果当前渐变效果 结束的话, 将其在 context 中移除,并且在下次更新 transition 属性的时候,将其移除
          if (context[key] === end) {
            delete context[key];
            contextUpdated = true;
          }
        }

        if (contextUpdated) {
          setTransition()
          callback && callback.call(elem);
        }
      }
    }

    //将所有属性设置为初始值
    //同此添加的 属性,拥有同一个end方法,因为方法传入的执行时间一致
    for (let propName in propNames) {
      propName = vendor(propName);
      context[propName] = end;
      if (!elem.style[propName]) {
        elem.style[propName] = getStyle(elem, propName);
      }
    }
    //设置要渐变的属性
    setTransition();

    //绑定事件完成事件
    elem.addEventListener(animateFix.transitionEnd, end, false);
    //当对象移除之后即不会触发transitionEnd事件,那么我们这里使用setTimeout保证最后稳定触发一次更新,移除transition属性
    let timer = setTimeout(end, duration) as any;
  } else {
    // 如果间隔事件是 0 的话,即表示不需要渐变效果,则直接将属性设置为最终值,并且执行回调函数即可
    callback && setTimeout(() => { callback.call(elem) }, duration);
  }

  // 设置属性为最终值, 触发动画
  for (const propName in propNames) {
    setStyle(elem, propName, propNames[propName]);
  }
}

/**
 * 存储默认的 dispaly 属性
 */
var defaultDisplays: { [tarName: string]: string };

/**
 * 存储默认显示动画
 */
var toggleAnimations: { [animation: string]: { [propName: string]: string | number } };

export type ToggleAnimation = "opacity" | "height" | "top" | "bottom" | "left" | "right" | "scale" | "scaleX" | "scaleY" | "slideDown" | "slideRight" | "slideUp" | "slideLeft" | "zoomIn" | "zoomOut" | "rotate" | typeof toggleAnimations[""];
/**
 * 判断指定的元素是否被隐藏
 * @param elem 要判断的元素
 * @returns 如果元素被隐藏则返回 true, 否则返回false
 */
export function isHidden(elem: HTMLElement) {
  return (elem.style as any).__toggle__ === false || (elem.style.display || getStyle(elem, "display")) === 'none';
}

/**
 * 显示指定元素
 * @param elem 要显示的元素
 * @param animation 显示时使用的动画
 * @param callback 动画执行完的回调函数
 * @param duration 动画执行的总毫秒数
 * @param timingFunction 渐变函数,支持 CSS3 中预设的渐变函数
 * @param target 动画的目标元素
 */
export function show(elem: HTMLElement, animation?: ToggleAnimation, callback?: (this: HTMLElement, value: boolean) => void, duration?: number, timingFunction?: string) {
  if (animation || callback) {
    toggle(elem, true, animation, callback, duration, timingFunction, elem);
  } else {
    elem.style.display = (elem as any).__display__ || "";

    if (getStyle(elem, "display") === "none") {
      const nodeName = elem.nodeName;
      let defaultDisplay = (defaultDisplays || (defaultDisplays = Object.create(null)))[nodeName];
      if (!defaultDisplay) {
        const tmp = document.createElement(nodeName);
        document.body.append(tmp);
        defaultDisplay = getStyle(tmp, "display");
        document.removeChild(tmp);
        //如果计算失败,则默认使用block
        if (defaultDisplay === "none") {
          defaultDisplay = "block";
        }
        defaultDisplays[nodeName] = defaultDisplay;
      }
      elem.style.display = defaultDisplay;
    }
  }
}

/**
 * 隐藏指定元素
 * @param elem 要隐藏的元素
 * @param animation 隐藏时使用的动画
 * @param callback 动画执行完的回调函数
 * @param duration 动画执行的总毫秒数
 * @param timingFunction 渐变函数,支持 CSS3 中预设的渐变函数 
 * @param target 动画的目标元素
 */
export function hide(elem: HTMLElement, animation?: ToggleAnimation, callback?: (this: HTMLElement, value: boolean) => void, duration?: number, timingFunction?: string, target?: HTMLElement) {
  if (animation || callback) {
    toggle(elem, false, animation, callback, duration, timingFunction, target);
  } else {
    const currentDispaly = getStyle(elem, "display");
    if (currentDispaly !== "none") {
      (elem.style as any).__display__ = elem.style.display;
      elem.style.display = "none";
    }
  }
}

/**
 * 切换显示或隐藏指定元素
 * @param elem 要显示或隐藏的元素
 * @param animation 要显示或隐藏使用的动画
 * @param callback 动画执行完成后的回调函数
 * @param duration 动画执行的总毫秒数
 * @param timingFunction 渐变函数, 支持CSS3预设的特效渐变函数
 * @param target 动画的目标函数
 */
export function toggle(elem: HTMLElement, animation?: ToggleAnimation, callback?: (this: HTMLElement, value: boolean) => void, duration?: number, timingFunction?: string, target?: HTMLElement): void;

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
export function toggle(elem: HTMLElement, value: boolean, animation?: ToggleAnimation, callback?: (this: HTMLElement, value: boolean) => void, duration?: number, timingFunction?: string, target?: HTMLElement): void;

export function toggle(elem: HTMLElement, value?: boolean | typeof animation, animation?: ToggleAnimation | typeof callback, callback?: ((this: HTMLElement, value: boolean) => void) | typeof duration, duration?: number | typeof timingFunction, timingFunction?: string | typeof target, target?: HTMLElement) {
  if (typeof value !== 'boolean') {
    target = timingFunction as typeof target;
    timingFunction = duration as typeof timingFunction;
    duration = callback as typeof duration;
    callback = animation as typeof callback;
    animation = value as typeof animation;
    value = undefined;
  }
  const hidden = isHidden(elem);
  if (value === undefined) {
    value = hidden;
  }

  if (typeof animation === 'string') {
    if (!toggleAnimations) {
      toggleAnimations = {
        opacity: {
          opacity: 0
        },
        height: {
          marginTop: 0,
          borderTopWidth: 0,
          paddingTop: 0,
          height: 0,
          paddingBottom: 0,
          borderBottomWidth: 0,
          marginBottom: 0
        },
        width: {
          marginLeft: 0,
          borderLeftWidth: 0,
          paddingLeft: 0,
          width: 0,
          paddingRight: 0,
          borderReghtWidth: 0,
          marginRight: 0
        },
        top: { transform: "translateY(-100%)" },
        bottom: { tarnsform: "translateY(100%)" },
        left: { transform: "translateX(-100%)" },
        right: { transform: "translateX(100%)" },
        scale: { transform: "scale(0, 0)" },
        scaleX: { transform: "scaleX(0)" },
        scaleY: { transform: "scaleY(0)" },
        slideDown: { opacity: 0, transform: "translateY(10%)" },
        slideRight: { opacity: 0, transform: "translateX(10%)" },
        slideUp: { opacity: 0, transform: "translateY(-10%)" },
        slideLeft: { opacity: 0, transform: "translateX(-10%)" },
        zoomIn: { opacity: 0, transform: "scale(0, 0)" },
        zoomOut: { opacity: 0, transform: "scale(1.2, 1.2)" },
        rotate: { opacity: 0, transform: "rotate(180deg)" }
      }
    }
    animation = toggleAnimations[animation];
  }

  if (animation && duration !== 0) {
    //优先显示元素,以便后续计算
    if (value && hidden) {
      show(elem);
    }

    //设置渐变目标
    const setTransformOrigin = target && (animation as typeof toggleAnimations[""]).transform && (elem.style as any).__toggle__ == undefined;
    if (setTransformOrigin) {
      const targetRect = getRect(target);
      const elemRect = getRect(elem);
      setStyle(elem, "transformOrigin", `${(elemRect.x + elemRect.width <= targetRect.x + targetRect.width / 4 ? targetRect.x : targetRect.x + targetRect.width <= elemRect.x + targetRect.width / 4 ? targetRect.x + targetRect.width : targetRect.x + targetRect.width / 2) - elemRect.x}px ${(elemRect.y + elemRect.height <= targetRect.y + targetRect.height / 4 ? targetRect.y : targetRect.y + targetRect.height <= elemRect.y + targetRect.height / 4 ? targetRect.y + targetRect.height : targetRect.y + targetRect.height / 2) - elemRect.y}px`);
    }

    //更改 高度/宽度 时隐藏滚动条
    const setOverflowX = (animation as typeof toggleAnimations[""]).width !== undefined;
    const setOverflowY = (animation as typeof toggleAnimations[""]).height !== undefined;
    let scroll:DisableScroll;
    if(setOverflowX || setOverflowY){
      scroll = new DisableScroll(elem);
      scroll.disableWindowScroll(setOverflowX, setOverflowY);
    }

    /**
     * 计算渐变属性的最终属性
     * 如果隐藏元素, 则 animation 表示最终属性
     * 如果显示元素, 则 需要手动计算最终属性
     */
    let to = animation as typeof toggleAnimations[""];
    if (value) {
      to = {};

      let from = animation as typeof toggleAnimations[""];
      if ((elem.style as any).__toggle__ != undefined) {
        from = {};
        for (const prop in animation as typeof toggleAnimations[""]) {
          from[prop] = getStyle(elem, prop);
          setStyle(elem, prop, "");
        }
        elem.style[animateFix.transition as any] = ""
      }

      for (const prop in animation as typeof toggleAnimations[""]) {
        to[prop] = getStyle(elem, prop);
        setStyle(elem, prop, from[prop]);
      }
    }

    //执行渐变
    (elem.style as any).__toggle__ = value;
    animate(elem, to, () => {
      delete (elem.style as any).__toggle__;
      if(scroll !== undefined){
        scroll.enableWindowScroll()
        if (setOverflowX) {
          elem.style.minWidth = "";
        }
        if (setOverflowY) {
          elem.style.minHeight = "";
        }
      }
      
      if (setTransformOrigin) {
        setStyle(elem, "transformOrigin", "");
      }
      for (const prop in to) {
        setStyle(elem, prop, "");
      }
      if (!value) {
        hide(elem);
      }
      callback && (callback as Function).call(elem, value);
    }, duration as number, timingFunction as string)
  } else {
    value ? show(elem) : hide(elem);
    callback && ((callback as Function).call(elem, value));
  }
}