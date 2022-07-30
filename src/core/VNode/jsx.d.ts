import Control from "./Control";
import VNode from "./VNode";

declare global {
  namespace JSX {
    type Key = string | number;
    interface RefObject<T> {
      readonly current: T | null;
    }

    type Ref<T> = string | { bivarianceHack(instance: T | null): any }["bivarianceHack"] | RefObject<T>;

    interface Attribustes {
      key?: Key;
    }
    interface ClassAttributes<T> extends Attribustes {
      ref?: Ref<T>
    }

    type ElementMap = { [tagName in keyof ElementTagNameMap]: Partial<ElementTagNameMap[tagName]> }

    //自定义组件信息
    interface ElementAttributesProperty { props: {}; }
    //children名称  暂时不知道干什么用
    // interface ElementChildrenAttribute { children: {}; }

    interface IntrinsicAttributes extends Attribustes { }
    interface IntrinsicClassAttributes<T> extends ClassAttributes<T> {}

    // 固有元素
    // interface IntrinsicElements extends ElementMap {

    // }
  }
}