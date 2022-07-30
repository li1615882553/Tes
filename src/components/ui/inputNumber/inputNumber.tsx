import { IBaseComponent } from "../template/component";
import Component from "../../../core/VNode/decorators/Component"
import Control from "../../../core/VNode/Control";
import Input from "../input/input";
import classNames from 'classnames';
import repeatClickDirective from "../../utils/directives/repeatClick";
import { userDirectives } from "../../../html/const";

import "./inputNumber.scss";

//添加repeatClick自定义指令
userDirectives['repeatClick'] = repeatClickDirective;

export interface IInputNumberProps extends IBaseComponent {
  /**当前值 */
  value?: number;
  /**允许的最小值 */
  min?: number;
  /**允许的最大值 */
  max?: number;
  /**步长 */
  step?: number;
  /**是否只允许输入步长的倍数 */
  stepStrictly?: boolean;
  /**精度 */
  precision?: number;
  /**是否禁用 */
  disabled?: boolean;
  /**输入框placeholder */
  placeholder?: string;
  /**是否使用控件按钮 */
  controls?: boolean;
  /**绑定值变化事件 */
  onChange?: (currentValue?: number, oldValue?: number) => void;
  /**输入框获得焦点事件 */
  onFocus?: (event: FocusEvent) => void;
  /**输入框失去焦点事件 */
  onBlur?: (event: Event) => void;
}

@Component
class InputNumber extends Control<IInputNumberProps> {
  currentValue: string;
  userInput: number = undefined;
  get maxDisabled() {
    const { value, max } = this.props;
    return this._increase(value) > max;
  }
  get minDisabled() {
    const { value, min } = this.props;
    return this._decrease(value) < min;
  }

  get numPrecision() {
    const { value, step, precision } = this.props;
    const stepPrecision = this.getPrecision(step);
    if (precision !== undefined) {
      if (stepPrecision > precision) {
        console.warn("");
      }
      return precision;
    }
    return Math.max(this.getPrecision(value), stepPrecision);
  }

  get displayValue() {
    const { stepStrictly, precision, step } = this.props;
    if (this.userInput !== undefined) {
      return this.userInput;
    }
    let currentValue: string = this.currentValue;
    //展示数据最终取整以及设置精度
    if (stepStrictly) {
      const stepPrecision = this.getPrecision(step);
      const precisionFactor = Math.pow(10, stepPrecision);
      //向step取整
      currentValue = "" + Math.round(+currentValue / step) * precisionFactor * step / precisionFactor;
    }
    //设置精度
    if (precision) {
      currentValue = (+currentValue).toFixed(precision);
    }
    return currentValue;
  }

  protected componentWillMount(): void {
      const { value } = this.props;
      this.currentValue = ""+value;
  }

  private _increase(val: number) {
    const { step = 1 } = this.props;
    const precisionFactor = Math.pow(10, this.numPrecision);
    return (precisionFactor * val + precisionFactor * step) / precisionFactor;
  }

  private _decrease(val: number) {
    const { step = 1 } = this.props;
    const precisionFactor = Math.pow(10, this.numPrecision);
    return (precisionFactor * val - precisionFactor * step) / precisionFactor;
  }

  increase() {
    const { disabled, value = 0 } = this.props;
    if (disabled || this.maxDisabled) return;
    const newVal = this._increase(value);
    this.setCurrentValue(newVal);
  }
  decrease() {
    const { disabled, value = 0 } = this.props;
    if (disabled || this.minDisabled) return;
    const newVal = this._decrease(value);
    this.setCurrentValue(newVal);
  }

  getPrecision(value?: number) {
    if (value === undefined) return 0;
    const valueString = value.toString();
    const dotPosition = valueString.indexOf(".");
    let precision = 0;
    if (dotPosition !== -1) {
      precision = valueString.length - dotPosition - 1;
    }
    return precision;
  }

  setCurrentValue(newVal: number) {
    const { precision, max, min, onChange } = this.props;
    const oldVal = this.currentValue;
    if (precision !== undefined) newVal = +newVal.toFixed(precision);
    if (max !== undefined && newVal >= max) newVal = max;
    if (min !== undefined && newVal <= min) newVal = min;
    if (+oldVal === newVal) return;
    this.userInput = undefined;
    this.props.value = newVal;
    onChange && onChange(newVal, +oldVal);
    this.currentValue = "" + newVal;
  }

  handleInput(val) {
    this.userInput = val;
  }

  handleInputChange(val) {
    const newVal = val === '' ? undefined : Number(val);
    if (!isNaN(newVal) || val === '') {
      this.setCurrentValue(newVal);
    }
    this.userInput = undefined;
  }

  handleBlur(event){
    const { onBlur } = this.props;
    onBlur && onBlur(event);
  }

  handleFocus(event){
    const { onFocus } = this.props;
    onFocus && onFocus(event);
  }

  protected render() {
    const { controls = true, disabled = false, placeholder } = this.props;
    const inputNumberCls = {
      [`is-disabled`]: disabled,
      [`is-without-controls`]: controls
    }
    const clsName = classNames(
      "t-input-number", inputNumberCls
    )
    return (
      <div className={clsName}>
        {
          controls
            ? <span className={`t-input-number__add ${this.maxDisabled ? "is-disabled" : ""}`} repeatClick={this.increase}>
              <i class="iconfont icon-add"></i>
            </span>
            : null
        }
        {
          controls
            ? <span className={`t-input-number__subtract ${this.minDisabled ? "is-disabled" : ""}`} repeatClick={this.decrease}>
              <i class="iconfont icon-subtract"></i>
            </span>
            : null
        }
        <Input
          disabled = {disabled}
          placeholder={placeholder}
          value={this.displayValue}
          onInput={this.handleInput}
          onChange={this.handleInputChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        ></Input>
      </div>
    )
  }
}

export default InputNumber;