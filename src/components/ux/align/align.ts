import { IRect as Rect, getRect, setRect, getStyle } from "../dom/index";
import { scrollParent } from "../scroll/scroll"


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
const knownAligns = {
    center: "cc-cc",
    leftTop: "ll-tb",
    left: "ll-cc",
    leftBottom: "ll-bt",
    rightBottom: "lr-bb",
    right: "rr-cc",
    rightTop: "rr-tb",
    topRight: "rl-tt",
    top: "cc-tt",
    topLeft: "lr-tt",
    bottomLeft: "lr-bb",
    bottom: "cc-bb",
    bottomRight: "rl-bb"
};

/**
 * 表示对齐的位置。
 */
export type alignPos = keyof typeof knownAligns | alignResult["align"];

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
export default function pin(
    elem: HTMLElement, 
    target: Document | HTMLElement | Rect, 
    align: alignPos = "bottomLeft", 
    margin = 0,
    container: Document | HTMLElement | Rect | null = scrollParent(elem),
    containerPadding= 10
    ) {
    const result = getRect(elem) as alignResult;
    result.align = align = (knownAligns[align as keyof typeof knownAligns] || align) as alignResult["align"];
    result.target = target = (target as Document | HTMLElement).nodeType ? getRect(target as Document | HTMLElement) : target as Rect;
    //如果存在
    if(container){
        result.container = container = (container as Document | HTMLElement).nodeType ? getRect(container as Document | HTMLElement) : container as Rect;
        container.x += containerPadding;
        container.y += containerPadding;
        container.width -= containerPadding * 2;
        container.height -= containerPadding * 2;
    }


    const proc = (x: "x" | "y", width: "width" | "height", offset: number, center: boolean, left: boolean, right: boolean) => {
        if(container && result[width] > container[width]){

        }

        let value = (target as Rect)[x] + (center 
            ? ((target as Rect)[width] - result[width]) / 2 + offset
            : left 
                ? right ? offset : -result[width] - offset 
                : (target as Rect)[width] + (right ? offset : -result[width] - offset));
        
        // 检测是否超出容器
        if(container){
            const leftBound = container[x];
            const rightBound = leftBound + container[width] - result[width];
            if((center || !right) && value < leftBound || (center || right) && value > rightBound){
                if(!center){
                    const route = "rotate" + x.toUpperCase();
                    //如果未发生过当前类型的翻转,那么执行翻转
                    if(!result[route]){
                        result[route] = true;
                        proc(x, width, offset, center, !left, !right);
                        return;
                    }
                }

                //翻转卷后仍然超出位置,那么移动位置实现
                result["transform"+x.toUpperCase()] = true;
                value = value < leftBound ? leftBound : rightBound;
            }
           
        }
        
        result[x] = value;
    };
    proc("x", "width", /(?:bt|cc|tb)$/.test(align) ? margin : 0, align.charAt(1) === "c", align.charAt(0) === "l", align.charAt(1) === "r");
    proc("y", "height", /^(?:lr|cc|rl)/.test(align) ? margin : 0, align.charAt(4) === "c", align.charAt(3) === "t", align.charAt(4) === "b");
    setRect(elem, { x: result.x, y: result.y });
    return result;
}
