/**
 * 初始化data属性   target.$data  并且将data属性添加到 target 上,访问此数据即访问 target.$data 的数据, target.$data即触发相应式
 * @param isCustomElement
 * @param target
 * @param root
 * @param options
 * @param targetProxy
 * @returns
 */
export default function initData(target: any, options: any, targetProxy: any): void;
