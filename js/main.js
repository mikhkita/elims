$(document).ready(function(){
    var isRetina = retina(),
        isDesktop = false,
        isTablet = false,
        isMobile = false;

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

        if( myWidth > 1020 ){
            isDesktop = true;
            isTablet = false;
            isMobile = false;
        }else if( myWidth > 767 ){
            isDesktop = false;
            isTablet = true;
            isMobile = false;
        }else{
            isDesktop = false;
            isTablet = false;
            isMobile = true;
        }

        if(isDesktop){
            $(".b-side-right").stick_in_parent({offset_top: 24});
        }else{
            $(".b-side-right").trigger("sticky_kit:detach");
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

    function retina(){
        var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
        if (window.devicePixelRatio > 1)
            return true;
        if (window.matchMedia && window.matchMedia(mediaQuery).matches)
            return true;
        return false;
    }

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

    if(isRetina && !isMobile){
        $("*[data-retina]").each(function(){
            var $this = $(this),
                img = new Image(),
                src = $this.attr("data-retina");

            img.onload = function(){
                $this.css("background-image", 'url(' + $this.attr("data-retina") + ')');
            };
            img.src = src;
        });
    }

    var slideoutLeft = new Slideout({
        'panel': document.getElementById('panel-page'),
        'menu': document.getElementById('mobile-menu'),
        'side': 'left',
        'padding': 300,
        'tolerance': 70
    });

    $('.burger-menu').click(function() {
        slideoutLeft.open();
        $('.mobile-menu').removeClass("hide");
        $('.b-menu-overlay').show();
        return false;
    });

    slideoutLeft.disableTouch();

    slideoutLeft.on('beforeopen', function() {
        slideoutLeft.enableTouch();
    }).on('beforeclose', function() {
        slideoutLeft.disableTouch();
        $(".b-menu-overlay").hide();
    }).on('close', function() {
        console.log("slideoutLeft");
        $(window).scroll();
    });

    $('.b-menu-overlay').on('click', function() {
        if(slideoutLeft.isOpen())
            slideoutLeft.close();
        $(".b-menu-overlay").hide();
        return false;
    });

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
    
    $(".b-reviews-slider").slick({
        arrows: false,
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        responsive: [
            {
              breakpoint: 1020,
              settings: {
                arrows: true,
                infinite: true,
                prevArrow: '<div class="b-photo-arrows icon-left-arrow"></div>',
                nextArrow: '<div class="b-photo-arrows icon-right-arrow"></div>',
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 768,
              settings: {
                arrows: true,
                infinite: true,
                prevArrow: '<div class="b-photo-arrows icon-left-arrow"></div>',
                nextArrow: '<div class="b-photo-arrows icon-right-arrow"></div>',
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    });

    $("body").on('click', '.prev-slide', function(){
        $(".b-photo-slider").slick('slickPrev');
    });

    $("body").on('click', '.next-slide', function(){
        $(".b-photo-slider").slick('slickNext');
    });

    if($('#date').length){
        $.datepicker.regional['ru'] = {
            closeText: 'Готово', // set a close button text
            currentText: 'Сегодня', // set today text
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'], // set month names
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'], // set short month names
            dayNames: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'], // set days names
            dayNamesShort: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], // set short day names
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], // set more short days names
            dateFormat: 'dd.mm.yy', // set format date
            firstDay: 1
        };        
        $.datepicker.setDefaults($.datepicker.regional["ru"]);

        $(function(){
            $("#date").datepicker({
                minDate: 0
            });
        });

        $("body").on('scroll mousewheel', '.fancybox-inner', function () {
            //var inp = $(this).find('input.hasDatepicker');
            //console.log(inp.offset().top, $("body").scrollTop(), inp.outerHeight());
            //$('#ui-datepicker-div').css('top', inp.offset().top - $("body").scrollTop() + inp.outerHeight());
        });
    }

    $('.b-input-time input').on('click focus', function(){
        $('.b-time-list').addClass("show");
    });

    $(".b-time-list input").change(function(){
         $('#time').val($(this).siblings("label").text());
         $('.b-time-list').removeClass("show");
    });

    $(function(){
      $(document).click(function(event){
        if ($(event.target).closest(".b-input-time").length) 
            return;
        else{
            $('.b-time-list').removeClass("show");
        }
        /*if ($(event.target).closest("#ui-datepicker-div").length) 
            return;
        else{
            $('#ui-datepicker-div').hide();
        }*/
        event.stopPropagation();
      });
    });
    
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