import { listElement, inputComment, inputName, form, newComment } from "./main.js";
import renderComments from "./renderComments.js";

let comments = [];

const getComments = () => {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/maksim-balyaev/comments',
        {
            method: 'GET'
        }
    ).then((response) => {
        return response.json();
    })
        .then((responseData) => {
            const date = new Date();
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                };
            });
            comments = appComments;
            renderComments(listElement);
        });
};

const postComments = () => {
    fetch(
        'https://wedev-api.sky.pro/api/v1/maksim-balyaev/comments',
        {
            method: 'POST',
            body: JSON.stringify({
                text: inputComment.value
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;"),
                name: inputName.value
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;"),
                forceError: false,
            }),
        })
        .then((responseData) => {
            if (responseData.status === 400) {
                throw new Error("Слишком короткий текст");
            } else if (responseData.status === 500) {
                throw new Error("Сервер упал");
            } else {
                return getComments();
            }
        })
        .then((responseData) => {
            form.classList.remove('hidden');
            inputName.value = "";
            inputComment.value = "";
            newComment.remove();
        })
        .catch((error) => {
            form.classList.remove('hidden');
            newComment.remove();
            if (error.message === "Слишком короткий текст") {
                alert("Имя и комментарий не должны быть короче 3х символов");
            } else if (error.message === "Сервер упал") {
                alert("Сервер сломался, попробуй позже");
            } else {
                alert("Проверьте подключение к интернету");
            }
            console.warn(error);
        })
}

export { getComments, postComments, comments };