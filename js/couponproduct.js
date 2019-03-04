$(function () {
    function getretUrl() {
        var str = location.search;
        str = decodeURI(str);
        str = str.slice(1);
        var arr = str.split('&');
        var obj = {};
        arr.forEach((v) => {
            var key = v.split('=')[0];
            var value = v.split('=')[1];
            obj[key] = value;
        })
        for (var k in obj) {
            return [k, obj[k]];
        }
    }
    var res = getretUrl()[1] || 0;
    var h3Text = getretUrl()[0] || '肯德基';
    $('.header h3 span').text(h3Text);
    var index = 0;

    (function () {
        $.ajax({
            url: 'http://127.0.0.1:9090/api/getcouponproduct',
            data: {
                couponid: res
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.product').html(template('itemTemp', info));
                $('.model .imgs').html(template('imgTemp', info));
                isScroll();
            }
        })
    }());

    $('.product').on('click', '.item', function () {
        // $('.model').css('display', 'block');
        $('.model').stop().fadeIn();
    })
    $('.model .close').on('click', function () {
        $('.model').css('display', 'none');
    })
    $('.model .left').on('click', function () {
        var $imgs = $('.model .imgs img');
        index--;
        if (index < 0) {
            index = $imgs.length - 1;
        }
        $imgs.eq(index).animate({opacity:1},500).siblings().css({opacity:0},500);
    })
    $('.model .right').on('click', function () {
        var $imgs = $('.model .imgs img');
        index++;
        if (index > $imgs.length - 1) {
            index = 0;
        }
        // $imgs.eq(index).fadeIn();
        
        $imgs.eq(index).stop().animate({opacity:1},500).siblings().stop().animate({opacity:0},500);
    })
})