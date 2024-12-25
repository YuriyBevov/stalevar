import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

let currentStepIndex = 0; 

const contentNodes = document.querySelectorAll('.lw-steps-content');
let currentStepContent = contentNodes[0];

contentNodes.forEach((node) => {
  gsap.set(node, { display: 'none', flexDirection: 'column' });
});

gsap.set(currentStepContent, { display: 'flex' });

const steps = document.querySelectorAll('.lw-steps .lw-calc__step');
const btnNext = document.querySelectorAll('.lw-calc__btn--next');
const btnPrev = document.querySelectorAll('.lw-calc__btn--prev');

const stepSlider = new Swiper(".lw-steps", {
  modules: [Navigation],
  spaceBetween: 20,
  freeMode: 'true',
  slidesPerView: 'auto',
  centeredSlides: true,

  on: {
    click: function (evt) {
      console.log('clicked on step card №:', evt.clickedIndex, currentStepIndex);
      if(evt.clickedIndex > currentStepIndex) {
        // checkValidity(contentNodes[evt.clickedIndex]);
        console.log('forward');
      } else if(evt.clickedIndex < currentStepIndex) {  
        // tlBackCardAnimation(evt.clickedIndex);
        console.log('back');
      }
    }
  },

  breakpoints: {
    1540: {
      centeredSlides: false,
    }
  }
});

const tlForwardCardAnimation = (index) => {
  stepSlider.slideNext(); // листаю слайдер вперед

  // -- анимация шага --
    const tl = gsap.timeline();
    const setCls = steps[index + 1].classList.contains('completed') ? 'lw-calc__step viewed completed' : 'lw-calc__step viewed';

    // даю класс completed
    tl.to(steps[index], { className:'lw-calc__step viewed completed', opacity: 1, duration: 0 });
    // анимация черной плашки
    tl.to(steps[index].querySelector('.lw-calc__step-underlay'), {x: 0, duration: .4, ease: 'power2.out'});
    // анимация заголовка
    tl.to(steps[index].querySelector('.lw-calc__step-value span'), {color: '#ffffff', duration: .4, ease: 'power2.out'}, "-=0.3");
    // анимация текста с выбором
    tl.to(steps[index].querySelector('.lw-calc__step-value small'), {visibility: 'visible', height: 'auto', opacity: 1, color: '#ffffff', duration: .5, ease: 'power2.out'}, "-=0.3");
    // скрытие пред-го шага контента 
    tl.to(contentNodes[index], { display: 'none', opacity: 0,  duration: 0}, "-=.6");
    // анимация показа след-го шага контента
    tl.fromTo(contentNodes[index + 1], { x: '20px', opacity: 0, display: 'none'}, {display: 'flex',x: 0, opacity: 1, duration: 0.4, ease: 'linear'}, "-=.6");
    // анимация прозрачности след-й карточки
    tl.to(steps[index + 1], {
      className: setCls, opacity: 1, duration: .4, 
      onComplete: () => {
        currentStepIndex++;
        scrollTo(0, 0);
        tl.kill();
      }}, "-=.5"
    );
  // -- анимация шага --
}

const tlBackCardAnimation = (index) => {
  stepSlider.slidePrev(); // листаю слайдер назад

  // -- анимация шага --
    const tl = gsap.timeline();
    const setCls = steps[index].classList.contains('completed') ? 'lw-calc__step viewed completed' : 'lw-calc__step viewed';
    const setOpacity = steps[index].classList.contains('completed') ? 1 : .1;
    
    // скрытие пред-го шага контента 
    tl.to(contentNodes[index], { display: 'none', opacity: 0,  duration: 0,
      onComplete: () => {
        scrollTo(0, 0);
      }
    }, "-=.4");
    tl.to(steps[index], {className: setCls, opacity: setOpacity, duration: .4});
    // анимация показа след-го шага контента
    tl.fromTo(contentNodes[index - 1], { x: '20px', opacity: 0, display: 'none'}, {
      display: 'flex', x: 0, opacity: 1, duration: 0.4, ease: 'linear',
      onComplete: () => {
        currentStepIndex--;
        tl.kill();
      }
    }, "-=.4");
}

const fillStepCardContent = (field) => {
  const ctrls = field.querySelectorAll('input:checked');

  const desc = [];
  ctrls.forEach(ctrl => {
    desc.push(ctrl.value);
  });
  steps[currentStepIndex].querySelector('.lw-calc__step-value small').innerHTML = desc.join(', ');
};

const checkValidity = (field) => {
  const isValid = field.querySelector('input:checked');

  if(!!isValid) {
    fillStepCardContent(field);
    tlForwardCardAnimation(currentStepIndex);
  }
}

btnNext.forEach(btn => {
  btn.addEventListener('click', () => {
    checkValidity(contentNodes[currentStepIndex]);
  });
});

btnPrev.forEach(btn => {
  btn.addEventListener('click', () => {
    tlBackCardAnimation(currentStepIndex);
  });
});