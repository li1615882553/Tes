import { IBaseComponent } from "../template/component"
import Component from "../../../core/VNode/decorators/Component"
import Control from "../../../core/VNode/Control";
import VNode from "../../../core/VNode/VNode";
import classNames from 'classnames';
import Input from "../input/input";
import Popup from "../popup/popup";
import Tag from "../tag/tag";
import { isObject } from "../../../shared/util";
import watch from "../../../core/VNode/decorators/Watch";
import Option from "./option";
import nextTick from "@component/ux/nextTick/nextTick";
import { getValueByPath } from "../../utils/util";

import "./select.scss"
import OptionGroup from "./optionGroup";
export interface ISelectProps extends IBaseComponent {
  /**选项的值 */
  value?: string | number | any;
  /**作为value的唯一键名,绑定值为对象类型时必填 */
  valueKey?: string;
  /**是否禁用 */
  disabled?: boolean;
  /**是否允许多选 */
  multiple?: boolean;
  /**是否可以清空选项 */
  clearable?: boolean;
  /**多选用户选中上限,0则不设置上限 */
  // multioleLimit?: number;
  /**占位符 */
  placeholder?: string;
  /**是否可搜索 */
  filterable?: boolean;
  /**对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 */
  automaticDropdown?: boolean;
  /**搜索条件匹配不到时,显示的文字 */
  emptyText?: string;
  /**选中值发生变化 */
  onChange?: (value: ISelectProps['value']) => void;
  /**多选模式下,用户移除tag时触发 */
  onRemoveChange?: (value: ISelectProps['value']) => void;
  /**可清空的单选模式下用户点击清空时触发 */
  onClear?: () => void;
  /**input失去焦点时触发 */
  onBlur?: (e) => void;
  /**input获得焦点时触发 */
  onFocus?: (e) => void;
  removeTag?: (value: ISelectProps['value']) => void;
}

@Component
class Select extends Control<ISelectProps> {
  hoverIndex: number = -1;
  visible: boolean = false;
  menuVisibleOnFocus: boolean = false;
  selectLabel: string = "";
  query: string = "";
  /**输入框宽度 */
  inputWidth: number = 0;
  /**选中的数据 */
  selected: Array<Option>;
  softFocus: boolean = false;
  //包含的options数量
  options: Option[] = [];
  optionsCount: number = 0;
  initialInputHeight: number = 40;
  optionGroups: OptionGroup[] = [];
  //缓存的plcaeholder
  cachePlaceholder: string;

  //防抖查询方法
  debouncedQueryChange: Function;

  @watch("visible")
  handleWatch(val) {
    const { filterable, multiple, value, valueKey, placeholder } = this.props;
    if (!val) {
      this.query = "";
      this.menuVisibleOnFocus = false;
      filterable && !value && (this.cachePlaceholder = placeholder);
      if (filterable && multiple) {
        this.find(".t-select__tags input") && (this.find(".t-select__tags input") as HTMLElement).blur();
      } else {
        this.find(".t-input input") && (this.find(".t-input input") as HTMLElement).blur();
      }
    } else {
      if (filterable && !multiple) {
        this.selectLabel = "";
        this.cachePlaceholder = isObject(value) ? value[valueKey] : value ? value : placeholder;
      }
      this.handleQueryChange("");
      if (filterable && multiple) {
        this.find(".t-select__tags input") && (this.find(".t-select__tags input") as HTMLElement).focus();
      } else {
        this.find(".t-input input") && (this.find(".t-input input") as HTMLElement).focus();
      }
    }
  }

  get selectDisabled() {
    return this.props.disabled;
  }

  get readonly() {
    const { filterable, multiple } = this.props;
    return !filterable || multiple;
  }

  get suffixIcon() {
    const { filterable } = this.props;
    // return filterable ? "" : (this.visible ? "icon-upArrow" : "icon-downArrow");
    return this.visible ? "icon-upArrow" : "icon-downArrow";
  }
  protected componentWillMount(): void {
    this.cachePlaceholder = this.props.placeholder;
  }
  protected componentMounted(): void {
    const input = (this.find(".t-input input") as HTMLElement);

    //等待Option全部挂载完毕执行
    this.setSelected();
    nextTick(() => {
      this.initialInputHeight = input.getBoundingClientRect().height || 40;
      this.inputWidth = input.getBoundingClientRect().width;
    })
  }

  protected render() {
    const { multiple, clearable, filterable, emptyText = "无匹配数据" } = this.props;
    const list = this.execChildVNode(this.$children);
    list.push((<p class="t-select-dropdown__empty" style={`${this.optionsCount ? 'display:none;' : ''}`}>{emptyText}</p>));
    !this.selected && (this.selected = multiple ? [] : undefined);
    const selectTags = (multiple && this.selected.length && (this.selected as Array<any>).map(tag => {
      return <Tag closeable={!this.selectDisabled} type="info" onClose={this.deleteTag(tag)} ><span class="t-select__tags-text">{tag.currentLabel}</span></Tag>
    })) || [];
    multiple && filterable &&
      (selectTags.push(
        <input
          class="t-select__input"
          type="text"
          model="query"
          style={`flex-grow:1;width:1%;max-width:${this.inputWidth - 42}px;`}
          suffixIcon={this.suffixIcon}
          disabled={this.selectDisabled}
          readonly={this.readonly}
          onFocus={this.handleFocus}
          onBlur={() => { this.softFocus = false }}
          onInput={this.handleQueryChange}
        ></input>
      ));
    return (
      <div
        class="t-select"
        onClick={this.toggleMenu}
      >
        {
          multiple
            ? <div className="t-select__tags" style={`max-width:${this.inputWidth - 32}px; width:100%`}>
              {selectTags}
            </div>
            : null
        }
        <Input
          type="text"
          model="selectLabel"
          placeholder={this.cachePlaceholder}
          clearable={clearable}
          suffixIcon={this.suffixIcon}
          disabled={this.selectDisabled}
          readonly={this.readonly}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onInput={this.handleQueryChange}
          onClear={this.handleClear}
        >
          <Popup
            className="t-select-dropdown"
            style={`width:${this.inputWidth}px;display:none;`}
            align="lr-bb"
            type="visible"
            visible={this.visible}
            onChange={this.handleClickOut}
          >
            {list}
          </Popup>
        </Input>
      </div>
    )
  }
  /**遍历更新子节点 */
  execChildVNode(node: VNode[]) {
    if(!node) return [];
    //尽量方式复用之前的child对象 导致render重复赋值
    node = node.slice(0, node.length);
    for (let curNode of node) {
      if ((curNode.type as any).name === "Option") {
        curNode = Control.$cloneNode(curNode, {
          onChange: this.handleOptionSelect
        })
      }
      curNode.children && this.execChildVNode(curNode.children);
    }
    return node;
  }

  getOption(value): Option {
    let option;
    const { valueKey } = this.props;
    for (let i = this.options.length - 1; i >= 0; i--) {
      const cachedOption = this.options[i];
      const isEqual = isObject(value)
        ? getValueByPath(cachedOption.props.value, valueKey) === getValueByPath(value, valueKey)
        : cachedOption.props.value === value;
      if (isEqual) {
        option = cachedOption;
        break;
      }
    }
    if (option) return option;
  }

  setSelected() {
    const { multiple, value, valueKey } = this.props;
    if (!multiple && value) {
      let option = this.getOption(value);
      this.selectLabel = isObject(option.props.value) ? option.props.value[valueKey] : option.props.value;
      this.selected = [option];
    }
    let result = [];
    if (Array.isArray(value)) {
      value.forEach(item => {
        result.push(this.getOption(item));
      })
    }
    this.selected = result;
    this.resetInputHeight();
  }

  deleteTag(opt: Option) {
    return (event: PointerEvent) => {
      const { value, onChange, removeTag, placeholder, filterable } = this.props;
      let index = (this.selected as Array<Option>).indexOf(opt);
      if (index > -1 && !this.selectDisabled) {
        const selectValue = (value || []).slice();
        const optionIndex = this.getValueIndex(value, opt.props.value);
        if (optionIndex > -1) {
          selectValue.splice(optionIndex, 1);
        }
        this.props.value = selectValue;
        if (selectValue.length) {
          this.cachePlaceholder = "";
        } else {
          this.cachePlaceholder = placeholder;
        }
        onChange && onChange(selectValue);
        removeTag && removeTag(opt.props.value);
      }
      this.setSelected();
      event.stopPropagation();
    }
  }

  handleFocus(event) {
    const { onFocus, automaticDropdown, filterable } = this.props;
    if (!this.softFocus) {
      if (automaticDropdown || filterable) {
        this.menuVisibleOnFocus = true;
        this.visible = true;
      }
      onFocus && onFocus(event);
    } else {
      this.softFocus = false;
    }
  }

  handleBlur(event) {
    const { onBlur } = this.props;
    onBlur && onBlur(event);
    this.softFocus = false;
  }

  handleOptionSelect(option: Option) {
    const { value, multiple = false, onChange, valueKey, placeholder, filterable } = this.props;
    if (multiple) {
      const selectValue = (value || []).slice();
      const optionIndex = this.getValueIndex(value, option.props.value);
      if (optionIndex > -1) {
        selectValue.splice(optionIndex, 1);
      } else {
        selectValue.push(option.props.value);
      }
      this.props.value = selectValue;
      if (selectValue.length) {
        this.cachePlaceholder = "";
      } else {
        this.cachePlaceholder = placeholder;
      }
      if (filterable) {
        this.query = "";
        this.handleQueryChange(this.query);
      }
      onChange && onChange(value);
    } else {
      this.props.value = option.props.value;
      this.selectLabel = isObject(option.props.value) ? option.props.value[valueKey] : option.props.value;
      this.cachePlaceholder = this.selectLabel;
      this.visible = false;
      onChange && onChange(option.props.value);
    }
    if (filterable && multiple) {

    }
    this.setSelected();
    this.setSoftFocus();
  }

  setSoftFocus() {
    const { filterable, multiple } = this.props;
    this.softFocus = true;

    if (filterable && multiple) {
      const input = this.find(".t-select__tags input") && (this.find(".t-select__tags input") as HTMLElement);
      input && input.focus();
    } else {
      const input = (this.find(".t-input input") as HTMLElement)
      input && input.focus();
    }
  }

  toggleMenu(event) {
    event.stopPropagation();
    if (!this.selectDisabled) {
      if (this.menuVisibleOnFocus) {
        this.menuVisibleOnFocus = false;
      } else {
        this.visible = !this.visible;
      }
    }
  }

  getValueIndex(arr = [], value) {
    const { valueKey } = this.props;
    if (!isObject(value)) {
      return arr.indexOf(value);
    } else {
      let index = -1;
      arr.some((item, i) => {
        if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey)) {
          index = i;
          return true;
        }
        return false;
      })
      return index;
    }
  }

  handleQueryChange(input: string | InputEvent = '') {
    input instanceof InputEvent && (input = (input.target as HTMLInputElement).value);
    const { multiple, value, valueKey, filterable, placeholder } = this.props;
    if (!filterable) return;
    if (!multiple) {
      value ? (this.cachePlaceholder = isObject(value) ? value[valueKey] : value) : (this.cachePlaceholder = placeholder);
    } else {
      input && (this.cachePlaceholder = "");
    }
    this.options.forEach(option => {
      option.queryChange(input);
    })
    this.optionGroups.forEach(optGroup => {
      optGroup.queryChange();
    })
  }

  resetInputHeight() {
    nextTick(() => {
      const inputElem = (this.find(".t-input input") as HTMLInputElement);
      const tagContainerElem = (this.find(".t-select__tags") as HTMLDivElement);
      if (inputElem) {
        inputElem.style.height = this.selected.length === 0
          ? this.initialInputHeight + 'px'
          : Math.max(
            tagContainerElem ? tagContainerElem.clientHeight : 0,
            this.initialInputHeight
          ) + 'px';
      }
      (this.find(".t-select-dropdown") as Popup).realign();
    })
  }

  handleClickOut(value) {
    if (this.visible !== value) {
      const { filterable, placeholder } = this.props;
      this.visible = value;
      filterable && !value && this.cachePlaceholder !== placeholder && (this.selectLabel = this.cachePlaceholder)
    }
  }

  handleClear() {
    const { placeholder } = this.props;
    this.selectLabel = "";
    this.cachePlaceholder = placeholder;
    this.props.value = "";
  }
}

export default Select;