// 首页js

// 广告区域

// 图片动画
function imgAni() {
    // 图片动画
    if ( inx <= 1 ) {
        $('.banner').children('li').eq(inx).find('.img_box').stop().animate({bottom:'0px'},1000);
    }else {
        $('.banner').children('li').eq(inx).find('.img_box').stop().animate({bottom:'140px'},1000);
    }
}
// 图片动画---还原初始值
function imgBefore  (){
    if ( inx <= 1 ) {
        $('.banner').children('li').eq(inx).find('.img_box').stop().animate({bottom:'-30px'},500);
    }else {
        $('.banner').children('li').eq(inx).find('.img_box').stop().animate({bottom:'80px'},500);
    }
}
// 轮播图
var inx = 0;

imgAni();

// 右键
$('.right_arrow').click (function(){
    imgBefore();
    // 轮播代码
    inx++;
    if ( inx ==  $('.banner').children('li').length ) {
        inx = 0;
    }
    $('.banner').children('li').eq(inx)
    .fadeIn(500).siblings().fadeOut(500);
    $('.bannerDotted').children('li').eq(inx)
    .addClass('active').siblings().removeClass('active');
    imgAni();
});
// 左键
$('.left_arrow').click (function(){
    imgBefore();
    if ( inx == 0 ) {
        inx = $('.banner').children('li').length;
    }
    inx--;
    $('.banner').children('li').eq(inx)
    .fadeIn(500).siblings().fadeOut(500);
    $('.bannerDotted').children('li').eq(inx)
    .addClass('active').siblings().removeClass('active');
    imgAni();
});
// 自动轮播
var bannerDsq;

bannerTimer();

function bannerTimer() {
    bannerDsq = window.setInterval(function(){
        $('.right_arrow').click ();
    },2000);
}
//鼠标进入banner停止轮播
$('.bannerBox').mouseenter (function(){
    window.clearInterval(bannerDsq);
});

//鼠标离开banner开始轮播
$('.bannerBox').mouseleave (function(){
    bannerTimer();
});

// 小条--点击事件切换banner
$('.bannerDotted').children('li').click (function(){
    imgBefore();
    inx = $(this).index();
    $('.banner').children('li').eq(inx)
    .fadeIn(500).siblings().fadeOut(500);
    $('.bannerDotted').children('li').eq(inx)
    .addClass('active').siblings().removeClass('active');
    imgAni();
});




// 网站介绍区域

// 小圆按钮--------,鼠标进入显示图片并且添加虚线动画
// 边框旋转定时器
var borderTimer;
$('.circle_btns').mouseenter(function(){
    // 图片显示
    $(this).find('.btns_bg img').animate({opacity:1},100);
    // 文字右移
    $(this).find('.btns_text').animate({left:60},100);
    // 虚线显示
    $(this).find('.border_dashed').css({
        opacity:1,
        'animation-play-state': 'running'
    });
});

// 设置动画标识  true--动画中；false--不动画
var isMove = false;
// 小圆按钮-------对应的鼠标离开事件
$('.circle_btns').mouseleave(function(){
    console.log(isMove);
    if ( !isMove ) {
        // 图片隐藏
        $(this).find('.btns_bg img').animate({opacity:0},100);
    }
    // 文字左移
    $(this).find('.btns_text').animate({left:0},100);
    // 虚线隐藏
    $(this).find('.border_dashed').css({
        opacity:0,
        'animation-play-state': 'paused'
    });
});

// 小圆按钮-------鼠标点击事件
$('.circle_btns').on('click',function(){
    if (!isMove) {
        
        isMove = true;
        // 获取网站介绍模块的名字,路径,标题文字
        var imgName = $(this).find('img').attr('imgName');
        var imgSrc = $(this).find('img').attr('src');
        var imgText = $(this).find('span').text();

        // 获取中间的名字,路径,标题文字
        var cen_imgName = $('.intro_center').find('img').attr('imgName');
        var cen_imgSrc = $('.intro_center').find('img').attr('src');
        var cen_imgText = $('.intro_center').find('img').attr('imgText');

        // 标题文字消失,1s后更新为中间的文字和图片
        $(this).find('span').stop().animate({opacity:0},100);

        // 动画图标----将图标移动到指定位置,并且宽高也变化
        // 保留点击的li里的图片初始大小
        var imgX = $(this).find('.btns_bg').offset().left;
        var imgY = $(this).find('.btns_bg').offset().top;
        var imgSize = $(this).find('.btns_bg').css('width');

        // 先获取中心图片的位置
        var cen_imgX = $('.centerImg').offset().left;
        var cen_imgY = $('.centerImg').offset().top;
        var cen_imgSize = $('.centerImg').css('width');
        
        // 图标动画---目标位置距离文档的距离 - 当前图片距离文档的距离 = 当前图片定位要移动的距离
        
        $(this).find('.btns_bg img').css({opacity:1});
        var moveLeft = cen_imgX - imgX;
        var moveTop = cen_imgY - imgY;
        
        // 暂存this到that
        that = this;
        $(this).find('.btns_bg').stop().animate({
            width : cen_imgSize,
            height : cen_imgSize,
            top : moveTop,
            left: moveLeft,
            opacity:1
        },1000,function(){
            
            // 标题文字消失,1s后更新为中间的文字
            $(that).find('span').text(cen_imgText);
            $(that).find('span').stop().animate({opacity:1},300);
            // 图片更新--并回到初始位置
            $(that).find('img').attr('src',cen_imgSrc);
            $(that).find('img').attr('imgName',cen_imgName);
            // 图片隐藏
            $(that).find('.btns_bg img').css({opacity:0});
            $(that).find('.btns_bg').css({
                width : imgSize,
                height: imgSize,
                top: 0,
                left: 0
            });

            $('.intro_center').find('img').attr('imgName',imgName);
            $('.intro_center').find('img').attr('src',imgSrc);
            $('.intro_center').find('img').attr('imgText',imgText);

            // 显示右侧介绍详情
            $('.r_intro_text').find('.' + imgName ).siblings().stop().animate({top:20,opacity:0},100);
            window.setTimeout(function(){
                $('.r_intro_text').find('.' + imgName ).stop().animate({top: 0,opacity:1},600);
                $('.r_intro_text').find('.' + imgName ).addClass('show_intro').siblings().removeClass('show_intro');

            },50);
            // 动画完成，将标识设置为不动画false
            isMove = false;
        });
        // 动画-中部title
        $('.intro_center_text').find('.' + imgName ).siblings().stop().animate({left:-40,opacity:0},300);
        window.setTimeout(function(){
            $('.intro_center_text').find('.' + imgName ).stop().animate({left: 0,opacity:1},1000);
            $('.intro_center_text').find('.' + imgName ).addClass('show_text').siblings().removeClass('show_text');
        },200);

    }
});
    



// 解决方案
// 鼠标移入左侧li列表，右侧内容区域向上移动显示动画
$('.l_solutionTitle li').mouseenter(function(){
    // 保存触发事件的li的下标
    var inx = $(this).index();
    // 将当前li修改样式，其余样式清除/
    $(this).addClass('show_title').siblings().removeClass('show_title');
    // 更换整个div模块背景图片
    // 先获取li的属性bgImg的值,组合成正确路径
    var bgImg = 'images/index/' + $(this).attr('bgImg');
    // 替换背景图
    $('.proSolution').css({
        background:'url("' + bgImg + '") no-repeat top center',
        'background-color': 'rgb(0,0,0)'
    });


    // 将对应的div添加样式
    $('.sol_detail_items').eq(inx).siblings().stop().animate({top:20,opacity:0},300);
    window.setTimeout(function(){
        $('.sol_detail_items').eq(inx).stop().animate({top: 0,opacity:1},1000);
        $('.sol_detail_items').eq(inx).addClass('show_items').siblings().removeClass('show_items');
    },200);

});
// 解决方案----背景变化
// 根据滚动条卷去内容高度，与解决方案到文档距离做判断
// 获取解决方案
var proSolution = $('.proSolution');
// 调用方法---传递数据
$(window).on('scroll',{element:proSolution},fnDatasCenterBG);






// 云产品区域
// 鼠标悬停列表区域，小盒子隐藏，大盒子动画
$('.listsBox').mouseenter(function(){
    // 先判断，是否已经有这个类名，有的话不需要加动画
    if ( !$(this).hasClass('changeBox') ) {
        $(this).addClass('changeBox').siblings().removeClass('changeBox');
        $(this).css('top',0);
        $(this).stop().animate({
            top: -90
        },300)
        .siblings().stop().animate({
            top: 0
        },300);
    }
});
// 大盒子中每个li鼠标进入后，要隐藏li里的div边框
$('.bigList li').mouseenter(function(){
    $(this).prev().find('.productsDetail').css('border-bottom','1px solid transparent');
    $(this).find('.productsDetail').css('border-bottom','1px solid transparent');
});
$('.bigList li').mouseleave(function(){
    $(this).prev().find('.productsDetail').css('border-bottom','1px solid #dddddd');
    $(this).find('.productsDetail').css('border-bottom','1px solid #dddddd');
});









// 数据中心介绍----背景变化
// 根据滚动条卷去内容高度，与数据中心到文档距离做判断
// 获取数据中心
var datasCenter = $('.datasCenter');
// 调用方法---传递数据
$(window).on('scroll',{element:datasCenter},fnDatasCenterBG);
// 封装成函数,传入两个参数,第一个是滚动背景图的div元素选择器,第二个是要开始的距离
function fnDatasCenterBG(event){
    // 获取传递过来的元素
    var element = event.data.element;
    var startHeight = element.offset().top;
    // 获取滚动条卷去内容高度
    var scrollToTop = $(this).scrollTop();

    // 简化代码
    /** 设置背景移动的距离，背景移动的距离  是 屏幕卷去内容-要开始滚动的距离 
     *  背景移动距离，根据图片设置的，图片最大高度为650px，div高度是550px，所以背景最大移动距离是100px
     *  moveVal的范围应该是在开始滚动距离起   向下走200px   完成背景图片移动距离100px
     * 所以两者关系应为  移动距离 = （屏幕卷去内容-要开始滚动的距离）/2
     */
    var moveVal = scrollToTop - (startHeight - 100);
    // 判断条件，当屏幕卷去内容<要开始滚动的距离，说明还没开始滚动，要将moveVal归零，背景图片保持原样式
    if ( moveVal < 0 ) {
        moveVal = 0;
    }else if ( moveVal > 200 ) {
        // 判断条件，当屏幕卷去内容>最大卷去内容距离，说明已经滚动完毕，要将moveVal设置成背景图最大滚动距离
        moveVal = - 100;
    }else {
        // 判断条件，符合滚动区域内，移动距离 = （屏幕卷去内容-要开始滚动的距离）/2
        moveVal =  - moveVal / 2;
    }
    // 动画。
    element.stop().animate({
        'background-position-y': moveVal
    },300);

}


// 数据中心介绍----图片淡入淡出显示
// 获取  右侧图片到文档的距离
var imgIntroduce = $('.imgIntroduce').offset().top;
// 获取屏幕高度------卷去的内容应该比datasToPage少一个屏幕高度，才会有数字刚出现在屏幕下方时，开始增长的效果
var screenH = $(window.innerHeight)[0];
// 滚动事件
$(window).on('scroll',function(){
    // 获取滚动条卷去内容高度
    var scrollToTop = $(this).scrollTop();
    // 判断
    if ( scrollToTop >= imgIntroduce-screenH ) {
        // 添加动画。
        $('.imgIntroduce').stop().fadeIn(300);
    }else {
        $('.imgIntroduce').stop().fadeOut(300);
    }
});









// 数据支持区域---数字变化
// 根据滚动条事件，判断位置，到达数据支持的区域就开始自动变化
// 先获取数据支持区域中  要变换的数字   到文档的距离--
var datasToPage = $('.datasShow').offset().top;
// 获取屏幕高度------卷去的内容应该比datasToPage少一个屏幕高度，才会有数字刚出现在屏幕下方时，开始增长的效果
// var screenH = $(window.innerHeight)[0];----上面获取过了
$(window).on('scroll',fnDatasGrow);
function fnDatasGrow () {
    // 获取滚动条卷去内容高度
    var scrollToTop = $(this).scrollTop();
    if ( scrollToTop >= datasToPage-screenH ) {
        // 满足条件，给数字加动画

        // 数字增长动画
        $(".timer").each(count);

        // 数字增长完   清除窗口的滚动事件
        window.setTimeout(function(){
            $(window).off('scroll',fnDatasGrow);
        });
    }
}







// 服务认证---轮播
// 按钮事件
// 右键按钮点击事件
$('.rightSerIdBtn').click(function(){
    window.clearInterval(serviceIdDsq);
    // 获取第一个列表项
    var firstLi = $('.serviceIdBox').find('li').eq(0);
    // 给第一个列表项加动画向左移动
    firstLi.stop().animate({
        marginLeft:-336
    },700,serviceIdTimer());
    // 添加延时--
    window.setTimeout(function(){
        // 删除结构里的ul里第一个
        $('.serviceIdBox').find('li').eq(0).remove();

        // 左边距改回原始值
        firstLi.stop().animate({
            marginLeft:26
        },0);

        // 将上面暂存的列表项加到ul最后面
        $('.serviceIdBox').append( firstLi );
    },700);
});

// 左键按钮点击事件
$('.leftSerIdBtn').click(function(){
    window.clearInterval(serviceIdDsq);
    // 获取列表长度，方便找到最后一项
    var len = $('.serviceIdBox').find('li').length; 
    // 获取最后一个列表项
    var lastLi = $('.serviceIdBox').find('li').eq(len-1);
    // 将最后一项在结构中删除
    $('.serviceIdBox').find('li').eq(len-1).remove();
    // 修改左边距值
    lastLi.stop().animate({
        marginLeft:-336
    },0);
    // 将暂存的最后一项加到ul结构的第一项
    $('.serviceIdBox').prepend( lastLi );
    // 向右移动
    lastLi.stop().animate({
        marginLeft:26
    },700,serviceIdTimer());
});

// 自动轮播---向左移动---触发右键点击事件
var serviceIdDsq ;
serviceIdTimer();
function serviceIdTimer () {
    serviceIdDsq = window.setInterval(function(){
        $('.rightSerIdBtn').click();
    },2000);
}
// 每个列表项移入事件
$('.serviceIdBox').find('li').mouseenter(function(){
    window.clearInterval(serviceIdDsq);
});
// 每个列表项移出事件
$('.serviceIdBox').find('li').mouseleave(function(){ 
    serviceIdTimer();
});
