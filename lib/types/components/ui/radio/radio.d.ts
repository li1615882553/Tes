import Control from "../../../core/VNode/Control";
import RadioGroup from "./radio-group";
import { IBaseComponent } from "../template/component";
export interface IRadioProps extends IBaseComponent {
    /**绑定值 */
    value?: string | number | boolean;
    /**是否禁用 */
    disabled?: boolean;
    /**radio的value */
    label?: string | number | boolean;
    /**radio的尺寸 */
    size?: "medium" | "small" | "mini";
    /**绑定值变化时触发的事件 */
    onChange?: (value: IRadioProps["label"]) => void;
}
declare class Radio extends Control<IRadioProps> {
    _radioGroup: RadioGroup;
    get isGroup(): boolean;
    get model(): string | number | boolean;
    set model(val: string | number | boolean);
    get isDisable(): boolean;
    render(): any;
    handleChange(): void;
}
export default Radio;
