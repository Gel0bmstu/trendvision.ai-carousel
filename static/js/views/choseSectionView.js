import getTemplate from '../components/choseSectionComponent/choseSection.js';

export default class choseSectionView {
    constructor(
        root = document.body,
    ) {
        this.root = root;
        this.template;
    }

    show(data) {
        console.log('get 1')
        this.template = getTemplate(data);
        console.log('get 2')
        this.root.innerHTML = this.template;
    }
}