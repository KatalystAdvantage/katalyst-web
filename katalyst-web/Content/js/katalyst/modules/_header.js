var headerHelper = {
    previousScroll: $(window).scrollTop(),
    mobileHeaderHeight: 68,
    preventScrollHide: false,
    hideAffordance: 25,
    hoverTimeout: null,

    init: function () {
        headerHelper.initMobileNav();
        headerHelper.collapseMainToNav();
    },


    initMobileNav: function(){
        $('.js-nav-btn').on('click', function () {
            $(this).toggleClass('is-open');
		    $('.js-mobile-nav').toggleClass('is-visible');
		    headerHelper.unhideHeader();
		});
	},


    getHeaderHeight: function (include_margins) {
        if (headerHelper.isHeaderHidden()) {
                return 0;
        }
        return $('.js-header:visible').outerHeight();
    },

    collapseMainToNav: function(){
        let $main = $('main'),
            $section01 = $('[data-section="change"]'),
            $mainHeight = $main.height();

            // offset the first subsection margin-top by main section height
            if($("html:not([data-scroll='0'])")){
                $section01Offset = $section01.css('padding-top', $mainHeight + 20);

            };

        document.addEventListener('scroll', () => {
            document.documentElement.dataset.scroll = window.scrollY;
        });
 
    },





    //TODO: determine if needed, else delete

       initScrollHide: function () {
        $(window).scroll(function () {
            headerHelper.checkScroll();
        });
    },

    checkScroll: function(){
        if (!$('body').hasClass('starting-right')) {
            if ($('.js-header').hasClass('scroll-lock') || (window.innerWidth < 768 && window.location.search.indexOf('edmode') > -1)) {
                return false;
            }

            var currentScroll = $(window).scrollTop();

            if (currentScroll <= 0 || currentScroll > ($(document).height() - $(window).height() - 100)) {
                $('.js-btn-page-nav').removeClass('hover');
                return false;
            }

            if (currentScroll > (headerHelper.previousScroll + 5) && currentScroll > headerHelper.getHeaderHeight() && !headerHelper.preventScrollHide) {
                if (!$('.js-mobile-nav').hasClass('is-visible')) {
                    headerHelper.hideHeader();
                }
            } else if (currentScroll < (headerHelper.previousScroll - headerHelper.hideAffordance)) {
                headerHelper.unhideHeader();
            }
            headerHelper.previousScroll = currentScroll;
        }
    },


    hideHeader: function () {
        if (!$('.js-header').hasClass('is-hidden')) {
            var headerMargin = -headerHelper.getHeaderHeight();

            $('.js-header').stop(true, true).animate({
                'marginTop': headerMargin
            }, 200);

            $('.js-header').addClass('is-hidden');
            $('.js-btn-page-nav').removeClass('hover');
        }
    },

    unhideHeader: function () {
        if ($('.js-header').hasClass('is-hidden')) {
            $('.js-header').removeClass('is-hidden');
            $('.js-header').stop(true, true).animate({
                'marginTop': 0
            }, 200);
            $('.js-btn-page-nav').addClass('hover');
        }
    },

    isHeaderHidden: function () {
        return $('.js-header').hasClass('is-hidden');
    }
};