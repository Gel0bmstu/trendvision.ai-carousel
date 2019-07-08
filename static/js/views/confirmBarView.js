import getTemplate from '../components/confirlmBarComponent/confirmBar.js';

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