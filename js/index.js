$(function(){
    (function(){
        $.ajax({
            url:'http://127.0.0.1:9090/api/getindexmenu',
            dataType:'json',
            success:function(info){
                $('.nav ul').html(template('navTemp',info));
            }
        })
    }())
    $('.nav ul').on('click','li',function(e){
        var index = $(this).index();
        if(index === 7){
            var $lis = $('.nav ul li:nth-last-child(-n+4)');
            $lis.stop().slideToggle(500);
        }
    });
    (function(){
        $.ajax({
            url:"http://127.0.0.1:9090/api/getmoneyctrl",
            dataType:"json",
            success:function(info){
                console.log(info);
                $('.product .content').html(template('itemTemp',info))
                new IScroll('.container', {
                    scrollX: false,
                    scrollY: true
                  })
            }
        })
    }())
})