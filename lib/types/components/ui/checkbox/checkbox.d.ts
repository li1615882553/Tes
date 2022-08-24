import Control from "../../../core/VNode/Control";
import { IBaseComponent } from "../template/component";
import CheckBoxGroup from "./checkbox-group";
export interface ICheckBoxProps extends IBaseComponent {
    /**单向传入的值 */
    /**双向绑定数据 */
    value?: boolean | string | number;
    /**是否选中,默认false */
    checked?: boolean;
    /**是否禁用 */
    disabled?: boolean;
    /**选中值变化事件 */
    onChange?: (value: any) => void;
    /**选中状态的值,只有在checkbox-group或绑定对象为array时有效 */
    label?: string | number | boolean;
    /**选中时的值 */
    trueLabel?: string | number;
    /**没有选中时的值 */
    falseLabel?: string | number;
}
declare class Checkbox extends Control<ICheckBoxProps> {
    checkboxGroup: CheckBoxGroup;
    get isGroup(): boolean;
    /**内部checkbox绑定的数据 */
    get model(): any;
    set model(val: any);
    /**获取选中的值 */
    get store(): string | number | boolean;
    /**是否应禁用 */
    get isDisable(): boolean;
    render(): any;
    addToStore(): void;
    protected componentWillMount(): void;
}
export default Checkbox;
