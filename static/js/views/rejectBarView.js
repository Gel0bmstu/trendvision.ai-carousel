import getTemplate from '../components/rejectBarComponent/rejectBar.js';

export default class choseSectionView {
    constructor(
        root = document.body,
    ) {
        this.root = root;
    }

    show(data, mode) {
        this.template = getTemplate(data, mode);
        this.root.innerHTML = this.template;
    }
}