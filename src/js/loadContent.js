export default class LoadContent {
    constructor({btn, parent}) {
        this.btn = document.querySelector(btn);
        this.parent = document.querySelector(parent);
    }

    init() {
       this.bindEventToButton();
    }

    async createContent(url) {
        let container = document.createDocumentFragment();
        fetch(url)
        .then(data => {
            return data.json();
        })
        .then((array => {
            array.forEach(({background, title, text, playBtn} = {}) => {
                const card = document.createElement('div');
                card.innerHTML = ``;
                card.classList.add('ideas__wrapper-item');
                card.style.background = `url(${background}) center -10px no-repeat`;  
                if (title && text) {
                    card.innerHTML += `
                    <div class="ideas__wrapper-content">
                        <div class="ideas__wrapper-title">
                            ${title}
                        </div>
                        <div class="ideas__wrapper-text">
                            ${text}
                        </div>
                    </div>
                    `;
                } else {
                    card.innerHTML += `
                    <div class="ideas__wrapper-title">
                        ${title}
                    </div>
                    `;
                }

                if (playBtn) {
                    card.innerHTML += `
                    <div class="ideas__wrapper-play ideas__wrapper-play_mt16">
                        <img src="assets/icons/play-button.png" alt="play" class="ideas__wrapper-play_playing">
                    </div>
                    `;
                }
                container.append(card);
            });
            this.parent.append(container);
        }));
    }

    bindEventToButton() {
        this.btn.addEventListener('click', () => {
            this.createContent('http://localhost:3000/cards');
            this.btn.remove();
        });
    }
}