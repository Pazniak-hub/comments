'use strict';
//Отслеживаем загрузку
document.body.onload = addComments;

//Массив комментариев
const comments = [
	{ login: 'Alex', comment: 'Что хотел сказать автор?' },
	{ login: 'Leo', comment: 'Блять' },
	{ login: 'Garry', comment: 'Ахахаха' },
	{ login: 'Dovlatov', comment: 'И был таков' },
	{ login: 'Sasha', comment: 'Ашчушчэния не те' },
];

/**
 * Функция, которая прогоняет элементы массива
 */
function addComments () {
	let showncomments = []; //Второй массив

	for (let i = 0; i <= comments.length + 1; i++) {
		let b = Math.floor(Math.random() * comments.length);//Великий рандомный идентификатор
		if (showncomments.includes(comments[b]) || showncomments.length >= 3) {//Элементы не должны повторяться, не более 3-х комментариев на странице
			continue;

		}
		else {
			showncomments.push(comments[b]);//Добавляем уникальный элемент
			render(showncomments, showncomments.length - 1);//Размещаем на странице
		}
	}
}

/**
 * Функция, которая "отрисовывает комментарии"
 * @param {array} arr
 * @param {string} key
 */
function render (arr, key) {
	const newComment = document.createElement('div');

	//Вставляем элемент в файл
	newComment.innerHTML += `
            <h1 class="menu__item-subtitle">${arr[key].login}</h1>
            <div class="menu__item-descr">${arr[key].comment}</div>
            `;

	//Добавляем в конец таблицы
	document.body.append(newComment);
}
