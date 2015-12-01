(function() {

	var htmlString = '<div class="floating-button float-left waves-effect waves-light">' +
	'<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">' +
	'<path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/>' +
	'</svg></div><div class="floating-button float-right waves-effect waves-light">' +
	'<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">' +
	'<path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/>' +
	'</svg></div>';

	// Declare the method

	$.fn.initSlide = function() {
		var obj = this;
		var $slide = this;
		var numberOfSlides = this.children().length;


		this.position = 0;
		this.nameElement;
		this.names;

		this.append(htmlString + '<div class="indicators"></div>');

		$('.float-left', $slide).css('transform', 'translateX(-72px)');

		for (var i = 0; i < numberOfSlides; i++)
			$('.indicators', $slide).append('<div class="indicator"></div>');
		$('.indicators', $slide).children().first().addClass('active');

		var value = $('.indicators', $slide).children().length * 28;
		console.log(value);
		$('.indicators', $slide).css('width', value);
		this.changeSlide = function(i) {
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

				$('.content', $slide).each(function() {
					$(this).css('transform', "translateX(" + -obj.position * (window.innerWidth + 4.5) + "px)");
				});

				try {
					$(obj.nameElement).text(obj.names[obj.position]);
				} catch(e) {

				}

				$('.indicators', $slide).children().each(function() {
					$(this).removeClass('active');
				});
				$('.indicators', $slide).children().eq(i).addClass('active');
			}
		};

		$('.floating-button', $slide).on('click', function() {
			if ($(this).hasClass("float-left")) {
				obj.changeSlide(obj.position - 1);
			} else {
				obj.changeSlide(obj.position + 1);
			}
		});

		$(window).on('resize', function() {
			var position = obj.position;
			$('.content', $slide).each(function() {
				$(this).css('transform', "translateX(" + -position * (window.innerWidth + 4.5) + "px)");
			});
		});

		$('.content', $slide).on('transitionstart', function() {
			$slide.addClass('non-selectable');
		});

		$('.content', $slide).on('transitionend', function() {
			$slide.removeClass('non-selectable');
		});

		this.getPosition = function() {
			return obj.position;
		};

		this.setNameElement = function(el) {
			this.nameElement = el;
			$(obj.nameElement).text(obj.names[obj.position]);
		}

		this.setNames = function(names) {
			this.names = names;
		};

		return this;
	};

})();