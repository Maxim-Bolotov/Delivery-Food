'use strict';


// Корзина
const cartButton = document.querySelector('#card-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
// Авторизация
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
// Рестораны и меню 
const cardsRestaurants = document.querySelector('.cards');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');


let login = localStorage.getItem('myUsers');

// Проверка авторизации
function checkAuth() {

   if(login) {
      authorized();
   } else {
      notAuthorized();
   }
}

// Модальное окно авторизации
function toggleModalAuth() {
   modalAuth.classList.toggle('is-open');
   loginInput.style.borderColor = '';
   loginInput.placeholder = '';
}

// Модальное окно корзины
function toggleModal() {
   modal.classList.toggle('is-open');
}

// Авторизован
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

// Не авторизован
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

   closedFoods()

   buttonAuth.addEventListener('click', toggleModalAuth);
   closeAuth.addEventListener('click', toggleModalAuth);
   loginForm.addEventListener('submit', logIn);
}

// Рестораны
function createCardRestaurant() {

   const card = `
      <a class="card">
         <img src="img/tanuki.png" alt="image" class="card-image">
         <div class="card-text">
            <div class="card-heading">
               <h3 class="card-title">Тануки</h3>
               <div class="span card-tag tag">От 30 мин</div>
            </div>
            <div class="card-info">
               <div class="rating"><img src="img/rating.png" alt="rating" class="rating-star">4.5</div>
               <div class="price">От 600 ₽</div>
               <div class="trait"> - </div>
               <div class="category">Суши, роллы</div>
            </div>
         </div>
      </a>
   `;

   cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

// Меню
function createCardFood() {
   const card = document.createElement('div');
   card.className = 'card';

   card.insertAdjacentHTML('beforeend', `
      <img src="img/image.svg" alt="image" class="card-image menu-card">
      <div class="card-text">
         <div class="card-heading">
            <h3 class="card-title cald-title-reg">Ролл угорь</h3>
         </div>
         <div class="card-info">
            <div class="ingredients">Рис, угорь, соус унаги, кунжут, авокадо, водоросли нори.</div>
         </div>
         <div class="card-buttons">
            <button class="button button-primary">
               <span class="button-card-text">В корзину</span>
               <img src="img/shopping-cart-white.svg" alt="shopping-cart" class="button-card-image">
            </button>
            <strong class="card-price-bolt">250 ₽</strong>
         </div>
      </div>
   `);

   cardsMenu.insertAdjacentElement('beforeend', card);
}

// Переход в меню ресторана
function openFoods(event) {

   if(login !== null){
      const target = event.target;
      const restaurant = target.closest('.card');
      console.log(restaurant)

      if(restaurant) {

         containerPromo.classList.add('hide');
         restaurants.classList.add('hide');
         menu.classList.remove('hide');

         cardsMenu.textContent = ''

         createCardFood();
         createCardFood();
         createCardFood();
      }

   } else {
      toggleModalAuth();
   }

}

// Возврат к ресторанам
function closedFoods() {
   containerPromo.classList.remove('hide');
   restaurants.classList.remove('hide');
   menu.classList.add('hide');
}

cartButton.addEventListener('click', toggleModal);

close.addEventListener('click', toggleModal);

cardsRestaurants.addEventListener('click', openFoods);

logo.addEventListener('click', closedFoods)

checkAuth();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();