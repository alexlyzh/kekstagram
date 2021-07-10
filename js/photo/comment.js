const COMMENTS_RENDER_STEP = 5;

const createCommentHTML = ({avatar, name, message}, index) => `
      <li class="social__comment${index > (COMMENTS_RENDER_STEP - 1) ? ' hidden' : ''}">
          <img
              class="social__picture"
              src="${avatar}"
              alt="${name}"
              width="35" height="35">
          <p class="social__text">${message}</p>
      </li>`;

const renderComments = (comments, container) => {
  const commentsHTML = comments.reduce((html, comment, i) => html += createCommentHTML(comment, i),'');
  container.insertAdjacentHTML('afterbegin', commentsHTML);
  container.dataset.renderedComments = Math.min(comments.length, COMMENTS_RENDER_STEP);
};

export {renderComments, COMMENTS_RENDER_STEP};
