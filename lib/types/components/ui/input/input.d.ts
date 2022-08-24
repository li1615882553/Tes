import Control from "../../../core/VNode/Control";
import VNode from "../../../core/VNode/VNode";
import { IBaseComponent } from "../template/component";
import "./input.scss";
export interface IInputProps extends IBaseComponent {
    /**绑定值 */
    value?: string | number;
    /**类型  text/textarea和其他原生input的type值 */
    type?: string;
    /**原生属性,最大输入长度 */
    maxLength?: number;
    /**原生属性,最小输入长度 */
    minLength?: number;
    /**输入占位符文本 */
    placeholder?: string;
    /**是否可清空 */
    clearable?: boolean;
    /**是否为密码 */
    password?: boolean;
    /**是否禁用 */
    disabled?: boolean;
    /**是否只读,原生属性 */
    readonly?: boolean;
    /**头部文字/图标 */
    header?: VNode | string;
    /**尾部文字/图标 */
    footer?: VNode | string;
    /**输入框前部图标 */
    prefixIcon?: string;
    /**输入框尾部图标 */
    suffixIcon?: string;
    /**组件大小 */
    size?: 'small' | 'default' | 'large';
    /**原生属性,自动获取焦点 */
    autoFocus?: boolean;
    /**输入事件 */
    onInput?: (value: string) => void;
    /**清除事件 */
    onClear?: () => void;
    onKeyDown?: (e: any) => void;
}
declare class Input extends Control<IInputProps> {
    hovering: boolean;
    passwordVisible: boolean;
    isComposing: boolean;
    focused: boolean;
    body: any;
    get showClear(): boolean;
    get textLength(): string | number;
    get showPwdVisible(): boolean;
    render(): any;
    handleCompositionStart(): void;
    handleCompositionEnd(event: any): void;
    handleInput(event: any): void;
    handleChange(event: any): void;
    handleFocus(event: any): void;
    handleBlur(event: any): void;
    handlePasswordVisible(): void;
    clear(event: any): void;
    handleKeyDown(e: any): void;
}
export default Input;
