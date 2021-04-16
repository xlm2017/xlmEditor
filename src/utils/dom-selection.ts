// 选区对象
// Uncaught TypeError: Assignment to constant variable.

import { SelectionRange } from 'typescript'

// const selectedRange = null
let selectedRange: Range | null = null
// 选区相关api
export const getCurrentRange = function () {
    //获取当前range
    if (window.getSelection) {
        //使用 window.getSelection() 方法获取鼠标划取部分的起始位置和结束位置
        var sel = window.getSelection() as Selection
        if (sel.rangeCount > 0) {
            //通过selection对象的getRangeAt方法来获取selection对象的某个Range对象
            return sel.getRangeAt(0)
        }
    } else if (document.createRange) {
        return document.createRange()
    }
    // } else if (document.selection) {
    //     var sel = document.selection
    //     return sel!.createRange()
    // }
    return null
}
export function saveSelection() {
    selectedRange = getCurrentRange()
    console.log('保存选区')
}
export function restoreSelection() {
    console.log('选区恢复')
    //重置为上个range
    var selection = window.getSelection()
    if (selectedRange) {
        try {
            selection!.removeAllRanges()
        } catch (ex) {
            // document.body.createTextRange().select()
            // document.selection.empty()
        }
        selection!.addRange(selectedRange)
    }
}
export function getSelectionHTML() {
    if (window.getSelection) {
        var sel = window.getSelection()
        if (sel!.rangeCount > 0) {
            return sel
        }
    }
}
