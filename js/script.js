
let GalleryManager = ((undefined) => {

    jQuery.fn.fadeOutAndRemove = function(speed){
        $(this).fadeOut(speed,function(){
            $(this).remove();
        })
    }

    function navClickHandler(evt) {
        $('nav li.current').removeClass('current');
        $(evt.target).parent().addClass('current');
        // set heading 
        $('#heading').text($(evt.target).text());
        // Get and filter link text
        let category = $(evt.target).text().toLowerCase().replace(' ', '-');
        //remove hidden addClass
        if (category === 'all-projects') {
            $('#gallery li:hidden').fadeIn('slow').removeClass('hidden');
        } else {
            $('#gallery li').each(function() {
                if(!$(this).hasClass(category)) {
                    $(this).hide().addClass('hidden');
                } else {
                    $(this).fadeIn('slow').removeClass('hidden');
                }
            })
        } //stop link behavior
        return false; 
    }

    function mouseEnterHandler(evt) {
        // get data atrr values
        let title = $(evt.currentTarget).children().data('title');
        let description = $(evt.currentTarget).children().data('desc');
        // validation
        if (description == null) {
            description = 'Click to enlarge';
        }
        if(title == null) {
            title = '';
        }
        //create overlay div\
        $(evt.currentTarget).append('<div class="overlay"></div>');
        // get overlay div
        let overlay = $(evt.currentTarget).children('.overlay');
        // add html to overlay
        overlay.html('<h3>'+title+'</h3><p>'+description+'</p>');
        // fade in overlay
        overlay.fadeIn(800);
    }

    function mouseLeaveHandler(evt) {
        $(evt.currentTarget).children('.overlay').fadeOutAndRemove(400);
    }
   
    function init() {
        $('nav a').on('click', navClickHandler);
        $('ul#gallery li').on('mouseenter', mouseEnterHandler);
        $('ul#gallery li').on('mouseleave', mouseLeaveHandler);
    }
    
    return {
        init: init
    }
})();

$(document).ready(function() {
    GalleryManager.init();
});