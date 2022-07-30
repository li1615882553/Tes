import Component from "../../src/core/VNode/decorators/Component";
import Control from "../../src/core/VNode/Control";
import watch from "../../src/core/VNode/decorators/Watch";

interface childProps {
  name?: number;
}

@Component
class Child extends Control<childProps>{
  get num(){
    return Math.floor(Math.random() * 100);
  }
  @watch("props.name")
  handleName(val, oldVal){
    console.log(`props.name: oldVal: ${oldVal}, newVal: ${val}`)
  }
  render(){
  }
}

/**
 * 对象/数组类型 watch暂时无法深度监听,
 * array对象修改内容,页面会刷新,但是watch无反应
 * object对象添加内容,修改属性值,页面也不会刷新,watch无反应
 */
@Component
class App extends Control {
  private tes = Array.from({length:10000},(item,index)=>index);
  private obj = {xxx:{a:{b: "111"}}};
  index = 0;
  objKey = "abcdefghigklmn"
  name:number = 0;

  @watch("tes", {deep: true })
  handleWatchTes(newVal, oldVal){
    console.log(`Tes: oldVal: ${oldVal}, newVal: ${newVal}`)
  }

  @watch("obj", {deep: true})
  handleWatchObj(newVal, oldVal){
    console.dir(oldVal)
    console.dir(newVal)
  }

  get indexComputed(){
    return this.index;
  }
  set indexComputed(val){
    this.index = val % 13;
  }
  render() {
    return (
      <div class="body-conatiner">
        <Child name={this.name}></Child>
        {this.indexComputed}
        <p>watch 数组测试</p>
        <div>{ this.tes.join(",") }</div>
        <button onClick={this.handleClick("array")}>Click</button>
        <button onClick={this.handleChange("array")}> Change </button>
        <p>watch 对象测试</p>
        <div>{ JSON.stringify(this.obj) }</div>
        <button onClick={this.handleClick("obj")}>Click</button>
        <button onClick={this.handleChange("obj")}> Change </button>
      </div>
    )
  }

  handleClick(type) {
    return () => {
      if(type === "array"){
        this.tes.push(Math.floor(Math.random() * 100));
      }else{
        this.indexComputed = this.index % 13;
        this.obj[this.objKey[this.index++]] = Math.floor(Math.random() * 100)
      }
    }
    
  }
  handleChange(type){
    return () => {
      if(type === "array"){
        this.tes[0] = Math.floor(Math.random() * 100);
      }else{
        // this.obj.xxx = this.index;
        this.obj[this.objKey[this.index]] = Math.floor(Math.random() * 100)
      }
    }
  }

  protected componentMounted(): void {
    this.name ++;
    // setInterval(() => {
    //   this.obj.xxx.a.b = "" + Math.floor(Math.random() * 100)
    // }, 1000)
  }
}

new App().$renderTo(document.querySelector("#app"))