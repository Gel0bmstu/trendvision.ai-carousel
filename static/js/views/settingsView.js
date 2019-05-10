import getTemplate from '../components/settingsComponent/settings.js';

export default class settingsViews {
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