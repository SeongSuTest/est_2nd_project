import { renderHeader } from "./modules/header.js";
import { renderFooter } from "./modules/footer.js";

renderHeader();
renderFooter();

const storeTab = document.querySelectorAll('.store-ct-tab div');
const storeCotnents = document.querySelectorAll('.store-ct-list .store-content');
console.log(storeTab);
console.log(storeCotnents);

storeTab.forEach((st, idx) => {

  st.addEventListener('click', () => {
    for (let st of storeTab) {
      st.classList.remove('active')
    }
    st.classList.add('active');

    for(let sct of storeCotnents) {
      sct.classList.remove('active');
    }    
    storeCotnents[idx].classList.add('active');
  });

});


