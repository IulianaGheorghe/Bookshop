(function ($) {
    "use strict";

    new WOW().init();

    // sticky navbar
$(window).on("scroll", function(){
    var scroll = $(window).scrollTop();
    if(scoll < 100) {
        $(".sticky-header").removeClass("sticky");
    } else {
        $(".sticky-header").addClass("sticky");
    }
});
})(jQuery);

