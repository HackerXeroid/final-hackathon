"use strict";
import uniqid from "uniqid";

const feeds = [
  {
    content:
      "Inventore ducimus voluptas voluptatum id. Qui nihil cupiditate enim officia enim temporibus pariatur",
    comments: [],
    id: uniqid(),
  },
];

const feedsSection = document.querySelector(".feeds-section");

const updateLetters = () => {
  const textarea = document.querySelector(
    ".tweet-container__tweet-description"
  );

  const letterCountEl = document.querySelector(
    ".tweet-container__post-tweet-letter-count--letters"
  );

  const letterCount = +letterCountEl.value;

  const maxLetterCountEl = document.querySelector(
    ".tweet-container__post-tweet-letter-count--total-letters"
  );

  const maxLetterCount = +maxLetterCountEl.value;

  if (letterCount > maxLetterCount || !textarea.value) return;
  letterCountEl.textContent = textarea.value.length;
};

const commentTemplate = `<div class="sub-feed-container" style="position: relative">
<div class="sub-feed">
  <div class="sub-feed__top">
    <div class="flex">
      <h4 class="feed-sub-heading">@joannegraham123</h4>
    </div>
    <div class="flex">
      <button class="edit">
        <img
          src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/028/original/edit.png?1706888661"
          alt="edit button"
        />
      </button>
      <button class="delete">
        <img
          src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/027/original/delete.png?1706888643"
          alt="delete button"
        />
      </button>
    </div>
  </div>
  <div class="sub-feed__content">comment to the tweet</div>
  <div class="sub-feed__bottom">
    <button class="like" style="position: absolute; bottom: 0">
      <img
        src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/029/original/heart.png?1706888679"
        alt="like image"
      />
    </button>
  </div>
</div>
</div>`;

const postTemplate = `<div class="feed-container" style="position: relative">
<div class="feed">
  <div class="feed__avatar">
    <img
      src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/031/original/profile_image.png?1706888739"
      alt="avatar"
    />
  </div>
  <div class="feed__content">
    <div class="feed__top-bar">
      <div class="flex">
        <h3 class="feed-heading">Joanne Graham</h3>
        <h4 class="feed-sub-heading">@joannegraham123</h4>
      </div>
      <div class="flex">
        <button class="edit">
          <img
            src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/028/original/edit.png?1706888661"
            alt="edit button"
          />
        </button>
        <button class="delete">
          <img
            src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/027/original/delete.png?1706888643"
            alt="delete button"
          />
        </button>
      </div>
    </div>
    <p class="feed__text">
      Inventore ducimus voluptas voluptatum id. Qui nihil cupiditate enim
      officia enim temporibus pariatur
    </p>
    <div class="feed__bottom-bar">
      <button class="message">
        <img
          src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/026/original/comment.png?1706888619"
          alt="message image"
        />
      </button>
      <button class="like">
        <img
          src="https://d2beiqkhq929f0.cloudfront.net/public_assets/assets/000/064/029/original/heart.png?1706888679"
          alt="like image"
        />
      </button>
    </div>
  </div>
</div>`;

const postTweet = () => {
  const textarea = document.querySelector(
    ".tweet-container__tweet-description"
  );

  const letterCount = +document.querySelector(
    ".tweet-container__post-tweet-letter-count--letters"
  ).textContent;

  const maxLetterCount = +document.querySelector(
    ".tweet-container__post-tweet-letter-count--total-letters"
  ).textContent;

  if (letterCount > maxLetterCount || !textarea.value) return;
  textarea.value;
};

const editTweet = (e) => {
  if (!e.target) return;
  const parent = e.target.closest(".feed__content");
  if (!parent) return;
  parent.querySelector(".feed-text").editable = true;
};

const deleteTweet = (e) => {
  if (!e.target) return;
  const feedContainer = e.target.closest(".feed-container");
  if (!feedContainer) return;
  feedContainer.remove();
};

const deleteComment = () => {};

const editComment = () => {};

document
  .querySelector(".tweet-container__tweet-description")
  .addEventListener("keydown", updateLetters);

document
  .querySelectorAll(".edit")
  .forEach((editBtn) => editBtn.addEventListener("click", editTweet));
// document
//   .querySelectorAll(".like")
//   .forEach((likeBtn) =>
//     likeBtn.addEventListener("click", () => likeBtn.classList.toggle(".liked"))
//   );

// feedsSection.innerHTML = postTemplate;
document
  .querySelectorAll(".delete")
  .forEach((editBtn) => editBtn.addEventListener("click", deleteTweet));
