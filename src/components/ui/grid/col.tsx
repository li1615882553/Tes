import Control from "../../../core/VNode/Control";
import Component from "../../../core/VNode/decorators/Component"
import { IBaseComponent } from "../template/component";
import classNames from 'classnames';

import "./col.scss";
export interface IColProps extends IBaseComponent {
  /**栅格占位数 */
  span?: number,
  /**栅格左侧间隔数 */
  offset?: number,
  /**顺序号 */
  order?: number,
  /**栅格向左移动间隔数 */
  pull?: number,
  /**栅格向右移动间隔数 */
  push?: number
}

@Component
class Col extends Control<IColProps>{
  protected render() {
    const { span = 0, offset = 0, order, pull, push, className, style } = this.props;
    const clsName = classNames(
      className, {
      [`t-Col-${span}`]: !!span,
      [`t-Col-order-${order}`]: !!order,
      [`t-Col-offset-${offset}`]: !!offset,
      [`t-Col-push-${push}`]: !!push,
      [`t-Col-pull-${pull}`]: !!pull,
    }
    )
    return (
      <div
        className={clsName}
        style={style}
      >
        {this.$children}
      </div>
    )
  }
}

export default Col;