import Control from "../../../core/VNode/Control";
import { IBaseComponent } from "../template/component";
import "./button.scss";
export interface IButtonProps extends IBaseComponent {
    /**是否禁用 */
    disabled?: boolean;
    loading?: boolean;
    type?: 'primary' | 'warning' | 'danger' | 'success' | 'default';
    shape?: 'circle';
    size?: 'small' | 'large' | 'default';
    icon?: string;
    plain?: boolean;
    round?: boolean;
    tail?: boolean;
}
declare class Button extends Control<IButtonProps> {
    name: string;
    onClick: () => void;
    protected render(): any;
}
export default Button;
