$(function () {





    var options = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: ""
    };
    //获取文章列表
    getArticleList(options)

    var laypage = layui.laypage;

    //定义补0函数
    function addZero(sum) {
        return sum >= 10 ? sum : "0" + sum;
    }

    //美化时间字段过滤器
    template.defaults.imports.getDate = function (data) {
        var dt = new Date(data);
        var y = dt.getFullYear();
        var m = addZero(dt.getMonth() + 1);
        var d = addZero(dt.getDate());
        var hh = addZero(dt.getHours());
        var mm = addZero(dt.getMinutes());
        var ss = addZero(dt.getSeconds());
        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
    }

    //删除文章
    $("body").on("click", ".deleteId", function () {
        var id = $(this).attr("data-id");
        var len = $(".deleteId").length;
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/delete/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除文章失败！')
                }
                layer.msg('删除文章成功！')
                if(options.pagenum > 1) {
                    if(len <= 1) {
                        options.pagenum = options.pagenum -1;
                    }

                    if (len > 1) {
                        options.pagenum = options.pagenum;
                    }
                }

                getArticleList(options);
            }
        })
    })


    //初始化接口
    function getArticleList(ops) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/list',
            data: ops,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取文章列表失败")
                }
                //执行一个laypage实例
                laypage.render({
                    elem: 'articlePage' //注意，这里的 test1 是 ID，不用加 # 号
                    , count: res.total //数据总数，从服务端得到
                    , limit: ops.pagesize
                    , curr: ops.pagenum
                    , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
                    , limits: [2, 3, 5, 10]
                    , jump: function (obj, first) {
                        if (first) {
                            return;
                        }
                        options.pagenum = obj.curr;
                        options.pagesize = obj.limit;
                        getArticleList(options)
                    }
                });

                var html = template("articlelist", res);
                $("tbody").empty().html(html);
            }
        })
    }
});
