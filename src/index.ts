//控件基础类
import Control from "./core/VNode/Control";

//类/属性 装饰器
import Component from "./core/VNode/decorators/Component"
import Bind from "./core/VNode/decorators/Bind";
import Watch from "./core/VNode/decorators/Watch";

//Observe
import Observe from "./core/observable/Observe";
//VNode
import VNode from "./core/VNode/VNode";

//Directives
import { userDirectives } from "./html/const";

//nextTick
import nextTick from "./core/observable/util/nextTick";

export  { Control, Component, Bind, Watch, VNode, userDirectives, nextTick, Observe };

export default { Control, Component, Bind, Watch, VNode, userDirectives, nextTick, Observe };