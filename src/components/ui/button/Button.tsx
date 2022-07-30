import Control from "../../../core/VNode/Control";
import Component from "../../../core/VNode/decorators/Component"
import Observe from "../../../core/observable/Observe";
import classNames from 'classnames';
import { IBaseComponent } from "../template/component";

import "./button.scss";

export interface IButtonProps extends IBaseComponent  {
  /**是否禁用 */
  disabled?: boolean,
  
  loading?: boolean,

  type?: 'primary' | 'warning' | 'danger' | 'success' | 'default';

  shape?: 'circle';

  size?: 'small' | 'large' | 'default';

  icon?: string,

  plain?: boolean,

  round?: boolean,

  tail?: boolean
}

@Component
class Button extends Control<IButtonProps> {
  public name:string;

  onClick = () => {
    const { loading, disabled, onClick } = this.props;
    if (loading || disabled) {
      return;
    }
    if (onClick) {
      onClick();
    }
  }
    
  protected render() {
    const {
      className, style, loading, disabled, type, shape, icon, plain, size, round, tail
    } = this.props;
    const preCls = "t-button";
    const btnCls = {
      [`${preCls}-${type}`]: type,
      [`${preCls}-${size}`]: !!size,
      [`is-disable`]: !!disabled,
      [`is-circle`]: shape === 'circle',
      [`is-round`]: !!round,
      [`is-plain`]: !!plain,
    }

    const clsName = classNames(
      preCls, btnCls, className
    )
    return (
      <button
        className={clsName}
        style={style}
        disabled={disabled}
        onClick={this.onClick}
      >
        {!!loading ? <i className="iconfont icon-loading"></i> : ""}
        {!tail && !loading && icon ? <i className={`iconfont ${icon}`}></i> : null}
        <span> {this.$children} </span>
        {tail && !loading && icon ? <i className={`iconfont ${icon}`}></i> : null}
      </button>
    );
  }
}

export default Button;
