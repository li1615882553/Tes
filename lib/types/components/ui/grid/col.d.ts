import Control from "../../../core/VNode/Control";
import { IBaseComponent } from "../template/component";
import "./col.scss";
export interface IColProps extends IBaseComponent {
    /**栅格占位数 */
    span?: number;
    /**栅格左侧间隔数 */
    offset?: number;
    /**顺序号 */
    order?: number;
    /**栅格向左移动间隔数 */
    pull?: number;
    /**栅格向右移动间隔数 */
    push?: number;
}
declare class Col extends Control<IColProps> {
    protected render(): any;
}
export default Col;
