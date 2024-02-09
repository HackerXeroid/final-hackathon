import uniqid from "uniqid";

const tweetsContainer = document.querySelector(".tweet-comments-container");
const postButton = document.querySelector(".tweet-box__post-button");
const deleteModal = document.querySelector(".delete-modal");

const deleteModalPrimaryBtn = document.querySelector(
  ".delete-modal__button-primary"
);
const deleteModalSecondaryBtn = document.querySelector(
  ".delete-modal__button-secondary"
);

const deleteModalCloseBtn = document.querySelector(".delete-modal__close");

const rawPostTextarea = document.querySelector(".tweet-box__textarea");
const maxCharCount = document.querySelector(".tweet-box__max-character-count");
const currCharCount = document.querySelector(
  ".tweet-box__current-character-count"
);

let tweets = !localStorage.getItem("tweets")
  ? [
      {
        userName: "John Doe",
        userHandle: "@johndoe",
        isLiked: false,
        content: "This is my first tweet!",
        id: uniqid(),
        comments: [
          {
            commenterUserHandle: "@janedoe",
            content: "Great tweet!",
            isLiked: true,
            id: uniqid(),
          },
          {
            commenterUserHandle: "@anotheruser",
            content: "Nice tweet!",
            isLiked: false,
            id: uniqid(),
          },
        ],
      },
      {
        userName: "Jane Doe",
        userHandle: "@janedoe",
        isLiked: false,
        content: "Excited to be here!",
        id: uniqid(),
        comments: [
          {
            commenterUserHandle: "@johndoe",
            content: "Welcome!",
            isLiked: true,
            id: uniqid(),
          },
          {
            commenterUserHandle: "@anotheruser",
            content: "Hello!",
            isLiked: false,
            id: uniqid(),
          },
        ],
      },
      {
        userName: "Alice Smith",
        userHandle: "@alicesmith",
        isLiked: false,
        content: "Just finished a coding challenge!",
        id: uniqid(),
        comments: [
          {
            commenterUserHandle: "@bobsmith",
            content: "Congratulations!",
            isLiked: true,
            id: uniqid(),
          },
          {
            commenterUserHandle: "@anotheruser",
            content: "Well done!",
            isLiked: false,
            id: uniqid(),
          },
        ],
      },
    ]
  : JSON.parse(localStorage.getItem("tweets"));

const changeTweets = (newTweets) => {
  tweets = newTweets;
  localStorage.setItem("tweets", JSON.stringify(tweets));
};

const createTweet = (content) => {
  if (+currCharCount.textContent > +maxCharCount.textContent) return;
  const tweet = {
    userName: "Joanne Graham",
    userHandle: "@joannegraham123",
    isLiked: false,
    content: content.trim(),
    id: uniqid(),
    comments: [],
  };

  renderTweet(tweet);
  tweets.push(tweet);
  changeTweets(tweets);
};

const handleSubTweet = (e) => {
  const commentBox = e.target.closest(".tweet-add-sub-comment");
  if (!commentBox || !e.target.classList.contains("btn-primary")) return;

  const commentBoxTextarea = commentBox.querySelector(
    ".tweet-add-sub-comment__content"
  );

  const commentBoxParent = commentBox.closest(".tweet-comment-container");
  const id = commentBoxParent.dataset.id;
  if (commentBoxTextarea.value.length == 0) return;
  const subTweet = {
    commenterUserHandle: "@janedoe",
    content: commentBoxTextarea.value,
    isLiked: false,
    id: uniqid(),
  };
  commentBox.insertAdjacentHTML(
    "afterend",
    `<div class="tweet-sub-comment" data-id=${subTweet.id}>
<img src="imageavatar.png" alt="avatar" class="tweet-box__avatar" />
<div class="wrapper">
<div class="tweet-sub-comment__top">
<p class="tweet-sub-comment__username-handle">${
      subTweet.commenterUserHandle
    }</p>
<div class="tweet-sub-comment__top-buttons">
  <button class="tweet-sub-comment__edit">
    <i class="fa-regular fa-lg fa-pen-to-square"></i>
  </button>
  <button class="tweet-sub-comment__delete">
    <i stroke="red" class="fa-solid fa-lg fa-trash-can"></i>
  </button>
</div>
</div>
<textarea readonly class="tweet-sub-comment__content">${
      subTweet.content
    }</textarea>
<div class="tweet-sub-comment__bottom">
<button class="tweet-sub-comment__like">
  <i class="${subTweet.isLiked ? "fa-solid" : "fa-regular"} fa-xl fa-heart"></i>
</button>
</div>
<div class="tweet-sub-comment__bottom-secondary">
          <button class="btn-primary">Post</button>
          </div>
</div>
</div>`
  );
  commentBoxTextarea.value = "";
  commentBox.classList.add("hidden");
  const tweetObj = tweets.find((tweet) => tweet.id === id);
  tweetObj.comments.push(subTweet);
  changeTweets(tweets);
};

const showTweetEditTextarea = (e) => {
  const editBtn = e.target.closest(".tweet-comment__edit");
  if (!editBtn) return;
  const parent = e.target.closest(".tweet-comment");
  parent.classList.add("edit-mode");
  parent.querySelector(".tweet-comment__content").readOnly = false;
};

const handleTweetUpdate = (e) => {
  const updateBtn = e.target.closest(
    ".tweet-comment__bottom-secondary > .btn-primary"
  );
  if (!updateBtn) return;
  const parent = updateBtn.closest(".tweet-comment");
  parent.classList.remove("edit-mode");
  const textarea = parent.querySelector(".tweet-comment__content");
  textarea.readOnly = true;
  const id = parent.closest(".tweet-comment-container").dataset.id;
  tweets.find((tweet) => tweet.id === id).content = textarea.value;
  changeTweets(tweets);
};

const showSubTweetEditTextarea = (e) => {
  const editBtn = e.target.closest(".tweet-sub-comment__edit");
  if (!editBtn) return;
  const parent = e.target.closest(".tweet-sub-comment");
  parent.classList.add("edit-mode");
  parent.querySelector(".tweet-sub-comment__content").readOnly = false;
};

const handleSubTweetUpdate = (e) => {
  const updateBtn = e.target.closest(
    ".tweet-sub-comment__bottom-secondary > .btn-primary"
  );
  if (!updateBtn) return;
  const parent = updateBtn.closest(".tweet-sub-comment");
  parent.classList.remove("edit-mode");
  const textarea = parent.querySelector(".tweet-sub-comment__content");
  textarea.readOnly = true;
  const id = parent.dataset.id;
  tweets
    .flatMap((tweet) => tweet.comments)
    .find((subTweet) => subTweet.id === id).content = textarea.value;
  changeTweets(tweets);
};

const hideCreateSubTweetBox = (e) => {
  const parent = e.target.closest(".tweet-add-sub-comment");
  if (!parent) return;
  if (e.target.classList.contains("btn-secondary"))
    parent.classList.add("hidden");
};

const showCommentBox = (e) => {
  const commentBtn = e.target.closest(".tweet-comment__reply");
  if (!commentBtn) return;
  commentBtn
    .closest(".tweet-comment-container")
    .querySelector(".tweet-add-sub-comment")
    .classList.remove("hidden");
};

const showTweetModal = async (e) => {
  try {
    if (!e.target.closest(".tweet-comment__delete")) return;
    document.querySelector(".delete-modal__content").textContent =
      "Are you sure you want to permanently delete this Tweet ?";
    deleteModal.showModal();
    await new Promise((res, rej) => {
      deleteModalPrimaryBtn.addEventListener("click", res);
      deleteModalSecondaryBtn.addEventListener("click", rej);
      deleteModalCloseBtn.addEventListener("click", rej);
    });
    deleteTweet(e);
    closeModal();
  } catch {
    console.log("Code didn't execute");
  }
};

const showSubTweetModal = async (e) => {
  try {
    if (!e.target.closest(".tweet-sub-comment__delete")) return;
    document.querySelector(".delete-modal__content").textContent =
      "Are you sure you want to permanently delete this sub-tweet ?";

    deleteModal.showModal();
    await new Promise((res, rej) => {
      deleteModalPrimaryBtn.addEventListener("click", res);
      deleteModalSecondaryBtn.addEventListener("click", rej);
      deleteModalCloseBtn.addEventListener("click", rej);
    });
    deleteSubTweet(e);
    closeModal();
  } catch {
    console.log("Code didn't execute");
  }
};

const closeModal = () => {
  deleteModal.close();
};

const deleteTweet = (e) => {
  const tweetWrapper = e.target.closest(".tweet-comment-container");
  if (!tweetWrapper) return;

  const id = tweetWrapper.dataset.id;
  const newTweets = tweets.filter((tweet) => tweet.id !== id);
  changeTweets(newTweets);
  tweetWrapper.remove();
};

const deleteSubTweet = (e) => {
  const subTweetEl = e.target.closest(".tweet-sub-comment");
  if (!subTweetEl) return;

  const subTweetId = subTweetEl.dataset.id;

  tweets.forEach((tweet) => {
    tweet.comments = tweet.comments.filter(
      (subTweet) => subTweet.id !== subTweetId
    );
  });

  subTweetEl.remove();
  changeTweets(tweets);
};

const renderTweet = (tweet) => {
  const tweetHtml = `<div class="tweet-comment-container" data-id=${tweet.id}>
      <div class="tweet-comment">
        <img src="imageavatar.png" alt="avatar" class="tweet-box__avatar" />
        <div class="wrapper">
          <div class="tweet-comment__top">
            <p class="tweet-comment__username">${tweet.userName}</p>
            <p class="tweet-comment__username-handle">${tweet.userHandle}</p>
            <div class="tweet-comment__top-buttons">
              <button class="tweet-comment__edit">
                <i class="fa-regular fa-lg fa-pen-to-square"></i>
              </button>
              <button class="tweet-comment__delete">
                <i stroke="red" class="fa-solid fa-lg fa-trash-can"></i>
              </button>
            </div>
          </div>
          <textarea readonly class="tweet-comment__content">${
            tweet.content
          }</textarea>
          <div class="tweet-comment__bottom">
            <button class="tweet-comment__reply">
              <i class="fa-regular fa-xl fa-comment"></i>
            </button>
            <button class="tweet-comment__like">
              <i class="${
                tweet.isLiked ? "fa-solid" : "fa-regular"
              } fa-xl fa-heart"></i>
            </button>
          </div>
          <div class="tweet-comment__bottom-secondary">
          <button class="btn-primary">Post</button>
          </div>
        </div>
      </div>
      <div class="tweet-add-sub-comment hidden">
      <img src="imageavatar.png" alt="avatar" class="tweet-box__avatar" />
      <div class="wrapper">
      <textarea class="tweet-add-sub-comment__content" placeholder="Type your thoughts here..."></textarea>
      <div class="tweet-add-sub-comment__bottom">
      <button class="btn-secondary">Close</button>  
      <button class="btn-primary">Comment</button>
      </div>
      </div>
      </div>
      ${tweet.comments
        .map((comment) => {
          const subTweet = `<div class="tweet-sub-comment" data-id=${
            comment.id
          }>
    <img src="imageavatar.png" alt="avatar" class="tweet-box__avatar" />
    <div class="wrapper">
      <div class="tweet-sub-comment__top">
        <p class="tweet-sub-comment__username-handle">${
          comment.commenterUserHandle
        }</p>
        <div class="tweet-sub-comment__top-buttons">
          <button class="tweet-sub-comment__edit">
            <i class="fa-regular fa-lg fa-pen-to-square"></i>
          </button>
          <button class="tweet-sub-comment__delete">
            <i stroke="red" class="fa-solid fa-lg fa-trash-can"></i>
          </button>
        </div>
      </div>
      <textarea readonly class="tweet-sub-comment__content">${
        comment.content
      }</textarea>
      <div class="tweet-sub-comment__bottom">
        <button class="tweet-sub-comment__like">
          <i class="${
            comment.isLiked ? "fa-solid" : "fa-regular"
          } fa-xl fa-heart"></i>
        </button>
      </div>
      <div class="tweet-sub-comment__bottom-secondary">
          <button class="btn-primary">Post</button>
          </div>
    </div>
  </div>`;
          return subTweet;
        })
        .reverse()
        .join("")}
    </div>`;
  tweetsContainer.insertAdjacentHTML("afterbegin", tweetHtml);
};

const updateCharCount = (e) => {
  if (rawPostTextarea.value.length > 100) {
    currCharCount.classList.add("illegal");
  } else {
    currCharCount.classList.remove("illegal");
  }
  currCharCount.textContent = rawPostTextarea.value.length;
};

const toggleTweetLike = (e) => {
  const likeBtn = e.target.closest(".tweet-comment__like");
  if (!likeBtn) return;
  e.target.classList.toggle("fa-solid");
  e.target.classList.toggle("fa-regular");
  const tweetId = likeBtn.closest(".tweet-comment-container").dataset.id;
  const tweetObj = tweets.find((tweet) => tweet.id === tweetId);
  tweetObj.isLiked = !tweetObj.isLiked;
  changeTweets(tweets);
};

const toggleSubTweetLike = (e) => {
  const likeBtn = e.target.closest(".tweet-sub-comment__like");
  if (!likeBtn) return;
  e.target.classList.toggle("fa-solid");
  e.target.classList.toggle("fa-regular");
  const subTweetId = likeBtn.closest(".tweet-sub-comment").dataset.id;
  // const tweetObj = tweets.find((tweet) => tweet.id === tweetId);
  const subTweet = tweets
    .map((tweet) => tweet.comments)
    .flat(1)
    .find((subTweet) => subTweet.id === subTweetId);
  subTweet.isLiked = !subTweet.isLiked;
  changeTweets(tweets);
};

changeTweets(tweets);

tweets.forEach((tweet) => renderTweet(tweet));

deleteModalCloseBtn.addEventListener("click", closeModal);
deleteModalSecondaryBtn.addEventListener("click", closeModal);

postButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (rawPostTextarea.value.length === 0) return;
  createTweet(rawPostTextarea.value);
});

rawPostTextarea.addEventListener("input", updateCharCount);

document
  .querySelector(".tweet-comments-container")
  .addEventListener("click", showTweetModal);

document
  .querySelector(".tweet-comments-container")
  .addEventListener("click", showSubTweetModal);

document
  .querySelector(".tweet-comments-container")
  .addEventListener("click", toggleTweetLike);

document
  .querySelector(".tweet-comments-container")
  .addEventListener("click", toggleSubTweetLike);

document
  .querySelector(".tweet-comments-container")
  .addEventListener("click", showCommentBox);

document
  .querySelector(".tweet-comments-container")
  .addEventListener("click", handleSubTweet);

document
  .querySelector(".tweet-comments-container")
  .addEventListener("click", hideCreateSubTweetBox);

document
  .querySelector(".tweet-comments-container")
  .addEventListener("click", showTweetEditTextarea);

document
  .querySelector(".tweet-comments-container")
  .addEventListener("click", handleTweetUpdate);

document
  .querySelector(".tweet-comments-container")
  .addEventListener("click", showSubTweetEditTextarea);

document
  .querySelector(".tweet-comments-container")
  .addEventListener("click", handleSubTweetUpdate);
