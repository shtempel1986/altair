/**
 * Created by Павел on 17.03.2017.
 */
$(document).ready(function () {

    /*
     * Анимация для первого слайдера
     * */

    var $workItems = $('.work-slider__item');

    var windowWidth = $(window).width();

    var $workSlider = $('.work-slider');

    var numberOfWorks = $workItems.length;

    var containerWidth = 960;

    jQuery.fn.twoDigitText = function (number) {
        if (number <= 0) {
            this.text('01');
        } else if (number > 0 && number <= 9) {
            this.text('0' + number);
        } else {
            this.text(number);
        }
    };

    var changeCurrentWork = function (numberWork) {
        $('#work__number').twoDigitText(numberWork);
    };

    var moveSlider = function () {
        var currentWork = parseInt($('#work__number').text());
        $('.work-slider').animate({
            'left': -((currentWork - 1) * 960
            )
        }, 500);
    };

    $('.work__paginator').removeClass('hidden');

    $workItems.removeClass('hidden');

    $('#work__all').twoDigitText(numberOfWorks);

    $('#work__next, #work__prev').addClass('clickable');

    $workSlider
        .parent('.container').css({
        position: 'relative',
        "padding-top": 540,
        overflow: 'hidden'
    }).end()
        .css({
            position: 'absolute',
            top: 0,
            left: 0,
            height: 300
        });

    $workItems.css('float', 'left');

    if (windowWidth > 960) {
        $workSlider.width(($workItems.length) * 960);
        $workItems.width(960);
    }

    $('#work__next').click(function () {
        var currentWork = parseInt($('#work__number').text());
        if (currentWork == numberOfWorks) {
            currentWork = 1;
        } else {
            currentWork++;
        }
        changeCurrentWork(currentWork);
        moveSlider()
    });

    $('#work__prev').click(function () {
        var currentWork = parseInt($('#work__number').text());
        if (currentWork == 1) {
            currentWork = numberOfWorks
        } else {
            currentWork--;
        }
        changeCurrentWork(currentWork);
        moveSlider()
    });
    /*
     * Конец анимации для первого слайдера
     * */

    /*
     * Второй слайдер
     * */

    var $blogItems = $('.blog-item'),
        blogItemsQuantity = $blogItems.length,
        $blogSlider = $('.blog-slider'),
        blogRowWidth = (blogItemsQuantity * 400),
        $blogSliderCaret = $('.blog-slider__caret');

    $blogItems.removeClass('hidden');

    $blogSlider.removeClass('hidden');

    $('.blog-row').css('width', blogRowWidth);

    $blogSliderCaret.width(940 / (blogRowWidth / containerWidth));

    $blogSliderCaret.on('mousedown', function (event) {
        var $this = $(this);
        var posParent;
        var startPos;
        var thisPos;
        thisPos = $this.offset();
        posParent = $blogSlider.offset();
        startPos = event.pageX - thisPos.left;
        $(document).mousemove(function (event1) {
            var currentPos = event1.pageX - posParent.left - startPos;
            if(currentPos < 0){
                $this.css({'left': 0})
            } else if ((currentPos + $this.width()) > $blogSlider.width()){
                $this.css({'left': ($blogSlider.width() - $this.width())});
            }else{
                $this.css({'left': (currentPos)});
            }
        });
    });
    $(document).mouseup(function () {
        $(document).off('mousemove')
    });

});