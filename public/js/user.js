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



