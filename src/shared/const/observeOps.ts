import { dataPorxyBeforOptions, dataOptions } from "../../types/index";
import { isReserved, isString, keys } from "../util/index";

const options: dataPorxyBeforOptions = (target, name) => {
  return isString(name) && isReserved(name) ? 0 : null
}

const dataObserveOptions:dataOptions = {
  set: {
    before: options
  },
  get: {
    before: options
  },
  deleteProperty: {
    before: options
  }
}

export default dataObserveOptions;