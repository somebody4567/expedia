export default class BeforeLoad {
    constructor({body} = {}) {
        this.body = document.querySelector(body);
    }

    init() {
        document.addEventListener('readystatechange', e => {
            if (document.readyState < 4) {
                this.body.classList.add('loading');
            } else {
                this.body.classList.remove('loading');
                this.body.classList.add('active');
            }
        });
    }
}