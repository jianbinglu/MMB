$(function () {
    function getretUrl() {
        var str = location.search;
        str = decodeURI(str || '?平板电视=0');
        console.log(str);

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
    var res = getretUrl();
    $('.category .title p span:first-child').text(res[0]);
    (function () {
        $.ajax({
            url: 'http://127.0.0.1:9090/api/getbrand',
            data: {
                brandtitleid: res[1]
            },
            dataType: 'json',
            success(info) {
                $('.category .bigUl').html(template('cateTemp', info));
            }
        })
    }());
    var pagesize = 4;
    var index = 0;
    var info1;
    var info2;
    (function () {
        $.ajax({
            url: 'http://127.0.0.1:9090/api/getbrandproductlist',
            data: {
                brandtitleid: res[1],
                pagesize: pagesize
            },
            dataType: 'json',
            success(info) {
                info1 = info;
                console.log(info);
                
                $('.category .content').html(template('itemTemp', info));
                isScroll();
            }
        })
    }());
    function htmlStr1(info, index) {
        if(index > info.result.length-1){
            index = 0;
        }
        var htmlstr = '<div class="discu">' +
            '<div class="item">' +
            '<a href="javascript:;" data-id="1">' +
            '<div class="left">' +
             (info.result[index].productImg) +
            '</div>' +
            '<div class="right">' +
            '<div class="info">' +
            '<p>' + (info.result[index].productName) + '</p>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</div>';
        return htmlstr;
    };


    var productid = 1;
    render();
    function render() {
        $.ajax({
            url: 'http://127.0.0.1:9090/api/getproductcom',
            data: {
                productid: productid,
            },
            dataType: 'json',
            success(info) {
                console.log(info);
                var htmlStr = '';
                for (var i = 0; i < info.result.length; i++) {
                    var htmlstr2 =
                        '<div class="cont">' +
                        ' <div class="titl clearfix">' +
                        '<span class="fl">' + (info.result[i].comName) + '</span>' +
                        '<span class="fr">' + (info.result[i].comTime) + '</span>' +
                        '</div>' +
                        '<p>' + (info.result[i].comContent) + '<span>' + (info.result[i].comFrom) + '</span>  </p>' +
                        '</div>' +
                        '</div>';
                        htmlStr += htmlStr1(info1, index) + htmlstr2;
                }
                $('.category .discuss').html(htmlStr);
                isScroll();
            }
        })
    }

    $('.content').on('click','a',function(){
        productid = $(this).data('id');
        index = $(this).parent().index();
        render();
    })
})