import InputNumber from "@component/ui/inputNumber/inputNumber";
import watch from "../../../src/core/VNode/decorators/Watch";
import Control from "../../../src/core/VNode/Control";
import Component from "../../../src/core/VNode/decorators/Component";

import "./index.scss";

@Component
class InpuNumbertDemo extends Control {
  value:number = 10;
  render() {
    return (
      <InputNumber model="value" step={1} max={10} min={0} precision={2} stepStrictly placeholder="1234"></InputNumber>
    )
  }
}

export default InpuNumbertDemo;