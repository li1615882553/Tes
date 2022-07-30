import { isArray, shallowCopy } from "../../../shared/util";
import Control from "../../../core/VNode/Control";
import Component from "../../../core/VNode/decorators/Component"
import { IBaseComponent } from "../template/component";
import CheckBoxGroup from "./checkbox-group";

export interface ICheckBoxProps extends IBaseComponent {
  /**单向传入的值 */
  // value?: boolean | string | number,
  /**双向绑定数据 */
  value?: boolean | string | number,
  /**是否选中,默认false */
  checked?: boolean,
  /**是否禁用 */
  disabled?: boolean,
  /**选中值变化事件 */
  onChange?: (value: any) => void
  /**选中状态的值,只有在checkbox-group或绑定对象为array时有效 */
  label?: string | number | boolean;
  /**选中时的值 */
  trueLabel?: string | number;
  /**没有选中时的值 */
  falseLabel?: string | number;
}

@Component
class Checkbox extends Control<ICheckBoxProps> {
  checkboxGroup: CheckBoxGroup;
  get isGroup() {
    let parent = this.$parent;
    if (parent.$info.name !== "CheckBoxGroup") {
      parent = parent.$parent;
    } else {
      this.checkboxGroup = (parent as CheckBoxGroup);
      return true;
    }
  }
  /**内部checkbox绑定的数据 */
  get model() {
    let value;
    value = this.store;
    const { trueLabel, label} = this.props;
    if(isArray(value)){
      return value.indexOf(label) !== -1;
    }else if (Object.prototype.toString.call(value) === "[object String]") {
      if (value === trueLabel) {
        return true;
      }else{
        return false;
      }
    }
    return value;
  }
  set model(val) {
    let value;
    const { trueLabel, falseLabel, onChange, label } = this.props;
    if (val) {
      value = this.isGroup ? label : trueLabel === undefined ? true : trueLabel;
    } else {
      value = this.isGroup ? label : falseLabel === undefined ? false : falseLabel;
    }
    if(this.isGroup){
      let i = (this.store as any).indexOf(value), store:any = this.store;
      this.checkboxGroup.props.value = val ? i < 0 && store.concat(value) : i > -1 && store.slice(0,i).concat(store.slice(i+1))
    }else{
      this.props.value = value;
    }
    if (onChange) {
      if (isArray(onChange)) {
        for (let change of onChange) {
          change(shallowCopy(this.store));
        }
      } else {
        onChange(shallowCopy(this.store));
      }
    }
  }
  /**获取选中的值 */
  get store() {
    return this.isGroup && this.checkboxGroup ? this.checkboxGroup.props.value : this.props.value;
  }
  /**是否应禁用 */
  get isDisable() {
    return this.isGroup
      ? this.checkboxGroup.props.disabled || this.props.disabled
      : this.props.disabled;
  }

  render() {
    const { className, style, disabled, checked, trueLabel, falseLabel, ...otherProps } = this.props;
    return (
      <label
        class="t-checkbox"
        role="checkbox"
        otherProps
      >
        <span class="t-checkbox__input">
          <span class="t-checkbox__inner"></span>
          {
            (trueLabel || falseLabel)
              ? <input
                type="checkbox"
                model="model"
                true-value={trueLabel}
                false-value={falseLabel}
              />
              : <input
                type="checkbox"
                model="model"
              />
          }
        </span>
        <span class="t-checkbox__label">
          {this.$children ? this.$children : this.props.label}
        </span>
      </label>
    )
  }

  addToStore() {
    let { label, trueLabel } = this.props;
    if (Array.isArray(this.model) && (this.model as Array<any>).indexOf(label) !== -1) {
      (this.model as Array<any>).push(label)
    } else {
      this.model = trueLabel || true;
    }
  }

  protected componentWillMount(): void {
    this.props.checked && this.addToStore()
  }
}

export default Checkbox;