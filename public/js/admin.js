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
            } else if(locationHref === 'danh-sach-bai-hat') {
                URL = '/admin/danh-sach-bai-hat';
            } else if(locationHref === 'danh-sach-playlist'){
                URL = '/admin/danh-sach-playlist';
            } else {
                URL = '/admin//danh-sach-su-kien';
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

const acceptSubtitle = (() => {
    if(document.querySelectorAll('.app-admin-right__subtitle__single-music-poster__right-agree')) {
        document.querySelectorAll('.app-admin-right__subtitle__single-music-poster__right-agree').forEach(acceptButton => {
            acceptButton.onclick = (e) => {
                const locationHref = window.location.href.split('/')[5]
                let id = e.target.parentNode.parentNode.querySelector('.app-admin-right__subtitle__single-music-poster-link').href.split('/')[4];
                let idPost = e.target.parentNode.parentNode.querySelector('.app-admin-right__subtitle__single-music-poster__left-id').innerText;
                fetch(`/admin/tao-loi-bai-hat/${locationHref}`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id,
                        idPost,
                    })
                })
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    if(result) {
                        console.log(result);
                        window.location.href = '/admin/tao-loi-bai-hat';
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })
    }
    
})();

const deleteSubtitle = (() => {
    if(document.querySelectorAll('.app-admin-right__subtitle__single-music-poster__right-delete')) {
        document.querySelectorAll('.app-admin-right__subtitle__single-music-poster__right-delete').forEach(deleteButton => {
            deleteButton.onclick = (e) => {
                const locationHref = window.location.href.split('/')[5]
                let id = e.target.parentNode.parentNode.querySelector('.app-admin-right__subtitle__single-music-poster-link').href.split('/')[4];
                let idPost = e.target.parentNode.parentNode.querySelector('.app-admin-right__subtitle__single-music-poster__left-id').innerText;
                fetch(`/admin/tao-loi-bai-hat/${locationHref}`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id,
                        idPost,
                    })
                })
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    if(result) {
                        console.log(result);
                        e.target.parentNode.parentNode.parentNode.remove();
                    } else {
                        console.log('Error server');
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })
    }
    
})();


const solveAddNameSinger = (() => {
    document.querySelector('.app-admin-right__form-group-add').onclick = (e) => {
        let subUrl = "";
        if(window.location.href.split('/')[window.location.href.split('/').length - 1] === 'tao-playlist') {
            subUrl = 'fetch-musics';
        } else if(window.location.href.split('/')[window.location.href.split('/').length - 1] === 'tao-su-kien') {
            subUrl = 'fetch-playlists';
        } else {
            subUrl = 'fetch-singers';
        } 
        // console.log();
        // if(window.location.href === '')
        fetch(`/admin/${subUrl}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            const div = document.createElement("div");
            div.className = 'app-admin-right__form-group';
            let optionString = '';
            let html = '';
            if(window.location.href.split('/')[window.location.href.split('/').length - 1] === 'tao-playlist') {
                const num = document.querySelectorAll('.app-admin-right__form-group').length - 3;
                data.musics.forEach(music => {
                    optionString += `
                        <option value="${music._id}">${music.name}</option>
                    `
                })
                html = `
                <label for="musics" class="app-admin-right__form-group-label">
                    Tên bài hát
                </label>
                <select name="musics[${num}]" id="musics" class="app-admin-right__form-group-input">
                    ${optionString}
                </select>
            `
            } else if(window.location.href.split('/')[window.location.href.split('/').length - 1] === 'tao-bai-hat') {
                const num = document.querySelectorAll('.app-admin-right__form-group').length - 7;
                data.singers.forEach(singer => {
                    optionString += `
                        <option value="${singer._id}">${singer.fullname}</option>
                    `
                })
                html = `
                    <label for="singers" class="app-admin-right__form-group-label">
                        Tên ca sĩ
                    </label>
                    <select name="singers[${num}]" id="singers" class="app-admin-right__form-group-input">
                        ${optionString}
                    </select>
                `
            } else if(window.location.href.split('/')[window.location.href.split('/').length - 1] === 'tao-video'){
                const num = document.querySelectorAll('.app-admin-right__form-group').length - 5;
                data.singers.forEach(singer => {
                    optionString += `
                        <option value="${singer._id}">${singer.fullname}</option>
                    `
                })
                html = `
                    <label for="singers" class="app-admin-right__form-group-label">
                        Tên ca sĩ
                    </label>
                    <select name="singers[${num}]" id="singers" class="app-admin-right__form-group-input">
                        ${optionString}
                    </select>
                `
            } else {
                const num = document.querySelectorAll('.app-admin-right__form-group').length - 2;
                data.playlists.forEach(playlist => {
                    optionString += `
                        <option value="${playlist._id}">${playlist.title}</option>
                    `
                })
                html = `
                    <label for="playlists" class="app-admin-right__form-group-label">
                        Tên playlist
                    </label>
                    <select name="playlists[${num}]" id="playlists" class="app-admin-right__form-group-input">
                        ${optionString}
                    </select>
                `
            }
            
    
            div.innerHTML = html;
            document.querySelector('.app-admin-right__form-group--singer').appendChild(div);
        })
        .catch(err => {
            console.log(err);
        })        
        
    }
})();