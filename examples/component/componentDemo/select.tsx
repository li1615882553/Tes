import Select from "@component/ui/select/select";
import watch from "../../../src/core/VNode/decorators/Watch";
import Control from "../../../src/core/VNode/Control";
import Component from "../../../src/core/VNode/decorators/Component";
import Option from "@component/ui/select/option";
import OptionGroup from "@component/ui/select/optionGroup";
import "./index.scss";

@Component
class SelectDemo extends Control {
  value={label:'选项A', key:"A"};
  groupDisable:boolean = false;
  render() {
    return (
      <Select model="value" valueKey="label" placeholder="请选择" filterable clearable >
        <OptionGroup label="Group A" disabled= { this.groupDisable }>
          <Option id="A" label="选项A" value={{label:'选项A', key:"A"}}></Option>
          <Option id="B" label="选项B" value={{label:'选项B', key:"B"}}></Option>
          <Option id="C" label="选项C" value={{label:'选项C', key:"C"}}></Option>
        </OptionGroup>
        <OptionGroup label="Group B">
          <Option id="D" label="选项D" value={{label:'选项D', key:"D"}} disabled></Option>
          <Option id="E" label="选项E" value={{label:'选项E', key:"E"}}></Option>
          <Option id="F" label="选项F" value={{label:'选项F', key:"F"}}></Option>
        </OptionGroup>
      </Select>
    )
  }

  @watch("value")
  handle(newVal, oldVal){
    console.log(newVal, oldVal)
  }

  handleChange(){
    console.log(this.value)
  }

  componentMounted(){
    // setTimeout(() => {
    //   this.groupDisable = true;
    // }, 2000)
  }
}

export default SelectDemo;