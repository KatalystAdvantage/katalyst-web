var landingHelper = {
    init: function () {
        landingHelper.buttonClick();
    },

    buttonClick: function(){
        $('.m-down-arrow').click(function () {
            headerHelper.collapseMainToNav();
            smoothScroll.scrollTo($('[data-page-section="contact"]'));
        });
}
};