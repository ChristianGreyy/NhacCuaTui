// Event Click On Login
if(document.querySelector('.header-right-login')) {
    document.querySelector('.header-right-login').onclick = (e) => {
        document.querySelector('.header-right-login-child').style.display = 'block';
        document.querySelector('.header-right-alpha').style.display = 'block';
    }
}

// Event Click On Login Right Now!
if(document.querySelector('.header-right-login-child-component-right-button--signup')) {
    document.querySelector('.header-right-login-child-component-right-button--signup').onclick = (e) => {
        document.querySelector('.header-right-login-child--signup').style.display = 'none';
        document.querySelector('.header-right-login-child').style.display = 'block';
    }
}

// Click On Login POST
if(document.querySelector('.header-right-login-child-component-left-button')) {
    document.querySelector('.header-right-login-child-component-left-button').onclick = (e) => {
        document.querySelector('.header-right-login-form').submit();
    }
}

// Event CLick On Sign Up
if(document.querySelector('.header-right-signup')) {
    document.querySelector('.header-right-signup').onclick = (e) => {
        document.querySelector('.header-right-login-child--signup').style.display = 'block';
        document.querySelector('.header-right-alpha').style.display = 'block';
    }
}

// Event Click On Login Right Now!
if(document.querySelector('.header-right-login-child-component-right-button')) {
    document.querySelector('.header-right-login-child-component-right-button').onclick = (e) => {
        document.querySelector('.header-right-login-child--signup').style.display = 'block';
        document.querySelector('.header-right-login-child').style.display = 'none';
    }
}

// Click On Sign Up POST
if(document.querySelector('.header-right-login-child-component-left-button--signup')) {
    document.querySelector('.header-right-login-child-component-left-button--signup').onclick = (e) => {
        document.querySelector('.header-right-login-form--signup').submit();
    }
}

// Event Click On Close
if(document.querySelectorAll('.header-right-login-child-close')) {
    document.querySelectorAll('.header-right-login-child-close').forEach(item => {
        item.onclick = (e) => {
            document.querySelector('.header-right-login-child').style.display = 'none';
            document.querySelector('.header-right-login-child--signup').style.display = 'none';
            document.querySelector('.header-right-alpha').style.display = 'none';
        }
    })
}

// Event Click On Logout

if(document.querySelector('.header-right-user-child-item')) {
    document.querySelector('.header-right-user-child-item--logout').onclick = (e) => {
        e.preventDefault();
        document.querySelector('.header-right-user-child-item-form--logout').submit();
    }
}

// Solve username if it exceed required length
const solveLengthUsernameExceed = () => {
    let username = document.querySelector('.header-right-user-des-name').innerText;
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
    console.log(requiredUsername);
    document.querySelector('.header-right-user-des-name').innerText = requiredUsername;
}

if(document.querySelector('.header-right-user-des-name')) {
    solveLengthUsernameExceed();
}