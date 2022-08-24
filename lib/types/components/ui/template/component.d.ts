export interface IEvent {
    onEnter?: any;
    onKeyDown?: any;
    onKeyUp?: any;
    onChange?: any;
    onClick?: any;
    onFocus?: any;
    onBlur?: any;
}
export interface IBaseComponent extends IEvent {
    className?: string;
    id?: string;
    style?: any;
    /**组件内部双向绑定属性 */
    model?: string;
}
