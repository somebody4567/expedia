export default class Tabs {
    constructor({tabs, menuElems} = {}) {
        this.tabs = document.querySelectorAll(tabs);
        this.menuElems = document.querySelectorAll(menuElems);
    }

    init() {
        this.hideAllTabs();
        this.showFirstTab();
        this.setActiveClassByClick();
        this.setActiveClass(this.menuElems[0]);
        this.changeTab();
    }

    setActiveClass(element) {
        this.menuElems.forEach(item => {
            if (item == element) {
                item.classList.add('way__wrapper-item-active');
            }
        });
    }

    setActiveClassByClick() {
        this.menuElems.forEach(elem => {
            elem.addEventListener('click', () => {
                this.menuElems.forEach(item => {
                    item.classList.remove('way__wrapper-item-active');
                });
                this.setActiveClass(elem);
            });
        });
    }

    hideAllTabs() {
        this.tabs.forEach(item => {
            item.style.display = 'none';
            item.classList.add('animated');
        });
    }

    showFirstTab() {
        this.tabs.forEach((item, i) => {
            if (i == 0) {
                item.style.display = 'flex';
                this.setActiveClass(item);
                return;
            } 
        });
    }

    changeTab() {
        this.menuElems.forEach((elem, i) => {
            elem.addEventListener('click', () => {
                this.hideAllTabs();
                this.tabs[i].style.display = 'flex';
                this.tabs[i].classList.add('fadeIn');
            });
        });
    }
}