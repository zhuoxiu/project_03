$(function () {
    
    getUserinfo();

    $("#exit").on("click", function () {
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem("token");
            location.href = "./login.html"
            layer.close(index);
        });

    });

  
})

function getUserinfo() {
    var token = localStorage.getItem("token");
    var layer = layui.layer;
    $.ajax({
        method: 'GET',
        url: "http://www.liulongbin.top:3007/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败");
            }

            //展示用户信息
            showUserinfo(res.data);
        },

        //无论响应是否成功都会返回相应的数据
        /*  complete:function (res) {
             // {"status":1,"message":"身份认证失败！"} 
             if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                 localStorage.removeItem("token");
                 location.href = "./login.html";
             }
         } */
    })
};

//展示用户信息函数
function showUserinfo(data) {
    var name = data.nickname || data.username;
    $("#welcom").html("欢迎&nbsp;&nbsp;" + name);
    if (data.user_pic) {
        console.log(data.user_pic);
        $(".layui-nav-img").prop("src", data.user_pic)
        $(".replace").hide();

    } else {
        $(".replace").html(name[0].toUpperCase());
        $(".replace").show();
        $(".layui-nav-img").hide();

    }
}



