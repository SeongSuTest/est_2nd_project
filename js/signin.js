import { renderHeader } from "./modules/header.js";
import { renderFooter } from "./modules/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});

const wrapper = document.querySelector('.wrapper');
const formList = wrapper.querySelector('.formList');
const termsList = wrapper.querySelector('.termsList');
const pw = formList.querySelector('#password');
const pwRules = formList.querySelectorAll('.pw-rule');
const pc = formList.querySelector('#passwordConfirm');
const pwHint = formList.querySelectorAll('.pwHint');
const smBtn = formList.querySelectorAll('dd .sm');
const check = formList.querySelector('dd .check');
const certify = formList.querySelector('dd .certify');
const agreeAll = termsList.querySelector('#agreeAll');
const agreeList = termsList.querySelectorAll('ul input');
// console.log(agreeList);



pw.addEventListener('input',()=>{
  pwRules.forEach(rule =>{
    rule.classList.add('error');
  });
});

pc.addEventListener('input',()=>{
  pwHint.forEach(hint =>{
    hint.classList.add('error');
  });
});

smBtn.forEach(sm => {
  sm.addEventListener('mouseenter',()=>{
    sm.style.background = '#0007b2';
    sm.style.color = '#fff';
  })
  sm.addEventListener('mouseleave',()=>{
    sm.style.background = '';
    sm.style.color = '#848484';
  })
});
check.addEventListener('click',()=>{
  const userIdInput = document.querySelector('#userId');
  if(userIdInput.value.trim() === ''){
    alert('아이디를 입력해주세요.');
  }else{
    alert('사용 가능한 아이디입니다.');
  }
});
certify.addEventListener('click',()=>{
  const userTelInput = document.querySelector('#tel');
  if(userTelInput.value.trim() === ''){
    alert('휴대전화 번호를 입력해주세요.');
  }else{
    alert('본인 인증이 완료되었습니다.');
  }
});

agreeAll.addEventListener('change',()=>{
  agreeList.forEach(item =>{
    item.checked = agreeAll.checked;
  });
});

