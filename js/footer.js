
// 侧边栏js

$(window).on('scroll',function(){
    // 获取滚动条卷去内容高度
    var scrollToTop = $(this).scrollTop();

    // 判断
    if (scrollToTop >= 200 ) {
        $('.backTop').css('display','block');
    }else {
        $('.backTop').css('display','none');
    }
});

$('.backTop').click(function(){
    $('html,bofy').animate({
        scrollTop:0
    },1000);
});


// 底部js

// 鼠标进入小图标按钮，显示二维码，字体变色
$('.imgBtn').find('img').mouseenter(function(){
    // 保存当前的img小图标下标
    var inx = $(this).index();
    // 显示对应div二维码
    $('.cloudImg').eq(inx).show();
    // 电话号码变色
    $('.telAndOther h3').css('color','#666');
    $('.telAndOther p').css('color','#333');
});
// 鼠标离开小图标按钮，隐藏二维码
$('.imgBtn').find('img').mouseleave(function(){
    // 保存当前的img小图标下标
    var inx = $(this).index();
    // 显示对应div二维码
    $('.cloudImg').eq(inx).hide();
    // 电话号码变色
    $('.telAndOther h3').css('color','#fff');
    $('.telAndOther p').css('color','#a6a7aa');
});