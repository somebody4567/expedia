export default function setObserver() {
    const header = document.querySelector('header');

    const observer = new IntersectionObserver(callback);

    function callback(entries, options) {
        if (!entries[0].isIntersecting) {
            header.classList.add('bg-dark');
        } else {
            header.classList.remove('bg-dark');
        }
    }

    observer.observe(document.querySelector('.main-content__wrapper'));

}