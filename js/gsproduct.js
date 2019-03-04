$(function () {
    var did = 0;
    var aid = 0;
    function render() {
        $.ajax({
            url: 'http://127.0.0.1:9090/api/getgsshop',
            dataType: 'json',
            success(info) {
                $('.titlenav ul.shop').html(template('titleTemp', info));
            },
        })
    };
    function rende() {
        $.ajax({
            url: 'http://127.0.0.1:9090/api/getgsshoparea',
            dataType: 'json',
            success(info) {
                $('.titlenav ul.area').html(template('titlTemp', info));
            },
        })
    };
    function rend(){
        $.ajax({
            url:'http://127.0.0.1:9090/api/getgsproduct',
            data:{
                shopid : did,
                areaid : aid
            },
            dataType:'json',
            success(info){
                console.log(info);
                $('.product').html(template('itemTemp',info));
                isScroll();
            }
        })
    }
    rend();
    render();
    rende();
    $('.titlenav .left .it:first-child').on('click', function () {
        $('.titlenav ul.shop').stop().slideToggle();
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        $('.titlenav ul.area').css('display', 'none');
        $('.titlenav .left .it:nth-child(2)').find('i').addClass('fa-angle-down').removeClass('fa-angle-up');

    });
    $('.titlenav .left .it:nth-child(2)').on('click', function () {
        $('.titlenav ul.area').stop().slideToggle();
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        $('.titlenav ul.shop').css('display', 'none');
        $('.titlenav .left .it:first-child').find('i').addClass('fa-angle-down').removeClass('fa-angle-up');
    });
    $('.titlenav ul.shop').on('click', 'a', function () {
        var txt = $(this).text();
        did = $(this).data('id');
        $('.titlenav .left .it:first-child span').text(txt);
        $('.titlenav ul.shop').css('display', 'none');
        $('.titlenav .left .it:first-child').find('i').addClass('fa-angle-down').removeClass('fa-angle-up');
        rend();
    })
    $('.titlenav ul.area').on('click', 'a', function () {
        var txt = $(this).text().substr(0,2);
        aid = $(this).data('id');
        $('.titlenav .left .it:nth-child(2) span').text(txt);
        $('.titlenav ul.area').css('display', 'none');
        $('.titlenav .left .it:nth-child(2)').find('i').addClass('fa-angle-down').removeClass('fa-angle-up');
        rend();
    });

})