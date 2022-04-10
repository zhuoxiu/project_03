//每次调用ajax函数前都会调用该全局函数
$.ajaxPrefilter(function (options) {
    
    if (options.url.indexOf("/my") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || "",
        }
    }

    options.complete = function (res) {
            // {"status":1,"message":"身份认证失败！"} 
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                location.href = "./login.html";
                localStorage.removeItem("token");
        }
    }
})