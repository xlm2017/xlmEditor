import { addEvent, execCommand, createElement, getElementById } from '../../utils/dom.ts'
import { restoreSelection, saveSelection } from '../../utils/dom-selection.ts'

export class colorPicker {
    public command: string
    constructor(command: string) {
        this.command = command
        console.log('构造颜色:', this.command)
    }
    private HSVtoRGB(h: number, s: number, v: number) {
        var r, g, b, i, f, p, q, t
        r = g = b = i = f = p = q = t = 0
        i = Math.floor(h * 6)
        f = h * 6 - i
        p = v * (1 - s)
        q = v * (1 - f * s)
        t = v * (1 - (1 - f) * s)
        switch (i % 6) {
            case 0:
                ;(r = v), (g = t), (b = p)
                break
            case 1:
                ;(r = q), (g = v), (b = p)
                break
            case 2:
                ;(r = p), (g = v), (b = t)
                break
            case 3:
                ;(r = p), (g = q), (b = v)
                break
            case 4:
                ;(r = t), (g = p), (b = v)
                break
            case 5:
                ;(r = v), (g = p), (b = q)
                break
        }
        var hr = Math.floor(r * 255).toString(16)
        var hg = Math.floor(g * 255).toString(16)
        var hb = Math.floor(b * 255).toString(16)
        return (
            '#' +
            (hr.length < 2 ? '0' : '') +
            hr +
            (hg.length < 2 ? '0' : '') +
            hg +
            (hb.length < 2 ? '0' : '') +
            hb
        )
    }

    public addColorBoard() {
        var table = createElement('table')
        table.setAttribute('cellpadding', '0')
        table.setAttribute('cellspacing', '0')
        table.setAttribute('unselectable', 'on')
        table.style.border = '1px solid #d9d9d9'
        table.setAttribute('id', 'color-board')
        for (
            var row = 1;
            row < 15;
            ++row // should be '16' - but last line looks so dark
        ) {
            var rows = createElement('tr')
            for (
                var col = 0;
                col < 25;
                ++col // last column is grayscale
            ) {
                var color
                if (col == 24) {
                    var gray = Math.floor((255 / 13) * (14 - row)).toString(16)
                    var hexg = (gray.length < 2 ? '0' : '') + gray
                    color = '#' + hexg + hexg + hexg
                } else {
                    var hue = col / 24
                    var saturation = row <= 8 ? row / 8 : 1
                    var value = row > 8 ? (16 - row) / 8 : 1
                    color = this.HSVtoRGB(hue, saturation, value)
                }
                var td = createElement('td') as HTMLElement
                td.setAttribute('title', color)
                // td.style.cursor = 'url(di.ico),crosshair';
                td.setAttribute('unselectable', 'on')
                td.style.backgroundColor = color
                // td.width = '12'
                // td.height = '12'
                td.style.width = '12'
                td.style.height = '12'
                rows.appendChild(td)
            }
            table.appendChild(rows)
        }
        var box = createElement('div')
        box.appendChild(table)
        return box.innerHTML
    }

    public clickEvent(fn: Function) {
        var f = getElementById('color-board') as HTMLElement
        // var tds = f.childNodes[0].getElementsByTagName('td')
        // NodeList 不是一个数组，是一个类似数组的对象(Like Array Object)。
        // 虽然 NodeList 不是一个数组，但是可以使用 forEach() 来迭代。你还可以使用 Array.from() 将其转换为数组。
        // var nodes = f.childNodes as NodeListOf<ChildNode>
        // Property 'getElementsByTagName' does not exist on type 'ChildNode'.
        // var tdsList = nodes[0].getElementsByTagName(
        //     'td'
        // ) as HTMLCollectionOf<HTMLTableDataCellElement>
        // Property 'form' does not exist on type 'ArrayConstructor'.
        var tdsList = f.getElementsByTagName('td')
        var tds = Array.from(tdsList)
        // console.log('获得td标签', tds)
        var _this = this
        console.log('_this', _this)

        // Element implicitly has an 'any' type because expression of type 'number' can't be used to index type 'HTMLElement'.
        //   No index signature with a parameter of type 'number' was found on type 'HTMLElement'.
        // for (var i = 0; i < tds.length; i++) {
        //     addEvent(
        //         tds[i],
        //         'click',
        //         function () {
        //             var color = this.getAttribute('title')
        //             restoreSelection()
        //             execCommand(_this.command, color)
        //             saveSelection()
        //             if (fn) {
        //                 fn()
        //             }
        //         },
        //         false
        //     )
        // }
        for (const item of tds) {
            addEvent(
                item,
                'click',
                function () {
                    var color = this.getAttribute('title')
                    console.log('color:', color, _this.command)
                    restoreSelection()
                    execCommand('foreColor', color)
                    saveSelection()
                    if (fn) {
                        fn()
                    }
                },
                false
            )
        }
    }
}
