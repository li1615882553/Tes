import { Control, VNode, bind } from "@component/control/index";
import * as DOM from "@component/ux/dom/index";

import "./progressBar.scss"

export class ProgressBar extends Control {

    /**
     * 当前进度条进度
     */
    @bind percentage = 0;

    /**
     * 是否显示进度条文字内容
     */
    @bind showText: boolean = true;

    /**
     * 指定进度条文字内容
     */
    @bind format: (percentage: number) => any = (percentage: number) => {
        return `${percentage}%`;
    };

    /**
     * 切换显隐的动画
     */
    // animation: DOM.ToggleAnimation;

    protected render(): VNode {
        return <div>
            <div class="t-progressbar t-progressbar-striped t-progressbar-active t-progressbar-error">
                <div class="t-progressbar-body" style={{ width: `${this.percentage}%` }}></div>
            </div>
            <div tIf={this.showText} class="t-progress-text">
                {this.format && this.format(this.percentage) || this.percentage}
            </div>
        </div>
    }
}

export default ProgressBar;