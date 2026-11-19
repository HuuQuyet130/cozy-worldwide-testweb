function getCurrentUser(){
    return localStorage.getItem('currentUser');
}
const loginBtn = document.getElementById('loginBtn');
const regBtn = document.getElementById('registerBtn');

if(loginBtn){
    loginBtn.addEventListener('click', ()=>{
        const user = document.getElementById('user').value.trim();
        const pass = document.getElementById('pass').value.trim();

        const userErr = document.getElementById('userError');
        const passErr = document.getElementById('passError');

        userErr.textContent = "";
        passErr.textContent = "";

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const found = users.find(u => u.user === user && u.pass === pass);

        if(!found){
            passErr.textContent = "Invalid username or password";
            return;
        }

        localStorage.setItem('currentUser', user);
        window.location.href = 'index.html';
    });
}
if(regBtn){
    regBtn.addEventListener('click', ()=>{
        const user = document.getElementById('newUser').value.trim();
        const pass = document.getElementById('newPass').value.trim();

        const userErr = document.getElementById('regUserError');
        const passErr = document.getElementById('regPassError');

        userErr.textContent = "";
        passErr.textContent = "";

        let valid = true;

        if(user.length < 4){
            userErr.textContent = "Username must be at least 4 characters";
            valid = false;
        }

        if(pass.length < 6){
            passErr.textContent = "Password must be at least 6 characters";
            valid = false;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if(users.find(u=>u.user === user)){
            userErr.textContent = "Username already exists";
            valid = false;
        }

        if(!valid) return;

        users.push({user, pass});
        localStorage.setItem('users', JSON.stringify(users));

        window.location.href = 'login.html';
    });
}
document.addEventListener('keydown', (e)=>{
    if(e.key === "Enter"){
        loginBtn?.click();
        regBtn?.click();
    }
});
const userIcon = document.getElementById('userIcon');

if(userIcon){
    const currentUser = getCurrentUser();

    if(currentUser){
        userIcon.classList.remove('fa-user');
        userIcon.classList.add('fa-right-from-bracket'); // icon logout
        userIcon.title = "Logout (" + currentUser + ")";

        userIcon.addEventListener('click', ()=>{
            if(confirm("Dang xuat?")){
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            }
        });
    }else{
        userIcon.addEventListener('click', ()=>{
            window.location.href = 'login.html';
        });
    }
}
const currentUser = getCurrentUser();

const loginForm = document.querySelector('.auth-container');
const loggedBox = document.getElementById('loggedBox');
const welcomeUser = document.getElementById('welcomeUser');
const logoutBtn = document.getElementById('logoutBtn');

if(currentUser && loggedBox){
    document.querySelectorAll('.input-group, #loginBtn, .auth-link').forEach(el=>{
        el.style.display = 'none';
    });

    loggedBox.style.display = 'block';
    welcomeUser.textContent = "Hello, " + currentUser;
}

if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{
        localStorage.removeItem('currentUser');
        window.location.reload();
    });
}