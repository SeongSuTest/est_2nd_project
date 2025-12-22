export function renderHeader() {
  const header = document.querySelector("#header");

  header.innerHTML = `
    <h1 class="visually-hidden">ROUNZ</h1>
    <a class="rounz-main-logo" href="/"><img src="images/logo/rounz-logo.png" alt="라운즈 메인" /></a>
    <ul class="menu-tt">
      <li><button type="button" class="active">안경테</button></li>
      <li><button type="button">선글라스</button></li>
      <li><button type="button">베스트</button></li>
      <li><button type="button">브랜드</button></li>
      <li><button type="button">라운즈 ONLY</button></li>
      <li><button type="button">안경원</button></li>
      <li><button type="button">신상품</button></li>
      <li><button type="button">기획전</button></li>
      <li><button type="button">시리즈</button></li>
      <li><button type="button">라운즈소개</button></li>
      <li><button type="button">고객센터</button></li>
    </ul>
    <div class="header-actions">
      <button><img src="images/header/icon_header_search.png" height="16" alt="검색" /></button>
      <a href="/"><img src="images/header/icon_header_user.png" height="16" alt="마이페이지" /></a>
      <a class="cart-button" href="/"><img src="images/header/icon_header_cart.png" height="16" alt="장바구니" /></a>
      <button type="button" class="mobile-menu-button">
        <div class="header-menu-button">
          <img src="images/header/menu-rectangle.png" alt="" />
          <img src="images/header/menu-rectangle.png" alt="" />
          <img src="images/header/menu-rectangle.png" alt="" />
        </div>
        <div class="header-active-menu-button">
          <img src="images/header/close-rectangle-1.png" alt="" />
          <img src="images/header/close-rectangle-2.png" alt="" />
        </div>
      </button>
    </div>
    <div class="menu-child">
      <ul>
        <li><button>안경테 전체보기</button><img src="images/header/icon_arrow.png" alt="" /></li>
        <li><button>모양</button><img src="images/header/icon_arrow.png" alt="" /></li>
        <li><button>브랜드</button><img src="images/header/icon_arrow.png" alt="" /></li>
      </ul>
    </div>
  `;

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

  const menuBtn = document.querySelector(".mobile-menu-button");

  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    menuBtn.classList.toggle("active");
    header.classList.toggle("is-menu-open");
  });
}
