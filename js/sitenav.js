$(function(){
   (function(){
    $.ajax({
        url:'http://127.0.0.1:9090/api/getsitenav',
        dataType:'json',
        success(info){
            $('.product ul').html(template('ulTemp',info));
            isScroll();
        }
    })
   }());
})