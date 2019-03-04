$(function(){
    (function(){
        $.ajax({
            url:'http://127.0.0.1:9090/api/getbrandtitle',
            dataType:'json',
            success(info){
                console.log(info);
                $('.category .bigUl').html(template('cateTemp',info));
                isScroll();
            }
        })
    }())
})