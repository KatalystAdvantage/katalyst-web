var landingHelper = {
    init: function () {

        $('.m-down-arrow').click(function () {
            headerHelper.collapseMainToNav();
            smoothScroll.scrollTo($('[data-page-section="contact"]'));
        });

    }
};