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

const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const minPrice = document.querySelector('.price');
const category = document.querySelector('.category');

let login = localStorage.getItem('myUsers');

// База данных
const getData = async function(url) {

   const response = await fetch(url);

   if(!response.ok){
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}!`);
   }

   return await response.json(); 
};

// Валидация логина
const valid = function(str){

   const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
   return nameReg.test(str);
};

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

      if(valid(loginInput.value)){

         login = loginInput.value;
         localStorage.setItem('myUsers', login);
         toggleModalAuth();
         buttonAuth.removeEventListener('click', toggleModalAuth);
         closeAuth.removeEventListener('click', toggleModalAuth);
         loginForm.removeEventListener('submit', logIn);
         loginForm.reset();
         checkAuth();
      } else {

         loginInput.value = '';
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
function createCardRestaurant({ image, kitchen, name, price, products, stars, time_of_delivery: timeOfDelivery }) {

   const card = document.createElement('a');
   card.className = 'card card-restaurant';
   card.products = products;
   card.info = [ name, price, stars, kitchen ];

   card.insertAdjacentHTML('beforeend', `
      <img src="${image}" alt="image" class="card-image">
      <div class="card-text">
         <div class="card-heading">
            <h3 class="card-title">${name}</h3>
            <div class="span card-tag tag">${timeOfDelivery} мин</div>
         </div>
         <div class="card-info">
            <div class="rating" alt="rating", class="rating-star">${stars}</div>
            <div class="price">${price} ₽</div>
            <div class="trait"> - </div>
            <div class="category">${kitchen}</div>
         </div>
      </div>
   `);

   cardsRestaurants.insertAdjacentElement('beforeend', card);
}

// Меню
function createCardFood({ description, id, image, name, price }) {

   const card = document.createElement('div');
   card.className = 'card';

   card.insertAdjacentHTML('beforeend', `
      <img src="${image}" alt="image" class="card-image menu-card">
      <div class="card-text">
         <div class="card-heading">
            <h3 class="card-title cald-title-reg">${name}</h3>
         </div>
         <div class="card-info">
            <div class="ingredients">${description}</div>
         </div>
         <div class="card-buttons">
            <button class="button button-primary">
               <span class="button-card-text">В корзину</span>
               <img src="img/shopping-cart-white.svg" alt="shopping-cart" class="button-card-image">
            </button>
            <strong class="card-price-bolt">${price} ₽</strong>
         </div>
      </div>
   `);

   cardsMenu.insertAdjacentElement('beforeend', card);
}

// Переход в меню ресторана
function openFoods(event) {

   const target = event.target;

   if (login){

      const restaurant = target.closest('.card');

      if(restaurant) {

         const [ name, price, stars, kitchen ] = restaurant.info;

         containerPromo.classList.add('hide');
         restaurants.classList.add('hide');
         menu.classList.remove('hide');
         cardsMenu.textContent = ''

         restaurantTitle.textContent = name;
         rating.textContent = stars;
         minPrice.textContent = `От ${price} ₽`;
         category.textContent = kitchen;

         getData(`./db/${restaurant.products}`).then(function(data){

            data.forEach(createCardFood);
         });
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

function init() {

   getData('./db/partners.json').then(function(data){

      data.forEach(createCardRestaurant);
   });
   
   cartButton.addEventListener('click', toggleModal);
   close.addEventListener('click', toggleModal);
   cardsRestaurants.addEventListener('click', openFoods);
   logo.addEventListener('click', closedFoods)
   
   checkAuth();
   
   // Слайдер
   new Swiper('.swiper-container', {

      autoplay: {
         delay : 3000
     },
     loop: true,
     speed: 1800,
   })
}

init();