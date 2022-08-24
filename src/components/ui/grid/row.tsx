import Control from "../../../core/VNode/Control";
import Component from "../../../core/VNode/decorators/Component"
import { IBaseComponent } from "../template/component";
import classNames from 'classnames';

import "./row.scss";
export interface IRowProps extends IBaseComponent {
  align ?: "top" | "middle" | "bottom",
  justify?: "start" | "end" | "center" | "space-around" | "space-between",
  gutter?: number
}

@Component
class Row extends Control<IRowProps>{
  protected render() {
    const { align="top", justify="start", className, gutter = 0, style } = this.props;
    const clsName = classNames(
      "t-row","t-row--flex", className,{
        [`is-align-${align}`]: align !== "top",
        [`is-justify-${justify}`]: justify !== "start"
      }
    )
    const offsetStyle = gutter > 0 ? {
      marginLeft: gutter / -2,
      marginRight: gutter / -2
    } : {};
    const colChildren = this.$children && this.$children.map(child => {
      return Control.$cloneNode(child,{
        style:{
          paddingLeft: gutter / 2,
          paddingRight: gutter / 2,
          ...child.props.style
        }
      })
    });
    return (
      <div
        className={clsName}
        style={{...offsetStyle, ...style}}
      >
        { colChildren }
      </div>
    )
  }
}

export default Row;