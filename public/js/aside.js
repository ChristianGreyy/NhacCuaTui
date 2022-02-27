
const solveDeleteClassNameAsideBarRight = (list, className) => {
    list.forEach(item => {
        item.classList.remove(className);
    })
}

const solveDisplayNoneAsideBarRight = (list) => {
    list.forEach(item => {
        item.style.display = 'none';
    })
}


const solveOnclickSideBarRight = (list, list2, className) => {
    for(let i in list) {
        list[i].onclick = (e) => {
            solveDeleteClassNameAsideBarRight(list, className);
            solveDisplayNoneAsideBarRight(list2);
            list[i].classList.add(className);
            list2[i].style.display = 'block';
        }
    }
}

solveOnclickSideBarRight(document.querySelectorAll('.aside-item__choose-item--music'), document.querySelectorAll('.aside-item__list--music'), 'aside-item__choose-item--active');
solveOnclickSideBarRight(document.querySelectorAll('.aside-item__choose-item--mv'), document.querySelectorAll('.aside-item__list--mv'), 'aside-item__choose-item--active');