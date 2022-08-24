import { IRect as Rect } from "../dom/index";
/**
 * 表示对齐的结果。
 */
export interface alignResult extends Rect {
    /**
     * 目标区域。
     */
    target: Rect;
    /**
     * 容器区域。
     */
    container: Rect;
    /**
     * 对齐方式。
     */
    align: "ll-tt" | "ll-tb" | "ll-cc" | "ll-bt" | "ll-bb" | "lr-tt" | "lr-tb" | "lr-cc" | "lr-bt" | "lr-bb" | "cc-tt" | "cc-tb" | "cc-cc" | "cc-bt" | "cc-bb" | "rl-tt" | "rl-tb" | "rl-cc" | "rl-bt" | "rl-bb" | "rr-tt" | "rr-tb" | "rr-cc" | "rr-bt" | "rr-bb";
    /**
     * 是否水平翻转了位置。
     */
    rotateX?: boolean;
    /**
     * 是否垂直翻转了位置。
     */
    rotateY?: boolean;
    /**
     * 是否调整了水平位置。
     */
    transformX?: boolean;
    /**
     * 是否调整了垂直位置。
     */
    transformY?: boolean;
}
/**
 * 预制的对齐方式
 */
declare const knownAligns: {
    center: string;
    leftTop: string;
    left: string;
    leftBottom: string;
    rightBottom: string;
    right: string;
    rightTop: string;
    topRight: string;
    top: string;
    topLeft: string;
    bottomLeft: string;
    bottom: string;
    bottomRight: string;
};
/**
 * 表示对齐的位置。
 */
export declare type alignPos = keyof typeof knownAligns | alignResult["align"];
/**
 * 将元素对齐到其他节点或区域
 * @param elem 要定位的元素
 * @param target 对其的目标节点或区域
 * @param align 对其的位置
 * 格式使用格式为"xx-yy"的字符串表示
 *
 * xx表示水平位置
 * - ll: 对齐到target左边框的左侧
 * - lr: 对齐到target左边框的右侧
 * - cc: 对齐到target水平居中的位置
 * - rl: 对齐到target右边框的左侧
 * - rr: 对齐到target右边框的右侧
 *
 * yy表示垂直位置
 * - tt: 对齐到target上边框的上侧
 * - tb: 对齐到target上边框的下侧
 * - cc: 对齐到target垂直居中的位置
 * - bt: 对齐到target下边框的上侧
 * - bb: 对齐到tagret下边框的下侧
 * @param margin 要定位元素的外边框
 * @param container 容器节点区域,定位超出容器后会自动调整,如果为null则不自动调整
 * @param containerPadding 容器的内边距
 * @param offset
 * @param resize 是否允许修改elem的大小
 * @returns
 */
export default function pin(elem: HTMLElement, target: Document | HTMLElement | Rect, align?: alignPos, margin?: number, container?: Document | HTMLElement | Rect | null, containerPadding?: number): alignResult;
export {};
