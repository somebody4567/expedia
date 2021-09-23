import calcScrollBarOffset from "./calcMarginOffset";

export default class LoadContentAndYTAPI {
    constructor({modal, btns, close, btn, parent}) {
        this.modal = document.querySelector(modal);
        this.btns = document.querySelectorAll(btns);
        this.close = document.querySelector(close);
        this.btn = document.querySelector(btn);
        this.parent = document.querySelector(parent);
    }

    init() {
        this.loadPlayerApi();
        this.closeModal();
        this.openVideoByClick();
        this.bindEventToButton();
    }

    async loadPlayerApi() {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    createPlayer(videoID) {
        this.player = new YT.Player('player', {
            height: '500px',
            width: '850px',
            videoId: videoID,
            events: {
                /* 'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange */
            }
            
        });
    }

    closeModal() {
        this.modal.addEventListener('click', e => {
            if (e.target && (e.target == this.modal || e.target == this.close)) {
                this.modal.style.display = 'none';
                document.body.style.paddingRight = `0px`;
                document.body.style.overflow = '';
                this.player.pauseVideo();
            }
        });
    }

    openVideoByClick() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const videoData = btn.getAttribute('data-video');
                this.modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = calcScrollBarOffset();
                if (this.modal.querySelector('iframe#player')) {
                    this.player.loadVideoById(videoData);
                } else {
                    this.createPlayer(videoData);
                }
            });
        });
    }

    async createContent(url) {
        let container = document.createDocumentFragment();
        await fetch(url)
        .then(data => {
            return data.json();
        })
        .then((array => {
            array.forEach(({background, title, text, playBtn, dataVideo} = {}) => {
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
                        <div data-video="${dataVideo}" data-play class="ideas__wrapper-play ideas__wrapper-play_mt16">
                            <img src="assets/icons/play-button.png" alt="play" class="ideas__wrapper-play_playing">
                        </div>
                    `;
                }
                container.append(card);
            });
            this.parent.append(container);
            this.btns = document.querySelectorAll('[data-play]');
            this.openVideoByClick();
        }));
    }

    async bindEventToButton() {
        this.btn.addEventListener('click', () => {
            this.createContent('http://localhost:3000/cards');
            this.btn.remove();
        });
    }
}