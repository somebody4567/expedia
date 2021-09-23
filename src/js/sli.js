import Collapse from'./collapse';
import burger from './burger';
import slider from './slider';
import workWithNav from './workWithNav';
import modal from './modal';

window.addEventListener('DOMContentLoaded', () => {
    new Collapse({
        triggerSelector: '.questions-collapse__arrowBtn',
    }).init();
    
    slider();
    burger();
    workWithNav();
    modal();
});