import { isFunction } from "../../shared/util";
import VNode  from "../VNode/VNode";

export default function $cloneNode<P>(element: VNode, props?: Partial<P>, ...children:VNode[]):VNode{
  if(props){
    if(!element.props) element.props = {};
    Object.keys(props).forEach(prop => {
      if(element.props[prop] && isFunction(props[prop])){
        element.props[prop] = [element.props[prop], props[prop]]
      }else{
        element.props[prop] = props[prop];
      }
    })
  }
  if(children.length) {
    children =  children.filter(child => !!child)
    element.children.push(...children);
  }
  return element;
}