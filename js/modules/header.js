export function renderHeader() {
  const header = document.querySelector("#header");

  header.innerHTML = `
    <div class="header-inner">
      <h1 class="logo">EZ-SHOP</h1>
      <button id="cartBtn">장바구니</button>
    </div>
  `;

  addToCart();
}

function addToCart() {
  const cartBtn = document.querySelector("#cartBtn");

  cartBtn.addEventListener("click", () => {
    alert("장바구니 버튼 클릭");
  });
}
