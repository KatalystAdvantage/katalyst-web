var urlNavHelper = {
    seoRoutes: [],
    preventScrollEvent: false,
    //$navSelector: $('.m-header-main-nav .subnav li'),

    init: function () {
        if (window.location.hash && $('#' + window.location.hash.substr(1) + ':visible').length) {
            urlNavHelper.handleInitialUrl(true);
            setTimeout(function () {
                urlNavHelper.doInitialScroll($('#' + window.location.hash.substr(1)).offset().top - headerHelper.getHeaderHeight());
            }, 1);
        } else {
            urlNavHelper.handleInitialUrl();
        }
    },

    parseRoutes: function (seoJson) {
        for (var i = 0; i < seoJson.length; i++) {
            if (seoJson[i].IsDCGQuiz) {
                urlNavHelper.quizPage = seoJson[i];
            }
            if ($('[data-page-section=' + seoJson[i].PageName + ']').length) {

                var index = urlNavHelper.seoRoutes.push(seoJson[i]) - 1;
                urlNavHelper.seoRoutes[index].$section = $('[data-page-section=' + seoJson[i].PageName + ']');
                urlNavHelper.seoRoutes[index].Url = '/' + urlNavHelper.seoRoutes[index].Url;

                $('a[href="' + seoJson[i].Url + '"]').on('click', function (e) {
                    e.preventDefault();
                    urlNavHelper.handleLink($(this).attr('href'));
                });
            }
        }
        urlNavHelper.init();
    },

    doInitialScroll: function (top) {
        headerHelper.preventScrollHide = true;
        urlNavHelper.preventScrollEvent = true;
        smoothScroll.scrollTo(top, null, function () {
            setTimeout(function () {
                headerHelper.preventScrollHide = false;
                urlNavHelper.preventScrollEvent = false;
            }, 250);
        });
    },

    handleInitialUrl: function (preventScroll) {
        $(window).on("load", function () {
            var currentPath = window.location.pathname;
            for (var i = 0; i < urlNavHelper.seoRoutes.length; i++) {
                if (currentPath == urlNavHelper.seoRoutes[i].Url) {
                    // Scroll to header only if other than first to account for CTA at the top
                    if (i > 0) {
                        //Prevent scroll event so that history does not get distorted by sections that get passed through on scoll
                        //Also ignore scroll if checkedAnswer exist in the query string
                        if (!preventScroll && window.location.search.indexOf("checkedAnswer") == -1) {
                            urlNavHelper.doInitialScroll(urlNavHelper.seoRoutes[i].$section.offset().top - headerHelper.getHeaderHeight());
                        }
                    }

                    var currNavLink = $('.js-mobile-nav .subnav a[href="' + urlNavHelper.seoRoutes[i].Url + '"]');
                    currNavLink.parent().addClass('is-current');
                    currNavLink.parents('.is-expandable.is-current').addClass('is-open');

                    break;
                }
            }

            urlNavHelper.handleScroll();
        });
    },

    handleLink: function (url) {
        //Prevent scroll event so that history does not get distorted by sections that get passed through on scoll
        urlNavHelper.preventScrollEvent = true;

        for (var i = 0; i < urlNavHelper.seoRoutes.length; i++) {
            if (url == urlNavHelper.seoRoutes[i].Url) {

                headerHelper.preventScrollHide = true;
                smoothScroll.scrollTo(urlNavHelper.seoRoutes[i].$section.offset().top - headerHelper.getHeaderHeight(), null, function () {
                    //Re enable scroll event
                    setTimeout(function () {
                        urlNavHelper.preventScrollEvent = false;
                        headerHelper.preventScrollHide = false;
                    }, 100);
                });

                urlNavHelper.$navSelector.removeClass('is-current');
                urlNavHelper.$navSelector.has('a[href="' + url + '"]').addClass('is-current');

                $('.js-mobile-nav').removeClass('is-visible');

                document.title = urlNavHelper.seoRoutes[i].PageTitle;
                History.pushState(null, document.title, urlNavHelper.seoRoutes[i].Url + document.location.search);
                break;
            }
        }
    },

    handleScroll: function () {
        $(window).on('scroll', function () {
            if (urlNavHelper.preventScrollEvent === true || $('.js-header').hasClass('scroll-lock')) {
                return;
            }

            var closestSectionIndex = -1;
            var scrollPos = $(window).scrollTop() + headerHelper.getHeaderHeight(true) + 5;
            var currentPath = window.location.pathname;

            for (var i = 0; i < urlNavHelper.seoRoutes.length; i++) {
                if (scrollPos > urlNavHelper.seoRoutes[i].$section.offset().top) {
                    if (closestSectionIndex == -1 || urlNavHelper.seoRoutes[i].$section.offset().top > urlNavHelper.seoRoutes[closestSectionIndex].$section.offset().top) {
                        closestSectionIndex = i;
                    }
                }
            }

            if (closestSectionIndex > -1) {
                urlNavHelper.$navSelector.removeClass('is-current');
                urlNavHelper.$navSelector.has('a[href="' + urlNavHelper.seoRoutes[closestSectionIndex].Url + '"]').addClass('is-current');
                if (currentPath != urlNavHelper.seoRoutes[closestSectionIndex].Url) {
                    document.title = urlNavHelper.seoRoutes[closestSectionIndex].PageTitle;
                    History.pushState(null, document.title, urlNavHelper.seoRoutes[closestSectionIndex].Url + document.location.search);
                }
            }
        });
    }

};