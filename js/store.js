// 전역 변수 선언 (let으로)
let directStores = [];
let partnerStores = [];
let sidoList = [];
let currentTab = 'direct';
let filteredStores = [];

// DOM 요소들
const storeTab = document.querySelectorAll('.store-ct-tab div');
const storeCotnents = document.querySelectorAll('.store-ct-list .store-content');
const storeSido = document.querySelector('#sido');
const storeSigungu = document.querySelector('#sigungu');
const prevBtn = document.querySelector('#store-prev');
const nextBtn = document.querySelector('#store-next');
const pagination = document.querySelector('#numbers');


const perPage = 12;
let currentPage = 1;
let totalPages = 0;
let rounzLensFilter = false;

const PARTNER_SIDO_LIST = ['대전광역시', '울산광역시'];
const DIRECT_SIDO_LIST = ['서울특별시', '경기도', '충청남도', '강원도', '경상북도', '인천광역시', '세종특별자치시'];

async function loadStores() {
  try {
    const res = await fetch('../data/store-info.json');
    if (!res.ok) throw new Error('데이터 로드 실패');
    const data = await res.json();

    directStores = data.directStores;
    partnerStores = data.partnerStores;
    sidoList = data.sidoList;


    initSidoOptions();//시/도 옵션 생성
    applyFilter();//시도,시군구 필터링 적용
  } catch (e) {
    console.log(e);
  } finally {
    //console.log('조회를 종료했습니다');
  }
}


// 시/도 셀렉트 옵션 생성
function initSidoOptions() {
  storeSido.innerHTML = '<option value="">전체 시/도</option>';

  let targetSidoList = [];

  // 탭에 따라 다른 시/도 목록 선택
  if (currentTab === 'partner') {
    targetSidoList = PARTNER_SIDO_LIST;
  } else {
    targetSidoList = DIRECT_SIDO_LIST;
  }

  // 선택된 시/도 목록만 옵션으로 추가
  targetSidoList.forEach(sido => {
    const opt = document.createElement('option');
    opt.value = sido;
    opt.textContent = sido;
    storeSido.appendChild(opt);
  });

  resetSigungu();
}

// 시/군/구 초기화 및 채우기
function resetSigungu() {
  storeSigungu.innerHTML = '<option value="">전체 시/군/구</option>';
}

storeSido.addEventListener('change', () => {
  const selectedSido = storeSido.value;
  const sidoObj = sidoList.find(s => s.sido === selectedSido);
  resetSigungu();

  //시/군/구 옵션 생성
  if (sidoObj && sidoObj.sigunguList) {
    const options = sidoObj.sigunguList
      .map(sg => `<option value="${sg.sigungu}">${sg.sigungu}</option>`)
      .join('');

    storeSigungu.insertAdjacentHTML('beforeend', options);

  }

  currentPage = 1;
  applyFilter();
});

storeSigungu.addEventListener('change', () => {
  currentPage = 1;
  applyFilter();
});

// 현재 탭 데이터 반환
function getCurrentData() {
  return currentTab === 'direct'
    ? directStores
    : partnerStores;
}

// 시도,시군구 필터링 적용
function applyFilter() {
  const data = getCurrentData();
  const sSido = storeSido.value;
  const sSigungu = storeSigungu.value;

  filteredStores = data.filter(d => {
    const matchSido = !sSido || d.sido === sSido;
    const matchSigungu = !sSigungu || d.sigungu === sSigungu;

    //탭이 파트너일때 라운즈렌즈 체크하면
    const matchRounzLens = currentTab === 'partner'
      ? (!rounzLensFilter || d.rounzLens === true)
      : true;
    return matchSido && matchSigungu && matchRounzLens;
  });

  renderStores();
}

//파트너 탭에 라운즈렌즈 check하면 data에서 라운즈렌즈 파트너 스토어만 보이게
const rounzLensCheckbox = document.querySelector('#rounzLens');
rounzLensCheckbox.addEventListener('change', function () {
  rounzLensFilter = this.checked;
  currentPage = 1;
  applyFilter();
});


// 실행중인 스토어 컨텐츠
function getCurrentStoreList() {
  const activeContent = document.querySelector('.store-content.active');
  return activeContent
    ? activeContent.querySelector('.store-list')
    : null;
}

// 매장 리스트 렌더링
function renderStores() {
  // 실행중인 store-list 값 저장
  const storeList = getCurrentStoreList();
  // 실행중인게 아니면 리턴
  if (!storeList) return;

  //
  const pagedData = paginate(filteredStores, currentPage);
  const allStoreHTML = pagedData.map(d => `
    <li>
      <figure class="store-list-img">
        <img src="${d.image}" alt="${d.name}">
      </figure>
      <div class="store-list-box">
        <div class="store-text">
          <div class="store-name">
            <h4 class="h4-tt">${d.name}</h4>
            ${d.rounzLens ? '<span class="rounz-lens-chip small-tt"><i class="icon-pb-lense"></i>라운즈렌즈</span>' : ''}
          </div>
          <p class="desc-tt">${d.easyRoad || ''}</p>
          <p class="road-tt">${d.roadAddress}</p>
          <a href="tel:${d.tel}" class="tel-tt">${d.tel}</a>
        </div>
        <div class="store-btn">
          <a href="tel:${d.tel}"><i class="icon-call"></i>전화걸기</a>
          <a href="${d.local}"><i class="icon-map"></i>지도보기</a>
        </div>
      </div>
    </li>
  `).join('');

  storeList.innerHTML = allStoreHTML;
  renderpaginate(filteredStores.length);
}

// 페이지네이션
function paginate(data, page) {
  const startIdx = (page - 1) * perPage;
  const endIdx = startIdx + perPage;
  return data.slice(startIdx, endIdx);
}

function renderpaginate(total) {
  const totalCount = total;
  const totalPages = Math.ceil(totalCount / perPage);
  let pagenationHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    pagenationHTML += `<button class="pageBtn ${i === currentPage ? 'active' : ''}">${i}</button>`;
  }

  pagination.innerHTML = pagenationHTML;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  const pageBtns = pagination.querySelectorAll('button');
  pageBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      currentPage = Number(e.target.innerText);
      renderStores();
    });
  });
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderStores();
  }
});

nextBtn.addEventListener('click', () => {
  const totalPages = Math.ceil(filteredStores.length / perPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderStores();
  }
});

// 탭 전환 이벤트 (시/도 셀렉트 재설정 추가)
storeTab.forEach((st, idx) => {
  st.addEventListener('click', e => {
    e.preventDefault();

    storeTab.forEach((st) => {
      st.classList.remove('active')
    });
    st.classList.add('active');

    storeCotnents.forEach((sc) => {
      sc.classList.remove('active')
    });
    storeCotnents[idx].classList.add('active');

    const storeFoot = document.querySelectorAll('.store-foot>div');
    storeFoot.forEach((sf) => {
      sf.classList.remove('active');
    });
    storeFoot[idx].classList.add('active');

    currentTab = idx === 0 ? 'direct' : 'partner';
    currentPage = 1;

    const rounzLnesCheck = document.querySelector('.label-checkbox');
    if (currentTab === 'partner') {
      rounzLnesCheck.classList.add('active');
    } else {
      rounzLnesCheck.classList.remove('active');
    }

    // 탭 변경 시 시/도 셀렉트 다시 초기화
    initSidoOptions();
    storeSigungu.value = ''; // 시/군/구도 초기화
    applyFilter();
  });
});



// 페이지 로드 시 실행
loadStores();

const slideWrapper = document.querySelector('.store-ct-slide-wrap');
const slideContainer = slideWrapper.querySelector('.store-ct-slide-container');
const slideContainerUl = slideWrapper.querySelector('.store-ct-slide-container ul');
const slides = slideContainer.querySelectorAll('li');
const slidePrevbtn = slideWrapper.querySelector('#foot-slide-prevbtn')
const slideNextbtn = slideWrapper.querySelector('#foot-slide-nextbtn')
const sldieBullets = slideWrapper.querySelector('#store-ct-bullet')
const footPager = slideWrapper.querySelector('#store-foot-pager')

const slideCount = slides.length;
let currentIdx = 0;
let slideTimer;

function slideLayout() {
  slideContainerUl.style.width = slideContainer.offsetWidth * slideCount + 'px';
}

//브라우저 사이즈 줄일 때 넓이 값 다시 계산
window.addEventListener('resize', () => {
  slideLayout();
});
slideLayout();


//페이지 버튼 생성
let footPagerHTML = '';
for (let i = 0; i < slideCount; i++) {
  footPagerHTML += `<a href="">${i}</a>`;
}
footPager.innerHTML = footPagerHTML;

//페이지 버튼 이동
const footPagerBtn = footPager.querySelectorAll('a');
footPagerBtn.forEach((pager, idx) => {
  pager.addEventListener('click', (e) => {
    e.preventDefault();
    moveSlide(idx);
    resetTimer();
  });
})

//슬라이드 idx 0부터 시작
moveSlide(0);


//자동 슬라이드 타이머
function startTimer() {
  slideTimer = setInterval(() => {
    let nextIdx = (currentIdx + 1) % slideCount;
    moveSlide(nextIdx);
  }, 4000);
}
// 자동 슬라이드 타이머 정지
function resetTimer() {
  clearInterval(slideTimer);
  startTimer();
}


//슬라이드 이동함수(이동, 페이저, 슬라이드 활성화)
function moveSlide(idx) {
  slideContainerUl.style.left = -idx * 100 + '%';
  currentIdx = idx;

  for (let fpb of footPagerBtn) {
    fpb.classList.remove('active');
  }
  footPagerBtn[idx].classList.add('active')
}


//이전, 다음 버튼 클릭 이벤트
slideNextbtn.addEventListener('click', () => {
  nextSlide();
});
slidePrevbtn.addEventListener('click', () => {
  pervSlide();
});

//왼쪽 키, 오른쪽 키 클릭
document.querySelector('.store-foot').addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    pervSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

//다음, 이전 슬라이드 함수
function nextSlide() {
  let nextIdx = (currentIdx + 1) % slideCount;
  moveSlide(nextIdx);
  resetTimer();
}
function pervSlide() {
  let prevIdx = (currentIdx - 1 + slideCount) % slideCount;
  moveSlide(prevIdx);
  resetTimer();
}

startTimer();

// 슬라이드에 마우스 올리면 setInterval 멈춤
slideWrapper.addEventListener('mouseenter', () => {
  clearInterval(slideTimer);
});
// 슬라이드에 마우스 떼면 setInterval 다시 시작
slideWrapper.addEventListener('mouseleave', () => {
  startTimer();
});



