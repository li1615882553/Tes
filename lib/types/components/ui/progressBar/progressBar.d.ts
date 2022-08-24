import Control from "../../../core/VNode/Control";
import VNode from "../../../core/VNode/VNode";
import "./progressBar.scss";
export declare class ProgressBar extends Control {
    percentage: number;
    showText: boolean;
    format: (percentage: number) => any;
    protected render(): VNode;
}
export default ProgressBar;
