import Control from "../../../core/VNode/Control";
import { isEqual } from "../../../shared/util";
import { on, once } from "../../ux/dom/index";

/**
 * 重复点击的自定义指令
 */
export default class repeatClickDirective {
    private init: boolean;
    private startTime:number;
    private interval;
    //element 当前组件/当前绑定的DOM元素
    //value  当前传入的值
    //control 当前调用的组件
    constructor(public element: HTMLElement, public value: Function, public control: any) {
        this.commit(this.value)
    }

    commit(value: any) {
        if(!this.init || !isEqual(this.value, value)){
            this.init = true;
            const handler = () => value.apply();
            const clear = () => {
                if(Date.now() - this.startTime < 100){
                    handler();
                }
                clearInterval(this.interval);
                this.interval = null;
            }
            on(this.element, "mousedown", (e:MouseEvent) => {
                if(e.button !== 0) return ;
                this.startTime = Date.now();
                once(document, "mouseup", clear);
                clearInterval(this.interval);
                this.interval = setInterval(handler, 100);
            })
        }
    }

    destory() {
        
    }
}