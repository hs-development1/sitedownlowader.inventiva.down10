(function ($, Drupal) {

  $(document).ready(() => {
    tsAccordionResize();
  })
  $(window).on('resize', () => {
    tsAccordionResize();
  })
  const tsAccordionResize = () => {
    $('.ts-accordion_mh').each((index, item) => {
      const tsAccordion = $(item);
      let minHeight = 0;
      let maxContentHeight = 0;
      tsAccordion.find('.ts-accordion__row').each((index, item) => {
        const row = $(item);
        minHeight += parseInt(row.css('padding-top')) + parseInt(row.css('padding-bottom')) + parseInt(row.css('border-bottom-width'));
        if(row.find('.ts-accordion__ic-title').length) {
          minHeight += row.find('.ts-accordion__ic-title').outerHeight(true);
        } else {
          minHeight += row.find('.ts-accordion__title').outerHeight(true);
        }

        row.append(`<div class="ts-accordion__content ts-accordion__content_js" style="display: block; height: 0; overflow: hidden;">${row.find('.ts-accordion__content').html()}</div>`);
        const contentHeight = row.find('.ts-accordion__content_js .ts-accordion__inner').outerHeight(true);
        if(contentHeight > maxContentHeight) {
          maxContentHeight = contentHeight;
        }
        row.find('.ts-accordion__content_js').remove();
      });
      if(tsAccordion.find('.ts-button').length) {
        minHeight += tsAccordion.find('.ts-button').outerHeight(true);
      }
      tsAccordion.css('min-height', minHeight+maxContentHeight);
    });
  };


  const accordionTitleClass = 'ts-accordion__title';
  const accordionTitleClassActive = `${accordionTitleClass}_active`;
  $('.ts-accordion:not(.ts-accordion_no-js) .ts-accordion__title').once('accordionTitleClick').bind('click', (e) => {
    const elem = $(e.target).closest('.ts-accordion__title');
    const accordion = elem.closest('.ts-accordion');
    if(accordion.hasClass('ts-accordion_multiple')) {
      elem.closest('.ts-accordion__row').find('.ts-accordion__content').slideToggle(300);
      elem.toggleClass(accordionTitleClassActive);
    } else {
      if(!elem.hasClass(accordionTitleClassActive)) {
        accordion.find(`.${accordionTitleClassActive}`).closest('.ts-accordion__row').find('.ts-accordion__content').slideUp(300);
        accordion.find(`.${accordionTitleClassActive}`).removeClass(accordionTitleClassActive);

        elem.closest('.ts-accordion__row').find('.ts-accordion__content').slideDown(300);
        elem.addClass(accordionTitleClassActive);

        const medias = accordion.closest('.creatio-region').find('.ts-section__medias');
        if(medias.length) {
          const mediaClassActive = 'ts-media_active';
          medias.find(`.${mediaClassActive}`).removeClass(mediaClassActive);
          medias.find('.ts-media').eq(elem.closest('.ts-accordion__row').index()).addClass(mediaClassActive);
        }
      }
    }
  });

} (jQuery, Drupal));
