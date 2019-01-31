/*=============================================================================================== */
/*   SMOOTH SCROLL  ============================================================================= */
/*=============================================================================================== */
var smoothScroll = {
	init: function(){
		$(".smooth-scroll").on("click touchstart", function(e){
			e.preventDefault();
			smoothScroll.scrollTo($($(e.target).closest("a").attr("href")).offset().top, 500);
		});
	},
	scrollTo: function(offset, time, callback){
		if(time === "undefined")
			time = 200;

		$('html body, body, html').stop(true).animate({
			scrollTop: offset
		}, time, function(){
			if(typeof(callback) == "function")
				callback();	
		});
	}
};