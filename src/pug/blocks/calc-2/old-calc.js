import Swiper from 'swiper';
// import { Navigation } from 'swiper/modules';
import 'swiper/css';

const headSlider = document.querySelector('.lw-calc .swiper');

if(headSlider) {
  // const pagination = headSlider.parentNode.querySelector('.swiper-pagination');
  const btnNext = headSlider.parentNode.querySelector('.lw-calc__btn--next');
  const btnPrev = headSlider.parentNode.querySelector('.lw-calc__btn--prev');

  const fields = document.querySelectorAll('.lw-calc__content');

  const slider = new Swiper(headSlider, {
    // modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 20,
    // allowTouchMove: false,
    watchOverflow: true,

    on: {
      snapGridLengthChange: function() {
        this.snapGrid = [...this.slidesGrid];
      },

      init: function() {
        disableBtns(this)
      },
    }
  });

  function disableBtns(slider) {
    if(slider.activeIndex === 0) {
      !btnPrev.classList.contains('disabled') ? btnPrev.classList.add('disabled') : null;
    } else if (slider.activeIndex === slider.slides.length - 1) {
      !btnNext.classList.contains('disabled') ? btnNext.classList.add('disabled') : null;
    } else {
      btnPrev.classList.contains('disabled') ? btnPrev.classList.remove('disabled') : null;
      btnNext.classList.contains('disabled') ? btnNext.classList.remove('disabled') : null;
    }
  }

  const onClickAnimateStepField = (index, direction) => {
    if(direction === 'forward') {
      console.log('index forward', index);
      slider.slides[index].classList.add('completed');
      setTimeout(() => {
        slider.slideNext();
      }, 800);
    } if(direction === 'back') {
      console.log('index back', index);
      slider.slidePrev();
      
      setTimeout(() => {
        slider.slides[index - 1].classList.remove('completed');
      }, 800);
    }
  }

  btnNext.addEventListener('click', () => {
    // slider.slideNext();
    disableBtns(slider);

    onClickAnimateStepField(slider.activeIndex, 'forward');
    console.log('clicked on next btn', slider.activeIndex);
  });

  btnPrev.addEventListener('click', () => {
    // slider.slidePrev();
    disableBtns(slider);

    onClickAnimateStepField(slider.activeIndex, 'back');
    console.log('clicked on prev btn', slider.activeIndex);
  });
}





