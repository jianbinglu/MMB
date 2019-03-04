$(function () {
    function getretUrl() {
        var str = location.search;
        str = decodeURI(str);
        str = str.slice(1);
        var arr = str.split('&');
        var obj = {};
        arr.forEach((v) => {
            var key = v.split('=')[0] ;
            var value = v.split('=')[1];
            obj[key] = value;
        })
        for (var k in obj) {
            return [k, obj[k]];
        }
    }
    var res = getretUrl();
    $('.title .fl a:nth-child(2)').text((res[0] || '电视') + ' >' );
    (function () {
        $.ajax({
            url: "http://127.0.0.1:9090/api/getproduct",
            data: {
                productid: res[1] || 0,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                $('.banner p').html(info.result[0].productName);
                $('.banner .img').html(info.result[0].productImg);
                $('.title .fl a:nth-child(3)').text(info.result[0].productName.split(' ')[0]);
                $('.mode').html(info.result[0].bjShop);
                $('.mode table tr td span').css({
                    width: '114px',
                    height: '46px',
                    display: 'block',
                    marginBottom: '5px',
                    fontSize: '18px',
                    textAlign: 'center',
                    lineHeight: '46px'
                });
            }
        })
    }());
    (function(){
        $.ajax({
            url:'http://127.0.0.1:9090/api/getproductcom',
            data: {
                productid: res[1],
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                $('.cont').html(template('useTemp',info));
                isScroll();
            }
        })
    }())
})