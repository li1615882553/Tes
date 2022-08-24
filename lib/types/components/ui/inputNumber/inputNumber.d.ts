import { IBaseComponent } from "../template/component";
import Control from "../../../core/VNode/Control";
import "./inputNumber.scss";
export interface IInputNumberProps extends IBaseComponent {
    /**当前值 */
    value?: number;
    /**允许的最小值 */
    min?: number;
    /**允许的最大值 */
    max?: number;
    /**步长 */
    step?: number;
    /**是否只允许输入步长的倍数 */
    stepStrictly?: boolean;
    /**精度 */
    precision?: number;
    /**是否禁用 */
    disabled?: boolean;
    /**输入框placeholder */
    placeholder?: string;
    /**是否使用控件按钮 */
    controls?: boolean;
    /**绑定值变化事件 */
    onChange?: (currentValue?: number, oldValue?: number) => void;
    /**输入框获得焦点事件 */
    onFocus?: (event: FocusEvent) => void;
    /**输入框失去焦点事件 */
    onBlur?: (event: Event) => void;
}
declare class InputNumber extends Control<IInputNumberProps> {
    currentValue: string;
    userInput: number;
    get maxDisabled(): boolean;
    get minDisabled(): boolean;
    get numPrecision(): number;
    get displayValue(): string | number;
    protected componentWillMount(): void;
    private _increase;
    private _decrease;
    increase(): void;
    decrease(): void;
    getPrecision(value?: number): number;
    setCurrentValue(newVal: number): void;
    handleInput(val: any): void;
    handleInputChange(val: any): void;
    handleBlur(event: any): void;
    handleFocus(event: any): void;
    protected render(): any;
}
export default InputNumber;
