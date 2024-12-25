import gsap from "gsap";

import Swiper from 'swiper';
import { Navigation, Thumbs, EffectFade, Controller } from 'swiper/modules';
import 'swiper/css';

let currentStep = 0;

const stepSlider = new Swiper(".lw-steps", {
  spaceBetween: 20,
  slidesPerView: 'auto',
  centeredSlides: true,
});

const contentSlider = new Swiper(".lw-steps-content", {
  modules: [Navigation, Thumbs, EffectFade, Controller],
  allowTouchMove: false,
  preventClicks: true,
  allowSlideNext: false,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  thumbs: {
    swiper: stepSlider,
  },

  on: {
    slideChange: function (swiper) {
      if(swiper.activeIndex > currentStep) {
        tlForward(swiper.activeIndex, swiper);
      } else if (swiper.activeIndex < currentStep) {
        tlBack(swiper.activeIndex, swiper);
      }
    }
  }
});

const tlForward = (index, swiper) => {
  console.log('FWD:', index);
  currentStep = swiper.activeIndex;

  // блок с анимацией перенести в отдельный блок

  // -- предыдущий шаг --
  // даю класс completed
  gsap.to(steps[currentStep - 1], { className:'lw-calc__step viewed completed' });
  // анимация черной плашки
  gsap.to(steps[currentStep - 1].querySelector('.lw-calc__step-underlay'), {x: 0, duration: .4, delay: 0.3});
  // анимация заголовка
  gsap.to(steps[currentStep - 1].querySelector('.lw-calc__step-value span'), {color: '#ffffff', duration: .4, delay: 0.4});
  // анимация текста с выбором
  gsap.to(steps[currentStep - 1].querySelector('.lw-calc__step-value small'), {visibility: 'visible', height: 'auto', opacity: 1, color: '#ffffff', duration: .5, ease: 'linear', delay: 0.6});
  // -- предыдущий шаг --

  // -- активный шаг --
  // анимация прозрачности
  const cls = steps[currentStep].classList.contains('completed') ? 'lw-calc__step viewed completed' : 'lw-calc__step viewed';
  gsap.to(steps[currentStep], {className: cls, opacity: 1, duration: .4, delay: 0.5});
  // -- активный шаг --
  // блок с анимацией перенести в отдельный блок
}

const tlBack = (index, swiper) => {
  console.log('BACK:', index, currentStep);

  const cls = steps[currentStep].classList.contains('completed') ? 'lw-calc__step viewed completed' : 'lw-calc__step viewed';
  const setOpacity = steps[currentStep].classList.contains('completed') ? 1 : .1;

  gsap.to(steps[currentStep], {className: cls, opacity: setOpacity, duration: .4, delay: 0.5});

  currentStep = swiper.activeIndex;
}

contentSlider.controller.control = stepSlider;

// Логика смены слайдов, по клику на шаг
const steps = document.querySelectorAll('.lw-steps .lw-calc__step');
const btnNext = document.querySelector('.lw-calc__btn--next');
const btnPrev = document.querySelector('.lw-calc__btn--prev');

steps.forEach(step => {
  step.addEventListener('click', (evt) => {
    const id = Number(evt.currentTarget.dataset.id) - 1;
    const prev = steps[id - 1];

    if(prev && prev.classList.contains('completed')) {
      contentSlider.allowSlideNext = true;
      contentSlider.slideTo(id);
      contentSlider.allowSlideNext = false;
    }
  })
});

btnNext.addEventListener('click', () => {
  // валидация с проверкой формы
  // даем класс completed для этого шага
  contentSlider.allowSlideNext = true;
  contentSlider.slideNext();
  contentSlider.allowSlideNext = false;
});

btnPrev.addEventListener('click', () => {
  contentSlider.slidePrev();
});

// contentSlider.allowSlideNext