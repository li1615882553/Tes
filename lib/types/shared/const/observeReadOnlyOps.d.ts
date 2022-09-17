import { dataOptions } from "../../types/tes";
declare const dataReadOnlyOptions: dataOptions;
export default dataReadOnlyOptions;
/**
 * 内部修改只读对象后触发更新
 * 将 propsState 修改为true
 * @param target
 * @param name
 * @param value
 */
export declare function setValueByReadOnly(targetProxy: any, name: any, value: any): void;
export declare function getValueByReadOnly(target: any, name: any): void;
