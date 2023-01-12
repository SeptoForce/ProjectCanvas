const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

const remember = document.getElementById('remember');

let currentState = 'none';
currentState = loginForm.classList.contains('flex') ? 'login' : 'none';

if(localStorage.getItem('remember') == 'true'){
    remember.checked = true;
    let loginEmail = document.getElementById('login_email');
    loginEmail.value = localStorage.getItem('email');
}

loginButton.addEventListener('click', () => {
    if(currentState != 'login'){
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginForm.classList.add('flex');
        registerForm.classList.remove('flex');
        currentState = 'login';

        
    } else {
        let check = true;
        
        let loginFields = document.querySelectorAll('#loginForm input');

        loginFields.forEach((field) => {
            if(field.value == ''){
                field.classList.add('border-orange-600');
                check = false;
            }
        });
        
        if(check == false){
            return;
        }

        if(remember.checked){
            localStorage.setItem('remember', 'true');
            localStorage.setItem('email', loginFields[0].value);
        } else {
            localStorage.setItem('remember', 'false');
        }

        loginForm.submit();
    }
});

registerButton.addEventListener('click', () => {
    if(currentState != 'register'){
        loginForm.classList.remove('flex');
        registerForm.classList.add('flex');
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        currentState = 'register';
    } else {
        let check = true;
        const emailErrorMessage = document.getElementById('emailErrorMessage');
        const passwordErrorMessage = document.getElementById('passwordErrorMessage');
        emailErrorMessage.innerHTML = '';
        passwordErrorMessage.innerHTML = '';
        
        let registrationFields = document.querySelectorAll('#registerForm input');

        registrationFields.forEach((field) => {
            if(field.value == ''){
                field.classList.add('border-orange-600');
                check = false;
            }
        });

        if(check == false){
            return;
        }

    //check if email is valid using regex
        let email = document.getElementById('register_email').value;
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailRegex.test(email)){
            emailErrorMessage.innerHTML = 'Email is not valid!';
            check = false;
        }else{
            emailErrorMessage.innerHTML = '';
        }
        
        if(check == false){
            return;
        }
        if(document.getElementById('register_password').value == document.getElementById('repeat_password').value){
            registerForm.submit();
        } else {
            passwordErrorMessage.innerHTML = 'Passwords do not match!';
        }
    }
});

//when eneter is pressed submit the login form
document.addEventListener('keydown', (event) => {
    if(event.key == 'Enter'){
        if(currentState == 'login'){
            loginButton.click();
        } else if(currentState == 'register'){
            registerButton.click();
        }
    }
});