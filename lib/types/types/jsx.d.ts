declare global {
    namespace JSX {
        type Key = string | number;
        interface RefObject<T> {
            readonly current: T | null;
        }
        type Ref<T> = string | {
            bivarianceHack(instance: T | null): any;
        }["bivarianceHack"] | RefObject<T>;
        interface Attribustes {
            key?: Key;
        }
        interface ClassAttributes<T> extends Attribustes {
            ref?: Ref<T>;
        }
        type ElementMap = {
            [tagName in keyof ElementTagNameMap]: Partial<ElementTagNameMap[tagName]>;
        };
        interface ElementAttributesProperty {
            props: {};
        }
        interface IntrinsicAttributes extends Attribustes {
        }
        interface IntrinsicClassAttributes<T> extends ClassAttributes<T> {
        }
    }
}
export {};
