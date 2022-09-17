import Control from "../Control";
export declare type ControlClass = {
    new (...args: any[]): Control;
    [key: string]: any;
};
export default function componentFactory(Component: ControlClass, options?: any): void;
