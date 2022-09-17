/**
 * 解析 watch 中的值 字符串则定位到当前对象内的数据,方法则直接使用方法
 * @param expOrFn
 * @param self
 * @returns
 */
export default function parseExpOrFn(expOrFn: string | (() => any), self: any): any;
export declare function parseSetExp(exp: string, self: any): (value: any) => void;
