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
],
showncomments = [], //Второй массив
newComment = document.createElement('div'),
commentsToBeShown = 3,//Количество показываемых комментариев
form = document.querySelector('form'),//Форма
loginField = document.getElementById('text'),//Поле логина
commentField = document.getElementById('text_comment');//Поле комментария



/**
 * Функция, которая прогоняет элементы массива
 */
function addComments () {
	while (showncomments.length !== commentsToBeShown){
		let b = Math.floor(Math.random() * comments.length);//Великий рандомный идентификатор
		
		if (!showncomments.includes(comments[b])) {//Элементы не должны повторяться
			showncomments.push(comments[b]);//Добавляем уникальный элемент
	}
	}
	render();//Размещаем на странице
}
/**
 * Функция, которая "отрисовывает комментарии"
 * @param {array} arr
 * @param {string} key
 */


function render () {//Вставляем элемент в файл
	for (let key = 0; key < showncomments.length; key++) {
	newComment.innerHTML += `
            <h1 class="menu__item-subtitle">${showncomments[key].login}</h1>
			<div class="menu__item-descr">${showncomments[key].comment}</div>
			`;	

	}
	document.body.insertBefore(newComment, form);//Добавляем пере формой
}

function updelete() {//Удаляем старые комментарии
	var logPage = document.getElementsByClassName('menu__item-subtitle'),
		comPage = document.getElementsByClassName('menu__item-descr');

	while(logPage[0] && comPage[0]) {
		logPage[0].remove();
		comPage[0].remove();
	}
}

form.addEventListener('submit', (e) => {//Обрабатываем форму
	e.preventDefault();

	let loginText = loginField.value,
		commentText = commentField.value;
	
	showncomments.length = 0;
	showncomments.push({login:`${loginText}`, comment:`${commentText}`});
	form.reset();
	
	updelete();
	addComments();
	
});	