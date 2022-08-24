import { IBaseComponent } from "../template/component";
import Control from "../../../core/VNode/Control";
import "./optionGroup.scss";
export interface IOptionsGroupProps extends IBaseComponent {
    /**组名 */
    label?: string;
    /**是否禁用 */
    disabled?: boolean;
}
declare class OptionGroup extends Control<IOptionsGroupProps> {
    visible: boolean;
    render(): any;
    protected componentMounted(): void;
    queryChange(): void;
}
export default OptionGroup;
