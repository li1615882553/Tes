# 组件
当前框架是基于`tsx`和`proxy`的响应式框架

## Data
组件内部Data,可以直接通过类属性定义, 组件内部可以响应式监听Data

---

## Computed
computed属性可以直接通过`get`和`set`挂载计算属性

---

## Watch
以通过`@watch`修饰符添加监听属性
```js
@watch("checkBoxChecked")
  handleCheck(newVal, oldVal){
    console.log(`newVal: ${newVal}, oldVal: ${oldVal}`);
  }
```
`@watch`方法中传递的是监听的值,在组建初始化时,根据装饰器收集当前组件所有的`watch`属性,然后在父类`Control`的构造函数中初始化所有`watch`

---

## Model
`model`分为输入控件的自动`model`,以及自定义组件定义的`model`

`model`可以的在组件/控件响应式的变更传入的值
### 输入控件的自动`model`
组件通过`model`关键词对组件进行双向绑定(目前支持的有`input`,`radio`,`checkbox`)
```js
<input model="inputValue">
```
### 自定义组件的`model`
通过`model`\ `value`参数传递到`props.value`属性,如果使用`model`则内部值内部变化后, 组件外部会自动变化, 如果使用`value`则在组件内部发生变化无法继续向组件外部传递
```js
<CheckBoxGroup model="checkBoxChecked" >
    <Checkbox label="true选项"></Checkbox>
    <Checkbox label="false选项"></Checkbox>
    <Checkbox label="disable选项"></Checkbox>
</CheckBoxGroup>
```

# 组件定义
定义组件通过主动继承`Control`并且添加了`@Component`类修饰符的类来实现
```ts
@Component
class Button extends Control {
    ...
}
```
## 子组件定义参数
每个组件都继承自`Control`，`Control`接受一个类型，作为`props`的类型
```ts
interface IButtonProps extends IBaseComponent  {
  disabled?: boolean,
  loading?: boolean
}
@Component
class Button extends Control<IButtonProps> {
}
```
这样在使用`Button`组件时，会自动提示定义的```IButtonProps```中的属性
```ts
<Button onClick={this.handleClick} disabled={this.buttonDisable}>this is a button</Button>
```

## 组件通讯
父组件通过`attribute`向子组件传值，子组件通过`this.props.xxx`访问父组件传进来的值, 当父组件传递的值发生变化时, 子组件会响应式的更新

组件的数据传递是单向的，除了`model`参数之外，其余参数在子组件内部发生变化，不会响应式更新到父组件，也不会响应式更新子组件内容
```js
<Button onClick={this.emitDone} type="success">{this.buttonTitle}</Button>
```
```attribute```基于```tsx```的形式,可以向子组件传递变量

# 生命周期
## componentWillCreate    
实例初始化后被调用  
## componentCreated
实例创建完成后被调用   
## componentWillMount
组件挂载前事件  
## componentMounted
组件挂载后的事件   
## componentWillDestory
组件销毁前事件   
## componentDestoryed
组件销毁后事件 
## componentWillUpdate
组件更新前将被调用   
## componentUpdated
组件更新后调用 