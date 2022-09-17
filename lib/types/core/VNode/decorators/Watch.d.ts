import { WatchOptions } from "../../prototype/$watch";
export default function Watch(path: string, options?: Omit<WatchOptions, "handler" | "isCalledSelf">): (target: any, key: string) => void;
