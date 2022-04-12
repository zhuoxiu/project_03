$(function(){
    var layer = layui.layer;
    getAricle_Cate();
    function getAricle_Cate(){
        $.ajax({
            method:"GET",
            url:"http://www.liulongbin.top:3007/my/article/cates",
            success:function(res){
                if(res.status !== 0) {
                    layui.layer.msg("获取文章分类失败")
                }
                var html = template("article_cate",res)
                 $("tbody").empty().html(html);
            }
        })
        
    }
    var addIndex = null;
    $("#addarticle_cate").on("click",function(){
            addIndex = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content:$("#addArticle_cate").html()
          });  
    })

    $("body").on("submit","#form-add",function(e){
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            method:'POST',
            url:'http://www.liulongbin.top:3007/my/article/addcates',
            data:data,
            success:function(res){
                if(res.status !== 0) {
                    layui.msg("新增失败");
                }
                getAricle_Cate();
                layer.close(addIndex);
            }
        })
        
    })


})

