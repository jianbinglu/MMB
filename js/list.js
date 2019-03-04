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
    var res = getretUrl();
    var pagination = 0;
    $('.title .fl a:nth-child(3)').text(res[0] || '电视'+' >');   
    var pageid = 1;
    render();
    function render(){
        $.ajax({
            url:'http://127.0.0.1:9090/api/getproductlist',
            data:{
                categoryid:res[1] || 0,
                pageid : pageid
            },
            dataType:'json',
            success:function(info){
                $('.product .content').html(template('itemTemp',info))
                $('.container').height();
                pagination = Math.ceil(info.totalCount / info.pagesize);
                var htmlStr = '';
                for(var i = 0; i < pagination; i++){
                    htmlStr += '<option value="'+(i+1)+'">'+(i+1)+'</option>';
                    $('#pageid').html(htmlStr);
                }
                $('#pageid').val(pageid);
                isScroll();
            }
        })
    };
    $('.pagination .prev').on('click',function(){
        pageid--;
        $('.pagination .next').prop('disabled',false);
        if(pageid < 1){
        pageid = 1;
        $(this).prop('disabled',true);
            return;
        }
        $('#pageid').val(pageid);
        render();
    })
    $('.pagination .next').on('click',function(){
        pageid++;
        $('.pagination .prev').prop('disabled',false);
        if(pageid > pagination){
            pageid = pagination;
            $(this).prop('disabled',true);
            return;
        }
        render();
    })
    $('#pageid').on('change',function(){
        var value = $(this).val();
        pageid = value;
        render();        
    })
    $('.content').on('click','.item>a',function(){
        var id = $(this).data('id');
        location.href = 'oneProduct.html?'+res[0] + '=' + id;
    })

})