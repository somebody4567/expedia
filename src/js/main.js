import HeaderAnimations from './headerAnimations';
import Tabs from './tabs';
import BeforeLoad from './beforeLoad';
import LoadContentAndYTAPI from './loadContentAndYTAPI';
import Swiper from "swiper/bundle";


window.addEventListener('DOMContentLoaded', () => {
    
    new Swiper('.fit__slider', {
        slidesPerView: 'auto',
        spaceBetween: 21,
        speed: 800,
        watchOverflow: true,
        grabCursor: true,
        nested: true,

        breakpoints: {
            320: {
                freeMode: true,
                spaceBetween: 0,
            },
            480: {
                spaceBetween: 0,
            },
            768: {
                freeMode: true,
            },
            993: {
                freeMode: true,
            },
        },


        // freeMode: true,
        // observer: true,
    });
    
    document.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
        });
    });

    new HeaderAnimations({
       hamburger: '.header__hamburger',
       dropdownElems: '[data-dropdown]',
       language: '[data-language]',
       hamburgerMenu: '.modal-hamburger',
    }).init();

    new Tabs({
        tabs: '.way__wrapper-tab',
        menuElems: '.way__wrapper-item',
    }).init();

    

    new LoadContentAndYTAPI({
        modal: '.modal',
        btns: '[data-play]',
        close: '.modal__close',
        btn: '.ideas__button',
        parent: '.ideas__wrapper'
    }).init();


    new BeforeLoad({
        body: 'body'
    }).init();

    
});