'use strict';
//Отслеживаем загрузку
document.body.onload = selectCommentsToShowAndRender;

//Массив комментариев
const commentsArray = [{
			login: 'Alex',
			comment: 'Что хотел сказать автор?',
			isDeletable: false,

		},
		{
			login: 'Leo',
			comment: 'Блять',
			isDeletable: false,

		},
		{
			login: 'Garry',
			comment: 'Ахахаха',
			isDeletable: false,


		},
		{
			login: 'Dovlatov',
			comment: 'И был таков',
			isDeletable: false,

		},
		{
			login: 'Sasha',
			comment: 'Ашчушчэния не те',
			isDeletable: false,

		},
	],
	newComment = document.createElement('div'),
	commentsToBeShown = 3, //Количество показываемых комментариев
	deleteButtonsCount = 1,
	form = document.querySelector('form'), //Форма
	comments = newComment.getElementsByClassName('comments__item-full'), //Блоки комментариев
	deleteButtonsArray = newComment.getElementsByClassName('comments__delete'), //Коллекция кнопок удаления
	checkCanDelete = document.getElementById('can_delete'); //Чекбокс для удаления

let shownComments = []; //Второй массив


/**
 * Функция, которая прогоняет элементы массива
 */
function selectCommentsToShowAndRender() {
	while (shownComments.length !== commentsToBeShown) {
		let b = Math.floor(Math.random() * commentsArray.length); //Великий рандомный идентификатор

		if (!shownComments.includes(commentsArray[b])) { //Элементы не должны повторяться
			shownComments.push(commentsArray[b]); //Добавляем уникальный элемент
		}
	}
	deleteOldComments();
	renderNewComments();

}


function deleteOldComments() {
	while (comments[0]) { //Удаляем старые комментарии
		comments[0].remove();
	}
}

function renderNewComments() { //Размещаем комментарии на странице
	for (let key = 0; key < shownComments.length; key++) {
		newComment.innerHTML += `<div class="comments__item-full">
            <h1 class="comments__item-subtitle">${shownComments[key].login}</h1>
			<div class="comments__item-descr">${shownComments[key].comment}</div>
			${(shownComments[key].isDeletable == true) ? '<input type="button" class="comments__delete" value="Удалить"></input>':''}
			</div>`;

	}
	document.body.insertBefore(newComment, form); //Добавляем перед формой
	shownComments = []; //Очищаем массив
}


async function areYouSure() {
	if (await confirm('Ты уверен?')) {
		deleteOldComments();
		const promise = new Promise((resolve) => {
			setTimeout(() => {
				resolve('Комментарий удалён');
			}, 100);
		});

		promise.then((value) => {
			alert(value);

		}).then(() => selectCommentsToShowAndRender());
	}
}

form.addEventListener('submit', (e) => { //Обрабатываем форму
	e.preventDefault();


	shownComments = [{
		login: document.getElementById('login').value,
		comment: document.getElementById('text_comment').value,
		isDeletable: checkCanDelete.checked
	}];
	form.reset();
	selectCommentsToShowAndRender();

	for (var i = 0; i < deleteButtonsArray.length; i++) {
		deleteButtonsArray[i].addEventListener('click', () => {
			areYouSure();
		});
	}
});