
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

getOnload()

$("#fileid").on("change", function (e) {
    var files = e.target.files;
    if (files.length <= 0) {
        layui.layer.msg("请选择上传的文件");
    }
    //根据选择的文件，创建一个对应的 URL 地址：
    var newImgURL = URL.createObjectURL(files[0]);
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域

})

// 将 Canvas 画布上的内容，转化为 base64 格式的字符串

uploadPhoto();





//选择文件
function getOnload() {
    $(".user_photo_btn").on("click", function () {
        $("#fileid").click();
    })
}

//上传文件

function uploadPhoto() {

    $("#uploadphoto").on("click", function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100, height: 100
            }
            ).toDataURL('image/png');
        $.ajax({
            method: "POST",
            url: "http://www.liulongbin.top:3007/my/update/avatar",
            data: {
                avatar:dataURL,
            },
            success: function (res) {
                if (res.status !== 0) {
                    layui.layer.msg("更新头像失败");
                }
                window.parent.getUserinfo();
                layui.layer.msg("更新头像成功");
                $image.prop("src",dataURL)
                
            }
        })
    })
}