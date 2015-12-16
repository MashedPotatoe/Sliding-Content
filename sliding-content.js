(function () {

    var htmlString = '<div class="floating-button float-left waves-effect waves-light">' +
        '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/>' +
        '</svg></div><div class="floating-button float-right waves-effect waves-light">' +
        '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/>' +
        '</svg></div>';

    // Declare the method

    var defaultOps = {
        name: null,
        autoSlide: false,
        autoSlideTime: 5000,
        autoSlideDelay: 300
    }

    $.fn.initSlide = function (userObj) {
        var options = $.extend({}, defaultOps, userObj);

        var obj = this;
        var $slide = this;
        var numberOfSlides = this.children().length;


        this.position = 0;

        this.append(htmlString + '<div class="indicators"></div>');

        $('.float-left', $slide).css('transform', 'translateX(-72px)');

        for (var i = 0; i < numberOfSlides; i++)
            $('.indicators', $slide).append('<div class="indicator"></div>');
        $('.indicators', $slide).children().first().addClass('active');

        var value = $('.indicators', $slide).children().length * 22 + 22;
        $('.indicators', $slide).css('width', value);
        this.changeSlide = function (i) {
            if (!(i < 0) && !(i >= numberOfSlides)) {
                obj.position = i;

                switch (obj.position) {
                    case 0:
                        $('.float-left', $slide).css('transform', 'translateX(-80px)');
                        break;
                    case numberOfSlides - 1:
                        $('.float-right', $slide).css('transform', 'translateX(80px)');
                        break;
                    default:
                        $('.float-left', $slide).css('transform', 'translateX(0px)');

                        $('.float-right', $slide).css('transform', 'translateX(0px)');
                        break;
                }

                $('.content', $slide).each(function () {
                    $(this).css('transform', "translateX(" + -obj.position * (window.innerWidth + 4.5) + "px)");
                });

                if (options.name != null) {
                    $(options.name.nameElement).text(options.name.names[obj.position]);
                }

                $('.indicators', $slide).children().each(function () {
                    $(this).removeClass('active');
                });
                $('.indicators', $slide).children().eq(i).addClass('active');

                obj.trigger("contentchange");
            }
        };

        $('.floating-button', $slide).on('click', function () {
            if ($(this).hasClass("float-left")) {
                obj.changeSlide(obj.position - 1);
            } else {
                obj.changeSlide(obj.position + 1);
            }

            obj.trigger("buttonclick");
        });

        $(window).on('resize', function () {
            var position = obj.position;
            $('.content', $slide).each(function () {
                $(this).css('transform', "translateX(" + -position * (window.innerWidth + 4.5) + "px)");
            });
        });

        $('.content', $slide).on('transitionstart', function () {
            $slide.addClass('non-selectable');
        });

        $('.content', $slide).on('transitionend', function () {
            $slide.removeClass('non-selectable');
        });

        this.getPosition = function () {
            return obj.position;
        };

        this.setNameElement = function (el) {
            options.name.nameElement = el;
            $(options.name.nameElement).text(options.name.names[obj.position]);
        }

        this.setNames = function (names) {
            options.name.names = names;
        };

        $('iframe.content', $slide).each(function () {
            $(this).load(function () {
                var oldActive = document.activeElement;
                /* getting active Element */
                var frame = this;

                var interval;
                $slide.mouseenter(function () {
                    /* Setting interval to 1ms for getting eventually x,y mouse coords*/
                    oldActive = document.activeElement;
                    interval = setInterval(onFocus, 1);
                });

                $slide.mouseleave(function () {
                    /* clear interval cause we arent over the element anymore*/
                    clearInterval(interval);
                });

                function onFocus() {
                    /* if the focus has changed to the iframe */
                    if (oldActive != frame && document.activeElement == frame) {
                        oldActive = document.activeElement;
                        obj.trigger("iframefocus");
                    }
                }
            });
        });

        // Listener Work

        var listeners = {
            "contentchange": [],
            "iframefocus": [],
            "buttonclick": []
        };

        this.trigger = function (triggerName) {
            var trigger = listeners[triggerName];
            for (var i = 0; i < trigger.length; i++)
                trigger[i]();

            return obj;
        };

        this.addListener = function (triggerName, method) {
            var trigger = listeners[triggerName];
            trigger.push(method);

            return obj;
        };

        // Other Stuff

        if (options.name != null) {
            obj.setNameElement(options.name.nameElement);
            obj.setNames(options.name.names);
        }

        if (options.autoSlide) {
            setTimeout(function () {
                var autoSlideInterval = setInterval(function () {
                    if (obj.position != numberOfSlides - 1) {
                        obj.changeSlide(obj.position + 1);
                    } else {
                        obj.changeSlide(0);
                    }
                }, options.autoSlideTime);

                function clearSlideInterval() {
                    clearInterval(autoSlideInterval);
                }

                obj.addListener('iframefocus', clearSlideInterval).addListener('buttonclick', clearSlideInterval);
            }, options.autoSlideDelay);
        }

        return this;
    };

})();