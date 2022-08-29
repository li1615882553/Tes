import { create } from "../shared/util/index";
import ModelDirective from "./directives/model";
import TextDirective from "./directives/text";
import RefDirective from "./directives/ref";
/**
 * 系统内置指令
 */
export const directives = create({
  text: TextDirective,
  model: ModelDirective,
  ref: RefDirective
})

/**
 * 用户定义指令
 */
export const userDirectives = create({
  
})