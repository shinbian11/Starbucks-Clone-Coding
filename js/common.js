// 공통적으로 사용되는 js



/* sub-menu 의 .search 의 focus event */

const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

// input tag 뿐만 아니라, input tag 의 부모 요소인 search 라는 class 명을 가지고 있는 div 태그를 눌러도 
// input tag 에 focus 효과를 주면서,
// 동일한 결과( main.css의 header .sub-menu .search input:focus { } 효과 참고! ) 를 보여준다.

searchEl.addEventListener('click', function () {
    searchInputEl.focus();
})

/* focus event */
searchInputEl.addEventListener('focus', function () {
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder', '통합검색');
});

/* focus(마우스로 선택되어 깜박임) event 의 반대 개념 : blur(focus 해제) event */
searchInputEl.addEventListener('blur', function () {
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', '');
});


// 올해 년도 출력 (.this-year에 적용)
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 올해 년도가 .this-year의 text로 저장