import { IBaseComponent } from "../template/component"
import Component from "../../../core/VNode/decorators/Component"
import Control from "../../../core/VNode/Control";
import classNames from 'classnames';

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

@Component
class Tag extends Control<ITagProps> {
  get tagName(){
    let tag = this.$children[0];
    while(tag.type){
      tag = tag.children[0];
    }
    return tag.props;
  }
  protected render(): void {
      const { type, effect, size = "default", className, style, closeable } = this.props;
      const tagCls = {
        [`is-${effect}`] : !!effect,
        [`t-tag-${type}`] : !!type,
        [`t-tag-${size}`] : !!size,
      }
      const clsName = classNames(
        "t-tag", className, tagCls
      )
      return (
        <span
          className = { clsName }
          style = { style }
          onClick = { this.handleClick }
        >
          { this.$children }
          { closeable 
              ? <i class="t-tag__close iconfont icon-close"
                  onClick={ this.handleClose }
                ></i>
              : null 
          }
        </span>
      )
  }

  handleClick(e){
    const { onClick } = this.props;
    if(onClick){
      onClick(e);
    }
  }

  handleClose(e){
    const { onClose } = this.props;
    if(onClose){
      onClose(e);
    }
  }
}

export default Tag;