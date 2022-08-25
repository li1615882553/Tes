import Control from "./core/VNode/Control";
import Component from "./core/VNode/decorators/Component";
import Bind from "./core/VNode/decorators/Bind";
import Watch from "./core/VNode/decorators/Watch";
import VNode from "./core/VNode/VNode";
import { userDirectives } from "./html/const";
import nextTick from "./core/observable/util/nextTick";
export { Control, Component, Bind, Watch, VNode, userDirectives, nextTick };
declare const _default: {
    Control: typeof Control;
    Component: typeof Component;
    Bind: typeof Bind;
    Watch: typeof Watch;
    VNode: typeof VNode;
    userDirectives: any;
    nextTick: typeof nextTick;
};
export default _default;
