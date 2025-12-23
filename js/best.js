import { renderHeader } from "./modules/header.js";
import { renderFooter } from "./modules/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();

  const state = {
    category: "all",
    shape: "all",
    collapsed: false,
    page: 1,
  };

  const filterEl = document.querySelector(".filter");
  const filterToggleEl = document.querySelector(".filter-title");
  const categoryButtons = document.querySelectorAll(".filter-category .filter-button[data-category]");
  const shapeButtons = document.querySelectorAll(".filter-shape .filter-button[data-shape]");
  const totalEl = document.querySelector(".total-item span");
  const itemsUl = document.querySelector(".best-items ul");
  const pageUl = document.querySelector(".page-button ul");

  const LIKE_ICON = "./images/best-item/icon/icon_heart_line.png";
  const PAGE_ITEM_COUNT = 18;

  let allProducts = [];

  init();

  async function init() {
    await loadData();
    bindEvents();
    render();
  }

  // 데이터 로드해서 allProducts 배열에 넣기
  async function loadData() {
    try {
      const res = await fetch("./data/best-item.json");
      if (!res.ok) throw new Error("데이터 로딩 실패");
      const data = await res.json();
      allProducts = data.bestProducts;
    } catch (e) {
      console.log(e);
    }
  }

  function bindEvents() {
    // 필터 토글 기능
    filterToggleEl.addEventListener("click", () => {
      state.collapsed = !state.collapsed;
      filterEl?.classList.toggle("collapsed", state.collapsed);
    });

    // 카테고리 버튼에 이벤트리스너 등록 (상태 변경 및 setSelected 추가 + 렌더)
    categoryButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.category = btn.dataset.category;
        state.page = 1;

        categoryButtons.forEach((btn) => {
          btn.classList.toggle("selected", btn.dataset.category === state.category);
        });

        render();
      });
    });

    // 모양 버튼에 이벤트리스너 등록 (상태 변경 및 setSelected 추가 + 렌더)
    shapeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        state.shape = btn.dataset.shape;
        state.page = 1;

        shapeButtons.forEach((btn) => {
          btn.classList.toggle("selected", btn.dataset.shape === state.shape);
        });

        render();
      });
    });
  }

  // state 값에 맞춰 필터링 된 데이터 반환
  function getFiltered() {
    return allProducts.filter((p) => {
      if (state.category !== "all" && p.category !== state.category) return false;
      if (state.shape !== "all" && p.type !== state.shape) return false;
      return true;
    });
  }

  // 페이지에 표시되는 아이템 수(18개)로 페이지수를 계산
  function getTotalPages(count) {
    return Math.max(1, Math.ceil(count / PAGE_ITEM_COUNT));
  }

  // 데이터를 받아 현재 페이지에 맞는 데이터만 반환
  function paginate(arr) {
    const start = (state.page - 1) * PAGE_ITEM_COUNT;
    return arr.slice(start, start + PAGE_ITEM_COUNT);
  }

  // 페이지 전체 재렌더링 함수
  function render() {
    const filtered = getFiltered();
    const totalPages = getTotalPages(filtered.length);

    // 총 상품 개수
    totalEl.textContent = filtered.length;

    // 리스트, 페이지네이션 버튼 렌더
    renderList(paginate(filtered));
    renderPagination(totalPages); // ✅ 여기서 pagination DOM이 매번 새로 생김
  }

  function renderList(list) {
    let listHTML = list.map((p) => {
      const discount = typeof p.discount === "number" ? p.discount : 0;
      const price = typeof p.price === "number" ? p.price : 0;
      const soldout = !!p.soldout;

      return `
          <li>
            <a href="./info.html">
              <div class="item-image">
                <img src="${p.image}" alt="${p.title}" width="254"/>
                <div class="like-button">
                  <img src="${LIKE_ICON}" alt="" />
                </div>
              </div>

              <div class="item-description">
                <p class="desc-tt item-brand">${p.brand}</p>
                <h3 class="body-tt">${p.title}</h3>
                ${soldout ? `<p class="h4-tt item-price">일시품절</p>` : `<p class="h4-tt item-price"><span>${discount}%</span>${Number(price).toLocaleString("ko-KR")}원</p>`}
              </div>
            </a>
            <a class="desc-tt best-store-button" href="./store.html">안경원에서 써보기</a>
          </li>
          
        `;
    });

    itemsUl.innerHTML = listHTML.join("");
  }

  function renderPagination(totalPages) {
    let html = "";

    html += `
      <li>
        <button type="button" data-action="prev" aria-label="이전 페이지" ${state.page === 1 ? "disabled" : ""}>
          ‹
        </button>
      </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
      html += `
        <li>
          <button type="button" data-page="${i}" class="${i === state.page ? "active" : ""}">
            ${i}
          </button>
        </li>
      `;
    }

    html += `
      <li>
        <button type="button" data-action="next" aria-label="다음 페이지" ${state.page === totalPages ? "disabled" : ""}>
          ›
        </button>
      </li>
    `;

    pageUl.innerHTML = html;
    const pageBtns = pageUl.querySelectorAll("button[data-page]");

    pageBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const page = Number(btn.dataset.page);
        if (!Number.isFinite(page)) return;

        state.page = page;
        render();
      });
    });
  }
});
