import { setControlValue } from "../util/modifyControlValue";

//缓存待执行WillMount 和 Mounted的组件
const componentNeedMountList = [], hasWillMountedList = [];

//添加缓存组件
export function addCacheMth(self) {
  componentNeedMountList.push(self);
}

export function execMountedMth(self) {
  if(componentNeedMountList.indexOf(self) === -1){
    hasWillMountedList.indexOf(self) !== -1 && hasWillMountedList.splice(hasWillMountedList.indexOf(self), 1);
    if (!self.$mounted) {
      setControlValue(self, '$mounted', true);
      self.componentMounted();
    }   
  }else{
    while(componentNeedMountList.length > 0){
      let comp = componentNeedMountList.pop();
      hasWillMountedList.indexOf(comp) !== -1 && hasWillMountedList.splice(hasWillMountedList.indexOf(comp), 1);
      if (!comp.$mounted) {
        setControlValue(comp, '$mounted', true);
        comp.componentMounted();
      }
      if(comp === self) break;
    }
  }
}

/**
 * 执行缓存了的 componentWillMount 函数
 * @param self 
 */
export function execWillMountMth(self) {
  if(self && componentNeedMountList.indexOf(self) === -1 && !self.$mounted){
    self.componentWillMount();
    hasWillMountedList.push(self);
  }
  let index = 0;
  for (; index < componentNeedMountList.length; index++) {
    let comp = componentNeedMountList[index];
    if (hasWillMountedList.indexOf(comp) === -1 && !comp.$mounted) {
      comp.componentWillMount();
      hasWillMountedList.push(comp);
    }
  }
}