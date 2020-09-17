$(document).ready(function() {

    //menu mobile
    $('.close').on('click', function () {
        $(this).toggleClass('opened');
        $(this).hasClass('opened') ? $('.header .menu, .header').addClass('opened') : $('.header .menu,  .header').removeClass('opened');
    });

    //sliders
    document.querySelectorAll('.swiper-container').forEach(function (e) {
        if (e.classList.contains("slider")) {
                swiper = new Swiper(e, {
                effect: 'coverflow',
                loop: true,
                speed: 1500,
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 7,
                autoplay: true,
                coverflowEffect: {
                    scale: 0.8,
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 1,
                    slideShadows: false
                },
                breakpoints: {
                    1320: {
                        slidesPerView: 7
                    },
                    991: {
                        slidesPerView: 4
                    },
                    320: {
                        slidesPerView: 3
                    },
                    280: {
                        slidesPerView: 1
                    }
                }
            })
        };
        if (e.classList.contains("slider-2")) {
                swiper = new Swiper(e, {
                loop: true,
                speed: 1500,
                slidesPerView: 1,
                autoplay: true,
                navigation: {
                    nextEl: e.parentElement.querySelector('.swiper-button-next'),
                    prevEl: e.parentElement.querySelector('.swiper-button-prev'),
                },
            })
        };
        if (e.classList.contains("slider-3")) {
                swiper = new Swiper(e, {
                loop: true,
                speed: 1000,
                spaceBetween: 150,
                slidesPerView: 5,
                autoplay: true,
                navigation: {
                    nextEl: e.parentElement.querySelector('.swiper-button-next'),
                    prevEl: e.parentElement.querySelector('.swiper-button-prev'),
                },
                breakpoints: {
                    1920: {
                        spaceBetween: 150,
                    },
                    1320: {
                        slidesPerView: 5,
                        spaceBetween: 150,
                    },
                    991: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 50
                    },
                    280: {
                        slidesPerView: 1
                    }
                }
            })
        };
    });

    //forms input animation
    function filled() {
        document.querySelectorAll('input').forEach(function (e) {
            e.value !== '' ? e.classList.add('filled') : '';
            e.oninput = function() {
                e.value !== '' ? e.classList.add('filled') : e.classList.remove('filled');
            };
        })
    }
    filled();

    //phone mask

    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select();
        }
    }

    function funMask(event) {
        var that = event.target;
        var matrix = "+__(___)-___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = that.value.replace(/\D/g, "");
        if (def.length >= val.length) {
            val = def;
        }
        that.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });
        if (event.type === "blur") {
            if (that.value.length === 2) {
                that.value = "";
            }
        } else {
            setCursorPosition(that.value.length, that);
        }
    }

    var $telForm = $("input[type='tel']");
    $telForm.on("focus click blur input", funMask);

    //scroll animation
    SmoothScroll({
        keyboardSupport: true,
        animationTime: 1000,
        stepSize: 120,
    });

    //scroll animation 2
    function animationTrigger() {
        var $animation_elements = $(".js_st");
        var $window = $(window);
        $window.on("scroll resize", check_if_in_view);
        $window.trigger("scroll");

        function check_if_in_view() {
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_bottom_position = window_top_position + window_height;

            $.each($animation_elements, function() {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = element_top_position + element_height;

                if (
                    element_bottom_position >= window_top_position &&
                    element_top_position <= window_bottom_position
                ) {
                    $element.addClass("in-view");
                } else {
                    $element.removeClass("in-view");
                }
            });
        }
    }
    animationTrigger();


});
