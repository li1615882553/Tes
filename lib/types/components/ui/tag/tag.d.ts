import { IBaseComponent } from "../template/component";
import Control from "../../../core/VNode/Control";
import "./tag.scss";
export interface ITagProps extends IBaseComponent {
    /**类型 */
    type?: "success" | "info" | "warning" | "danger";
    /**背景色 */
    color?: string;
    /**尺寸 */
    size?: 'small' | 'large' | 'default';
    /**是否可关闭 */
    closeable?: boolean;
    /**主题 */
    effect?: "plain";
    /**关闭回调 */
    onClose?: (e?: PointerEvent) => void;
    /**点击回调 */
    onClick?: (e?: PointerEvent) => void;
}
declare class Tag extends Control<ITagProps> {
    get tagName(): any;
    protected render(): void;
    handleClick(e: any): void;
    handleClose(e: any): void;
}
export default Tag;
