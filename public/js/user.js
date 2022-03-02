// Home Page

// Validation Username
const validationUsername = () => {
    document.querySelectorAll('.header-right-login-child-component-left-form-group-input--username').forEach(item => {
        item.onblur = (e) => {
            let valueUsername = e.target.value;
            if(valueUsername.length < 5) {
                let parElement = e.target.parentNode;
                parElement.classList.add('header-right-login-child-component-left-form-group--error');
            }
        }
    })
    document.querySelectorAll('.header-right-login-child-component-left-form-group-input--username').forEach(item => {
        item.onclick = (e) => {
            let parElement = e.target.parentNode;
            parElement.classList.remove('header-right-login-child-component-left-form-group--error');
            parElement.classList.remove('header-right-login-child-component-left-form-group--marginBottom');
        }
    })
}
validationUsername();

// Validation password
const validationPassword = () => {
    const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    document.querySelector('.header-right-login-child-component-left-form-group-input--password').onblur = (e) => {
        let valuePassword = e.target.value;
        if(!regexPassword.test(valuePassword)) {
            let parElement = e.target.parentNode;
            parElement.classList.add('header-right-login-child-component-left-form-group--error');
            parElement.classList.add('header-right-login-child-component-left-form-group--marginBottom');
        }
    }
    document.querySelector('.header-right-login-child-component-left-form-group-input--password').onclick = (e) => {
        let valuePassword = e.target.value;
        if(!regexPassword.test(valuePassword)) {
            let parElement = e.target.parentNode;
            parElement.classList.remove('header-right-login-child-component-left-form-group--error');
            parElement.classList.remove('header-right-login-child-component-left-form-group--marginBottom');
        }
    }
}
validationPassword();

// Validation Repassword
const validationRepassword = () => {
    document.querySelector('.header-right-login-child-component-left-form-group-input--repassword').onblur = (e) => {
        let valuerePassword = e.target.value;
        let valuePassword = document.querySelector('.header-right-login-child-component-left-form-group-input--password').value;
        if(valuerePassword !== valuePassword) {
            let parElement = e.target.parentNode;
            parElement.classList.add('header-right-login-child-component-left-form-group--error');
            parElement.classList.add('header-right-login-child-component-left-form-group--marginBottom');
        }
    }
    document.querySelector('.header-right-login-child-component-left-form-group-input--repassword').onclick = (e) => {
        let valuerePassword = e.target.value;
        let parElement = e.target.parentNode;
        parElement.classList.remove('header-right-login-child-component-left-form-group--error');
        parElement.classList.remove('header-right-login-child-component-left-form-group--marginBottom');
    }
}
validationRepassword();

// Validation Email
const validationEmail = () => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    document.querySelector('.header-right-login-child-component-left-form-group-input--email').onblur = (e) => {
        let valueEmail = e.target.value;
        if(!regexEmail.test(valueEmail)) {
            let parElement = e.target.parentNode;
            parElement.classList.add('header-right-login-child-component-left-form-group--error');
        }
    }
    document.querySelector('.header-right-login-child-component-left-form-group-input--email').onclick = (e) => {
        let valueEmail = e.target.value;
        if(!regexEmail.test(valueEmail)) {
            let parElement = e.target.parentNode;
            parElement.classList.remove('header-right-login-child-component-left-form-group--error');
        }
    }
}
validationEmail();

// Check validation

if(document.querySelector('.header-right-login-child-component-left-button--signup')) {
    const isValidation = () => {
        document.querySelector('.header-right-login-child-component-left-button--signup').onclick = (e) => {
            let any = true;
            document.querySelectorAll('.header-right-login-child-component-left-form-group').forEach(item => {
                if(item.classList.contains('header-right-login-child-component-left-form-group--error')) {
                    any = false;
                }
            })
            if(any) {
                document.querySelector('.header-right-login-form--signup').submit();
            }
        }
    }
    isValidation();
}

// personal Page

// Solve username if it exceed required length
const solveLengthUsernameExceed__pagepersonal = () => {
    let username = document.querySelector('.personal-user__content-left-des-username').innerText;
    // Length 13
    let requiredUsername = "";
    if(username.length > 13) {
        let index = 0;
        for(let index in username) {
            if(index <= 12) {
                requiredUsername += username[index];
            } 
        }
        requiredUsername+='...';          
    } else {
        requiredUsername = username;
    }
    document.querySelector('.personal-user__content-left-des-username').innerText = requiredUsername;
}

if(document.querySelector('.personal-user__content-left-des-username')) {
    solveLengthUsernameExceed__pagepersonal();
}

// Solve date 

const solveDateNewUser = (element) => {
    let currentDate = element.innerText;
   
    let month = currentDate.split(' ')[1];
    let day = currentDate.split(' ')[2];
    let year = currentDate.split(' ')[3];
    let monthArray = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    let monthNumber = monthArray.indexOf(month) + 1;
    let date = day+'/'+monthNumber+'/'+year;
    
    if(currentDate.length > 15) {
        element.innerText = date;
    } 
}

if(document.querySelector('.personal-user__content-left-des-wrapper-value--date')) {
    solveDateNewUser(document.querySelector('.personal-user__content-left-des-wrapper-value--date'));
}

if(document.querySelector('.admin-user-component__adminUser-left-list-item-des__value--date')) {
    solveDateNewUser(document.querySelector('.admin-user-component__adminUser-left-list-item-des__value--date'));
}

if(document.querySelector('.personal-user__content-left-des-wrapper-value--createdAt')) {
    solveDateNewUser(document.querySelector('.personal-user__content-left-des-wrapper-value--createdAt'));
}


// Solve the theme appear

const solveThemeApper = () => {
    setTimeout(() => {
        document.querySelectorAll('.personal-user__content-right__theme-item').forEach(item => {
            item.style.display = 'block';
        })
    }, 1000);
}

if(document.querySelectorAll('.personal-user__content-right__theme-item')) {
    solveThemeApper();
}

// Amin Page

// Event Click On Edit Information
if(document.querySelector('.admin-user-component__adminUser-left-list-item-edit')) {
    document.querySelector('.admin-user-component__adminUser-left-list-item-edit').onclick = (e) => {
        document.querySelector('.admin-user__informations').style.display = 'none';
        document.querySelector('.admin-user__edit').style.display = 'block';
    }  
}

// Event Click On Comeback
if(document.querySelector('.admin-user__edit-form-button-comeback')) {
    document.querySelector('.admin-user__edit-form-button-comeback').onclick = (e) => {
        document.querySelector('.admin-user__informations').style.display = 'block';
        document.querySelector('.admin-user__edit').style.display = 'none';
    }  
}

// Event Click On Submit Update
if(document.querySelector('.admin-user__edit-form-button-submit')) {
    document.querySelector('.admin-user__edit-form-button-submit').onclick = (e) => {
        let any = true;
        document.querySelectorAll('.admin-user__edit-form-form-group').forEach(item => {
            if(item.classList.contains('admin-user__edit-form-form-group--error')) {
                any = false;
            }
        })
        if(any) {
            document.querySelector('.admin-user__edit-form').submit();
        }
    }  
}

// Validation New Password
const validationNewPassword = () => {
    if(document.getElementById('admin-user__edit-form-form-group-input--newPassword')) {
        const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        document.getElementById('admin-user__edit-form-form-group-input--newPassword').onblur = (e) => {
            let newPassword = document.getElementById('admin-user__edit-form-form-group-input--newPassword').value;
            if(!regexPassword.test(newPassword)) {
                document.getElementById('admin-user__edit-form-form-group-input--newPassword').parentNode.classList.add('admin-user__edit-form-form-group--error');
            }
        }
    }
}

validationNewPassword();

// Validation repassword
const vaidationRePassword = () => {
    if(document .getElementById('admin-user__edit-form-form-group-input--rePassword')) {
        let rePasswordElement = document.getElementById('admin-user__edit-form-form-group-input--rePassword');
        let formInput = rePasswordElement.closest('form');
        let newPasswordElement = formInput.querySelector('[name=newPassword]');
        document.getElementById('admin-user__edit-form-form-group-input--rePassword').onblur = (e) => {
            let valueNewPassword = newPasswordElement.value;
            let valueRePassword = rePasswordElement.value;
            if(valueNewPassword !== valueRePassword) {
                rePasswordElement.parentNode.classList.add('admin-user__edit-form-form-group--error');
            }
        }
    }
}
vaidationRePassword();

// Event On input

const removeErrorInput = () => {
    if(document.querySelectorAll('.admin-user__edit-form-form-group-input')) {
        document.querySelectorAll('.admin-user__edit-form-form-group-input').forEach(item => {
            item.onclick = (e) => {
                item.parentNode.classList.remove('admin-user__edit-form-form-group--error');
            }
        })
    }
}

removeErrorInput();

// Event Click On Button Update Successfully

if(document.querySelector('.admin-user__edit-editing--successfully-content__button')) {
    document.querySelector('.admin-user__edit-editing--successfully-content__button').onclick = (e) => {
        document.querySelector('.admin-user__edit-editing--successfully').style.display = 'none';
    }
}

const submitFormTheLovePlaylist = (() => {
    if(document.querySelector('.music-content-left__music-heart')) {
        document.querySelector('.music-content-left__music-heart').onclick = (e) => {
            document.querySelector('.music-content-left__music-heart-form').submit();
        }
    }
})()

const submitAddFriend =(() => {
    if(document.querySelector('.personal-user__content-left-des-wrapper-button')) {
        document.querySelector('.personal-user__content-left-des-wrapper-button').onclick = (e) => {
            document.querySelector('.personal-user__content-left-des-wrapper__form').submit();
        }
    }
});

const fetchPersonalityAdmin = (async () => {
    const response = await fetch('/admin/fetch-personality');
    const data = await response.json();
    const user = data.user;
    const id = window.location.href.split('/')[window.location.href.split('/').length - 1];
    const isFriend = user.friends.find(idUser => {
        return idUser.toString() === id.toString()
    })
    let string = '';
    if(isFriend) {
        string = `
        <div style="color: var(--main-color);" class="personal-user__content-left-des-wrapper-button-des--follow">
            Bạn đã theo dõi 
        </div>
        `
    } else {
        string = `
            <form action="/user/ket-ban/${id}" method="POST" class="personal-user__content-left-des-wrapper__form"></form>
                <div class="personal-user__content-left-des-wrapper-button">
                    <div class="personal-user__content-left-des-wrapper-button-icon">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <div class="personal-user__content-left-des-wrapper-button-des">
                        Theo dõi
                    </div>
                </div>
            </form>
        
        `
    }
    document.querySelectorAll('.personal-user__content-left-des-wrapper')[5].innerHTML = string;
    submitAddFriend();
})()

