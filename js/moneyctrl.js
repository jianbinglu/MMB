$(function(){
    var pageid = 0;
    render();
    var pagination = 0;
    function render(){
         $.ajax({
             url:'http://127.0.0.1:9090/api/getmoneyctrl',
             data:{
                 pageid:pageid
             },
             dataType:'json',
             success:function(info){
                 console.log(info);
                 
                $('.content').html(template('itemTemp',info));
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
    }
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
})