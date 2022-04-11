$(function () {
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        unsomepwd: function (value) {
            if (value === $("#oldpwd").val()) {
                return "新密码不能和原密码一样";
            }
        },
        somepwd: function (value) {
            if (value !== $("#newpwd").val()) {
                return "两次输入的密码不一样";
            }
        }

    })

    updataPwd();


})


function updataPwd() {
    $(".form_user_pwd").on("submit", function (e) {
        e.preventDefault();
        var data = $(".form_user_pwd").serialize();
        console.log(data)
        $.ajax({
            method: 'POST',
            url: "http://www.liulongbin.top:3007/my/updatepwd",
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("重置失败");
                }
                e.preventDefault();
                $('.form_user_pwd')[0].reset()
            }
        })
    })
}