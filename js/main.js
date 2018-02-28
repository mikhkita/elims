$(document).ready(function(){	
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        footerToBottom();
    }
    $(window).resize(resize);
    resize();

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();

    function footerToBottom(){
        var browserHeight = window.innerHeight,
            footerOuterHeight = !!$('.b-footer').outerHeight() ? $('.b-footer').outerHeight(true) : 0,
            headerHeight = 0;
        if($('.b-header').length){
            headerHeight = $('.b-header').outerHeight(true);
        }else{
            headerHeight = $('.b-header-inner').outerHeight(true);
        }
        var minHeight = browserHeight - footerOuterHeight - headerHeight;
        if(minHeight >= 0){
            $('.b-content').css({
                'min-height': minHeight
            });
        }  
    };

    $(".b-slider-content").slick({
        arrows: true,
        prevArrow: '<div class="b-block"><div class="b-slider-arrows icon-left-arrow"></div></div>',
        nextArrow: '<div class="b-block"><div class="b-slider-arrows icon-right-arrow"></div></div>',
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        asNavFor: '.b-slider-back',
        autoplay: true,
        autoplaySpeed: 5000
    });

    $(".b-slider-back").slick({
        arrows: false,
        dots: false,
        asNavFor: '.b-slider-content',
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 800,
    });

    $(".b-photo-slider").on('init', function(event, slick){
        setTimeout(function(){
            $(".prev-slide, .next-slide").removeClass("prev-slide next-slide");
            $(".slick-current").prev().addClass("prev-slide");
            $(".slick-current").next().addClass("next-slide");
        },10);
    });

    $(".b-photo-slider").slick({
        arrows: true,
        prevArrow: '<div class="b-block"><div class="b-photo-arrows icon-left-arrow"></div></div>',
        nextArrow: '<div class="b-block"><div class="b-photo-arrows icon-right-arrow"></div></div>',
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 5000,
        variableWidth: true,
        centerMode: true,
    });
    
    $(".b-photo-slider").on('beforeChange', function(event, slick, currentSlide, nextSlide){
        setTimeout(function(){
            $(".prev-slide, .next-slide").removeClass("prev-slide next-slide");
            $(".slick-current").prev().addClass("prev-slide");
            $(".slick-current").next().addClass("next-slide");
        },10);
    });

    $("body").on('click', '.prev-slide', function(){
        $(".b-photo-slider").slick('slickPrev');
    });

    $("body").on('click', '.next-slide', function(){
        $(".b-photo-slider").slick('slickNext');
    });

    /*if( !isMobile && !isSmallTablet && $('.stick').length) {
        $(window).load(function(){
            $(".stick").stick_in_parent();  
        }); 
    }*/

    $(".b-side-right").stick_in_parent({offset_top: 24});
    
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

    //  var options = {
    //     $AutoPlay: true,                                
    //     $SlideDuration: 500,                            

    //     $BulletNavigatorOptions: {                      
    //         $Class: $JssorBulletNavigator$,             
    //         $ChanceToShow: 2,                           
    //         $AutoCenter: 1,                            
    //         $Steps: 1,                                  
    //         $Lanes: 1,                                  
    //         $SpacingX: 10,                              
    //         $SpacingY: 10,                              
    //         $Orientation: 1                             
    //     }
    // };

    // var jssor_slider1 = new $JssorSlider$("slider1_container", options);

});