const callbacks = []
let pending = false

function flushCallbacks(){
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for(let i = 0; i < copies.length; i ++){
        copies[i]()
    }
}


let timeFunc
if(typeof Promise !== 'undefined' && isNative(Promise)){
    const p = Promise.resolve();
    timeFunc = () => {
        p.then(flushCallbacks)
    }
}else if(typeof MutationObserver !== 'undefined' && ( isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]' )){
    let counter = 1;
    const observer = new MutationObserver(flushCallbacks);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode,{
        characterData: true
    })

    timeFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = String(counter)
    }
}else if(typeof setImmediate !== 'undefined' && isNative(setImmediate)){
    timeFunc = () => {
        setImmediate(flushCallbacks);
    }
}else{
    timeFunc = () => {
        setTimeout(flushCallbacks, 0);
    }
}

export default function nextTick(cb ?: Function, ctx ?: Object){
    let _resolve;
    callbacks.push(() => {
        if(cb) {
            cb.call(ctx)
        }else if(_resolve) {
            _resolve(ctx);
        }
    })

    if(!pending){
       pending = true
       timeFunc() 
    }
    if(!cb && typeof Promise !== 'undefined'){
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
}

function isNative(Ctor: any):boolean{
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}