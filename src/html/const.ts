import { create } from "../shared/util/index";
import ModelDirective from "./directives/model";
import HtmlDirective from "./directives/html";
import RefDirective from "./directives/ref";
/**
 * 系统内置指令
 */
export const directives = create({
  html: HtmlDirective,
  model: ModelDirective,
  ref: RefDirective
})

/**
 * 用户定义指令
 */
export const userDirectives = create({
  
})