export type dataPorxyBeforOptions = (target: any, name: string, proxy: any) => 0 | void;
export interface dataOptions {
    get?: {
        before: dataPorxyBeforOptions;
    },
    set?: {
        before: dataPorxyBeforOptions;
    },
    deleteProperty?: {
        before: dataPorxyBeforOptions;
    }
}
type Constructor<T> = new (...args: any[]) => T;

type originConstructor = String | Number | Boolean | Object | Date | Function | Symbol;
/**
 * 组件化配置
 */
export interface userOptions {
    mixins: {},
    props: Array<string | Symbol> | { [key: string | symbol]: { type?: originConstructor | Constructor, default?: typeof type, } }
}


type instance = originConstructor


type KEYTYPE = string | number | symbol;
/**------------------Tes 实例对象定义--------------------- */
interface $Tes{
    /**
     * 声明时实例上定于的所有方法
     * - 非相应式对象
     */
    readonly $methods: Record<KeyType, any>;
    /**
     * 声明时类中定义的 get/set 方法
     */
    readonly $computed: Record<KEYTYPE, any>;
}

/** ----------------- 选项实例对象 ----------------------- */
type Prop<T> = { (): T } | { (value: T | null): any };
interface PropOptions<T = any> {
    /**定义当前prop需要从哪个attribute上取值 */
    attr?: string,
    /**当前prop的类型 */
    valueType?: Prop<T>,
    /**
     * 当前prop的默认值
     */
    defaultValue?: T | null | undefined | (() => T | null | undefined)
}

interface ComputedOptions{
    /**计算属性的 getter */
    get(this: $Tes):any;
    /**计算属性的 setter */
    set(this: $Tes):any;
}

export interface ComponentOptions {
    [x: string]: any;

    /**当前组件名称 */
    name?: string,
    props?: KEYTYPE[] | {
        [key in keyof KEYTYPE] : PropOptions<key> | Prop<key>;
    },
    /**计算属性,自动计算依赖,依据依赖自动更新值 */
    computed?: {
        [key in keyof KEYTYPE] : (( this: $Tes ) => any) | ComputedOptions;
    }
}