$(function () {
    var form = layui.form
    var layer = layui.layer
    getuser()
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    function getuser() {
        $.ajax({
            method: 'GET',
            url: "http://www.liulongbin.top:3007/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取用户信息失败");
                }
                //给表单赋值
                form.val("user_info", res.data)
            },

        })
    }

    //修改用户信息
    $(".from_user_info").on("submit", function (e) {
        var data = $(".from_user_info").serialize();
        console.log(data);
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: "http://www.liulongbin.top:3007/my/userinfo",
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("更新失败");
                }
                layui.layer.msg("更新成功")
                window.parent.getUserinfo();
            }
        })
    })

    //重置按钮
    $("#reuser").on("click", function (e) {
        e.preventDefault();
        getuser();
    })



})