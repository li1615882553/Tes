export interface TesDecorator {
    (Ctor: any): void;
    (target: any, key: string): void;
    (target: any, key: string, index: number): void;
}
export declare function createDecorator(factory: any): (target: any, key: string) => void;
