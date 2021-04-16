import { execCommand } from '../../utils/dom'
class Bold {
    public title: string
    public icon: string
    constructor() {
        this.title = '加粗'
        this.icon = '\uf032'
    }
    click() {
        execCommand('bold', '')
    }
}
export default Bold
