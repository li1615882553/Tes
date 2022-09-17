export declare const prototype: Object, freeze: {
    <T>(a: T[]): readonly T[];
    <T_1 extends Function>(f: T_1): T_1;
    <T_2 extends {
        [idx: string]: object | U;
    }, U extends string | number | bigint | boolean | symbol>(o: T_2): Readonly<T_2>;
    <T_3>(o: T_3): Readonly<T_3>;
}, keys: {
    (o: object): string[];
    (o: {}): string[];
}, create: {
    (o: object): any;
    (o: object, properties: PropertyDescriptorMap & ThisType<any>): any;
}, assign: {
    <T extends {}, U>(target: T, source: U): T & U;
    <T_1 extends {}, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
    <T_2 extends {}, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
    (target: object, ...sources: any[]): any;
};
export declare const hasOwnProperty: (v: PropertyKey) => boolean, toString: () => string;
export declare const isArray: (arg: any) => arg is any[];
export declare const has: typeof Reflect.has, apply: typeof Reflect.apply, ownKeys: typeof Reflect.ownKeys, set: typeof Reflect.set, defineProperty: typeof Reflect.defineProperty, deleteProperty: typeof Reflect.deleteProperty, getOwnPropertyDescriptor: typeof Reflect.getOwnPropertyDescriptor, getPrototypeOf: typeof Reflect.getPrototypeOf;
export declare const emptyObject: any;
export declare const emptyArray: any;
export declare function isFunction(target: any): target is Function;
export declare function isObject(target: any): target is object;
export declare function isSymbol(target: any): target is symbol;
/**
 * 判断传入的两个值是否相等
 */
export declare function isEqual(value: any, value2: any): boolean;
/**
 * 判断一个对象是否是一个空对象
 * @param value 需要判断的对象
 * @returns
 */
export declare function isEmptyObject(value: any): boolean;
/**
 * 返回浅拷贝内容
 * @param value
 * @returns
 */
export declare function shallowCopy(value: any): any;
/**
 * 创建一个可以缓存方法返回值的方法
 * @param fn 需要缓存结果的方法
 * @returns 一个新方法,如果已经访问过则从缓存中获取,否则重新执行
 */
export declare function cache(fn: any): (key: any) => any;
/**
 * 判断首字母是否是 $
 * $字母为系统内置
 */
export declare const isReserved: (key: any) => any;
/**
 * 判断一个值是否是String
 * @param value 需要判断的对象
 * @returns
 */
export declare function isString(value: any): value is string;
/**
 * 判断传入对象是否是纯粹的对象
 * @param value 需要判断的对象
 * @returns  是否是纯粹的对象
 */
export declare function isPlainObject(value: any): boolean;
/**
 * 当前全局唯一UID
 */
export declare function uid(): string;
/**空方法 */
export declare function noop(): void;
/**返回传入的首个参数 */
export declare function returnArg(value: any): any;
export declare function toRaw(targetProxy: any): any;
