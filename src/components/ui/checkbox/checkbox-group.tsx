import Control from "../../../core/VNode/Control";
import VNode from "../../../core/VNode/VNode";
import Component from "../../../core/VNode/decorators/Component"
import { IBaseComponent } from "../template/component";
import { ICheckBoxProps } from "./checkbox";
import nextTick from "@component/ux/nextTick/nextTick";

export interface ICheckBoxGroupProps extends IBaseComponent {
  /**值 */
  value?: string,
  /**是否禁用 */
  disabled?: boolean,
  /**选中值变化事件 */
  onChange?: (value: any) => void
}

@Component
class CheckBoxGroup extends Control<ICheckBoxGroupProps>{
  render(){
    const { disabled } = this.props;
    return (
      <div 
        class="t-checkbox-group"
        role="group"
      >
         { (this.$children as VNode[]).map(children => {
          return Control.$cloneNode<ICheckBoxProps>(children, {
            disabled: disabled,
            onChange: this.handleChange
          })
        }) }
      </div>
    )
  }

  handleChange(value){
    const { onChange } = this.props;
    
    if(onChange){
      nextTick(() => onChange(value))
    }
  }
}

export default CheckBoxGroup;