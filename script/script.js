'use strict';
//  Предустановленные комментарии
const commentsArray = [
        {
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
    commentsContainer = document.createElement('div'),
    form = document.querySelector('form'),

    COMMENTS_TO_BE_SHOWN = 3,
    NOTIFICATION_SHOWN_TIMEOUT = 1 * 1000;

let shownComments = []; //  Массив комментариев для отображения

/**
 Заполняет и выводит массив комментариев для показа
 */

//!  просто пример красивого синтаксиса (пользуйся, это современно!)
const selectCommentsToShowAndRender = () => {
    while (shownComments.length <= COMMENTS_TO_BE_SHOWN - 1) {
        //  Великий рандомный идентификатор
        let b = Math.floor(Math.random() * commentsArray.length);

        //  Элементы должны быть уникальными
        if (!shownComments.includes(commentsArray[b])) {
            shownComments.push(commentsArray[b]);
        }
    }
    deleteOldComments();
    renderNewComments();
};

/**
 Удаляет отображённые комментарии
 */
function deleteOldComments() {

    const commentsElements = commentsContainer.getElementsByClassName('comments__item-full');
    while (commentsElements[0]) {
        commentsElements[0].remove();
    }
}

/*
  Отображает массив комментариев на странице
 */
function renderNewComments() {
    for (let i = 0; i < shownComments.length; i++) {
        const currentComment = shownComments[i];
        commentsContainer.innerHTML += `<div class="comments__item-full">
            <h1 class="comments__item-subtitle">${currentComment.login}</h1>
			<div class="comments__item-description">${currentComment.comment}</div>
			${
				(currentComment.isDeletable === true) ? '<input type="button" class="comments__delete" value="Удалить" />' : ''}
			</div>`;

    }
    document.body.insertBefore(commentsContainer, form);
    shownComments = [];
}


const areYouSure = async () => {
    const actionConfirmed = await confirm('Ты уверен?');
    if (actionConfirmed) {
        deleteOldComments();
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve('Комментарий удалён');
            }, NOTIFICATION_SHOWN_TIMEOUT);
        });

        promise.then(
            (value) => {
                alert(value);
            }
        ).then(
            selectCommentsToShowAndRender
        ).catch((error) => {
            console.error('Ой, что-то сломалось во время подтверждения удаления', error);
        });
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    shownComments = [{
        login: document.getElementById('login').value,
        comment: document.getElementById('text_comment').value,
        isDeletable: document.getElementById('can_delete').checked
    }];
    form.reset();
    //  дозаполняем массив комментариев и отображаем
    selectCommentsToShowAndRender();
    addRemoveListeners();
});

/**
 *  Добавляет функцию удаления на кнопки около комментариев
 */
const addRemoveListeners = () => {
    const deleteButtonsArray = commentsContainer.getElementsByClassName('comments__delete');

    for (let i = 0; i < deleteButtonsArray.length; i++) {
        const deleteButton = deleteButtonsArray[i];
        deleteButton.addEventListener('click', areYouSure);
    }
};

document.body.onload = selectCommentsToShowAndRender;