import getTemplate from '../components/settingsComponent/settings.js';

export default class settingsView {
    constructor(
        root = document.body,
    ) {
        this.root = root;
        this.template = getTemplate();
    }

    show() {
        this.root.innerHTML = this.template;

        this.closeBtn = document.querySelector('.settings-close');

        this.closeBtn.addEventListener('click', () => {
            this.root.innerHTML = '';
            this.root.style.display = 'none';
        })
    }
}