﻿var headerHelper = {
    previousScroll: $(window).scrollTop(),
    mobileHeaderHeight: 68,
    preventScrollHide: false,
    hideAffordance: 25,
    hoverTimeout: null,

    init: function () {
        headerHelper.initMobileNav();
        // headerHelper.collapseMainToNav(); //NOTE: disabled until the rest of the site is built bc it was getting in the way.
        headerHelper.offsetHomePage();
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

    offsetHomePage: function () {
        let $main = $('main'),
            $mainHeight = $main.height(),
            $section01 = $('[data-page-section="home"]');

        $section01Offset = $section01.css('padding-top', $mainHeight + 20);

    },

    collapseMainToNav: function(){
        let $logo = $('.m-title');

        // offset the first subsection margin-top by main section height
        if($("html:not([data-scroll='0'])")){
                headerHelper.offsetHomePage();  
                $logo.css('transform', 'scale(0.7)');
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

        var currentScroll = $(window).scrollTop();

        if (currentScroll > (headerHelper.previousScroll + 5) && currentScroll > headerHelper.getHeaderHeight() && !headerHelper.preventScrollHide) {
            if (!$('.js-mobile-nav').hasClass('is-visible')) {
                headerHelper.hideHeader();
            }
        } else if (currentScroll < (headerHelper.previousScroll - headerHelper.hideAffordance)) {
            headerHelper.unhideHeader();
        }
        headerHelper.previousScroll = currentScroll;
    },


    hideHeader: function () {
        if (!$('.js-header').hasClass('is-hidden')) {
            var headerMargin = -headerHelper.getHeaderHeight();

            $('.js-header').stop(true, true).animate({
                'marginTop': headerMargin
            }, 200);

            $('.js-header').addClass('is-hidden');
        }
    },

    unhideHeader: function () {
        if ($('.js-header').hasClass('is-hidden')) {
            $('.js-header').removeClass('is-hidden');
            $('.js-header').stop(true, true).animate({
                'marginTop': 0
            }, 200);
        }
    },

    isHeaderHidden: function () {
        return $('.js-header').hasClass('is-hidden');
    }
};