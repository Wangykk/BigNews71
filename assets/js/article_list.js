$(function () {
  //  获取文章分类数据
  // 直接发送ajax请求
  $.ajax({
    url: "/my/article/cates",
    success: function (res) {
      // 使用模板将数据渲染到页面中
      if (res.status == 0) {
        var htmlStr = template("categoryList", res);
        $("#category").html(htmlStr);
        // 因为我们使用的是layui中的下拉菜单 此处在进行数据渲染的时候 会有问题 需要重新调用方法渲染一下
        layui.form.render();
      }
    },
  });

  var params = {
    pagenum: 1,
    pagesize: 2,
    cate_id: $("#category").val(),
    states: $("#state").val(),
  };

  // 获取文章列表数据渲染页面
  // 发送ajax请求
  renderList();
  function renderList() {
    $.ajax({
      url: "/my/article/list",
      data: params,
      success: function (res) {
        // console.log(res);
        if (res.status == 0) {
          // 2.2 使用模板渲染页面
          var htmlStr = template("articleList", res);
          $("tbody").html(htmlStr);
          renderPage(res);
        }
      },
    });
  }

  // 实现筛选功能
  // 给form表单注册事件 通过button按钮触发
  $(".myForm").on("submit", function (e) {
    // 3.2 阻止默认请示行为
    e.preventDefault();
    // 3.3 发送ajax请示 获取数据
    // 单击了筛选按钮之后，应该要根据分类和状态来筛选数据
    params.cate_id = $("#category").val();
    params.state = $("#state").val();
    renderList(); // 用上面的新的数据来发送请求
  });

  // 启用分页
  var laypage = layui.laypage;

  // 执行一个laypage的实例
  function renderPage(res) {
    laypage.render({
      elem: "test1", // 注意: 这里的test1是ID 不用加引号
      count: res.total, // 数据总数 从服务端得到
      limit: params.pagesize, // 每页显示的条数
      curr: params.pagenum, // 最新页码值
      limits: [2, 3, 5, 8], // 每页条数的select选择框
      groups: 3, // 连续出现的页码数
      layout: ["count", "limit", "prev", "page", "next", "skip"], // 自定义排版
      jump: function (obj, first) {
        // first: 是否首次 一般用于初始加载的判断
        // obj包含了当前分页的所有参数
        // console.log(obj.curr); 得到当前页 以便像服务器请求对应页的数据
        // console.log(obj.limit); 得到每页显示的条数
        // console.log(first); 首次跳转到列表页的时候first是true 后期单击页码值得时候first是undefined
        // 首次不执行
        if (!first) {
          // do something 单击页码的时候需要在这个大括号中实现分页处理
          // 发送ajax请示 获取当前页码的最新数据 obj.curr 当前的页码值
          params.pagenum = obj.curr; // 获取最新的页码值
          params.pagesize = obj.limit; // 当前页面的条数
          renderList();
        }
      },
    });
  }
  // 删除文章
  // 通过委托的方式给删除按钮注册事件
  $("tbody").on("click", ".btn-del", function () {
    // 获取当前页面的文章条数 用什么标签数量来表示都可以
    var count = $("tbody .btn-del").length;
    // 获取删除按钮中的id
    var id = $(this).data("id");
    // 弹出提示框
    layer.confirm(
      "真的要删除此条数据吗?",
      { icon: 3, title: "提示" },
      function (index) {
        // do something
        // 发送ajax请示
        $.ajax({
          url: `/my/article/delete/${id}`,
          success: function (res) {
            layer.close(index);
            if (res.status != 0) {
              // 提示用户
              layer.msg("删除文章失败");
            } else {
              // 重新渲染列表
              // 判断一下是不是最后一条数据 如果是的话 让当前页码减1
              if (count == 1) {
                params.pagenum = params.pagenum == 1 ? 1 : params.pagenum - 1;
              }
              // 根据最新页码发送请求获取数据渲染页面
              renderList();
            }
          },
        });
      }
    );
  });
});
