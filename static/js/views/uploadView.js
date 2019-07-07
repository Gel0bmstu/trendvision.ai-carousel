import template from '../components/uploadComponent/upload.js';

export default class uploadView {
    constructor(
        root = document.body,
    ) {
        this.root = root;
        // this.template = getTemplate();
    }

    show() {
        this.root.innerHTML = template;

        this.closeBtn = document.querySelector('.upload-close');

        this.closeBtn.addEventListener('click', () => {
            // this.root.innerHTML = '';
            this.root.style.zIndex = '0';
            this.root.style.display = 'none';
        })
    }
}