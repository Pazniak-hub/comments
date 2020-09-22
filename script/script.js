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
	comments = newComment.getElementsByClassName('comments__item-full'), //Блоки комментариев
	deleteButtonsArray = newComment.getElementsByClassName('comments__delete'); //Коллекция кнопок удаления

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
	while (comments[0]) { //Удаляем старые комментарии
		comments[0].remove();
	}

	for (let key = 0; key < shownComments.length; key++) {
		newComment.innerHTML += `<div class="comments__item-full">
            <h1 class="comments__item-subtitle">${shownComments[key].login}</h1>
			<div class="comments__item-descr">${shownComments[key].comment}</div>
			${shownComments[key].isPredefined == false ? '<input type="button" class="comments__delete" value="Удалить"></input>':''}
			</div>`;

	}
	document.body.insertBefore(newComment, form); //Добавляем перед формой
}


form.addEventListener('submit', (e) => { //Обрабатываем форму
	e.preventDefault();


	shownComments = [{
		login: document.getElementById('login').value,
		comment: document.getElementById('text_comment').value,
		isPredefined: false
	}];
	form.reset();
	selectCommentsToShow();

	for (var i = 0; i < deleteButtonsArray.length; i++) {
		deleteButtonsArray[i].addEventListener('click', () => { //обрабатываем коллекцию кнопок

			shownComments = [];
			selectCommentsToShow();
		});
	}
});