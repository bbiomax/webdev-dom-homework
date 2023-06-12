import { getComments, postComments, comments } from "./api.js";
import renderComments from "./renderComments.js";

const inputName = document.getElementById('input-name');
const inputComment = document.getElementById('input-comment');
const buttonForm = document.getElementById('button-form');
const listElement = document.getElementById('comments');
const form = document.querySelector('.add-form');

function normalDate(date) {
    date = `${`${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear().toString().slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`}`;
    return date;
}

const likeTheComments = () => {
    const likeButtons = document.querySelectorAll('.like-button');
    const likesCounters = document.querySelectorAll('.likes-counter');

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();

            const index = likeButton.dataset.index;

            if (likeButton.classList.contains('-active-like')) {
                comments[index].isLiked = '';
                comments[index].likes = comments[index].likes - 1;
            } else {
                comments[index].isLiked = '-active-like';
                comments[index].likes = comments[index].likes + 1;
            }
            renderComments(listElement);

        });
    }
};

const commentReply = () => {
    const comments = document.querySelectorAll('.comment');
    for (const comment of comments) {
        comment.addEventListener('click', (event) => {
            const userName = comment.querySelector('.comment-header div:first-child').textContent;
            const userAnswer = comment.querySelector('.comment-text').textContent;
            inputComment.value = `>${userName} \n\n ${userAnswer}`;
        });
    }
}

renderComments(listElement);

buttonForm.addEventListener('click', (event) => {
    if (inputName.value === '' || inputComment.value === '') {
        return;
    }

    form.classList.add('hidden');

    const newComment = document.createElement('div');
    newComment.textContent = "Загружаю комментарий...";
    listElement.appendChild(newComment);

    postComments();
});

listElement.innerHTML = "Подождите, каментарии загружаются..."

getComments();

export { likeTheComments, commentReply, normalDate, listElement };