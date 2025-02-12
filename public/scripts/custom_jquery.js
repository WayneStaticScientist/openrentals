(function($) {
    "use strict";
    $(document).ready(function() {
        $(function() {
            function mmenuInit() {
                var wi = $(window).width();
                if (wi <= '992') {
                    $('#footer').removeClass("sticky-footer");
                    $(".mmenu-init").remove();
                    $("#navigation").clone().addClass("mmenu-init").insertBefore("#navigation").removeAttr('id').removeClass('style-1 style-2').find('ul').removeAttr('id');
                    $(".mmenu-init").find(".container").removeClass("container");
                    $(".mmenu-init").mmenu({
                        "counters": true
                    }, {
                        offCanvas: {
                            pageNodetype: "#wrapper"
                        }
                    });
                    var mmenuAPI = $(".mmenu-init").data("mmenu");
                    var $icon = $(".hamburger");
                    $(".mmenu-trigger").click(function() {
                        mmenuAPI.open();
                    });
                    mmenuAPI.bind("open:finish", function() {
                        setTimeout(function() {
                            $icon.addClass("is-active");
                        });
                    });
                    mmenuAPI.bind("close:finish", function() {
                        setTimeout(function() {
                            $icon.removeClass("is-active");
                        });
                    });
                }
                $(".mm-next").addClass("mm-fullsubopen");
            }
            mmenuInit();
            $(window).resize(function() {
                mmenuInit();
            });
        });
        $('.user-menu').on('click', function() {
            $(this).toggleClass('active');
        });
        $("#header").not("#header-container.header-style-2 #header").clone(true).addClass('cloned unsticky').insertAfter("#header");
        $("#navigation.style-2").clone(true).addClass('cloned unsticky').insertAfter("#navigation.style-2");
        $("#logo .sticky-logo").clone(true).prependTo("#navigation.style-2.cloned ul#responsive");
        var headerOffset = $("#header-container").height() * 2;
        $(window).scroll(function() {
            if ($(window).scrollTop() >= headerOffset) {
                $("#header.cloned").addClass('sticky').removeClass("unsticky");
                $("#navigation.style-2.cloned").addClass('sticky').removeClass("unsticky");
            } else {
                $("#header.cloned").addClass('unsticky').removeClass("sticky");
                $("#navigation.style-2.cloned").addClass('unsticky').removeClass("sticky");
            }
        });
        $('.top-bar-dropdown').on('click', function(event) {
            $('.top-bar-dropdown').not(this).removeClass('active');
            if ($(event.target).parent().parent().attr('class') == 'options') {
                hideDD();
            } else {
                if ($(this).hasClass('active') && $(event.target).is("span")) {
                    hideDD();
                } else {
                    $(this).toggleClass('active');
                }
            }
            event.stopPropagation();
        });
        $(document).on('click', function(e) {
            hideDD();
        });

        function hideDD() {
            $('.top-bar-dropdown').removeClass('active');
        }
        $('#map-container .adv-search-btn').on('click', function(e) {
            if ($(this).is(".active")) {
                $(this).removeClass("active");
                $(".utf-main-search-container-area").removeClass("active");
                setTimeout(function() {
                    $("#map-container.homepage-map").removeClass("overflow")
                }, 0);
            } else {
                $(this).addClass("active");
                $(".utf-main-search-container-area").addClass("active");
                setTimeout(function() {
                    $("#map-container.homepage-map").addClass("overflow")
                }, 400);
            }
            e.preventDefault();
        });

        function inlineCSS() {
            $(".some-classes, section.fullwidth, .img-box-background, .flip-banner, .property-slider .item, .fullwidth-property-slider .item, .fullwidth-home-slider .item, .address-container").each(function() {
                var attrImageBG = $(this).attr('data-background-image');
                var attrColorBG = $(this).attr('data-background-color');
                if (attrImageBG !== undefined) {
                    $(this).css('background-image', 'url(' + attrImageBG + ')');
                }
                if (attrColorBG !== undefined) {
                    $(this).css('background', '' + attrColorBG + '');
                }
            });
        }
        inlineCSS();

        function parallaxBG() {
            $('.parallax').prepend('<div class="parallax-overlay"></div>');
            $(".parallax").each(function() {
                var attrImage = $(this).attr('data-background');
                var attrColor = $(this).attr('data-color');
                var attrOpacity = $(this).attr('data-color-opacity');
                if (attrImage !== undefined) {
                    $(this).css('background-image', 'url(' + attrImage + ')');
                }
                if (attrColor !== undefined) {
                    $(this).find(".parallax-overlay").css('background-color', '' + attrColor + '');
                }
                if (attrOpacity !== undefined) {
                    $(this).find(".parallax-overlay").css('opacity', '' + attrOpacity + '');
                }
            });
        }
        parallaxBG();
        $('#titlebar .utf-listing-address').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top - 40
            }, 600);
        });
        $(".tooltip.top").tipTip({
            defaultPosition: "top"
        });
        $(".tooltip.bottom").tipTip({
            defaultPosition: "bottom"
        });
        $(".tooltip.left").tipTip({
            defaultPosition: "left"
        });
        $(".tooltip.right").tipTip({
            defaultPosition: "right"
        });
        var propertyPricing = parseFloat($('.property-price').text().replace(/[^0-9\.]+/g, ""));
        if (propertyPricing > 0) {
            $('.pick-price').on('click', function() {
                $('#amount').val(parseInt(propertyPricing));
            });
        }
        $(document).on('change', function() {
            $("#interest").val($("#interest").val().replace(/,/g, '.'));
        });

        function mortgageCalc() {
            var amount = parseFloat($("#amount").val().replace(/[^0-9\.]+/g, "")),
                months = parseFloat($("#years").val().replace(/[^0-9\.]+/g, "") * 12),
                down = parseFloat($("#downpayment").val().replace(/[^0-9\.]+/g, "")),
                annInterest = parseFloat($("#interest").val().replace(/[^0-9\.]+/g, "")),
                monInt = annInterest / 1200,
                calculation = ((monInt + monInt / (Math.pow(1 + monInt, months) - 1)) * (amount - (down || 0))).toFixed(2);
            if (calculation > 0) {
                $(".calc-output-container").css({
                    'opacity': '1',
                    'max-height': '200px'
                });
                $(".calc-output").hide().html(calculation + ' ' + $('.mortgageCalc').attr("data-calc-currency")).fadeIn(300);
            }
        }
        $('.calc-button').on('click', function() {
            mortgageCalc();
        });
        if ("ontouchstart" in window) {
            document.documentElement.className = document.documentElement.className + " touch";
        }
        if (!$("html").hasClass("touch")) {
            $(".parallax").css("background-attachment", "fixed");
        }

        function fullscreenFix() {
            var h = $('body').height();
            $(".content-b").each(function(i) {
                if ($(this).innerHeight() > h) {
                    $(this).closest(".fullscreen").addClass("overflow");
                }
            });
        }
        $(window).resize(fullscreenFix);
        fullscreenFix();

        function backgroundResize() {
            var windowH = $(window).height();
            $(".parallax").each(function(i) {
                var path = $(this);
                var contW = path.width();
                var contH = path.height();
                var imgW = path.attr("data-img-width");
                var imgH = path.attr("data-img-height");
                var ratio = imgW / imgH;
                var diff = 100;
                diff = diff ? diff : 0;
                var remainingH = 0;
                if (path.hasClass("parallax") && !$("html").hasClass("touch")) {
                    remainingH = windowH - contH;
                }
                imgH = contH + remainingH + diff;
                imgW = imgH * ratio;
                if (contW > imgW) {
                    imgW = contW;
                    imgH = imgW / ratio;
                }
                path.data("resized-imgW", imgW);
                path.data("resized-imgH", imgH);
                path.css("background-size", imgW + "px " + imgH + "px");
            });
        }
        $(window).resize(backgroundResize);
        $(window).focus(backgroundResize);
        backgroundResize();

        function parallaxPosition(e) {
            var heightWindow = $(window).height();
            var topWindow = $(window).scrollTop();
            var bottomWindow = topWindow + heightWindow;
            var currentWindow = (topWindow + bottomWindow) / 2;
            $(".parallax").each(function(i) {
                var path = $(this);
                var height = path.height();
                var top = path.offset().top;
                var bottom = top + height;
                if (bottomWindow > top && topWindow < bottom) {
                    var imgH = path.data("resized-imgH");
                    var min = 0;
                    var max = -imgH + heightWindow;
                    var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow;
                    top = top - overflowH;
                    bottom = bottom + overflowH;
                    var value = 0;
                    if ($('.parallax').is(".titlebar")) {
                        value = min + (max - min) * (currentWindow - top) / (bottom - top) * 2;
                    } else {
                        value = min + (max - min) * (currentWindow - top) / (bottom - top);
                    }
                    var orizontalPosition = path.attr("data-oriz-pos");
                    orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
                    $(this).css("background-position", orizontalPosition + " " + value + "px");
                }
            });
        }
        if (!$("html").hasClass("touch")) {
            $(window).resize(parallaxPosition);
            $(window).scroll(parallaxPosition);
            parallaxPosition();
        }
        if (navigator.userAgent.match(/Trident\/7\./)) {
            $('body').on("mousewheel", function() {
                event.preventDefault();
                var wheelDelta = event.wheelDelta;
                var currentScrollPosition = window.pageYOffset;
                window.scrollTo(0, currentScrollPosition - wheelDelta);
            });
        }

        function searchTypeButtons() {
            $('.search-type label.active input[type="radio"]').prop('checked', true);
            var buttonWidth = $('.search-type label.active').width();
            var arrowDist = $('.search-type label.active').position().left;
            $('.utf-search-type-arrow').css('left', arrowDist + (buttonWidth / 2));
            $('.search-type label').on('change', function() {
                $('.search-type input[type="radio"]').parent('label').removeClass('active');
                $('.search-type input[type="radio"]:checked').parent('label').addClass('active');
                var buttonWidth = $('.search-type label.active').width();
                var arrowDist = $('.search-type label.active').position().left;
                $('.utf-search-type-arrow').css({
                    'left': arrowDist + (buttonWidth / 2),
                    'transition': 'left 0.4s cubic-bezier(.87,-.41,.19,1.44)'
                });
            });
        }
        if ($(".utf-main-search-form-item").length) {
            searchTypeButtons();
            $(window).on('load resize', function() {
                searchTypeButtons();
            });
        }
        var config = {
            '.chosen-select': {
                disable_search_threshold: 10,
                width: "100%"
            },
            '.chosen-select-deselect': {
                allow_single_deselect: true,
                width: "100%"
            },
            '.utf-chosen-select-single-item': {
                disable_search_threshold: 100,
                width: "100%"
            },
            '.utf-chosen-select-single-item.no-search': {
                disable_search_threshold: 10,
                width: "100%"
            },
            '.chosen-select-no-results': {
                no_results_text: 'Oops, nothing found!'
            },
            '.chosen-select-width': {
                width: "95%"
            }
        };
        for (var selector in config) {
            if (config.hasOwnProperty(selector)) {
                $(selector).chosen(config[selector]);
            }
        }
        $('.select-input').each(function() {
            var thisContainer = $(this);
            var $this = $(this).children('select'),
                numberOfOptions = $this.children('option').length;
            $this.addClass('select-hidden');
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');
            var $styledSelect = $this.next('div.select-styled');
            $styledSelect.text($this.children('option').eq(0).text());
            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($styledSelect);
            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }
            var $listItems = $list.children('li');
            $list.wrapInner('<div class="select-list-container"></div>');
            $(this).children('input').on('click', function(e) {
                $('.select-options').hide();
                e.stopPropagation();
                $styledSelect.toggleClass('active').next('ul.select-options').toggle();
            });
            $(this).children('input').keypress(function() {
                $styledSelect.removeClass('active');
                $list.hide();
            });
            $listItems.on('click', function(e) {
                e.stopPropagation();
                $(thisContainer).children('input').val($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
                $list.hide();
            });
            $(document).on('click', function(e) {
                $styledSelect.removeClass('active');
                $list.hide();
            });
            var fieldUnit = $(this).children('input').attr('data-unit');
            $(this).children('input').before('<i class="data-unit">' + fieldUnit + '</i>');
        });
        $('.utf-utf-more-search-options-area-button').on('click', function(e) {
            e.preventDefault();
            $('.utf-more-search-options-area, .utf-utf-more-search-options-area-button').toggleClass('active');
            $('.utf-more-search-options-area.relative').animate({
                height: 'toggle',
                opacity: 'toggle'
            }, 300);
        });
        $('.utf-smt-trigger-item').on('click', function() {
            $('.utf-compare-slidebar-area').toggleClass('active');
        });
        $('.utf-smt-mobile-trigger-item').on('click', function() {
            $('.utf-compare-slidebar-area').removeClass('active');
        });
        $(".compare-button.with-tip, .like-icon.with-tip, .video-button.with-tip, .widget-button.with-tip").each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
            });
            var tipContent = $(this).attr('data-tip-content');
            $(this).append('<div class="tip-content">' + tipContent + '</div>');
        });
        $('.compare-button, .compare-widget-button').on('click', function() {
            $('.utf-compare-slidebar-area').addClass('active');
        });
        $(".utf-remove-compare-item").on('click', function(e) {
            e.preventDefault();
        });
        $('.like-icon, .widget-button').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('liked');
            $(this).children('.like-icon').toggleClass('liked');
        });
        $('.show-more-button').on('click', function(e) {
            e.preventDefault();
            $('.show-more').toggleClass('visible');
        });
        var pxShow = 600;
        var fadeInTime = 300;
        var fadeOutTime = 300;
        var scrollSpeed = 500;
        $(window).scroll(function() {
            if ($(window).scrollTop() >= pxShow) {
                $("#backtotop").fadeIn(fadeInTime);
            } else {
                $("#backtotop").fadeOut(fadeOutTime);
            }
        });
        $('#backtotop a').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, scrollSpeed);
            return false;
        });
        $('.carousel').owlCarousel({
            autoPlay: true,
            navigation: true,
            slideSpeed: 600,
			centerMode: true,
			slidesToShow: 5,
            slidesToScroll: 1,
			dots: true,
            arrows: true,
            nav: true,
            rewind: true,
            autoplayHoverPause: true,
            adaptiveHeight: true,
			items: 3,
            itemsDesktop: [1239, 3],
            itemsTablet: [991, 2],
            itemsMobile: [767, 1]
        });
		$('.testimonial-carousel').owlCarousel({
            autoPlay: true,
            navigation: true,
            slideSpeed: 600,
			centerMode: true,
			slidesToShow: 5,
            slidesToScroll: 1,
			dots: true,
            arrows: true,
            nav: true,
            rewind: true,
			dataLoop:true,
            autoplayHoverPause: true,
            adaptiveHeight: true,
			items: 1,
            itemsDesktop: [1239, 1],
            itemsTablet: [991, 1],
            itemsMobile: [767, 1]
        });
        $('.utf-logo-carousel-item').owlCarousel({
            autoPlay: true,
            navigation: true,
            slideSpeed: 600,
			centerMode: true,
			slidesToShow: 5,
            slidesToScroll: 1,
			dots: true,
            arrows: true,
            nav: true,
            rewind: true,
			dataLoop:true,
            autoplayHoverPause: true,
            adaptiveHeight: true,
            items: 5,
            itemsDesktop: [1239, 4],
            itemsTablet: [991, 3],
            itemsMobile: [767, 1]
        });
        $('.utf-listing-carousel-item').owlCarousel({
            autoPlay: true,
            navigation: true,
            slideSpeed: 800,
			slidesToShow: 5,
            slidesToScroll: 1,
			dots: true,
            arrows: true,
            nav: true,
            rewind: true,
			dataLoop:true,
            autoplayHoverPause: true,
            adaptiveHeight: true,
            items: 1,
            itemsDesktop: [1239, 1],
            itemsTablet: [991, 1],
            itemsMobile: [767, 1]
        });
        $('.owl-next, .owl-prev').on("click", function(e) {
            e.preventDefault();
        });
        $('.property-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
			dataLoop:true,
            asNavFor: '.property-slider-nav',
            centerMode: true,
            slide: ".item",
            adaptiveHeight: true
        });
        $('.property-slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.property-slider',
            dots: true,
            arrows: true,
			dataLoop:true,
            centerMode: false,
            focusOnSelect: true,
            responsive: [{
                breakpoint: 993,
                settings: {
                    slidesToShow: 4,
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            }]
        });
        $('.fullwidth-property-slider').slick({
            centerMode: true,
            centerPadding: '10%',
            slidesToShow: 1,
            responsive: [{
                breakpoint: 1367,
                settings: {
                    centerPadding: '5%'
                }
            }, {
                breakpoint: 993,
                settings: {
                    centerPadding: '0'
                }
            }]
        });
        $('.fullwidth-home-slider').slick({
            centerMode: true,
            centerPadding: '0',
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 1500,
            responsive: [{
                breakpoint: 1367,
                settings: {
                    centerPadding: '0'
                }
            }, {
                breakpoint: 993,
                settings: {
                    centerPadding: '0'
                }
            }]
        });
        $('body').magnificPopup({
            type: 'image',
            delegate: 'a.mfp-gallery',
            fixedContentPos: true,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: false,
            preloader: true,
            removalDelay: 0,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true
            }
        });
        $('.popup-with-zoom-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
        });
        $('.mfp-image').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-fade',
            image: {
                verticalFit: true
            }
        });
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        
		/*----------------------------------------------------*/
        /*  Tabs
        /*----------------------------------------------------*/
        var $tabsNav = $('.utf-popup-tabs-nav-item'),
            $tabsNavLis = $tabsNav.children('li');
        $tabsNav.each(function() {
            var $this = $(this);
            $this.next().children('.utf-popup-tab-content-item').stop(true, true).hide().first().show();
            $this.children('li').first().addClass('active').stop(true, true).show();
        });
        $tabsNavLis.on('click', function(e) {
            var $this = $(this);
            $this.siblings().removeClass('active').end().addClass('active');
            $this.parent().next().children('.utf-popup-tab-content-item').stop(true, true).hide()
                .siblings($this.find('a').attr('href')).fadeIn();
            e.preventDefault();
        });

        var hash = window.location.hash;
        var anchor = $('.tabs-nav a[href="' + hash + '"]');
        if (anchor.length === 0) {
            $(".utf-popup-tabs-nav-item li:first").addClass("active").show(); //Activate first tab
            $(".utf-popup-tab-content-item:first").show(); //Show first tab content
        } else {
            anchor.parent('li').click();
        }

        $('.register-tab').on('click', function(event) {
            event.preventDefault();
            $(".utf-popup-tab-content-item").hide();
            $("#register.utf-popup-tab-content-item").show();
            $("body").find('.utf-popup-tabs-nav-item a[href="#register"]').parent("li").click();
        });

        $('.utf-popup-tabs-nav-item').each(function() {
            var listCount = $(this).find("li").length;
            if (listCount < 2) {
                $(this).css({
                    'pointer-events': 'none'
                });
            }
        });

        function gridLayoutSwitcher() {
            var listingsContainer = $('.utf-listings-container-area');
            if ($(listingsContainer).is(".list-layout")) {
                owlReload();
                $('.utf-layout-switcher a.grid, .utf-layout-switcher a.grid-three').removeClass("active");
                $('.utf-layout-switcher a.list').addClass("active");
            }
            if ($(listingsContainer).is(".grid-layout")) {
                owlReload();
                $('.utf-layout-switcher a.grid').addClass("active");
                $('.utf-layout-switcher a.grid-three, .utf-layout-switcher a.list').removeClass("active");
                gridClear(2);
            }
            if ($(listingsContainer).is(".grid-layout-three")) {
                owlReload();
                $('.utf-layout-switcher a.grid, .utf-layout-switcher a.list').removeClass("active");
                $('.utf-layout-switcher a.grid-three').addClass("active");
                gridClear(3);
            }

            function gridClear(gridColumns) {
                $(listingsContainer).find(".clearfix").remove();
                $(".utf-listings-container-area > .utf-listing-item:nth-child(" + gridColumns + "n)").after("<div class='clearfix'></div>");
            }
            var resizeObjects = $('.utf-listings-container-area .utf-smt-listing-img-container img, .utf-listings-container-area .utf-smt-listing-img-container');

            function listLayout() {
                if ($('.utf-layout-switcher a').is(".list.active")) {
                    $(listingsContainer).each(function() {
                        $(this).removeClass("grid-layout grid-layout-three");
                        $(this).addClass("list-layout");
                    });
                    $('.utf-listing-item').each(function() {
                        var listingContent = $(this).find('.utf-listing-content').height();
                        $(this).find(resizeObjects).css('height', '' + listingContent + '');
                    });
                }
            }
            listLayout();
            $(window).on('load resize', function() {
                listLayout();
            });
            $('.utf-layout-switcher a.grid').on('click', function(e) {
                gridClear(2);
            });

            function gridLayout() {
                if ($('.utf-layout-switcher a').is(".grid.active")) {
                    $(listingsContainer).each(function() {
                        $(this).removeClass("list-layout grid-layout-three");
                        $(this).addClass("grid-layout");
                    });
                    $('.utf-listing-item').each(function() {
                        $(this).find(resizeObjects).css('height', 'auto');
                    });
                }
            }
            gridLayout();
            $('.utf-layout-switcher a.grid-three').on('click', function(e) {
                gridClear(3);
            });

            function gridThreeLayout() {
                if ($('.utf-layout-switcher a').is(".grid-three.active")) {
                    $(listingsContainer).each(function() {
                        $(this).removeClass("list-layout grid-layout");
                        $(this).addClass("grid-layout-three");
                    });
                    $('.utf-listing-item').each(function() {
                        $(this).find(resizeObjects).css('height', 'auto');
                    });
                }
            }
            gridThreeLayout();
            $(window).on('resize', function() {
                $(resizeObjects).css('height', '0');
                listLayout();
                gridLayout();
                gridThreeLayout();
            });
            $(window).on('load resize', function() {
                var winWidth = $(window).width();
                if (winWidth < 992) {
                    owlReload();
                    gridClear(2);
                }
                if (winWidth > 992) {
                    if ($(listingsContainer).is(".grid-layout-three")) {
                        gridClear(3);
                    }
                    if ($(listingsContainer).is(".grid-layout")) {
                        gridClear(2);
                    }
                }
                if (winWidth < 768) {
                    if ($(listingsContainer).is(".list-layout")) {
                        $('.utf-listing-item').each(function() {
                            $(this).find(resizeObjects).css('height', 'auto');
                        });
                    }
                }
                if (winWidth < 1366) {
                    if ($(".fs-listings").is(".list-layout")) {
                        $('.utf-listing-item').each(function() {
                            $(this).find(resizeObjects).css('height', 'auto');
                        });
                    }
                }
            });

            function owlReload() {
                $('.utf-listing-carousel-item').each(function() {
                    $(this).data('owlCarousel').reload();
                });
            }
            $('.utf-layout-switcher a').on('click', function(e) {
                e.preventDefault();
                var switcherButton = $(this);
                switcherButton.addClass("active").siblings().removeClass('active');
                $(resizeObjects).css('height', '0');
                owlReload();
                gridLayout();
                gridThreeLayout();
                listLayout();
            });
        }
        gridLayoutSwitcher();
        $("#utf-area-range-item").each(function() {
            var dataMin = $(this).attr('data-min');
            var dataMax = $(this).attr('data-max');
            var dataUnit = $(this).attr('data-unit');
            $(this).append("<input type='text' class='first-slider-value'disabled/><input type='text' class='second-slider-value' disabled/>");
            $(this).slider({
                range: true,
                min: dataMin,
                max: dataMax,
                step: 10,
                values: [dataMin, dataMax],
                slide: function(event, ui) {
                    event = event;
                    $(this).children(".first-slider-value").val(ui.values[0] + " " + dataUnit);
                    $(this).children(".second-slider-value").val(ui.values[1] + " " + dataUnit);
                }
            });
            $(this).children(".first-slider-value").val($(this).slider("values", 0) + " " + dataUnit);
            $(this).children(".second-slider-value").val($(this).slider("values", 1) + " " + dataUnit);
        });
        $("#utf-price-range-item").each(function() {
            var dataMin = $(this).attr('data-min');
            var dataMax = $(this).attr('data-max');
            var dataUnit = $(this).attr('data-unit');
            $(this).append("<input type='text' class='first-slider-value' disabled/><input type='text' class='second-slider-value' disabled/>");
            $(this).slider({
                range: true,
                min: dataMin,
                max: dataMax,
                values: [dataMin, dataMax],
                slide: function(event, ui) {
                    event = event;
                    $(this).children(".first-slider-value").val(dataUnit + ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                    $(this).children(".second-slider-value").val(dataUnit + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                }
            });
            $(this).children(".first-slider-value").val(dataUnit + $(this).slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
            $(this).children(".second-slider-value").val(dataUnit + $(this).slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
        });
        $(window).on('load resize', function() {
            $('.utf-agents-container-area').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });
            var agentAvatarHeight = $(".utf-agent-avatar img").height();
            var agentContentHeight = $(".utf-agent-content").innerHeight();
            if (agentAvatarHeight < agentContentHeight) {
                $('.agent-page').addClass('long-content');
            } else {
                $('.agent-page').removeClass('long-content');
            }
        });
        $(".tip").each(function() {
            var tipContent = $(this).attr('data-tip-content');
            $(this).append('<div class="tip-content">' + tipContent + '</div>');
        });
        var $tabsNav = $('.tabs-nav'),
            $tabsNavLis = $tabsNav.children('li');
        $tabsNav.each(function() {
            var $this = $(this);
            $this.next().children('.tab-content').stop(true, true).hide().first().show();
            $this.children('li').first().addClass('active').stop(true, true).show();
        });
        $tabsNavLis.on('click', function(e) {
            var $this = $(this);
            $this.siblings().removeClass('active').end().addClass('active');
            $this.parent().next().children('.tab-content').stop(true, true).hide().siblings($this.find('a').attr('href')).fadeIn();
            e.preventDefault();
        });
        var hash = window.location.hash;
        var anchor = $('.tabs-nav a[href="' + hash + '"]');
        if (anchor.length === 0) {
            $(".tabs-nav li:first").addClass("active").show();
            $(".tab-content:first").show();
        } else {
            console.log(anchor);
            anchor.parent('li').click();
        }
        var $accor = $('.accordion');
        $accor.each(function() {
            $(this).toggleClass('ui-accordion ui-widget ui-helper-reset');
            $(this).find('h3').addClass('ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all');
            $(this).find('div').addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');
            $(this).find("div").hide();
        });
        var $trigger = $accor.find('h3');
        $trigger.on('click', function(e) {
            var location = $(this).parent();
            if ($(this).next().is(':hidden')) {
                var $triggerloc = $('h3', location);
                $triggerloc.removeClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideUp(300);
                $triggerloc.find('span').removeClass('ui-accordion-icon-active');
                $(this).find('span').addClass('ui-accordion-icon-active');
                $(this).addClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideDown(300);
            } else if ($(this).is(':visible')) {
                var $triggerloc = $('h3', location);
                $triggerloc.removeClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideUp(300);
                $triggerloc.find('span').removeClass('ui-accordion-icon-active');
            }
            e.preventDefault();
        });
        $(".toggle-container").hide();
        $('.trigger, .trigger.opened').on('click', function(a) {
            $(this).toggleClass('active');
            a.preventDefault();
        });
        $(".trigger").on('click', function() {
            $(this).next(".toggle-container").slideToggle(300);
        });
        $(".trigger.opened").addClass("active").next(".toggle-container").show();
        $("a.close").removeAttr("href").on('click', function() {
            $(this).parent().fadeOut(200);
        });
        var shake = "No";
        $('#message').hide();
        $('#contact input[type=text], #contact input[type=number], #contact input[type=email], #contact input[type=url], #contact input[type=tel], #contact select, #contact textarea').each(function() {});
        $('#name, #comments, #subject').focusout(function() {
            if (!$(this).val()) {
                $(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
            } else {
                $(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
            }
            $('#submit').prop('disabled', false).removeClass('disabled');
        });
        $('#email').focusout(function() {
            if (!$(this).val() || !isEmail($(this).val())) {
                $(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
            } else {
                $(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
            }
        });
        $('#email').focusin(function() {
            $('#submit').prop('disabled', false).removeClass('disabled');
        });
        $('#submit').click(function() {
            $("#contact-message").slideUp(200, function() {
                $('#contact-message').hide();
                $('#name, #subject, #phone, #comments, #website, #email').triggerHandler("focusout");
                if ($('#contact mark.error').size() > 0) {
                    if (shake == "Yes") {
                        $('#contact').effect('shake', {
                            times: 2
                        }, 75, function() {
                            $('#contact input.error:first, #contact textarea.error:first').focus();
                        });
                    } else $('#contact input.error:first, #contact textarea.error:first').focus();
                    return false;
                }
            });
        });
        $('#contactform').submit(function() {
            if ($('#contact mark.error').size() > 0) {
                if (shake == "Yes") {
                    $('#contact').effect('shake', {
                        times: 2
                    }, 75);
                }
                return false;
            }
            var action = $(this).attr('action');
            $('#contact #submit').after('<img src="images/loader.gif" class="loader" />')
            $('#submit').prop('disabled', true).addClass('disabled');
            $.post(action, $('#contactform').serialize(), function(data) {
                $('#contact-message').html(data);
                $('#contact-message').slideDown();
                $('#contactform img.loader').fadeOut('slow', function() {
                    $(this).remove()
                });
                if (data.match('success') != null) $('#contactform').slideUp('slow');
            });
            return false;
        });

        function isEmail(emailAddress) {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            return pattern.test(emailAddress);
        }

        function isNumeric(input) {
            return (input - 0) == input && input.length > 0;
        }
    });
})(this.jQuery);
(function($) {
    $.fn.footerReveal = function(options) {
        $('#footer.sticky-footer').before('<div class="footer-shadow"></div>');
        var $this = $(this),
            $prev = $this.prev(),
            $win = $(window),
            defaults = $.extend({
                shadow: true,
                shadowOpacity: 0.12,
                zIndex: -10
            }, options),
            settings = $.extend(true, {}, defaults, options);
        $this.before('<div class="footer-reveal-offset"></div>');
        if ($this.outerHeight() <= $win.outerHeight()) {
            $this.css({
                'z-index': defaults.zIndex,
                position: 'fixed',
                bottom: 0
            });
            $win.on('load resize', function() {
                $this.css({
                    'width': $prev.outerWidth()
                });
                $prev.css({
                    'margin-bottom': $this.outerHeight()
                });
            });
        }
        return this;
    };
	/*-----------------------------------------
    /*  Preloader
    -----------------------------------------*/
    $(window).on('load', function() {
		setTimeout(function () {
			$(".preloader").delay(700).fadeOut(700).addClass('loaded');
		}, 800);
	});
})(this.jQuery);