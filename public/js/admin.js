const solveSubmitAdmin = () => {
    if(document.querySelector('.admin-login-container__button')) {
        document.querySelector('.admin-login-container__button').onclick = (e) => {
            document.querySelector('.admin-login-container__form').submit();
        }
    }
}

solveSubmitAdmin();

const solveSubmitCreateMusic = () => {
    if(document.querySelector('.app-admin-right-button')) {
        document.querySelector('.app-admin-right-button').onclick = (e) => {
            document.querySelector('.app-admin-right__form').submit();
        }
    }
}

solveSubmitCreateMusic();


const solveClickOnCheckBox = () => {
    if(document.querySelectorAll('.app-admin-right-table__checkbox')) {
        const checkboxes = document.querySelectorAll('.app-admin-right-table__checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.onclick = (e) => {
                solveDeleteButtonAppear();
                let isChecked = checkbox.checked;
                let row = checkbox.parentNode.parentNode;
                if(isChecked) {
                    row.classList.add('app-admin-right-table__row--active');
                } else {
                    row.classList.remove('app-admin-right-table__row--active');
                }
            }

        })
    }
}

solveClickOnCheckBox();

const solveDeleteButtonAppear = () => {
    if(document.querySelectorAll('.app-admin-right-table__checkbox')) {
        let check = false;
        const checkboxes = document.querySelectorAll('.app-admin-right-table__checkbox');
        checkboxes.forEach(checkbox => {
            let isChecked = checkbox.checked;
            if(isChecked) {
                check = true;
            }
        })
        if(check) {
            document.querySelector('.app-admin-right-delete').style.display = 'flex';
        } else {
            document.querySelector('.app-admin-right-delete').style.display = 'none';
        }
    }
}

const numberMusicDelete = () => {
    if(document.querySelectorAll('.app-admin-right-table__checkbox')) {
        let idDeleted = [];
        const checkboxes = document.querySelectorAll('.app-admin-right-table__checkbox');
        checkboxes.forEach(checkbox => {
            let isChecked = checkbox.checked;
            if(isChecked) {
                let parentElement = checkbox.parentNode;
                idDeleted.push(parentElement.innerText);
                parentElement.parentNode.remove()
            }
        })

        return idDeleted;
    }
}

const getDateAdmin = () => {
    if(document.querySelectorAll('.app-admin-right__form-group-input--select')) {
        let count = 0;
        document.querySelectorAll('.app-admin-right__form-group-input--select').forEach(item => {
            let optionString = "";
            if(count == 0) {
                for(let i = 1; i<=31; i++) {
                    optionString += `<option value="${i}">${i}</option>`
                }
            } else if(count == 1) {
                for(let i = 1; i<=12; i++) {
                    optionString += `<option value="${i}">${i}</option>`
                }
            } else if(count == 2) {
                for(let i = 2022; i>=1945; i--) {
                    optionString += `<option value="${i}">${i}</option>`
                }
            }
            item.innerHTML = optionString;
            count ++;
        })
    }
}

getDateAdmin();


const deleteMusic = () => {
    if(document.querySelector('.app-admin-right-delete')) {
        document.querySelector('.app-admin-right-delete').onclick = (e) => {
            let URL = '';
            const locationHref = window.location.href.split('/')[4]
            if(locationHref === 'danh-sach-nguoi-dung') {
                URL = '/admin/danh-sach-nguoi-dung';
            } else {
                URL = '/admin/danh-sach-bai-hat';
            }
            fetch(URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _idArray: numberMusicDelete(),
                })
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if(data) {
                  console.log(data)
                  document.querySelector('.app-admin-right-delete').style.display = 'none';
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}

deleteMusic();


