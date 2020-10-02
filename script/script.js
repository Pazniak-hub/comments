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
    //! я переименовал переменную, потому что там внутри не новый комментарий, а то, куда мы выводим все комментарии
    commentsContainer = document.createElement('div'),
    form = document.querySelector('form'),
    //  "The const keyword creates a read-only reference to a value.
    //  By convention, the constant identifiers are in uppercase."
    COMMENTS_TO_BE_SHOWN = 3,
    NOTIFICATION_SHOWN_TIMEOUT = 1 * 1000

let shownComments = []; //  Массив комментариев для отображения

/**
 Заполняет и выводит массив комментариев для показа
 */

//!  просто пример красивого синтаксиса (пользуйся, это современно!)
//!  объявляем переменную, значение которой приравниваем к функции.
//!  делает точно, что и
//!  function selectCommentsToShowAndRender () {
//!  но типа свежий синтаксис и исключение слова "function"
const selectCommentsToShowAndRender = () => {
    while (shownComments.length <= COMMENTS_TO_BE_SHOWN) {
        //! после слешей комментария ебаш одну табуляцию, чтобы коммент читался
        //  Великий рандомный идентификатор
        let b = Math.floor(Math.random() * commentsArray.length);

        //  Элементы должны быть уникальными
        if (!shownComments.includes(commentsArray[b])) {
            shownComments.push(commentsArray[b]);
        }
    }
    deleteOldComments();
    renderNewComments();
}

/**
 Удаляет отображённые комментарии
 */
function deleteOldComments() {
    //! мы используем это (раньше было "comments") только в одном месте, поэтому я убрал это из общего scope и перенёс сюда
    const commentsElements = commentsContainer.getElementsByClassName('comments__item-full');
    while (commentsElements[0]) {
        commentsElements[0].remove();
    }
}

/*
  Отображает массив комментариев на странице
 */
function renderNewComments() {
    //!  я тут заменил "key" на "i", потому что "ключ" это про объекты, а итераторы обычно однобуквенные, типа i, k, x и так далее
    for (let i = 0; i < shownComments.length; i++) {
        //!  так просто удобно всегда, когда перебираешь массив элементов, сразу обозначить текущий элемент
        const currentComment = shownComments[i];
        //!  делаем всё то же самое
        commentsContainer.innerHTML += `<div class="comments__item-full">
            <h1 class="comments__item-subtitle">${currentComment.login}</h1>
			<div class="comments__item-description">${currentComment.comment}</div>
            ${
            //!  тут расскажи мне, что изменилось в условии
            (currentComment.isDeletable === true) ? '<input type="button" class="comments__delete" value="Удалить" />' : ''}
			</div>`;

    }
    document.body.insertBefore(commentsContainer, form);
    shownComments = [];
}

//! тут снова я со своим красивым синтаксисом, просто место удобное показать, куда async засунется :)
//! у тебя было
//! async function areYouSure() {
//! это точно то же, что и
//! const areYouSure = async () => {
const areYouSure = async () => {
    //! удобно, когда результат выполнения асинхронной функции в переменной
    const actionConfirmed = await confirm('Ты уверен?');
    //! а дальше ты работаешь с результатом, как и раньше
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
            //! возьми за правило: написал then(), напиши сразу .catch() и хотя бы минимальный
            //! чтобы ошибки из промисов не пропадали, а логировались
        ).catch((error) => {
            console.error('Ой, что-то сломалось во время подтверждения удаления', error);
        });
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    //  Добавляем комментарий из формы первым элемент массива
    shownComments = [{
        login: document.getElementById('login').value,
        comment: document.getElementById('text_comment').value,
        //! я убрал этот селектор из общего скоупа и поставил сюда, он только здесь используется
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
        //!  так просто удобно всегда, когда перебираешь массив элементов, сразу обозначить текущий элемент
        const deleteButton = deleteButtonsArray[i];
        //!  посмотри, как я заменил твою привязку функции в след строке на вот эту и расскажи мне, чем отличаются эти варианты
        deleteButton.addEventListener('click', areYouSure);
    }
}

//! правило хорошего тона (+какой-то lint подсветит как ошибку):
//!  функция, к которой ты обращаешь, должна быть объявлена выше по коду
//!  то есть типа сперва объявляешь, потом вызываешь
//!  поэтому я перенёс это в конец
document.body.onload = selectCommentsToShowAndRender;