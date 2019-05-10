import getTemplate from '../components/choseSectionComponent/choseSection.js';

export default class choseSectionView {
    constructor(
        root = document.body,
    ) {
        this.root = root;
        this.template;
    }

    show(data) {
        this.template = getTemplate(data);
        this.root.innerHTML = this.template;
    }
}