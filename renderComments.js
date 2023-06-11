import { comments } from "./api.js"; 
import { commentReply, likeTheComments, normalDate } from "./main.js";

const renderComments = (element) => {
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

    element.innerHTML = commentsHtml;

    likeTheComments();
    commentReply();
};

export default renderComments;