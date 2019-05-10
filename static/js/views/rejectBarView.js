import getTemplate from '../components/rejectBarComponent/rejectBar.js';

export default class choseSectionView {
    constructor(
        root = document.body,
    ) {
        this.root = root;
        this.template = getTemplate();
    }

    show() {
        this.root.innerHTML = this.template;
    }
}