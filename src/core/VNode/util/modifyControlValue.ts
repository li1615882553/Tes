import Observe from "../../observable/Observe";

export function setControlValue(targetProxy, key, value){
  let observeOptions = Observe.observeProxyMap.get(targetProxy);
  if(observeOptions){
    observeOptions.target[key] = value;
  }
}

export function getControlValue(targetProxy, key){
  let observeOptions = Observe.observeProxyMap.get(targetProxy);
  if(observeOptions){
    return observeOptions.target[key]
  }
  return undefined;
}