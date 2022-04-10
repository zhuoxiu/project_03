$(function () {
    $(".link_login a").on("click", function () {

        $(".link_login").hide();
        $(".link_reg").show();
    })

    $(".link_reg a").on("click", function () {
        $(".link_reg").hide();
        $(".link_login").show();

    })

    layui.form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '必须6到12位，且不能出现空格'
        ],
        respassword: function (value) {
            var rpw = $("#resp").val();
            if (value !== rpw) {
                return '两次输入的密码不一致';
            }
        }
    })
    //注册请求
    $("#regform").on("submit",function(e) {
        e.preventDefault();
        
        var data =$(this).serialize();
        console.log(data);
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/api/reguser',
            data:data,
            success:function (res) {
                alert("你好")
                if(res.status !== 0) {
                    return layui.layer.msg(res.message)
                }

                layui.layer.msg(res.message);
                $("#tologin").click();
            }
        })
    })

    //登录请求
    $("#loginform").on("submit",function(e){
        var data = $(this).serialize();
        console.log(data)
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/api/login',
            data:data,
            success:function (res) {
                if(res.status !== 0) {
                   return layui.layer.msg(res.message);
                } 
                layui.layer.msg(res.message);
                console.log("login:"+res.token)
                localStorage.setItem("token",res.token);
                location.href='./index.html'
            }
        })
    })
})