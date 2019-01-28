var headerHelper = {
    previousScroll: $(window).scrollTop(),
    mobileHeaderHeight: 68,
    preventScrollHide: false,
    hideAffordance: 25,
    hoverTimeout: null,

    init: function () {
        headerHelper.initScrollHide();
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

    initScrollHide: function () {
        $(window).scroll(function () {
            headerHelper.checkScroll();
        });
    },

    collapseMainToNav: function(){
        //offset the fullscreen dimensions by whatever the header height is

        let $main = $('main'),
            $section01 = $('[data-section="change"]'),
            $mainHeight = $main.height();



            // offset change margin-top by main height

            if($("html:not([data-scroll='0'])")){
                console.log('it worked!');
                $section01Offset = $section01.css('margin-top', $mainHeight);

            };

    




        document.addEventListener('scroll', () => {
            document.documentElement.dataset.scroll = window.scrollY;
        });

    },





    //TODO: clean this up
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

    getHeaderHeight: function (include_margins) {
        if (headerHelper.isHeaderHidden()) {
                return 0;
        }

        return $('.js-header:visible').outerHeight();
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