'use strict';
//  Предустановленные комментарии
const commentsArray = [{
            login: 'Alex',
            comment: 'Что хотел сказать автор?',
            date: 'May 17, 2020',
            isDeletable: false,
        },
        {
            login: 'Leo',
            comment: 'Блять',
            date: 'March 22, 2020',
            isDeletable: false,
        },
        {
            login: 'Garry',
            comment: 'Ахахаха',
            date: 'March 8, 2020',
            isDeletable: false,
        },
        {
            login: 'Dovlatov',
            comment: 'И был таков',
            date: 'August 18, 2020',
            isDeletable: false,
        },
        {
            login: 'Sasha',
            comment: 'Ашчушчэния не те',
            date: 'August 9, 2020',
            isDeletable: false,
        },
        {
            login: 'Yulia',
            comment: 'Вот и всё, девочки',
            date: 'October 11, 2020',
            isDeletable: false,
        },
        {
            login: '007',
            comment: 'Бонд, Джейм Бонд',
            date: 'July 7, 2007',
            isDeletable: false,
        },
        {
            login: 'D.VA',
            comment: 'Попробуй-ка занерфить!',
            date: 'February 8, 2020',
            isDeletable: false,
        },
        {
            login: 'Stigmata',
            comment: 'Сентябрь горит!',
            date: 'June 24, 2020',
            isDeletable: false,
        },
        {
            login: 'Thunderbug',
            comment: 'Go Bolts!',
            date: 'June 26, 2020',
            isDeletable: false,
        },
    ],
    commentsContainer = document.createElement('div'),
    form = document.querySelector('form'),
    commentsElements = commentsContainer.getElementsByClassName('comments__item-full'),

    COMMENTS_TO_BE_SHOWN = 3,
    NOTIFICATION_SHOWN_TIMEOUT = 5 * 1000;

let shownComments = []; //  Массив комментариев для отображения
/**
 Заполняет, сортирует и выводит массив комментариев для показа
 */
const selectCommentsToShowAndRender = () => {
    while (shownComments.length <= COMMENTS_TO_BE_SHOWN - 1) {
        //  Великий рандомный идентификатор
        let b = Math.floor(Math.random() * commentsArray.length);

        //  Элементы должны быть уникальными
        if (!shownComments.includes(commentsArray[b])) {
            shownComments.push(commentsArray[b]);
        }
    }
    shownComments.sort(function (a, b) {//Сортируем массив от позднего к раннему
        return  new Date(b.date) - new Date(a.date);
    });

    deleteOldComments();
    renderNewComments();
};

/**
 Удаляет отображённые комментарии
 */
const deleteOldComments = () => {
    while (commentsElements[0]) {
        commentsElements[0].remove();
    }
};

/*
  Отображает массив комментариев на странице
 */
const renderNewComments = () => {
    for (let i = 0; i < shownComments.length; i++) {
        const currentComment = shownComments[i];
        commentsContainer.innerHTML += `<div class="comments__item-full">
            <h1 class="comments__item-subtitle">${currentComment.login}</h1>
            <h1 class="comments__item-date">${currentComment.date}</h1>
			<div>${currentComment.comment}</div>
			${
				(currentComment.isDeletable === true) ? '<input type="button" class="comments__delete" value="Удалить" />' : ''}
			</div>`;

    }
    document.body.insertBefore(commentsContainer, form);
    shownComments = [];
};
/**
 *  Вызывает и обрабатывает confirm 
 */
const areYouSure = async () => {
    const actionConfirmed = await confirm('Ты уверен?');
    if (actionConfirmed) {

        commentsElements[0].insertAdjacentHTML('beforeend',`<div>
        <div>Комментарий будет удалён через <span id="time">5</span>...</div>
        <input type="button" class="comments__delete" id="cancelutton" value="Отмена" />
        `);  
       let  display = document.querySelector('#time');
        
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve('Комментарий удалён');
            }, NOTIFICATION_SHOWN_TIMEOUT);
        });

        promise.then(
            clockUpdate(NOTIFICATION_SHOWN_TIMEOUT/1000,display)

        ).then(
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
/**
 *  Форматируем дату
 */
const formatDate = (d) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
};

/**
 *  Обновляем таймер
 */
const clockUpdate = (duration, display) => {
        let timer = duration, seconds;
        setInterval(function () {
            seconds = parseInt(timer % 60, 10);
    
            display.textContent = seconds;
            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
       
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    shownComments = [{
        login: document.getElementById('login').value,
        comment: document.getElementById('text_comment').value,
        date: formatDate(new Date()),
        isDeletable: document.getElementById('can_delete').checked
    }];
    form.reset();
    //  Дозаполняем массив комментариев и отображаем
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