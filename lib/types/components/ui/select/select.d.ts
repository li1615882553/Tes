import { IBaseComponent } from "../template/component";
import Control from "../../../core/VNode/Control";
import VNode from "../../../core/VNode/VNode";
import Option from "./option";
import "./select.scss";
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
    onBlur?: (e: any) => void;
    /**input获得焦点时触发 */
    onFocus?: (e: any) => void;
    removeTag?: (value: ISelectProps['value']) => void;
}
declare class Select extends Control<ISelectProps> {
    hoverIndex: number;
    visible: boolean;
    menuVisibleOnFocus: boolean;
    selectLabel: string;
    query: string;
    /**输入框宽度 */
    inputWidth: number;
    /**选中的数据 */
    selected: Array<Option>;
    softFocus: boolean;
    options: Option[];
    optionsCount: number;
    initialInputHeight: number;
    optionGroups: OptionGroup[];
    cachePlaceholder: string;
    debouncedQueryChange: Function;
    handleWatch(val: any): void;
    get selectDisabled(): boolean;
    get readonly(): boolean;
    get suffixIcon(): "icon-upArrow" | "icon-downArrow";
    protected componentWillMount(): void;
    protected componentMounted(): void;
    protected render(): any;
    /**遍历更新子节点 */
    execChildVNode(node: VNode[]): VNode[];
    getOption(value: any): Option;
    setSelected(): void;
    deleteTag(opt: Option): (event: PointerEvent) => void;
    handleFocus(event: any): void;
    handleBlur(event: any): void;
    handleOptionSelect(option: Option): void;
    setSoftFocus(): void;
    toggleMenu(event: any): void;
    getValueIndex(arr: any[], value: any): number;
    handleQueryChange(input?: string | InputEvent): void;
    resetInputHeight(): void;
    handleClickOut(value: any): void;
    handleClear(): void;
}
export default Select;
