const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
   }
];
const cardPlace = document.querySelector('.places-list');
const addCardButton = document.querySelector('.user-info__button');
const addCardMenu = document.querySelector('.popup');
const closeFormButton = document.querySelector('.popup__close');
const form = document.forms.new; // получаем форму


function createNewCard(name, link){
    const cardItem = document.createElement('div');
    cardItem.classList.add('place-card');

    const cardImage = document.createElement('div');
    cardImage.classList.add('place-card__image');
    cardImage.style.backgroundImage = `url(${link})`;

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add("place-card__delete-icon");

    cardImage.appendChild(buttonDelete);
    cardItem.appendChild(cardImage);

    const cardDescription = document.createElement('div');
    cardDescription.classList.add("place-card__description");

    const cardName = document.createElement('h3');
    cardName.classList.add("place-card__name");
    cardName.textContent = name;
    cardDescription.appendChild(cardName);
    const buttonLike = document.createElement('button');
    buttonLike.classList.add("place-card__like-icon");
    cardDescription.appendChild(buttonLike);

    cardItem.appendChild(cardImage);
    cardItem.appendChild(cardDescription);

    cardItem.addEventListener('click', function (event) {
        if (event.target.classList.contains('place-card__like-icon'))
        {
            event.target.classList.toggle('place-card__like-icon_liked');
        }
});

    buttonDelete.addEventListener('click', function(event){
       cardPlace.removeChild(event.target.parentElement.parentElement);
    });

    return cardItem;
};

function addCards(){

    for(let i=0;i<10;i++){
        cardPlace.appendChild(createNewCard(initialCards[i].name, initialCards[i].link));
    }

}


function toggleLike(event){
    console.log(event);
    cardLike.classList.toggle('place-card__like-icon_liked');
}

function closeAddCardForm(){
    addCardMenu.classList.remove('popup_is-opened');
}

function addCardButtonClicked(){
    addCardMenu.classList.add('popup_is-opened');
}

function addCardFormSubmit(event){
    event.preventDefault();
    if (form.elements.name.value == '' || form.elements.link.value == '') {
        return;
    }else{
        cardPlace.appendChild(createNewCard(form.elements.name.value , form.elements.link.value));
        addCardMenu.classList.remove('popup_is-opened');
    }
}

function setBindings(){
    addCardButton.addEventListener('click', addCardButtonClicked);
    closeFormButton.addEventListener('click', closeAddCardForm);
    form.addEventListener('submit', addCardFormSubmit);
}

addCards();
setBindings();