import { execCommand, createElement, getStyle, querySelector, addEvent } from '../../utils/dom'
import { colorPicker } from './colorPicker'
class Color {
    public title: string
    public icon: string
    public parent: HTMLElement
    public modal: HTMLElement | null
    constructor(parent: HTMLElement) {
        this.title = '字体颜色'
        this.icon = '\uf1fc'
        this.parent = parent
        this.modal = null
    }
    click() {
        var color = new colorPicker('foreColor')
        let _this = this
        function fn2() {
            _this.closeModal()
        }
        this.openModal(color.addColorBoard(), color.clickEvent, fn2)
    }
    openModal(html: string, fn: Function, fn2: Function) {
        this.modal = createElement('div')
        this.modal!.className = 'editor-modal'
        this.modal!.innerHTML = html
        this.parent.appendChild(this.modal!)
        // var left =
        //     this.parent.offsetLeft +
        //     (getStyle(this.modal, 'width') - getStyle(this.modal, 'width')) / 2
        // left < 0 ? (left = 3) : ''
        // this.modal!.style.left = left + 'px'

        setTimeout(() => {}, 2000)

        if (fn) {
            fn.call(this, fn2)
        }
    }
    closeModal() {
        if (this.modal != null) {
            this.parent.removeChild(this.modal)
            this.modal = null
        }
    }
}
export default Color
