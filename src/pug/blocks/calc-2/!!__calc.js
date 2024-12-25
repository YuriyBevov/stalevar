import gsap from "gsap";

const steps = document.querySelectorAll('.lw-calc__step');
const btnNext = document.querySelector('.lw-calc__btn--next');
const btnPrev = document.querySelector('.lw-calc__btn--prev');
const btnSubmit = document.querySelector('.lw-calc__btn--submit');
// const fields = document.querySelectorAll('.lw-calc__content fieldset');
const stepsContainer = document.querySelector('.lw-calc__steps-wrapper');
const header = document.querySelector('.lw-calc__header');
const stepCardWidth = steps[0].offsetWidth;
const pageContainer = document.querySelector('.container');

if(steps.length) {

  let currentStep = 0;
  let stepFrom = null;
  let stepTo = null;

  const tlForward = () => {
    stepFrom = currentStep;
    stepTo = currentStep + 1;

    currentStep++;
    console.log('FROM:', stepFrom, 'TO:', stepTo, 'CURRENT:', currentStep);

    if(stepFrom === 0) {
      btnPrev.classList.remove('hidden');
    }

    if(stepTo === steps.length - 1) {
      btnNext.classList.add('hidden');
      btnSubmit.classList.remove('hidden');
    }

    // анимация черной плашки
    gsap.to(steps[stepFrom].querySelector('.lw-calc__step-underlay'), {x: 0, duration: .4, delay: 0.3});
    // анимация заголовка
    gsap.to(steps[stepFrom].querySelector('.lw-calc__step-value span'), {color: '#ffffff', duration: .4, delay: 0.4});
    // анимация текста с выбором
    gsap.to(steps[stepFrom].querySelector('.lw-calc__step-value small'), {visibility: 'visible', height: 'auto', opacity: 1, color: '#ffffff', duration: .5, ease: 'linear', delay: 0.6});
    // анимация активного шага
    gsap.to(steps[currentStep], {className: 'lw-calc__step active', opacity: 1, duration: .4, delay: 0.5});

    console.log('ШИРИНА ШАПКИ КАЛЬКУЛЯТОРА:', header.offsetWidth);
    console.log('ПОЗИЦИЯ АКТИВНОГО ШАГА ОТ ЛЕВОГО КРАЯ ЭКРАНА ПО ОСИ Х:', steps[currentStep].getBoundingClientRect().x, 'PADDING:', getComputedStyle(pageContainer).getPropertyValue("padding-left"), 'GAP:', getComputedStyle(stepsContainer).getPropertyValue("gap"));


    // const lazyImages = document.querySelectorAll('.lazy-image')

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('IN VIEWPORT');

          // entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        } else {
          console.log('NOT IN VIEWPORT');

          console.log('СДВИГАЕМ ШАГИ ВЛЕВО', steps[currentStep].getBoundingClientRect().x, 483);
          const regExp = /\*|p|x|\$/g;

          const padding = Number(getComputedStyle(pageContainer).getPropertyValue("padding-left").replace(regExp, ''));
          const gap = Number(getComputedStyle(stepsContainer).getPropertyValue("gap").replace(regExp, ''));

          // const pos = (padding + (gap * currentStep) ) ;

          gsap.to(stepsContainer, {x: `-${((currentStep * stepCardWidth) + (gap * currentStep)) - (80 + gap) }`, duration: .4, ease: 'ease-in', delay: 0.5});
        }
        
        // else {

        //   console.log('СДВИГАЕМ ШАГИ ВЛЕВО', steps[currentStep].getBoundingClientRect().x, 483);
        //   const regExp = /\*|p|x|\$/g;

        //   const padding = Number(getComputedStyle(pageContainer).getPropertyValue("padding-left").replace(regExp, ''));
        //   const gap = Number(getComputedStyle(stepsContainer).getPropertyValue("gap").replace(regExp, ''));

        //   const pos = (padding + (gap * currentStep) ) ;

        //   gsap.to(stepsContainer, {x: `-${((currentStep * stepCardWidth) + (gap * currentStep)) - (80 + gap) }`, duration: .4, ease: 'ease-in', delay: 0.5});
        // }
      })
    }

    const options = {
      // root: window,
      // но можно задать любой элемент-контейнер
      // rootMargin: '0px 0px 75px 0px',
      threshold: 1,
    }

    const observer = new IntersectionObserver(callback, options)

    console.log(steps[currentStep]);
    observer.observe(steps[currentStep]);

    // lazyImages.forEach((image) => observer.observe(image))


     if(steps[currentStep].getBoundingClientRect().x + 226 > header.offsetWidth) {
    // if(stepsContainer.offsetWidth > header.offsetWidth) {
      console.log('СДВИГАЕМ ШАГИ ВЛЕВО', steps[currentStep].getBoundingClientRect().x, 483);
      const regExp = /\*|p|x|\$/g;

      const padding = Number(getComputedStyle(pageContainer).getPropertyValue("padding-left").replace(regExp, ''));
      const gap = Number(getComputedStyle(stepsContainer).getPropertyValue("gap").replace(regExp, ''));

      const pos = (padding + (gap * currentStep) ) ;

      console.log(pos, padding, gap, currentStep, steps[currentStep].getBoundingClientRect().x);

      //, header.offsetWidth, 'gap:', getComputedStyle(stepsContainer).getPropertyValue("gap")
      //177

      
      // const gap = getComputedStyle(stepsContainer).getPropertyValue("gap");
      // console.log(currentStep, stepCardWidth, gap);

      // const regExp = /\*|p|x|\$/g;
      // console.log(gap.replace(regExp, ''));

      // const pos = steps[currentStep].getBoundingClientRect().x - ((currentStep * stepCardWidth) + (Number(gap.replace(regExp, '')) * currentStep));
      // console.log(pos);

      // gsap.to(stepsContainer, {x: `-${((currentStep * stepCardWidth) + (gap * currentStep)) - (80 + gap) }`, duration: .4, ease: 'ease-in', delay: 0.5});
    }


    
    // const underlay = steps[currentStep].querySelector('.lw-calc__step-underlay'); // черная плашка
    // const title = steps[currentStep].querySelector('.lw-calc__step-value span'); // заголовок
    // const value = steps[currentStep].querySelector('.lw-calc__step-value small'); // значение

    // gsap.to(underlay, {x: 0, duration: .4, delay: 0.3});
    // gsap.to(title, {color: '#ffffff', duration: .4, delay: 0.4});
    // gsap.to(value, {visibility: 'visible', height: 'auto', opacity: 1, color: '#ffffff', duration: .4, delay: 0.6});

    // currentStep++;
    // if(steps[currentStep]) {
    //   console.log('TSTST');
    //   gsap.to(steps[currentStep], {className: 'lw-calc__step active', opacity: 1, duration: .4, delay: 0.5});
    // }

    // if(btnPrev.classList.contains('hidden')) {
    //   btnPrev.classList.remove('hidden');
    // }
  }

  const tlBack = () => {
    stepFrom = currentStep;
    stepTo = currentStep - 1;
    currentStep--;
    console.log('FROM:', stepFrom, 'TO:', stepTo, 'CURRENT:', currentStep);

    if(stepTo === 0) {
      btnPrev.classList.add('hidden');
    }

    if(stepTo !== steps.length - 1) {
      btnSubmit.classList.add('hidden');
    }
    
    btnNext.classList.remove('hidden');
    
    // console.log(currentStep,steps[currentStep]);
   
    // gsap.to(steps[currentStep-1], {className: 'lw-calc__step', opacity: 0.1, duration: .4, ease: 'ease-in', delay: 0.5});
    // currentStep--;
    
    // if(!btnPrev.classList.contains('hidden')) {
    //   btnPrev.classList.add('hidden');
    // }

    // const underlay = steps[currentStep].querySelector('.lw-calc__step-underlay'); // черная плашка
    // const title = steps[currentStep].querySelector('.lw-calc__step-value span'); // заголовок
    // const value = steps[currentStep].querySelector('.lw-calc__step-value small'); // значение

    // gsap.to(underlay, {x: '-160px', duration: .4, ease: 'ease-in', delay: 0.3});
    // gsap.to(title, {color: '#000000', duration: .4, ease: 'linear', delay: 0.4});
    // gsap.to(value, {visibility: 'hidden', height: '0', opacity: 0, color: '#000000', duration: .4, ease: 'linear', delay: 0.6});
  }

  btnNext.addEventListener('click', () => {
    // disableBtns(currentStep);
    tlForward();
    // console.log('clicked on next btn', currentStep);
  });

  btnPrev.addEventListener('click', () => {
    // disableBtns(currentStep);
    tlBack();
    // console.log('clicked on prev btn', currentStep);
  });

}