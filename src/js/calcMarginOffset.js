export default function calcScrollBarOffset() {
    const div = document.createElement('div');
    document.body.append(div);
    div.style.cssText = `
        width: 50px;
        height: 50px;
        overflow-y: scroll;
    `;
    const scrollBarWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return `${scrollBarWidth}px`;
}
