$(function () {
    //登陆注册页面切换动画
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });


    //登陆按钮的点击
    $(".login").click(function (event) {
        var userL = $("#logUser").val().trim().length;
        var pwdL = $("#logPassword").val().trim().length;
        if(userL === 0 && pwdL === 0){
            hint(1,"用户名与密码不能为空");
            event.preventDefault();
        }else if(userL < 6 || pwdL < 6){
            hint(1,"请输入正确的用户名与密码");
            event.preventDefault();
        }else{
            //进行登陆验证
            event.preventDefault();
            hint(2,"登陆成功!");
            setTimeout(function () {
                window.location.href = "http://localhost:63342/%E4%BB%A3%E7%A0%81/AtimeImpression/index.html";
            }, 1000);
        }
    });

    //注册按钮的点击
    $("input[type=text]").val("");
    $("input[type=email]").val("");
    $("input[type=password]").val("");
    $(".register").click(function (event) {
        var userL = $("#regUser").val().trim().length;
        var pwdL = $("#regPassword").val().trim().length;
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(userL === 0 && pwdL === 0){
            hint(1,"用户名与密码不能为空");
            event.preventDefault();
        }else if(userL < 6 || pwdL < 6){
            hint(1,"用户名与密码应在6到16位之间");
            event.preventDefault();
        }else if(!reg.test($("#email").val())){
            hint(1,"请输入正确的邮箱");
            event.preventDefault();
        }else if($("#regPassword").val() !== $("#confirm-password").val()){
            hint(1,"两次密码输入不同");
            event.preventDefault();
            $("#confirm-password").val("");
        }else{
            //提交注册

        }
    });

    //忘记密码的点击
    $("#forgetPwd").click(function () {
        $(".cover").css({"top": "200px"});
    });

    //忘记密码确认的点击
    $(".cover").find("input[type=submit]").click(function (event) {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        var userL = $(".cover").find("input").eq(0).val().trim().length;
        if(userL < 6 || !reg.test($(".cover").find("input").eq(1).val())){
            hint(1,"请输入正确的用户名与邮箱");
            event.preventDefault();
        }else{
            //后台验证

        }
    });

    //忘记密码取消的点击
    $(".cover").find("input[type=reset]").click(function (){
        $(".cover").css({"top": "-400px"});
        $(".cover").find("input").eq(0).val("");
        $(".cover").find("input").eq(1).val("");
    });

    //提示信息的显示 type=1: 警告信息, type=2: 成功信息
    function hint(type ,str) {
        if(type === 1){
            $(".hint").find("img").attr("src", "images/confirm-img.png");
        }
        if(type === 2){
            $(".hint").find("img").attr("src", "images/hint-ok.png");
        }
        $(".hint").children("p").text(str);
        $(".hint").css("display", "block");
        setTimeout(function (){$(".hint").css("opacity", 1)}, 0);
        setTimeout(function (){$(".hint").css("opacity", 0)}, 2000);
        setTimeout(function (){$(".hint").css("display", "none")}, 2000);
    }
});