// js/modules/footer.js

export function renderFooter() {
  const footer = document.querySelector("#footer");

  footer.innerHTML = `
    <div class="footer-rounz">
      <a href="/">라운즈 플래그십 스토어</a>
      <a href="/">라운즈 파트너 안경원</a>
    </div>
    <div class="footer-info">
      <a href="/">고객센터</a>
      <a href="/">개인정보처리방침</a>
      <a href="/">이용약관</a>
      <a href="/">라운즈앱</a>
      <a href="/">라운즈 해외</a>
      <a href="/">라운즈 파트너스</a>
      <a href="/">글라스박스</a>
      <a href="/">가맹문의</a>
      <a href="/">사업자정보확인</a>
    </div>
    <div class="footer-business">
      <button>(주)라운즈 ROUNZ 사업자 정보</button>
      <img src="images/footer/icon_arrow_right.png" alt="" />
    </div>
    <div class="footer-icon">
      <a href="/"><img src="images/footer/btn_kcp 1.png" alt="" /></a>
      <a href="/"><img src="images/footer/bg_insta_gray 1.png" alt="" /></a>
      <a href="/"><img src="images/footer/bg_fb_gray 1.png" alt="" /></a>
      <a href="/"><img src="images/footer/bg_blog_gray 1.png" alt="" /></a>
    </div>
  `;
}
