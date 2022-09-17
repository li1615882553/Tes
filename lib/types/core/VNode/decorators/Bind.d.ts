import Control from "../Control";
/**
 * 绑定当前属性到指定控件
 * @param target 要绑定的控件
 * @param propertyName 要绑定的控件属性
 * @param descriptor 要绑定的属性描述器
 */
export declare function bind(selector?: string): PropertyDecorator;
export default function bind(selector?: string): (target: Control, propertyName: string) => void;
