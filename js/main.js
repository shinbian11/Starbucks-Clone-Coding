
/* badge scroll event */

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// lodash cdn 사용
// throttle 사용! => scroll 함수를 한번에 우르르 실행되지않고, 300 밀리세컨드에 한번씩만 실행하도록!
// _.throttle(함수, 시간(ms)) 
// 참고) 1000ms == 1s(초)
window.addEventListener('scroll', _.throttle(function () {
    console.log(window.scrollY);
    if(window.scrollY > 500) {  // window.scrollY : 수직으로 스크롤이 얼마나 되었는지를 px 단위로 반환 => 수직으로 500px 보다 스크롤이 많이 내려가면? 배지 숨기기!
        // gsap cdn 사용
        // gsap.to(요소 (css 선택자만 입력해도 됨), 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
            // opacity : 0 => 시각적으로 badge 요소를 안 보이게 함
            // display : 'none' => 실제 창에서도 차지하는 공간을 없앰
            // opacity : 0 이 있어야 하는 이유 : 숫자형 값이 있어야 애니메이션이 '시작 -> 끝'으로 이동할 때 자연스럽게 연결되는 것을 볼 수 있음! 
            // 개발자 도구에서 실행해보면 opacity 값이 실시간으로 바뀌면서 애니메이션 효과가 나타남.
            opacity : 0,
            display : 'none' // 문자로 입력해야 하는 데이터(여기서는 none)는 따옴표로 감싸야 됨.
        }) //0.6초에 걸쳐서 천천히 사라짐

        // 상단으로 이동하는 버튼 보이기!
        gsap.to(toTopEl, .2, {
            x : 0 // 원래 있던 위치로 되돌리기
        });
    }
    else { // 배지 보여주기!
        gsap.to(badgeEl, .6, {
            opacity : 1,
            display : 'block'
        }) //0.6초에 걸쳐서 천천히 나타남

        // 상단으로 이동하는 버튼 숨기기!
        gsap.to(toTopEl, .2, {
            x : 100 // 원래 있던 위치에서 x축으로 100px 만큼 이동 (화면에서 사라짐)
        });
    }
}, 300));


// 상단으로 이동하는 버튼 기능
toTopEl.addEventListener('click', function() { 
    // 이벤트 핸들러 (Event Handler)
    gsap.to(window, .7, {
        scrollTo : 0 // 화면의 위치를 0px로 옮겨줌 (gsap의 ScrollToPlugin 라이브러리 필요)
    });
});


// .visual .fade-in -> animation 작업
// 창 새로고침 시 main 화면에 커피 그림들 하나하나씩 보여지는 애니메이션 효과
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
    gsap.to(fadeEl, 1, {
        delay : (index + 1) * .7, //요소들이 차례차례 0.7, 1.4, 2.1 ... 초 뒤에 animation 이 동작
        opacity : 1 // opacity가 0에서 1로 바뀌는 동작을 1초에 걸쳐 보여주는 animation
    })
});


// swiper : 공지사항 부분 수직 슬라이드 기능
// new Swiper(선택자, 옵션) : js 생성자
new Swiper('.notice-line .swiper', {
    direction : 'vertical',
    autoplay : true, // 자동으로 슬라이드 넘어가기 (자동 재생)
    loop : true // 반복 재생
});


// promotion slide : 프로모션(공지사항 밑) 부분 수평 슬라이드 기능
new Swiper('.promotion .swiper', {
    // direction : 'horizontal', // 기본값이 horizontal, 생략 가능
    slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
    spaceBetween : 10, // 슬라이드 사이 여백은 10px
    centeredSlides : true, // 1번 슬라이드가 가운데에 보이기
    autoplay : {
        delay : 5000, //5초에 1번씩 이미지 자동 슬라이드 (기본값은 3000 , 3초)
    },
    loop : true,
    pagination : {
        el : '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        clickable : true // 사용자의 페이지 번호 요소 제어 여부
    },
    navigation : {
        prevEl : '.promotion .swiper-prev', // 이전 슬라이드 보는 기능
        nextEl : '.promotion .swiper-next' // 다음 슬라이드 보는 기능
    }
});

// awards slide
new Swiper('.awards .swiper', {
    // direction : 'horizontal',
    autoplay : true,
    loop : true,
    spaceBetween : 30,
    slidesPerView : 5,
    navigation : {
        prevEl : '.awards .swiper-prev',
        nextEl : '.awards .swiper-next'
    }    
});

// promotion Toggle : 프로모션 창 접고 펼치는 기능
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
    isHidePromotion = !isHidePromotion;
    if(isHidePromotion){
        // 프로모션 숨김 처리
        promotionEl.classList.add('hide');
    } else {
        // 프로모션 보임 처리
        promotionEl.classList.remove('hide');
    }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// YOUTUBE VIDEO 위에 floating 하는 애니메이션 기능
function floatingObject(selector, delay, size) {
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(
        selector, // 요소 (선택자)
        random(1.5, 2.5),  // 지속 시간 (random 함수는 위에 정의한 함수)
        { // 옵션
            y : size, //위 아래로 움직이는 크기 (px) : size px 만큼 위아래로 움직이겠다는 의미
            repeat : -1, // 무한반복 (-1 은 gsap 라이브러리에서 정한 것)
            yoyo : true, //요요처럼 내려갔다 올라오는 애니메이션
            ease : Power1.easeInOut,
            delay : random(0, delay)
        }
    );
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


// scrollMagic

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
    new ScrollMagic
        .Scene({
            triggerElement : spyEl, // 보여짐 여부를 감시할 요소를 지정
            triggerHook : .8 // 화면 높이의 80%를 넘어서는 순간 뒤에 정의되어 있는 함수들(setClassToggle, addTo)이 줄줄이 실행됨
        })
        .setClassToggle(spyEl, 'show') // spyEl 요소에 show라는 class가 toggle됨
        .addTo(new ScrollMagic.Controller());
});
