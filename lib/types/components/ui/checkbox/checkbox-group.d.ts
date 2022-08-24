import Control from "../../../core/VNode/Control";
import { IBaseComponent } from "../template/component";
export interface ICheckBoxGroupProps extends IBaseComponent {
    /**值 */
    value?: string;
    /**是否禁用 */
    disabled?: boolean;
    /**选中值变化事件 */
    onChange?: (value: any) => void;
}
declare class CheckBoxGroup extends Control<ICheckBoxGroupProps> {
    render(): any;
    handleChange(value: any): void;
}
export default CheckBoxGroup;
