const cartButton = document.querySelector('#card-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');

let login = localStorage.getItem('myUsers');

new WOW().init();

cartButton.addEventListener('click', toggleModal);

close.addEventListener('click', toggleModal);

function toggleModal() {
   modal.classList.toggle('is-open');
}

////

function toggleModalAuth() {
   modalAuth.classList.toggle('is-open');
   loginInput.style.borderColor = '';
}

function authorized() {

   function logOut() {
      login = null;
      localStorage.removeItem('myUsers')
      buttonAuth.style.display = ''
      userName.style.display = '';
      buttonOut.style.display = '';

      buttonOut.removeEventListener('click', logOut);
      checkAuth();
   }

   console.log('Авторизован')

   userName.textContent = login;

   buttonAuth.style.display = 'none'
   userName.style.display = 'inline';
   buttonOut.style.display = 'block';

   buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
   console.log('Не авторизован');

   function logIn(event) {
      event.preventDefault();

      if(loginInput.value.trim()){
         login = loginInput.value;
         localStorage.setItem('myUsers', login);
         toggleModalAuth();
         buttonAuth.removeEventListener('click', toggleModalAuth);
         closeAuth.removeEventListener('click', toggleModalAuth);
         loginForm.removeEventListener('submit', logIn);
         loginForm.reset();
         checkAuth();
      } else {
         loginInput.style.borderColor = 'red';
         loginInput.placeholder = 'Введен неверный логин';
      }

   }

   buttonAuth.addEventListener('click', toggleModalAuth);
   closeAuth.addEventListener('click', toggleModalAuth);
   loginForm.addEventListener('submit', logIn);
}

function checkAuth() {
   if(login) {
      authorized();
   } else {
      notAuthorized();
   }
}

checkAuth();