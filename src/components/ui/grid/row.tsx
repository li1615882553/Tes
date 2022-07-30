import Control from "../../../core/VNode/Control";
import VNode from "../../../core/VNode/VNode";
import Component from "../../../core/VNode/decorators/Component"
import { IBaseComponent } from "../template/component";
import classNames from 'classnames';

export interface IRowProps extends IBaseComponent {
  align ?: ''
}

@Component
class Row extends Control<IRowProps>{

}