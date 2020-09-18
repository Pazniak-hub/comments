'use strict';
//Отслеживаем загрузку
document.body.onload = addingToArray;

//Массив комментариев
const comments = [{
			login: 'Alex',
			comment: 'Что хотел сказать автор?'
		},
		{
			login: 'Leo',
			comment: 'Блять'
		},
		{
			login: 'Garry',
			comment: 'Ахахаха'
		},
		{
			login: 'Dovlatov',
			comment: 'И был таков'
		},
		{
			login: 'Sasha',
			comment: 'Ашчушчэния не те'
		},
	],
	newComment = document.createElement('div'),
	newButton = document.createElement('input'),
	commentsToBeShown = 3, //Количество показываемых комментариев
	form = document.querySelector('form'), //Форма
	loginField = document.getElementById('login'), //Поле логина
	commentField = document.getElementById('text_comment'); //Поле комментария

let showncomments = [], //Второй массив
	logPage = newComment.getElementsByClassName('comments__item-subtitle'),
	comPage = newComment.getElementsByClassName('comments__item-descr'),
	butPage = newComment.getElementsByClassName('comments__delete');


/**
 * Функция, которая прогоняет элементы массива
 */
function addingToArray() {
	while (showncomments.length !== commentsToBeShown) {
		let b = Math.floor(Math.random() * comments.length); //Великий рандомный идентификатор

		if (!showncomments.includes(comments[b])) { //Элементы не должны повторяться
			showncomments.push(comments[b]); //Добавляем уникальный элемент
		}
	}
	renderComments(); //Размещаем на странице
}

function renderComments() { //Вставляем элемент в файл
	for (let key = 0; key < showncomments.length; key++) {
		newComment.innerHTML += `
            <h1 class="comments__item-subtitle">${showncomments[key].login}</h1>
			<div class="comments__item-descr">${showncomments[key].comment}</div>
			`;

	}
	document.body.insertBefore(newComment, form); //Добавляем пере формой
}

function deleteOldComments() { //Удаляем старые комментарии


	while (logPage[0] && comPage[0]) {
		logPage[0].remove();
		comPage[0].remove();

		if (butPage.length >= 1) {
			butPage[0].remove();
		}

	}
}

function addDeleteButton() {//Добавляем кнопку удаления к нашему комментарию
	newButton.setAttribute('type', 'button');
	newButton.setAttribute('value', 'Удалить');
	newButton.setAttribute('class', 'comments__delete');
	newComment.childNodes[1].after(newButton);

}

form.addEventListener('submit', (e) => { //Обрабатываем форму
	e.preventDefault();

	let loginText = loginField.value,
		commentText = commentField.value;

	showncomments = [];
	showncomments.push({
		login: loginText,
		comment: commentText
	});
	form.reset();

	deleteOldComments();
	addingToArray();
	addDeleteButton();

});

newButton.addEventListener('click', () => {//Обрабаотываем кнопку удаления

	butPage[0].remove();
	showncomments = [];
	deleteOldComments();
	addingToArray();

});