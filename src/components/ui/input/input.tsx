import Control from "../../../core/VNode/Control";
import VNode from "../../../core/VNode/VNode";
import Component from "../../../core/VNode/decorators/Component"
import { IBaseComponent } from "../template/component";
import classNames from 'classnames';

import "./input.scss"
import { bind } from "../../../core/VNode/decorators/Bind";

export interface IInputProps extends IBaseComponent {
  /**绑定值 */
  value?: string | number;
  /**类型  text/textarea和其他原生input的type值 */
  type?: string;
  /**原生属性,最大输入长度 */
  maxLength?: number;
  /**原生属性,最小输入长度 */
  minLength?: number;
  /**输入占位符文本 */
  placeholder?: string;
  /**是否可清空 */
  clearable?: boolean;
  /**是否为密码 */
  password?: boolean;
  /**是否禁用 */
  disabled?: boolean;
  /**是否只读,原生属性 */
  readonly?: boolean;
  /**头部文字/图标 */
  header?: VNode | string;
  /**尾部文字/图标 */
  footer?: VNode | string;
  /**输入框前部图标 */
  prefixIcon?: string;
  /**输入框尾部图标 */
  suffixIcon?: string;
  /**组件大小 */
  size?: 'small' | 'default' | 'large';
  /**原生属性,自动获取焦点 */
  autoFocus?: boolean;
  /**输入事件 */
  onInput?: (value: string) => void;
  /**清除事件 */
  onClear?: () => void;

  onKeyDown?: (e) => void;
}

@Component
class Input extends Control<IInputProps> {
  hovering: boolean = false;
  passwordVisible: boolean = false;
  isComposing: boolean = false;
  focused: boolean = false;
  @bind("") body;

  get showClear() {
    const { clearable, disabled, readonly } = this.props;
    return clearable &&
      !disabled &&
      !readonly &&
      (this.focused || this.hovering)
  }
  get textLength() {
    const { value } = this.props;
    if (typeof value === 'number') {
      return String(value).length;
    }
    return (value || '')
  }
  get showPwdVisible() {
    const { password, disabled, readonly } = this.props;
    return password && !disabled && !readonly && (this.focused || this.hovering)
  }

  render() {
    const { placeholder = "", className, style, size, header, footer, clearable, onChange, value, disabled, type, password, readonly, prefixIcon, suffixIcon } = this.props;
    const btnCls = {
      ['t-input']: type != 'textarea',
      ['t-textarea']: type === 'textarea',
      [`is-disabled`]: !!disabled,
      [`t-input-group`]: header || footer,
      [`t-input-group--append`]: footer,
      [`t-input-group--prepend`]: header,
      [`t-input--prefix`]: !!prefixIcon,
      [`t-input--suffix`]: !!suffixIcon || clearable || password
    }
    const clsName = classNames(
      btnCls, className
    )
    return (
      <div
        className={clsName}
        onMouseEnter={() => { this.hovering = true }}
        onMouseLeave={() => { this.hovering = false }}
      >
        {/* 前置元素 */}
        {
          header && type !== 'textarea'
            ? <span class="t-input-group__prepend">
              header
            </span>
            : null
        }
        {
          type !== 'textarea'
            ? (
              <input
                class="t-input__inner"
                type={password ? (this.passwordVisible ? 'text' : 'password') : type}
                disabled={disabled}
                readOnly={readonly}
                value={value}
                autoFocus
                placeholder={placeholder}
                onCompositionStart={this.handleCompositionStart}
                onCompositionEnd={this.handleCompositionEnd}
                onInput={this.handleInput}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}
              ></input>
            )
            : <textarea
              class="t-textarea__inner"
              disabled={disabled}
              readonly={readonly}
              value={value}
              placeholder={placeholder}
              onCompositionStart={this.handleCompositionStart}
              onCompositionEnd={this.handleCompositionEnd}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            ></textarea>
        }
        {/* 前置内容 */}
        {
          prefixIcon && type !== 'textarea'
            ? <span class="t-input__prefix">
              <i class={`t-input__icon iconfont ${prefixIcon}`}></i>
            </span>
            : null
        }
        {/* 后置内容 */}
        <span class="t-input__suffix">
          {suffixIcon && type !== 'textarea' ? <i class={`t-input__icon iconfont ${suffixIcon}`}></i> : null}
          {this.showClear && type !== 'textarea' ? <i class={`t-input__icon t-input__clear iconfont icon-cancel`} onClick={this.clear}></i> : null}
          {this.showPwdVisible && type !== 'textarea' ? <i class={`t-input__icon t-input__clear iconfont icon-view`} onClick={this.handlePasswordVisible}></i> : null}
        </span>
        {/* 后置元素 */}
        {
          footer && type !== 'textarea'
            ? <span class="t-input-group__append">
              footer
            </span>
            : null
        }
        <span
        ></span>
      </div>
    )
  }

  handleCompositionStart() {
    this.isComposing = true;
  }
  handleCompositionEnd(event) {
    this.isComposing = false;
    this.handleInput(event);
  }
  handleInput(event) {
    if (this.isComposing) return;
    const { onInput } = this.props;
    this.props.value = event.target.value;

    if (onInput) {
      onInput(event.target.value)
    }
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  handleFocus(event) {
    this.focused = true;
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  handleBlur(event) {
    this.focused = false;
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  handlePasswordVisible() {
    this.passwordVisible = !this.passwordVisible;
    this.elem.querySelector("input")
  }

  clear(event) {
    event.stopPropagation();
    let { onInput, onChange, onClear } = this.props;
    this.props.value = '';
    onInput && onInput('');
    onChange && onChange('');
    onClear && onClear();
  }

  handleKeyDown(e){
    const { onKeyDown } = this.props;
    if(onKeyDown){
      onKeyDown(e);
    }
  }
}

export default Input;