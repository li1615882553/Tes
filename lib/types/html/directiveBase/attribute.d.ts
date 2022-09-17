import Control from "../../core/VNode/Control";
export default class AttributeCommitter {
    key: string;
    value: any;
    control: Control;
    init: boolean;
    constructor(key: string, value: any, control: Control);
    commit(value: any): void;
    destory(): void;
}
