import autoprefixer from 'autoprefixer';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import purgecss from'@fullhuman/postcss-purgecss';
import postcssCombineDuplicatedSelectors from 'postcss-combine-duplicated-selectors';
import postcssCalc from 'postcss-calc';
import postcssDiscardComments from 'postcss-discard-comments';

export default {
  plugins: [
    postcssCalc({}),
    autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
    }),
    postcssSortMediaQueries({
      sort: 'mobile-first', // mobile-first || desktop-first
    }),
    purgecss({
      content: ['./**/*.html', './**/*.pug', './**/*.css'],
      safelist: {
        standard: [/no-image/],
        deep: [/^swiper/, /^zoom/, /^ymaps-icon-content-layout-inner/, /^fancybox/],
      }
    }),
    // always after postcssSortMediaQueries
    postcssCombineDuplicatedSelectors({
      removeDuplicatedValues: true
    }),
    postcssDiscardComments({
      removeAll: true
    })
  ],
  options: {
    cascade: true,
  }
}
