import { renderHeader } from "./modules/header.js";
import { renderFooter } from "./modules/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();

  const state = {
    category: "all",
    shape: "all",
    collapsed: false,
  };

  const filterEl = document.querySelector(".filter");
  const filterToggleEl = document.querySelector(".filter-title"); // 없으면 .filter-title로 바꿔
  const categoryButtons = document.querySelectorAll(".filter-category .filter-button[data-category]");
  const shapeButtons = document.querySelectorAll(".filter-shape .filter-button[data-shape]");

  // 버튼에 selected 클래스 추가
  function setSelected(buttons, predicate) {
    buttons.forEach((btn) => {
      btn.classList.toggle("selected", predicate(btn));
    });
  }

  // 카테고리 버튼 클릭 => 상태 변경 + setSelected 함수 실행
  function onCategoryClick(e) {
    const btn = e.target.closest("button[data-category]");
    if (!btn) return;
    state.category = btn.dataset.category;
    setSelected(categoryButtons, (btn) => btn.dataset.category === state.category);
    setSelected(shapeButtons, (btn) => btn.dataset.shape === state.shape);
  }

  // 모양 버튼 클릭 => 상태 변경 + setSelected 함수 실행
  function onShapeClick(e) {
    const btn = e.target.closest("button[data-shape]");
    if (!btn) return;
    state.shape = btn.dataset.shape;
    setSelected(categoryButtons, (btn) => btn.dataset.category === state.category);
    setSelected(shapeButtons, (btn) => btn.dataset.shape === state.shape);
  }

  // 필터 열림,접힘상태 전환
  function toggleCollapsed() {
    state.collapsed = !state.collapsed;
    filterEl.classList.toggle("collapsed", state.collapsed);
  }

  document.querySelector(".filter-category")?.addEventListener("click", onCategoryClick);
  document.querySelector(".filter-shape")?.addEventListener("click", onShapeClick);

  filterEl?.addEventListener("click", (e) => {
    if (e.target.closest(".filter-category") || e.target.closest(".filter-shape")) return;
    toggleCollapsed();
  });
});
