$(function(){
    (function(){
        $.ajax({
            url:'http://127.0.0.1:9090/api/getbaicaijiatitle',
            dataType:"json",
            success:function(info){
                $('.title ul').html(template('titleTemp',info));
                var $lis = $('.title ul li');
                var num = 0;
                $lis.each((i,v)=>{
                    num+=$(v).innerWidth();                    
                })
                $('.title ul').width('20.54rem');
                
                new IScroll('.title', {
                    scrollX: true,
                    scrollY: false
                });
            }
        })
    }());
    var titleid = 0;
    render();
    function render(){
        $.ajax({
            url:'http://127.0.0.1:9090/api/getbaicaijiaproduct',
            data:{
                titleid:titleid,
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                $('.product').html(template('itemTemp',info));
                isScroll();
            }
        })
    }
    $('.title ul').on('click','a',function(){
        $('.title ul a').removeClass('current');
        $(this).addClass('current');
        var id = $(this).data('id');
        titleid = id;
        render();
    })
})