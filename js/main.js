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
    480: {slidesPerView: 2},
    768: {slidesPerView: 3},
  },
});

const slideWrap = document.querySelector('.slideItemsWrapper');
const slideItems = slideWrap.querySelector('.slideItems');
const glassEl = document.querySelector('#glassList');
const sunglassEl = document.querySelector('#sunglassList');
const saleEl = document.querySelector('#saleList');

let listData = [];

fetch('/data/main-slide-item.json')
  .then(res=>res.json())
  .then(result=>{
    const products = result.mainProducts;
    console.log(result);

    renderList(
      products.filter(p => p.category === 'glass'),
      glassEl
    );
    renderList(
      products.filter(p => p.category === 'sunglass'),
      sunglassEl
    );
    renderList(
      products.filter(p => p.category === 'sale'),
      saleEl
    );
  })

function renderList(data, target){
  let HTML = '';

  data.forEach(p=>{
  const price = p.price.toLocaleString();

    HTML +=
    `<li class="swiper-slide">
      <a href="#">
        <div class="thumb">
          <img src="${p.image}" alt="${p.title}">
        </div>
        <dl class="glassDesc">
          <dt class="desc-tt">${p.brand}</dt>
          <dd class="body-tt">${p.title}</dd>
          <dd>
            ${
              p.discountPercent > 0
                ? `<span class="h4-tt">${p.discountPercent}%</span>`
                : ``
            }
            <p class="h4-tt">${price}원</p>
          </dd>
        </dl>
      </a>
    </li>`;
  });
  target.innerHTML = HTML;
}



  
  /* 슬라이드 끝 */