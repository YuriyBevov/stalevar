import gsap from "gsap";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";

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
      if(evt.clickedIndex !== currentStepIndex) {
        jumpToStep(evt.clickedIndex);
      }
    }
  },

  breakpoints: {
    1540: {
      centeredSlides: false,
    }
  }
});

const jumpToStep = (index) => {
  if(steps[index] && steps[index].classList.contains('viewed')) {
    if(index > currentStepIndex) {
      tlForwardCardAnimation(index - 1);
      currentStepIndex = index - 1;
    } else {
      tlBackCardAnimation(index + 1);
      currentStepIndex = index + 1;
    }
  }
};

function btnsDisabling(btns, state) {
  if(state) {
    btns.forEach(btn => {
      btn.setAttribute('disabled', true);
    });
  } else {
    btns.forEach(btn => {
      btn.removeAttribute('disabled');
    });
  }
}

const tlForwardCardAnimation = (index) => {
  stepSlider.slideTo(index + 1); // листаю слайдер вперед

  const btns = contentNodes[index + 1].querySelectorAll('.lw-calc__btn');
  btnsDisabling(btns, true);

  // -- анимация шага --
    const tl = gsap.timeline();
    const setCls = steps[index + 1].classList.contains('completed') ? 'lw-calc__step viewed completed' : 'lw-calc__step viewed';

    // даю класс completed
    tl.to(steps[index], { className:'lw-calc__step viewed completed', autoAlpha: 1, duration: 0 });
    // анимация черной плашки
    tl.to(steps[index].querySelector('.lw-calc__step-underlay'), {x: 0, duration: .4, ease: 'power2.out'});
    // анимация заголовка
    tl.to(steps[index].querySelector('.lw-calc__step-value span'), {color: '#ffffff', duration: .4, ease: 'power2.out'}, "-=0.3");
    // анимация текста с выбором
    tl.to(steps[index].querySelector('.lw-calc__step-value small'), {visibility: 'visible', height: 'auto', autoAlpha: 1, color: '#ffffff', duration: .5, ease: 'power2.out'}, "-=0.3");
    // скрытие пред-го шага контента 
    tl.to(contentNodes, { display: 'none', autoAlpha: 0,  duration: 0, onComplete: () => {
      scrollTo(0, 0);
    }}, "-=.6");
    // анимация показа след-го шага контента
    tl.fromTo(contentNodes[index + 1], { x: '20px', autoAlpha: 0, display: 'none'}, {display: 'flex',x: 0, autoAlpha: 1, duration: 0.4, ease: 'linear',
      onComplete: () => {
        btnsDisabling(btns);
      }
    }, "-=.6");
    // анимация прозрачности след-й карточки
    tl.to(steps[index + 1], {
      className: setCls, autoAlpha: 1, duration: .4, 
      onComplete: () => {
        currentStepIndex++;
        tl.kill();
      }}, "-=.5"
    );
  // -- анимация шага --
}

const tlBackCardAnimation = (index) => {
  stepSlider.slidePrev(index - 1); // листаю слайдер назад
  const lastViewedStep = document.querySelector('.lw-calc__step.viewed:not(.completed)');

  const btns = contentNodes[index - 1].querySelectorAll('.lw-calc__btn');
  btnsDisabling(btns, true);

  // -- анимация шага --
    const tl = gsap.timeline();
    
    // скрытие пред-го шага контента
    tl.to(contentNodes, { display: 'none', autoAlpha: 0,  duration: 0,
      onComplete: () => {
        scrollTo(0, 0);
      }
    }, "-=.4");

    tl.to(lastViewedStep, {autoAlpha: .1, duration: .4});

    // анимация показа след-го шага контента
    tl.fromTo(contentNodes[index - 1], { x: '20px', autoAlpha: 0, display: 'none'}, {
      display: 'flex', x: 0, autoAlpha: 1, duration: 0.4, ease: 'linear',
      onComplete: () => {
        currentStepIndex--;
        tl.kill();
        btnsDisabling(btns);
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

const checkValidityBeforeStepChanging = (field) => {
  const isValid = field.querySelector('input:checked');

  if(!!isValid) {
    fillStepCardContent(field);
    tlForwardCardAnimation(currentStepIndex);
  }
}

btnNext.forEach(btn => {
  btn.addEventListener('click', () => {
    checkValidityBeforeStepChanging(contentNodes[currentStepIndex]);
    // tlForwardCardAnimation(currentStepIndex);
  });
});

btnPrev.forEach(btn => {
  btn.addEventListener('click', () => {
    tlBackCardAnimation(currentStepIndex);
  });
});

const controls = document.querySelectorAll('input:not(input[type="submit"])');

function createArrayForReversedAnimation(elems, pos) {
  return Array.from(elems).splice(pos).reverse();
} 

const onControlChangeHandler = (ctrl) => {
  const index = Array.from(contentNodes).indexOf(ctrl.closest('.lw-steps-content'));

  for(let i = index + 1; i < contentNodes.length; i++) {
    const fields = contentNodes[i].querySelectorAll('fieldset');

    fields.forEach(field => {
      const ctrls = field.querySelectorAll('input');
      
      if(ctrls.length) {
        ctrls.forEach(ctrl => {
          ctrl.checked = false;
        });
        ctrls[0].checked = true;
      }
    });
  }

  const cards    = createArrayForReversedAnimation(steps, index + 1);
  const text     = createArrayForReversedAnimation(document.querySelectorAll(".lw-calc__step-value small"), index + 1);
  const title    = createArrayForReversedAnimation(document.querySelectorAll(".lw-calc__step-value span"), index + 1);
  const underlay = createArrayForReversedAnimation(document.querySelectorAll(".lw-calc__step-underlay"), index + 1);

  const tl = gsap.timeline();

  tl
    .to(cards, {stagger: .2, className: 'lw-calc__step', autoAlpha: 0.1, duration: .4})
    .to(underlay, {stagger: .1, x: '-160px', duration: .4 }, "-=.3")
    .to(title, {stagger: .2, color: '#000000', duration: .4 }, "-=.9")
    .to(text, {
      duration: .4,
      opacity: 0,
      height: 0,
      autoAlpha: 0,
      onComplete: () => {
        tl.kill();
      }
    }, "-=.6");

    currentStepIndex = index;
};

controls.forEach(ctrl => {
  ctrl.addEventListener('change', () => {
    onControlChangeHandler(ctrl);
  });
});