export interface TesDecorator{
  (Ctor: any): void;
  (target: any, key: string): void;
  (target: any, key: string, index: number): void;
}

export function createDecorator(factory){
  return (target, key:string)=> {
    const Ctor = typeof target === 'function' ? target: target.constructor;
    
    if(!Ctor.__decorators__){
      Ctor.__decorators__ = [];
    }
    Ctor.__decorators__.push(options => factory(options, key));
  }
}