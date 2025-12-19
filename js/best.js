import { renderHeader } from "./modules/header.js";
import { renderFooter } from "./modules/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();

  const ul = document.querySelector("header ul");

  function updateMenuClass() {
    if (window.innerWidth >= 1200) {
      ul.classList.add("menu-tt");
      ul.classList.remove("mobileMenu-tt");
    } else {
      ul.classList.add("mobileMenu-tt");
      ul.classList.remove("menu-tt");
    }
  }
  updateMenuClass();
  window.addEventListener("resize", updateMenuClass);
  const menu = document.querySelector("header ul");

  menu.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;

    menu.querySelectorAll("button.active").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
  });

  const header = document.querySelector("header");
  const menuBtn = document.querySelector(".mobile-menu-button");

  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    menuBtn.classList.toggle("active");
    header.classList.toggle("is-menu-open");
  });
});
