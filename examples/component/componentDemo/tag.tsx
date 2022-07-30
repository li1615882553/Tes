import Tag from "@component/ui/tag/tag";
import Control from "../../../src/core/VNode/Control";
import Component from "../../../src/core/VNode/decorators/Component";
import Input from "@component/ui/input/input";
import Button from "@component/ui/button/Button";

import "./index.scss";
import nextTick from "@component/ux/nextTick/nextTick";

@Component
class TagDemo extends Control {
  dynamicTags: Array<string> = ['标签一', '标签二', '标签三'];
  inputVisible:boolean = false;
  inputValue:string = "";
  render() {
    let tagList = this.dynamicTags.map(tag => (
      <Tag id={tag} closeable onClose={this.handleClose(tag)}>{tag}</Tag>
    ));
    return (
      <div class="tag-demo">
        {tagList}
        {
          this.inputVisible 
            ? <Input
                className="input-new-tag"
                model="inputValue"
                autoFocus
                onBlur={this.handleInputConfirm}
                onKeyDown={this.handleInputConfirm}
              ></Input>
            : <Button 
                className="button-new-tag"
                onClick={ this.showInput }
              >+new Tag</Button>
        }
      </div>
    )
  }

  handleClose(tag) {
    return (e) => {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    }
  }

  showInput(){
    this.inputVisible = true;
    nextTick(() => {
      (this.find("input") as HTMLElement).focus();
    })
  }

  handleInputConfirm(e){
    if(e.keyCode && e.keyCode !== 13){
      return ;
    }
    if(this.inputValue){
      this.dynamicTags.push(this.inputValue)
    }
    this.inputVisible = false;
    this.inputValue= "";
  }
}

export default TagDemo;