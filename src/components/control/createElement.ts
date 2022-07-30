import VNode from "../../core/VNode/VNode";

export function createElement(tagName, props :{[key:string]:any}, ...childNodes) {
  return VNode.create(tagName, props, childNodes);
}

export default createElement;