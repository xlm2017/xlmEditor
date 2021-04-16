export const execCommand = function (command: string, param: string) {
    document.execCommand(command, false, param)
}
export function getElementById(query: string) {
    return document.getElementById(query)
}
export function querySelectorAll(query: string) {
    return document.querySelectorAll(query)
}
export function querySelector(query: string) {
    return document.querySelector(query)
}
export function createElement(tag: string) {
    return document.createElement(tag)
}
export const getStyle = function (dom: Element, attr: string) {
    // var value = dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr]
    // return parseFloat(value)
}
// 记录代理事件绑定
type listener = (e: Event) => void
//添加addEventlistener事件
export const addEvent = function (
    element: HTMLElement | Element,
    type: string,
    handler: listener,
    useCapture: Boolean
) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, useCapture ? true : false)
    }
    //  else if (element.attachEvent) {
    //     element.attachEvent('on' + type, handler)
    // } else if (element != window) {
    //     element['on' + type] = handler
    // }
}
