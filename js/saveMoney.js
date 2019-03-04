$(function(){
    function getretUrl(){
        var str = location.search;
        str = decodeURI(str);
        str = str.slice(1);
        var arr = str.split('&');
        var obj = {};
        arr.forEach((v)=>{
            var key = v.split('=')[0];
            var value = v.split('=')[1];
            obj[key] = value;
        })
        for(var k in obj){
            return [k,obj[k]];
        }
    }
    var res = +(getretUrl()[1] || 31);
    console.log(res);
    
    (function(){
        $.ajax({
            url:"http://127.0.0.1:9090/api/getmoneyctrlproduct",
            data:{
                productid : res || 0
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                $('.product .content').html(template('itemTemp',info));
                $('.comment').html(template('commentTemp',info));
                isScroll();
            }   
        })
    }());

})