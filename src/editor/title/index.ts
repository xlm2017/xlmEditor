import { execCommand, createElement, querySelector, addEvent } from '../../utils/dom'
import { restoreSelection, saveSelection } from '../../utils/dom-selection'
class Title {
    public parent: HTMLElement
    public title: string
    public icon: string
    public modal: HTMLElement | null
    constructor(parent: HTMLElement) {
        this.parent = parent
        this.title = '标题'
        this.icon = '\uf1dc'
        this.modal = null
    }
    click() {
        var h = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        console.log('this', this)
        this.closeModal()
        var html = '<div class="editor-head">'
        h.forEach(function (h) {
            html += '<' + h + ' data-h="' + h + '">' + h + '</' + h + '>'
        })
        html += '</div>'
        this.openModal(html, this.HClick)
    }
    HClick() {
        var eh = querySelector('.editor-head')
        // var h = querySelector('.editor-head').getElementsByTagName('h')
        // h = h.childNodes
        var hList = eh!.childNodes as NodeList
        var h = Array.from(hList as NodeList)
        let _this = this
        h.forEach(function (v: any) {
            addEvent(
                v,
                'click',
                function () {
                    var h = this.getAttribute('data-h')
                    restoreSelection()
                    execCommand('formatBlock', '<' + h + '>')
                    saveSelection()
                    _this.closeModal()
                },
                false
            )
        })
    }
    openModal(html: string, fn: Function) {
        this.modal = createElement('div')
        this.modal!.className = 'editor-modal'
        this.modal!.innerHTML = html
        this.parent.appendChild(this.modal!)
        // var left =
        //     this.parent.offsetLeft +
        //     (getStyle(this.modal, 'width') - getStyle(this.modal, 'width')) / 2
        // left < 0 ? (left = 3) : ''
        this.modal!.style.left = 3 + 'px'
        if (fn) {
            fn.call(this)
        }
    }
    closeModal() {
        if (this.modal != null) {
            this.parent.removeChild(this.modal)
            this.modal = null
        }
    }
}
export default Title
