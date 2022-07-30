import { toRaw } from "../../src/shared/util/index";
import Component from "../../src/core/VNode/decorators/Component";
import Button from "../../src/components/ui/button/Button";
import Control from "../../src/core/VNode/Control";
import VNode from "../../src/core/VNode/VNode";
import RadioGroup from "@component/ui/radio/radio-group";
import Radio from "@component/ui/radio/radio";
import Checkbox from "@component/ui/checkbox/checkbox";
import CheckBoxGroup from "@component/ui/checkbox/checkbox-group";

import "./app.scss";
import watch from "../../src/core/VNode/decorators/Watch";
@Component
class Panel extends Control {
  public todoItem: string;

  public done: boolean;

  public buttomTitle = "完成";

  render() {
    return <li className="todo-item">
      <div>
        <span>{this.props.inputValue}</span>
        {!this.done ? <Button onClick={this.emitDone} type="primary" icon="icon-loading">{this.buttomTitle}</Button> : null}
      </div>
    </li>
  }

  emitDone() {
    this.props.done = true;
    this.props.itemDone(this.props.id, this.todoItem)
  }
  protected componentWillDestory(): void {
    console.log(this.done)
  }

  protected componentMounted(): void {
  }

  protected componentWillUpdate(): void {
    console.log("Panel组件调用componentWillUpdate事件")
  }

  protected componentUpdated(): void {
    console.log("Panel组件调用componentUpdated事件")
  }
}

@Component
class HelloWorld extends Control {
  inputValue: string = "11111";
  radio: string = "2";
  itemList: Array<{ title: string, done: boolean }> = [];
  checkBoxChecked: Array<string> = ['true选项', 'disable选项'];
  get canAdd() {
    return this.inputValue === "";
  }

  @watch("checkBoxChecked")
  handle(newValue, oldValue) {
    newValue.splice(0, 1)
  }

  protected render(): VNode {
    const listItem = this.itemList.map((item, index) => <Panel model="inputValue" id={index} todoItem={item.title} done={item.done} itemDone={this.itemDone}></Panel>)
    return <div class="todo_container">
      <Radio model="radio" label="1" onChange={this.radioChange}>备选项</Radio>
      <Radio model="radio" label="2" onChange={this.radioChange}>备选项</Radio>
      <RadioGroup model="radio" onChange={this.radioChange}>
        <Radio label="1">选项1</Radio>
        <Radio label="2">选项2</Radio>
      </RadioGroup>
      <Checkbox onChange={this.handleCheckChange} trueLabel="111" falseLabel="222"> trueCheckBox </Checkbox>
      <Checkbox onChange={this.handleCheckChange}> falseCheckBox </Checkbox>
      <CheckBoxGroup model="checkBoxChecked" >
        <Checkbox onChange={this.handleCheckChange} label="true选项"></Checkbox>
        <Checkbox onChange={this.handleCheckChange} label="false选项"></Checkbox>
        <Checkbox onChange={this.handleCheckChange} label="disable选项"></Checkbox>
      </CheckBoxGroup>
      <div class="todo_input">
        <input model="inputValue" onkeyup={this.handleKeyUp} placeholder="请输入你的任务名称,按回车确认或点击TODO" />
        <Button onClick={this.addTodoItem} disabled={this.canAdd}>TODO</Button>
      </div>
      <div class="untodo_item">
        <ul>
          {listItem}
        </ul>
      </div>
    </div>
  }

  addTodoItem() {
    this.itemList.unshift({
      title: this.inputValue,
      done: false
    })
    this.inputValue = "";
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.addTodoItem();
    }
  }

  itemDone(id) {
    this.itemList[id].done = true;
  }

  radioChange(value) {
    console.log(value, this.radio)
  }

  handleCheckChange(val) {
    val = true;
    console.log('checkBox 发生变化,变化后的值为', val)
  }
}
let a = new HelloWorld();

a.$renderTo(document.querySelector("#app"))

/**
 * 
 * 1. 将DOM操作提取出来,解耦合
 * 2. 添加声明周期函数
 * 3. 如果 @data 声明 public a:string = "1" 这种方式,在initData中无法获取到 this.a 因为super调用的时候,还未初始化a
 * 4. 模拟实现vue中的v-if v-show的实现   现在只能通过tsx中表达式模拟实现v-if/v-show等
 */