$(function(){
    (function(){
        $.ajax({
            url:"http://127.0.0.1:9090/api/getcategorytitle",
            dataType:'json',
            success:function(info){
                $('.category .bigUl').html(template('cateTemp',info));
                isScroll();
            }
        });
       
    }())
    $('.category .bigUl').on('click','li',function(){
        var id = $(this).data('id');
        var $that = $(this);
        $.ajax({
            url:"http://127.0.0.1:9090/api/getcategory",
            data:{
                titleid:id
            },
            dataType:'json',
            success:function(info){
                var $child = $that.find('.child');
                if($child.lenght != 0 && $child.length <= 0){
                    console.log(info);
                    
                    $that.append(template('liTemp',info));
                    var $chi = $that.find('.child');
                    $chi.stop().slideDown(500);
                    isScroll();
                }
                if($that.find('i').hasClass('fa-angle-down')){
                    var $chi = $that.find('.child');
                    $that.find('i').removeClass('fa-angle-down');
                    $that.find('i').addClass('fa-angle-up');
                    $chi.stop().slideDown(500);
                    isScroll();
                    
                }else{
                    var $chi = $that.find('.child');
                    $that.find('i').removeClass('fa-angle-up');
                    $that.find('i').addClass('fa-angle-down');
                    $chi.stop().slideUp(500);
                    isScroll();
                }           
            }
        })        
    });
})