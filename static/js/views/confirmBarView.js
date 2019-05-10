import getTemplate from '../components/confirlmBarComponent/confirmBar.js';

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