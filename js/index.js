$(function () {


    //移入视频后,改变其样式
    $(".videoBox").find(".cover").hover(function () {
        $(this).siblings("img").css({transform : "scale(1.2)"});
        $(this).css({background: "rgba(0,0,0,0.5)"});
        $(this).children(".iconfont").css({color: "rgba(255,255,255,0.5)"});
    }, function () {
        $(this).siblings("img").css({transform : "none"});
        $(this).css({background: "rgba(0,0,0,0)"});
        $(this).children(".iconfont").css({color: "rgba(255,255,255,0)"});
    });

    //点赞按钮的点击
    $(".imageBox").find(".likeIcon").click(function () {
        $(this).parents(".imageBox").toggleClass("liked");
        //后台处理点赞操作

    });

    //改变文章内部字数的显示
    wordNumShow();
    function wordNumShow(){
        $.each($(".articleContent").children("p"), function (index, content) {
            var text = $(content).text();
            var $viewAll = $("<span class=\"viewAll\"><a href='readArticle.html' target='_blank'>VIEW ALL <img src='images/triangle.png' alt=''></a>");
            if($(content).parents(".articleBox").find(".articleRight").children("img").length === 0 && text.length > 235){
                var newText = text.substring(0, 235);
                $(content).text(newText).append($viewAll);
            }
            if($(content).parents(".articleBox").find(".articleRight").children("img").length === 1 && text.length > 180){
                var newText = text.substring(0, 180);
                $(content).text(newText).append($viewAll);
            }

        });
    }
});