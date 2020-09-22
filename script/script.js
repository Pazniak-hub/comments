'use strict';
//Отслеживаем загрузку
document.body.onload = selectCommentsToShow;

//Массив комментариев
const commentsArray = [{
			login: 'Alex',
			comment: 'Что хотел сказать автор?',
			isPredefined: true
		},
		{
			login: 'Leo',
			comment: 'Блять',
			isPredefined: true
		},
		{
			login: 'Garry',
			comment: 'Ахахаха',
			isPredefined: true

		},
		{
			login: 'Dovlatov',
			comment: 'И был таков',
			isPredefined: true
		},
		{
			login: 'Sasha',
			comment: 'Ашчушчэния не те',
		},
	],
	newComment = document.createElement('div'),
	commentsToBeShown = 3, //Количество показываемых комментариев
	deleteButtonsCount = 1,
	form = document.querySelector('form'), //Форма
	loginField = document.getElementById('login'), //Поле логина
	commentField = document.getElementById('text_comment'), //Поле комментария
	comments = newComment.getElementsByClassName('comments__item-full'),//Блоки комментариев
	deleteButtonsArray = newComment.getElementsByTagName('input');//Коллекция кнопок удаления

let shownComments = []; //Второй массив

/**
 * Функция, которая прогоняет элементы массива
 */
function selectCommentsToShow() {
	while (shownComments.length !== commentsToBeShown) {
		let b = Math.floor(Math.random() * commentsArray.length); //Великий рандомный идентификатор

		if (!shownComments.includes(commentsArray[b])) { //Элементы не должны повторяться
			shownComments.push(commentsArray[b]); //Добавляем уникальный элемент
		}
	}
	renderComments(); //Размещаем на странице
}

function renderComments() { //Размещаем комментарии на странице
	for (let key = 0; key < shownComments.length; key++) {
			newComment.innerHTML += `<div class="comments__item-full">
            <h1 class="comments__item-subtitle">${shownComments[key].login}</h1>
			<div class="comments__item-descr">${shownComments[key].comment}</div>
			${shownComments[key].isPredefined == false ? '<input type="button" class="comments__delete" value="Удалить"></input>':''}
			</div>`;

		}
	document.body.insertBefore(newComment, form); //Добавляем перед формой
}

function deleteOldComments() { //Удаляем старые комментарии

	while (comments[0]) {
		comments[0].remove();
	}
}

form.addEventListener('submit', (e) => { //Обрабатываем форму
	e.preventDefault();

	let loginText = loginField.value,
		commentText = commentField.value;

	shownComments = [];
	shownComments.push({
		login: loginText,
		comment: commentText,
		isPredefined: false
	});
	form.reset();

	deleteOldComments();
	selectCommentsToShow();

	for (var i = 0; i < deleteButtonsArray.length; i++) {
		deleteButtonsArray[i].addEventListener('click', () => {//обрабатываем коллекцию кнопок

			shownComments = [];
			deleteOldComments();
			selectCommentsToShow();
		});
	}
});