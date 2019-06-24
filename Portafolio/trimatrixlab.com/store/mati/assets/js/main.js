(function ($) {
    "use strict";

    $(document).on('ready', function () {
        $.material.init();
        var transparent = true;
        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                }, wait);
                if (immediate && !timeout) func.apply(context, args);
            };
        }
        // -----------------------------
        // TRANSPARENT NAV
        // -----------------------------
        if($('.navbar-color-on-scroll').length != 0){
            $(window).on('scroll',
                debounce(function() {
                    if($(document).scrollTop() > 260 ) {
                        if(transparent) {
                            transparent = false;
                            $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                        }
                    } else {
                        if( !transparent ) {
                            transparent = true;
                            $('.navbar-color-on-scroll').addClass('navbar-transparent');
                        }
                    }
                }, 17)
            )
        }
        // -----------------------------
        // COUNTER
        // -----------------------------
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
        // -----------------------------
        // TEXT ROATATE
        // -----------------------------
        function textRotate() {
            $(".text-rotate").typed({
                strings: ["Ninoska Vivas Rivas", "UX Designer", "Ingeniera de Sistemas"],
                // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
                stringsElement: null,
                // typing speed
                typeSpeed: 50,
                // time before typing starts
                startDelay: 500,
                // backspacing speed
                backSpeed: 50,
                // shuffle the strings
                shuffle: false,
                // time before backspacing
                backDelay: 500,
                // loop
                loop: true,
                // false = infinite
                loopCount: false,
                // show cursor
                showCursor: false,
                // character for cursor
                cursorChar: "<h1>|</h1>"
            });
        }
        // -----------------------------
        // SETTING HEADER IMAGE
        // -----------------------------
        function backgroundImageInit() {
            $('.header').each(function () {
                if ($(this).attr('data-image-bg')) {
                    //hide in retina
                    $(this).css({
                        'background': ' url(' + $(this).data('image-bg') + ') center center / cover no-repeat'
                    });
                }
            });
        }
        // -----------------------------
        // Masonry And Filter
        // -----------------------------
        function masonryWithFilter() {
            $(function () {
                var self = $(".grid");
                self.imagesLoaded(function () {
                    self.masonry({
                        isAnimated: true,
                        itemSelector: ".grid-item"
                    });
                });
                $(".btn-group button").on('click',(function (e) {
                    e.preventDefault();

                    var filter = $(this).attr("data-filter");

                    self.masonryFilter({
                        filter: function () {
                            if (!filter) return true;
                            return $(this).attr("data-filter") == filter;
                        }
                    });
                }));
            });
        }
        // -----------------------------
        // MAGNIFIC POPUP
        // -----------------------------
        function mfpPopups() {
            /***MAGNIFIC POPUP***/
            $('.popup-image').magnificPopup({
                type: 'image',
                removalDelay: 160, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function () {
                        // just a hack that adds mfp-anim class to markup
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                        this.st.mainClass = this.st.el.attr('data-effect');
                    }
                },
                closeOnContentClick: true,
                midClick: true,
                fixedContentPos: false,
                fixedBgPos: true
            });
            /***MAGNIFIC POPUP VIDEO***/
            $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
            /***MAGNIFIC POPUP GALLERY***/
            $('.popup-gallery-link').on('click', function () {
                $(this).next().magnificPopup('open');
            });

            $('.popup-gallery').each(function () {
                $(this).magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    removalDelay: 160,
                    callbacks: {
                        beforeOpen: function () {
                            // just a hack that adds mfp-anim class to markup
                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    },
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true
                    },
                    fixedContentPos: false
                });
            });
            $('.open-popup-link').magnificPopup({
                type: 'inline',
                removalDelay: 160, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function () {
                        // just a hack that adds mfp-anim class to markup
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                        this.st.mainClass = this.st.el.attr('data-effect');
                    }
                },
                closeOnContentClick: false,
                midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
            });
        }
        // -----------------------------
        // MAIL TO
        // -----------------------------
        $('form#contact-form').on('submit', function (e) {
            e.preventDefault(); //Prevents default submit
            var form = $(this);
            $("#submit").attr('disabled', 'disabled'); //Disable the submit button on click
            var post_data = form.serialize(); //Serialized the form data
            $.ajax({
                type: 'POST',
                url: 'assets/php/mail_handler.php', // Form script
                data: post_data
            })
                .done(function () {
                    $("#message span").html("ENVIADO SATISFACTORIAMENTE");
                    $(form)[0].reset();
                    $("#submit").removeAttr('disabled', 'disabled');
                })
                .fail(function () {
                    $("#message span").html("¡ALGO SALIÓ MAL! INTÉNTALO DE NUEVO");
                    $(form)[0].reset();
                    $("#submit").removeAttr('disabled', 'disabled');
                });
        });
        // -----------------------------
        // Smmoth Scroll
        // -----------------------------
        function smoothScroll() {
            $('a.page-scroll').on('click', function (event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: ($($anchor.attr('href')).offset().top - 0)
                }, 1500);
                event.preventDefault();
            });
        }
        // -----------------------------
        // TO TOP
        // -----------------------------
        //Click event to scroll to top
        $('.scroll-top').on('click',(function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        }));
        textRotate();
        backgroundImageInit();
        mfpPopups();
        smoothScroll();
        /***ON-LOAD***/
        jQuery(window).on('load', function () {
            masonryWithFilter();
        });

    });

})(jQuery);