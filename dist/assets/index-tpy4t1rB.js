(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const w of a.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&s(w)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();function E(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function T(e){if(e.__esModule)return e;var t=e.default;if(typeof t=="function"){var n=function s(){return this instanceof s?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(s){var o=Object.getOwnPropertyDescriptor(e,s);Object.defineProperty(n,s,o.get?o:{enumerable:!0,get:function(){return e[s]}})}),n}function O(e){throw new Error('Could not dynamically require "'+e+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var l={exports:{}};const C={},B=Object.freeze(Object.defineProperty({__proto__:null,default:C},Symbol.toStringTag,{value:"Module"})),j=T(B);var L=typeof process<"u"&&process.pid?process.pid.toString(36):"",S="";if(typeof __webpack_require__!="function"&&typeof O<"u"){var b="",h=j;if(h.networkInterfaces)var p=h.networkInterfaces();if(p){e:for(let e in p){const t=p[e],n=t.length;for(var d=0;d<n;d++)if(t[d]!==void 0&&t[d].mac&&t[d].mac!="00:00:00:00:00:00"){b=t[d].mac;break e}}S=b?parseInt(b.replace(/\:|\D+/gi,"")).toString(36):""}}l.exports=l.exports.default=function(e,t){return(e||"")+S+L+m().toString(36)+(t||"")};l.exports.process=function(e,t){return(e||"")+L+m().toString(36)+(t||"")};l.exports.time=function(e,t){return(e||"")+m().toString(36)+(t||"")};function m(){var e=Date.now(),t=m.last||e;return m.last=e>t?e:t+1}var P=l.exports;const c=E(P),H=document.querySelector(".tweet-comments-container"),$=document.querySelector(".tweet-box__post-button"),v=document.querySelector(".delete-modal"),k=document.querySelector(".delete-modal__button-primary"),g=document.querySelector(".delete-modal__button-secondary"),y=document.querySelector(".delete-modal__close"),u=document.querySelector(".tweet-box__textarea"),M=document.querySelector(".tweet-box__max-character-count"),f=document.querySelector(".tweet-box__current-character-count");let r=localStorage.getItem("tweets")?JSON.parse(localStorage.getItem("tweets")):[{userName:"John Doe",userHandle:"@johndoe",isLiked:!1,content:"This is my first tweet!",id:c(),comments:[{commenterUserHandle:"@janedoe",content:"Great tweet!",isLiked:!0,id:c()},{commenterUserHandle:"@anotheruser",content:"Nice tweet!",isLiked:!1,id:c()}]},{userName:"Jane Doe",userHandle:"@janedoe",isLiked:!1,content:"Excited to be here!",id:c(),comments:[{commenterUserHandle:"@johndoe",content:"Welcome!",isLiked:!0,id:c()},{commenterUserHandle:"@anotheruser",content:"Hello!",isLiked:!1,id:c()}]},{userName:"Alice Smith",userHandle:"@alicesmith",isLiked:!1,content:"Just finished a coding challenge!",id:c(),comments:[{commenterUserHandle:"@bobsmith",content:"Congratulations!",isLiked:!0,id:c()},{commenterUserHandle:"@anotheruser",content:"Well done!",isLiked:!1,id:c()}]}];const i=e=>{r=e,localStorage.setItem("tweets",JSON.stringify(r))},N=e=>{if(+f.textContent>+M.textContent)return;const t={userName:"Joanne Graham",userHandle:"@joannegraham123",isLiked:!1,content:e.trim(),id:c(),comments:[]};x(t),r.push(t),i(r)},U=e=>{const t=e.target.closest(".tweet-add-sub-comment");if(!t||!e.target.classList.contains("btn-primary"))return;const n=t.querySelector(".tweet-add-sub-comment__content"),o=t.closest(".tweet-comment-container").dataset.id;if(n.value.length==0)return;const a={commenterUserHandle:"@janedoe",content:n.value,isLiked:!1,id:c()};t.insertAdjacentHTML("afterend",`<div class="tweet-sub-comment" data-id=${a.id}>
<img src="imageavatar.png" alt="avatar" class="tweet-box__avatar" />
<div class="wrapper">
<div class="tweet-sub-comment__top">
<p class="tweet-sub-comment__username-handle">${a.commenterUserHandle}</p>
<div class="tweet-sub-comment__top-buttons">
  <button class="tweet-sub-comment__edit">
    <i class="fa-regular fa-lg fa-pen-to-square"></i>
  </button>
  <button class="tweet-sub-comment__delete">
    <i stroke="red" class="fa-solid fa-lg fa-trash-can"></i>
  </button>
</div>
</div>
<textarea readonly class="tweet-sub-comment__content">${a.content}</textarea>
<div class="tweet-sub-comment__bottom">
<button class="tweet-sub-comment__like">
  <i class="${a.isLiked?"fa-solid":"fa-regular"} fa-xl fa-heart"></i>
</button>
</div>
<div class="tweet-sub-comment__bottom-secondary">
          <button class="btn-primary">Post</button>
          </div>
</div>
</div>`),n.value="",t.classList.add("hidden"),r.find(q=>q.id===o).comments.push(a),i(r)},I=e=>{if(!e.target.closest(".tweet-comment__edit"))return;const n=e.target.closest(".tweet-comment");n.classList.add("edit-mode"),n.querySelector(".tweet-comment__content").readOnly=!1},D=e=>{const t=e.target.closest(".tweet-comment__bottom-secondary > .btn-primary");if(!t)return;const n=t.closest(".tweet-comment");n.classList.remove("edit-mode");const s=n.querySelector(".tweet-comment__content");s.readOnly=!0;const o=n.closest(".tweet-comment-container").dataset.id;r.find(a=>a.id===o).content=s.value,i(r)},A=e=>{if(!e.target.closest(".tweet-sub-comment__edit"))return;const n=e.target.closest(".tweet-sub-comment");n.classList.add("edit-mode"),n.querySelector(".tweet-sub-comment__content").readOnly=!1},J=e=>{const t=e.target.closest(".tweet-sub-comment__bottom-secondary > .btn-primary");if(!t)return;const n=t.closest(".tweet-sub-comment");n.classList.remove("edit-mode");const s=n.querySelector(".tweet-sub-comment__content");s.readOnly=!0;const o=n.dataset.id;r.flatMap(a=>a.comments).find(a=>a.id===o).content=s.value,i(r)},R=e=>{const t=e.target.closest(".tweet-add-sub-comment");t&&e.target.classList.contains("btn-secondary")&&t.classList.add("hidden")},W=e=>{const t=e.target.closest(".tweet-comment__reply");t&&t.closest(".tweet-comment-container").querySelector(".tweet-add-sub-comment").classList.remove("hidden")},F=async e=>{try{if(!e.target.closest(".tweet-comment__delete"))return;document.querySelector(".delete-modal__content").textContent="Are you sure you want to permanently delete this Tweet ?",v.showModal(),await new Promise((t,n)=>{k.addEventListener("click",t),g.addEventListener("click",n),y.addEventListener("click",n)}),z(e),_()}catch{console.log("Code didn't execute")}},G=async e=>{try{if(!e.target.closest(".tweet-sub-comment__delete"))return;document.querySelector(".delete-modal__content").textContent="Are you sure you want to permanently delete this sub-tweet ?",v.showModal(),await new Promise((t,n)=>{k.addEventListener("click",t),g.addEventListener("click",n),y.addEventListener("click",n)}),K(e),_()}catch{console.log("Code didn't execute")}},_=()=>{v.close()},z=e=>{const t=e.target.closest(".tweet-comment-container");if(!t)return;const n=t.dataset.id,s=r.filter(o=>o.id!==n);i(s),t.remove()},K=e=>{const t=e.target.closest(".tweet-sub-comment");if(!t)return;const n=t.dataset.id;r.forEach(s=>{s.comments=s.comments.filter(o=>o.id!==n)}),t.remove(),i(r)},x=e=>{const t=`<div class="tweet-comment-container" data-id=${e.id}>
      <div class="tweet-comment">
        <img src="imageavatar.png" alt="avatar" class="tweet-box__avatar" />
        <div class="wrapper">
          <div class="tweet-comment__top">
            <p class="tweet-comment__username">${e.userName}</p>
            <p class="tweet-comment__username-handle">${e.userHandle}</p>
            <div class="tweet-comment__top-buttons">
              <button class="tweet-comment__edit">
                <i class="fa-regular fa-lg fa-pen-to-square"></i>
              </button>
              <button class="tweet-comment__delete">
                <i stroke="red" class="fa-solid fa-lg fa-trash-can"></i>
              </button>
            </div>
          </div>
          <textarea readonly class="tweet-comment__content">${e.content}</textarea>
          <div class="tweet-comment__bottom">
            <button class="tweet-comment__reply">
              <i class="fa-regular fa-xl fa-comment"></i>
            </button>
            <button class="tweet-comment__like">
              <i class="${e.isLiked?"fa-solid":"fa-regular"} fa-xl fa-heart"></i>
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
      ${e.comments.map(n=>`<div class="tweet-sub-comment" data-id=${n.id}>
    <img src="imageavatar.png" alt="avatar" class="tweet-box__avatar" />
    <div class="wrapper">
      <div class="tweet-sub-comment__top">
        <p class="tweet-sub-comment__username-handle">${n.commenterUserHandle}</p>
        <div class="tweet-sub-comment__top-buttons">
          <button class="tweet-sub-comment__edit">
            <i class="fa-regular fa-lg fa-pen-to-square"></i>
          </button>
          <button class="tweet-sub-comment__delete">
            <i stroke="red" class="fa-solid fa-lg fa-trash-can"></i>
          </button>
        </div>
      </div>
      <textarea readonly class="tweet-sub-comment__content">${n.content}</textarea>
      <div class="tweet-sub-comment__bottom">
        <button class="tweet-sub-comment__like">
          <i class="${n.isLiked?"fa-solid":"fa-regular"} fa-xl fa-heart"></i>
        </button>
      </div>
      <div class="tweet-sub-comment__bottom-secondary">
          <button class="btn-primary">Post</button>
          </div>
    </div>
  </div>`).reverse().join("")}
    </div>`;H.insertAdjacentHTML("afterbegin",t)},Q=e=>{u.value.length>100?f.classList.add("illegal"):f.classList.remove("illegal"),f.textContent=u.value.length},V=e=>{const t=e.target.closest(".tweet-comment__like");if(!t)return;e.target.classList.toggle("fa-solid"),e.target.classList.toggle("fa-regular");const n=t.closest(".tweet-comment-container").dataset.id,s=r.find(o=>o.id===n);s.isLiked=!s.isLiked,i(r)},X=e=>{const t=e.target.closest(".tweet-sub-comment__like");if(!t)return;e.target.classList.toggle("fa-solid"),e.target.classList.toggle("fa-regular");const n=t.closest(".tweet-sub-comment").dataset.id,s=r.map(o=>o.comments).flat(1).find(o=>o.id===n);s.isLiked=!s.isLiked,i(r)};i(r);r.forEach(e=>x(e));y.addEventListener("click",_);g.addEventListener("click",_);$.addEventListener("click",function(e){e.preventDefault(),u.value.length!==0&&N(u.value)});u.addEventListener("input",Q);document.querySelector(".tweet-comments-container").addEventListener("click",F);document.querySelector(".tweet-comments-container").addEventListener("click",G);document.querySelector(".tweet-comments-container").addEventListener("click",V);document.querySelector(".tweet-comments-container").addEventListener("click",X);document.querySelector(".tweet-comments-container").addEventListener("click",W);document.querySelector(".tweet-comments-container").addEventListener("click",U);document.querySelector(".tweet-comments-container").addEventListener("click",R);document.querySelector(".tweet-comments-container").addEventListener("click",I);document.querySelector(".tweet-comments-container").addEventListener("click",D);document.querySelector(".tweet-comments-container").addEventListener("click",A);document.querySelector(".tweet-comments-container").addEventListener("click",J);
