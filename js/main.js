import { renderHeader } from "./modules/header.js";
import { renderFooter } from "./modules/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});

/*  슬라이드  */
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 4000,
    pauseOnMouseEnter:true,
  },
  slidesPerView: 3,
  spaceBetween: 16,
  breakpoints: {
    320: {slidesPerView: 2},
    480: {slidesPerView: 3},
    640: {slidesPerView: 4},
  },
  
});

const slideWrap = document.querySelector('.slideItemsWrapper');
const slideItems = slideWrap.querySelector('.slideItems');

function createSlideItem(d){
  const price = d.price.toLocaleString();

  return `
  <li class="swiper-slide">
      <a href="#">
        <div class="thumb">
          <img src="${d.image}" alt="${d.title}">
        </div>
        <dl class="glassDesc">
          <dt class="desc-tt">${d.brand}</dt>
          <dd class="body-tt">${d.title}</dd>
          <dd>
            ${
              d.discountPercent > 0
                ? `<span class="h4-tt">${d.discountPercent}%</span>`
                : ``
            }
            <p class="h4-tt">${price}원</p>
          </dd>
        </dl>
      </a>
    </li>
  `;
}

fetch('/data/main-slide-item.json')
  .then(res=>{
    return res.json()
    .then(data=>{
      renderGlassSlide(data.mainProducts);
    });
  });