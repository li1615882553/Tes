import { IBaseComponent } from "../template/component";
import Control from "../../../core/VNode/Control";
import Select from "./select";
import "./option.scss";
import OptionGroup from "./optionGroup";
export interface IOptionsProps extends IBaseComponent {
    /**选项的值 */
    value: string | number | any;
    /**选项的标签,如果不设置则与value相同 */
    label?: string | number;
    /**是否禁用 */
    disabled?: boolean;
    onChange?: (option: Option) => void;
}
declare class Option extends Control<IOptionsProps> {
    visible: boolean;
    select: Select;
    optionGroup: OptionGroup;
    get groupDisabled(): boolean;
    get itemSelected(): boolean;
    /**当前option的label */
    get currentLabel(): any;
    protected render(): void;
    protected componentWillMount(): void;
    hoverItem(): void;
    handleChange(e: any): void;
    queryChange(query: any): void;
    /**判断选中队列中是否包含当前Options */
    contains(target: any, selectedArr?: any[]): boolean;
}
export default Option;
