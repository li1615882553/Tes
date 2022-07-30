// 通用事件
export interface IEvent {
  // tslint:disable
  onEnter?: any;
  onKeyDown?: any;
  onKeyUp?: any;
  onChange?: any;
  onClick?: any;
  onFocus?: any;
  onBlur?: any;
}

export interface IBaseComponent extends IEvent{
  className?: string,
  id?:string,
  style?: any  //React.CSSProperties  暂时设置any
  /**组件内部双向绑定属性 */
  model?: string
}