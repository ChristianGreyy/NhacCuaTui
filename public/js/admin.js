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




