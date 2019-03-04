function isScroll() {
    $('.container').height();
    new IScroll('.container', {
        scrollX: false,
        scrollY: true
    })
    
}
$('.foot-nav.clearfix a:last-child').on('click',function(){
    $('.box').css({
        transform:'translateY(0)',
    })
})
