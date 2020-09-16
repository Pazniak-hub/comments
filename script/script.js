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
showncomments = [],
commentsToBeShown = 3;//Количество показываемых комментариев
 //Второй массив
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
function render () {
	const newComment = document.createElement('div');
	//Вставляем элемент в файл
	for (let key = 0; key < showncomments.length; key++) {
	newComment.innerHTML += `
            <h1 class="menu__item-subtitle">${showncomments[key].login}</h1>
            <div class="menu__item-descr">${showncomments[key].comment}</div>
			`;	
	//Добавляем в конец таблицы
	}
	document.body.append(newComment);
    }

