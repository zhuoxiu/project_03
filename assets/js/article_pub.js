$(function () {

    var form = layui.form;
    var layer = layui.layer;

    getarticleCates()

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    var state = "已发布"

    $("#draft").on("click",function(){
        state = "草稿"
    })

    $("body").on("click", "#select", function () {
        $("#fileaddcate").click();
    })

    $("#fileaddcate").on("change", function (e) {
        var files = e.target.files;
        if (files.leng <= 0) {
            layui.layer.msg("请选择图片")
        }
        var newURL = URL.createObjectURL(files[0]);
        $image.cropper('destroy')
            .attr("src", newURL)
            .cropper(options)

    })

    $("#form-article-pub").on("submit", function (e) {
        e.preventDefault();
        var formData = new FormData($(this)[0])
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                formData.append("cover_img",blob);

                formData.append("state",state);
                formData.forEach((key, val) => {
                })
                //发送上传请求
                pubarticle(formData);
            })
        
    })



    function getarticleCates() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }

                var html = template("cates", res);
                $("#selectcate").html(html)
                form.render()
            }
        })
    }

    function pubarticle(fd){
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('发布文章失败！')
              }
              layer.msg('发布文章成功！')
              // 发布文章成功后，跳转到文章列表页面
              location.href = './article_list.html';
            }
          })
    }

})


