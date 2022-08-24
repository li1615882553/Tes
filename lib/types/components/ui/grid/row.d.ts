import Control from "../../../core/VNode/Control";
import { IBaseComponent } from "../template/component";
import "./row.scss";
export interface IRowProps extends IBaseComponent {
    align?: "top" | "middle" | "bottom";
    justify?: "start" | "end" | "center" | "space-around" | "space-between";
    gutter?: number;
}
declare class Row extends Control<IRowProps> {
    protected render(): any;
}
export default Row;
