import { IBaseComponent } from "../template/component"
import Component from "../../../core/VNode/decorators/Component"
import Control from "../../../core/VNode/Control";
import classNames from 'classnames';
import Select from "./select";
import { escapeRegexpString, getValueByPath } from "../../utils/util";
import { isObject } from "../../../shared/util";
import Observe from "../../../core/observable/Observe";

import "./option.scss"
import OptionGroup from "./optionGroup";

export interface IOptionsProps extends IBaseComponent {
  /**选项的值 */
  value: string | number | any;
  /**选项的标签,如果不设置则与value相同 */
  label?: string | number;
  /**是否禁用 */
  disabled?: boolean;

  onChange?: (option: Option) => void
}

@Component
class Option extends Control<IOptionsProps> {
  //当前Option是否显示
  visible: boolean = true;
  select: Select;
  optionGroup: OptionGroup;

  get groupDisabled(){
    return this.optionGroup && this.optionGroup.props.disabled;
  }

  get itemSelected() {
    const { value } = this.props;
    if (this.select.props.multiple) {
      return this.contains(value, this.select.props.value)
    } else {
      const valueKey = this.select.props.valueKey;
      return isObject(value)
        ? getValueByPath(value, valueKey) === getValueByPath(this.select.props.value, valueKey)
        : value === this.select.props.value
    }
  }
  /**当前option的label */
  get currentLabel() {
    const { label, value } = this.props;
    return label || (isObject(value) ? "" : value);
  }

  protected render(): void {
    const { className, style, disabled } = this.props;
    const btnCls = {
      ['selected']: this.itemSelected,
      ['is-disabled']: disabled || this.groupDisabled
    }
    const clsName = classNames(
      't-select-option', btnCls, className
    )
    return (
      <li
        style={`${this.visible ? '' : 'display:none;'}`}
        className={clsName}
        onMouseEnter={this.hoverItem}
        onClick={this.handleChange}
      >
        {this.currentLabel}
      </li>
    )
  }
  protected componentWillMount() {
    let parent = this.$parent;
    while (parent) {
      if(parent instanceof Select){
        this.select = parent;
        break;
      }else if(parent instanceof OptionGroup){
        this.optionGroup = parent;
      }
      parent = parent.$parent;
    }
    this.select && this.select.options.push(this);
    this.select && this.select.optionsCount++;
  } 

  hoverItem() {
    const { disabled } = this.props;
    if (!disabled && !this.groupDisabled) {
      this.select.hoverIndex = this.select.options.indexOf(this);
    }
  }

  handleChange(e) {
    e.stopPropagation();
    const { disabled, onChange } = this.props;
    if (!disabled && !this.groupDisabled) {
      onChange && onChange(Observe.observeProxyMap.get(this).target);
    }
  }

  queryChange(query) {
    let lastVisible = this.visible;
    this.visible = new RegExp(escapeRegexpString(query), 'i').test(this.currentLabel);
    if(lastVisible !== this.visible){
      if(this.visible){
        this.select && this.select.optionsCount++;
      }else{
        this.select && this.select.optionsCount--;
      }
    }
  }

  /**判断选中队列中是否包含当前Options */
  contains(target, selectedArr = []) {
    if (!isObject(target)) {
      return selectedArr && selectedArr.indexOf(target) > -1;
    } else {
      const valueKey = this.select.props.valueKey;
      return selectedArr && selectedArr.some(item => {
        return getValueByPath(item, valueKey) === getValueByPath(target, valueKey);
      });
    }
  }
}

export default Option;