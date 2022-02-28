const createTheTextInSingers = (() => {
    let url = window.location.href.split('/');
    let thePoint = url[url.length - 1].split('=')[1];
    let string = ` 
    <a href="/nghe-si/" class="singers-navigation__right-title">
        HOT
    </a>`;
    for(let i = 65; i<=90; i++) {
        let ascii = String.fromCharCode(i);
        let ans = ascii.toLowerCase() == thePoint ? 'singers-navigation__right-items-link--active' : ''; 
        string += ` 
        <li class="singers-navigation__right-items">
            <a href="?ten=${ascii.toLowerCase()}" class="singers-navigation__right-items-link ${ans}">${ascii}</a>
        </li>`
    }
    if(document.querySelector('.singers-navigation__right')) {
        document.querySelector('.singers-navigation__right').innerHTML = string;
    }
})();


const setHeightImageAvatarsSinger = (() => {
    if(document.querySelectorAll('.singers-list__items-avatar')[0]) {
        let width = document.querySelectorAll('.singers-list__items-avatar')[0].clientWidth;
        document.querySelectorAll('.singers-list__items-avatar').forEach(element => {
            element.style.height = width + 'px';
        })
    }
})();