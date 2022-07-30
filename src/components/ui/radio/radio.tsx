import Control from "../../../core/VNode/Control";
import Component from "../../../core/VNode/decorators/Component"
import * as classNames from 'classnames';
import RadioGroup from "./radio-group";
import { IBaseComponent } from "../template/component";

export interface IRadioProps extends IBaseComponent {
  /**绑定值 */
  value?: string | number | boolean;
  /**是否禁用 */
  disabled?: boolean,
  /**radio的value */
  label?: string | number | boolean,
  /**radio的尺寸 */
  size?: "medium" | "small" | "mini",
  /**绑定值变化时触发的事件 */
  onChange?: (value: IRadioProps["label"]) => void
}

@Component
class Radio extends Control<IRadioProps> {
  _radioGroup: RadioGroup;

  get isGroup() {
    let parent = this.$parent;
    while (parent) {
      if (parent.$info.name !== "RadioGroup") {
        parent = parent.$parent;
      } else {
        this._radioGroup = (parent as RadioGroup);
        return true;
      }
    }
    return false;
  }

  get model() {
    return this.isGroup ? this._radioGroup.props.value : this.props.value;
  }
  set model(val){
    if(!this.isGroup){
      this.props.value = val;
    }else{
      this._radioGroup && (this._radioGroup.props.value = val);
    }
  }

  get isDisable() {
    return this.isGroup;
  }

  render() {
    const { label,disabled } = this.props;
    return (
      <label
        class="t-radio"
        role="radio"
        otherProps
      >
        <span
          class="t-radio-input"
        >
          <input
            disabled={disabled}
            value={label}
            type="radio"
            model="model"
            onChange={this.handleChange}
          />
        </span>
        <span class="t-radio-label">
          {this.$children}
        </span>
      </label>
    )
  }

  handleChange() {
    const { onChange, disabled, label } = this.props;
    if (disabled) {
      return;
    }
    if (onChange) {
      onChange(label);
    }
  }

  
}

export default Radio;