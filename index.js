import { addComment, getAndRender } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";

let comments = [];

let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';

token = null;

function normalDate(date) {
    date = `${`${("0" + date.getDate()).slice(-2)}.${("0" + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear().toString().slice(-2)} ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`}`;
    return date;
}

const getComments = () => {
    return getAndRender({ token })
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
            renderApp();
        });

};

const appComments = document.getElementById('app-comments');

getComments();

const renderApp = () => {
    const appEl = document.getElementById('app');

    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${normalDate(comment.date)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${comment.isLiked}"></button>
            </div>
          </div>
        </li>`;
    })
        .join('');

    const appHtml = `
    <div class="container"> 

    <ul class="comments" id="comments">
      <!-- Комментарии рендерятся из JS -->
      ${commentsHtml}
    </ul>
    <p>Чтобы добавить комментарий, <a href="#" id="authorize-to-add" class="authorize-to-add">авторизуйтесь</a></p>
    <div class="add-form">
      <input id="input-name" disabled
        type="text"
        class="add-form-name"
        value="Твое имя"
      />
      <textarea id="input-comment"
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button id="button-form" class="add-form-button">Написать</button>
      </div>
    </div>
    </div>
    `;

    appComments.innerHTML = appHtml;

    const inputName = document.getElementById('input-name');
    const inputComment = document.getElementById('input-comment');
    const buttonForm = document.getElementById('button-form');
    const listElement = document.getElementById('comments');

    const form = document.querySelector('.add-form');

    form.classList.add('hidden');
    const authorizeToAdd = document.getElementById('authorize-to-add');
    authorizeToAdd.addEventListener('click', () => {
        appComments.classList.add('hidden');
        if (!token) {
            renderLoginComponent({
                appEl, setToken: (newToken) => {
                    token = newToken;
                },
                getComments,
            });
    
            return;
        }
    });

    likeTheComments();
    commentReply();

    buttonForm.addEventListener('click', (event) => {
        if (inputName.value === '' || inputComment.value === '') {
            return;
        }

        form.classList.add('hidden');

        const newComment = document.createElement('div');
        newComment.textContent = "Загружаю комментарий...";
        listElement.appendChild(newComment);

        addComment({
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
            token,
        })
            .then(() => {
                inputName.value = "";
                inputComment.value = "";
            })
            .then(() => {
                return getComments();
            })
            .then(() => {
                form.classList.remove('hidden');
                newComment.remove();
            })
    });
};

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
            renderApp();

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

renderApp();