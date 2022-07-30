// import { NodeLike, Control, bind, VNode } from "@component/control/index";
// import * as DOM from "@component/ux/dom/index";
// import draggable, { Draggable } from "@component/ux/drag/drag";

// import "./dialog.scss";

// export default class Dialog extends Control {
//   protected render(): VNode {
//     return <div class="t-dialog" style="display:none">
//       <section class="t-panel">
//         <header class="t-panel-header">
//           <button class="t-close">关闭</button>
//           <h5></h5>
//         </header>
//         <div class="t-panel-body"></div>
//       </section>
//     </div>
//   }

//   @bind(".t-panel-header") header:HTMLElement;

//   @bind(".t-panel-header h5", "innerHTML") title:NodeLike;

//   @bind(".t-panel-body") body:HTMLElement;

//   @bind(".t-panel-body", "innerHTML") content:NodeLike;

//   protected init(): void {
//       const close = DOM.find(this.header, ".t-close");
//       if(close){
//         DOM.on(close,"click", this.handleCloseClick, this);
//       }
//       this.draggable = true;
//   }

//   protected handleCloseClick(){
//     this.close();
//   }

//   /**
//    * 切换显隐动画
//    */
//   animation: DOM.ToggleAnimation = "scale";

//   //切换显隐动画时间
//   duration: number = 1000;

//   /**
//    * 切换显示的动画目标
//    */
//   target?: HTMLElement;

//   /**
//    * 显示当前会话框
//    * @param target 显示的目标
//    */
//   show(target?: HTMLElement){
//     if(target){
//       this.target = target;
//     }else{
//       target = this.target;
//     }
//     DOM.ready(() => {
//       if(!DOM.contains(document.body, this.elem)){
//         document.body.appendChild(this.elem);
//       }
//       if(this.hidden){
//         DOM.show(this.elem);
//         DOM.show(this.find(".t-panel") as HTMLElement, this.animation, undefined, this.duration, undefined, target);
//         DOM.addClass(document.body, "t-dialog-open");
//       }
//     })
//   }

//   /**
//    * 关闭当前对话框
//    * @param target 关闭的目标
//    */
//   close(target?: HTMLElement){
//     if(target){
//       this.target = target
//     }else{
//       target = this.target;
//     }
//     if(!this.onBeforeClose || this.onBeforeClose() !== false){
//       this.elem.style.backgroundColor = "transparent";  //将背景设置为透明
//       DOM.hide(this.find(".t-panel") as HTMLElement, this.animation, () => {
//         this.elem.style.backgroundColor = "";
//         DOM.removeClass(document.body, "t-dialog-open");
//         this.renderTo(null);
//         this.onClose && this.onClose();
//       }, this.duration, undefined, target);
//     }
//   }

//   //关闭对话框前事件
//   onBeforeClose: () => boolean | void;

//   //关闭对话框事件
//   onClose: () => void;

//   private _draggable: Draggable;

//   get draggable(){
//     return !!this._draggable;
//   }
//   set draggable(value){
//     DOM.toggleClass(this.elem, "t-dialog-draggable", value);
//     if(value){
//       if(this._draggable){
//         this._draggable.enable();
//       }else{
//         this._draggable = draggable(this.elem, {
//           handle: this.find(".t-panel-header h5") as HTMLElement,
//           onDragStart:() => {
//             if(this._draggable.elem.style.margin){
//               const rect = DOM.getRect(this._draggable.elem);
//               this._draggable.elem.style.margin = "0";
//               DOM.setRect(this._draggable.elem, rect);
//             }
//           }
//         })
//       }
//     }else if(this._draggable){
//       this._draggable.disable()
//     }
//   }
// }