import Title from './title/index'
import Bold from './bold/index'
import Color from './color/index'
import { getElementById, createElement, querySelectorAll, addEvent, getStyle } from '../utils/dom'
import {
    getCurrentRange,
    saveSelection,
    restoreSelection,
    getSelectionHTML,
} from '../utils/dom-selection'
class XlmEditor {
    public et: HTMLElement | null = null
    public toolbarTop: HTMLElement | null = null
    public section: HTMLElement | null = null
    public parent: HTMLElement | null = null
    public options: any = null
    constructor(container: string, options: object) {
        // 富文本容器et
        this.et = null
        // 工具栏
        this.toolbarTop = null
        // 选区对象
        this.section = null
        this.parent = getElementById(container.replace('#', ''))
        this.options = {
            width: 800,
            height: 500,
            borderColor: '#ddd',
            toolBg: '#eee',
            buttons: {},
        }
        this.init()
    }
    // 初始化
    init() {
        // 初始化容器
        this.initStyle()
        // 初始化容器内部的按钮菜单
        this.initMenu()
        // 富文本全局事件监听
        this.initGlobalEvent()
    }
    initGlobalEvent() {
        //    addEvent(window, 'click', r.isInModal, false)
        addEvent(
            this.et as HTMLElement,
            'keyup',
            function () {
                saveSelection()
            },
            false
        )
        addEvent(
            this.et as HTMLElement,
            'mouseup',
            function () {
                saveSelection()
            },
            false
        )
    }
    initMenu() {
        // 初始化菜单上按钮
        this.initMenuBtn()
        var buttons = this.options!.buttons
        for (var btn in buttons) {
            var btnA = document.createElement('a')
            btnA.className = 're-toolbar-icon'
            btnA.setAttribute('title', buttons[btn]['title'])
            btnA.setAttribute('data-edit', btn)
            btnA.innerHTML = buttons[btn]['icon']
            this.toolbarTop!.appendChild(btnA)
        }
        // 注册btn的相关事件
        this.initMenuEvent()
    }
    initMenuBtn() {
        this.options!.buttons.head = new Title(this.parent as HTMLElement)
        this.options!.buttons.bold = new Bold()
        this.options!.buttons.color = new Color(this.parent as HTMLElement)
    }
    initMenuEvent() {
        let _this = this
        var toolbtn = querySelectorAll('a[data-edit]')
        for (var i = 0; i < toolbtn.length; i++) {
            addEvent(
                toolbtn[i],
                'click',
                function (e: Event) {
                    var btn = _this.options.buttons
                    var name = this.getAttribute('data-edit')
                    if (typeof btn[name]['click'] !== 'undefined') {
                        console.log('执行点击事件')
                        restoreSelection()
                        // btn[name].click.call(this)
                        btn[name].click()
                        saveSelection()
                    } else {
                    }
                    e.stopPropagation()
                },
                false
            )
        }
    }
    initStyle() {
        let defaultValue = this.parent!.innerHTML
        this.parent!.innerHTML = ''
        this.parent!.className += 'editor-container'
        this.parent!.style.boxSizing = 'border-box'
        this.parent!.style.border = '1px solid ' + this.options.borderColor
        this.parent!.style.width = '100%'
        this.parent!.style.height = this.options.height + 'px'
        this.et = createElement('div')
        this.et!.className = 'editor'
        this.et!.setAttribute('tabindex', '1')
        this.et!.setAttribute('contenteditable', 'true')
        this.et!.setAttribute('spellcheck', 'false')
        this.et!.innerHTML = defaultValue
        this.toolbarTop = createElement('div')
        this.toolbarTop!.className = 'toolbar'
        this.toolbarTop!.style.backgroundColor = this.options.toolBg
        this.parent!.appendChild(this.toolbarTop as HTMLElement)
        this.parent!.appendChild(this.et as HTMLElement)
    }
}
export default XlmEditor
