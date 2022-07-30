import Control from "../../../core/VNode/Control";
import VNode from "../../../core/VNode/VNode";
import Component from "../../../core/VNode/decorators/Component"
import * as classNames from 'classnames';
import { IBaseComponent } from "../template/component";
import { IRadioProps } from "./radio";
import nextTick from "@component/ux/nextTick/nextTick";

import "./radio-group.scss";
export interface IRadioGroupProps extends IBaseComponent {
  /**绑定值 */
  value?: string | number | boolean,
  /**是否禁用 */
  disabled?: boolean,
  /**readioGroup的尺寸 */
  size?: "medium" | "small" | "mini"
  /**单选组中值变化事件 */
  onChange?: (value: IRadioGroupProps["model"]) => void
}

@Component
class RadioGroup extends Control<IRadioGroupProps> {
  render() {
    const { disabled } = this.props;
    return (
      <div
        class="t-radio-group"
        onKeyDown={this.handleKeyDown.bind(this)}
      >
        { (this.$children as VNode[]).map(children => {
          return Control.$cloneNode<IRadioProps>(children, {
            disabled: disabled,
            onChange: this.handleChange
          })
        }) }
      </div>
    )
  }

  handleKeyDown(e: KeyboardEvent) {
    const target = e.target;
    const radios = this.elem.querySelectorAll("[type=radio]");
    const length = radios.length;
    const index = [].indexOf.call(radios, target);
    const roleRadios = this.elem.querySelectorAll<HTMLInputElement>('[role=radio]');
    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
        e.stopPropagation();
        e.preventDefault();
        if (index === 0) {
          roleRadios[length - 1].click();
          roleRadios[length - 1].focus();
        } else {
          roleRadios[index - 1].click();
          roleRadios[index - 1].focus();
        }
        break;
      case "ArrowDown":
      case "ArrowRight":
        if (index === (length - 1)) {
          roleRadios[0].click();
          roleRadios[0].focus();
        } else {
          roleRadios[index + 1].click();
          roleRadios[index + 1].focus();
        }
        break;
    }
  }

  handleChange(value){
    const { onChange } = this.props;
    this.props.model = value;
    if(onChange){
      //因为回写model时异步的,所以这里的onChange也需要异步来执行
      nextTick(() => onChange(value))
    }
  }
}

export default RadioGroup;