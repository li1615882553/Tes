import Control from "../../../core/VNode/Control";
import { IBaseComponent } from "../template/component";
import "./radio-group.scss";
export interface IRadioGroupProps extends IBaseComponent {
    /**绑定值 */
    value?: string | number | boolean;
    /**是否禁用 */
    disabled?: boolean;
    /**readioGroup的尺寸 */
    size?: "medium" | "small" | "mini";
    /**单选组中值变化事件 */
    onChange?: (value: IRadioGroupProps["model"]) => void;
}
declare class RadioGroup extends Control<IRadioGroupProps> {
    render(): any;
    handleKeyDown(e: KeyboardEvent): void;
    handleChange(value: any): void;
}
export default RadioGroup;
