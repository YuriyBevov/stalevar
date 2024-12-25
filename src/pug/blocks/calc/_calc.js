import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Swiper from 'swiper';
import { Navigation, Thumbs, EffectFade, Controller } from 'swiper/modules';
import 'swiper/css';

const contentNodes = document.querySelectorAll('.lw-steps-content');
let currentStep = 0;
let currentStepContentNode = contentNodes[0];



const stepSlider = new Swiper(".lw-steps", {
  modules: [Navigation, Controller],
  spaceBetween: 20,
  freeMode: 'true',
  slidesPerView: 'auto',
  centeredSlides: true,
  // slideOnClick: true,
  // allowSlideNext: false,

  on: {
    // slideNextTransitionEnd: function (swiper) {
    //   tlForward(swiper.activeIndex, swiper);
    // },
    // slidePrevTransitionEnd: function (swiper) {
    //   tlBack(swiper.activeIndex, swiper);
    // },
    click: function (evt) {
      console.log(evt, 'CLICKED');
    }
    
  },

  breakpoints: {
    1540: {
      centeredSlides: false,
    }
  }
});

contentNodes.forEach((node) => {
  gsap.set(node, { display: 'none', flexDirection: 'column' });
});

gsap.set(currentStepContentNode, { display: 'flex' });

const steps = document.querySelectorAll('.lw-steps .lw-calc__step');
const btnNext = document.querySelectorAll('.lw-calc__btn--next');
const btnPrev = document.querySelectorAll('.lw-calc__btn--prev');

const showStepContent = (index, dir) => {
  console.log(index, dir);
  if(dir === 'prev') {
    gsap.to(contentNodes[index+1], { display: 'none', opacity: 0,  duration: 0});
  } else {
    gsap.to(contentNodes[index-1], { display: 'none', opacity: 0,  duration: 0});
  }
  
  // currentStepContentNode = document.querySelector(`[data-content="${index + 1}"]`);
  gsap.to(contentNodes[index], { display: 'flex', duration: 0});
  gsap.fromTo(contentNodes[index], { opacity: 0}, {opacity: 1, duration: 0.4, delay: .4});
}

const tlForward = (index, swiper) => {
  console.log('FWD:', index);
  scrollTo(0, 0);
  currentStep = swiper.activeIndex;
  // блок с анимацией перенести в отдельный блок

  // -- предыдущий шаг --
  // даю класс completed
  gsap.to(steps[currentStep - 1], { className:'lw-calc__step viewed completed' });
  // // анимация черной плашки
  gsap.to(steps[currentStep - 1].querySelector('.lw-calc__step-underlay'), {x: 0, duration: .4, delay: 0.3});
  // // анимация заголовка
  gsap.to(steps[currentStep - 1].querySelector('.lw-calc__step-value span'), {color: '#ffffff', duration: .4, delay: 0.4});
  // // анимация текста с выбором
  gsap.to(steps[currentStep - 1].querySelector('.lw-calc__step-value small'), {visibility: 'visible', height: 'auto', opacity: 1, color: '#ffffff', duration: .5, ease: 'linear', delay: 0.6});
  // // -- предыдущий шаг --

  // // -- активный шаг --
  // // анимация прозрачности
  const cls = steps[currentStep].classList.contains('completed') ? 'lw-calc__step viewed completed' : 'lw-calc__step viewed';
  gsap.to(steps[currentStep], {className: cls, opacity: 1, duration: .4, delay: 0.5});
  // -- активный шаг --
  // блок с анимацией перенести в отдельный блок

  showStepContent(index, 'next');
}

const tlBack = (index, swiper) => {
  console.log('BACK:', index, currentStep);

  scrollTo(0, 0);

  const cls = steps[currentStep].classList.contains('completed') ? 'lw-calc__step viewed completed' : 'lw-calc__step viewed';
  const setOpacity = steps[currentStep].classList.contains('completed') ? 1 : .1;

  gsap.to(steps[currentStep], {className: cls, opacity: setOpacity, duration: .4, delay: 0.5});

  currentStep = swiper.activeIndex;
  showStepContent(index, 'prev');
}

btnNext.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    stepSlider.allowSlideNext = true;
    stepSlider.slideNext();
    console.log('clicked on next btn', stepSlider.activeIndex);
    stepSlider.allowSlideNext = false;
  });
});

btnPrev.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    stepSlider.slidePrev();
    console.log('clicked on prev btn', stepSlider.activeIndex);
  });
});

// const contentSlider = new Swiper(".lwы-steps-content", {
//   modules: [Navigation, Thumbs, EffectFade, Controller],
//   // allowTouchMove: false,
//   preventClicks: true,
//   allowSlideNext: false,
//   spaceBetween: 20,
//   autoHeight: true,

//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   thumbs: {
//     // swiper: stepSlider,
//   },

//   on: {
//     slideChange: function (swiper) {
//       if(swiper.activeIndex > currentStep) {
//         tlForward(swiper.activeIndex, swiper);
//       } else if (swiper.activeIndex < currentStep) {
//         tlBack(swiper.activeIndex, swiper);
//       }
//     }
//   }
// });

// const tlForward = (index, swiper) => {
//   console.log('FWD:', index);
//   currentStep = swiper.activeIndex;

//   // блок с анимацией перенести в отдельный блок

//   // -- предыдущий шаг --
//   // даю класс completed
//   gsap.to(steps[currentStep - 1], { className:'lw-calc__step viewed completed' });
//   // анимация черной плашки
//   gsap.to(steps[currentStep - 1].querySelector('.lw-calc__step-underlay'), {x: 0, duration: .4, delay: 0.3});
//   // анимация заголовка
//   gsap.to(steps[currentStep - 1].querySelector('.lw-calc__step-value span'), {color: '#ffffff', duration: .4, delay: 0.4});
//   // анимация текста с выбором
//   gsap.to(steps[currentStep - 1].querySelector('.lw-calc__step-value small'), {visibility: 'visible', height: 'auto', opacity: 1, color: '#ffffff', duration: .5, ease: 'linear', delay: 0.6});
//   // -- предыдущий шаг --

//   // -- активный шаг --
//   // анимация прозрачности
//   const cls = steps[currentStep].classList.contains('completed') ? 'lw-calc__step viewed completed' : 'lw-calc__step viewed';
//   gsap.to(steps[currentStep], {className: cls, opacity: 1, duration: .4, delay: 0.5});
//   // -- активный шаг --
//   // блок с анимацией перенести в отдельный блок
// }

// const tlBack = (index, swiper) => {
//   console.log('BACK:', index, currentStep);

//   const cls = steps[currentStep].classList.contains('completed') ? 'lw-calc__step viewed completed' : 'lw-calc__step viewed';
//   const setOpacity = steps[currentStep].classList.contains('completed') ? 1 : .1;

//   gsap.to(steps[currentStep], {className: cls, opacity: setOpacity, duration: .4, delay: 0.5});

//   currentStep = swiper.activeIndex;
// }

// contentSlider.controller.control = stepSlider;

// // Логика смены слайдов, валидация и анимация
// const steps = document.querySelectorAll('.lw-steps .lw-calc__step');
// const btnNext = document.querySelectorAll('.lw-calc__btn--next');
// const btnPrev = document.querySelectorAll('.lw-calc__btn--prev');

steps.forEach(step => {
  step.addEventListener('click', (evt) => {
    // console.log(evt.currentTarget.dataset.id, evt.currentTarget);
    const id = Number(evt.currentTarget.dataset.id) - 1;
    const prev = steps[id - 1];

    console.log(steps[0]);

    if(prev && prev.classList.contains('completed')) {
      // stepSlider.allowSlideNext = true;
      stepSlider.slideTo(id);
      // stepSlider.allowSlideNext = false;
    }
  })
});

// btnNext.forEach(btn => {
//   btn.addEventListener('click', (evt) => {
//     // валидация с проверкой формы
//     // даем класс completed для этого шага
//     // contentSlider.allowSlideNext = true;
//     // contentSlider.slideNext();
//     // contentSlider.allowSlideNext = false;
//     console.log(evt.currentTarget.closest('.swiper-slide'));
//     const slide = evt.currentTarget.closest('.swiper-slide');
//     const id = Number(slide.dataset.content) + 1;
//     console.log(id);
//     slide.style.display = 'none';
//     document.querySelector(`[data-content="${id}"]`).style.display = 'flex';

//   });
// });

// btnPrev.forEach(btn => {
//   btn.addEventListener('click', (evt) => {
//     // contentSlider.slidePrev();
//     console.log(evt.currentTarget.closest('.swiper-slide'));
//   });
// });

// // contentSlider.allowSlideNext

// const labels = document.querySelectorAll('label');

// labels.forEach(label => {
//   label.addEventListener('click', (evt) => {
//     console.log('label clicked', labels.length, evt.currentTarget);
//   });
// });