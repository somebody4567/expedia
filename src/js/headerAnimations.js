import calcScrollBarOffset from "./calcMarginOffset";

export default class HeaderAnimations {
    constructor({hamburger, dropdownElems, language, hamburgerMenu}) {
        this.hamburger = document.querySelector(hamburger);
        this.dropdownElems = document.querySelectorAll(dropdownElems);
        this.language = document.querySelector(language);
        this.hamburgerMenu = document.querySelector(hamburgerMenu);
    }

    init() {
        this.documentEvents();
        this.hamburgerActions();
        this.mobileEvents();
    }

    hamburgerActions() {
        this.hamburger.addEventListener('click', () => {
            document.body.classList.toggle('_hidden');
            if (document.body.classList.contains('_hidden')) {
                document.body.style.marginRight = calcScrollBarOffset();
            } else {
                document.body.style.marginRight = `0px`;
            }
            this.hamburger.classList.toggle('hamburger-active');
            this.hamburgerMenu.classList.toggle('hamburger-menu-active');
        });
    }

    documentEvents() {
        document.addEventListener('click', e => {
            const target = e.target;
            if (target && !target.closest('.modal-hamburger__menu') && !target.closest('.header__hamburger')) {
                this.hamburgerMenu.classList.remove('hamburger-menu-active');
                this.hamburger.classList.remove('hamburger-active');
                document.body.classList.remove('_hidden');
                document.body.style.marginRight = `0px`;
            }
        });
    }

    mobileEvents() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.addEventListener('click', e => {
                const target = e.target;

                if (target.classList.contains('show-dropdown') || target.closest('.show-dropdown')) {
                    try {
                        target.closest('.show-dropdown').lastElementChild.classList.add('dropdown-active');
                    } catch (e) {}
                } 

                if (!target.classList.contains('show-dropdown') && !target.closest('.show-dropdown')) {
                    this.dropdownElems.forEach(elem => {
                        elem.lastElementChild.classList.remove('dropdown-active');
                    });
                }

                if (target.classList.contains('header__nav-language') || target.closest('.header__nav-language')) {
                    target.closest('.header__nav-language').lastElementChild.classList.add('dropdown-active');
                }

                if (!target.classList.contains('header__nav-language') && !target.closest('.header__nav-language')) {
                    this.language.lastElementChild.classList.remove('dropdown-active');
                }
            });
        }
    }
}